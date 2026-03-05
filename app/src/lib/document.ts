import type { CanvasDocument, AnyCanvasObject, ToolType } from '@/types/canvas'
import { supabase } from '@/lib/supabase'

function uuid(): string {
  return crypto.randomUUID()
}

export function createObject(
  type: ToolType,
  position: { x: number; y: number }
): AnyCanvasObject {
  const now = new Date().toISOString()

  const base = {
    id:         uuid(),
    type,
    x:          position.x,
    y:          position.y,
    rotation:   0,
    wrapMode:   'square' as const,
    anchorMode: 'fixed'  as const,
    layer:      'content' as const,
    zIndex:     0,
    opacity:    1,
    locked:     false,
    visible:    true,
    name:       type,
    createdAt:  now,
    updatedAt:  now,
    createdBy:  'local',
  }

  switch (type) {
    case 'wordprocessor':
      return { ...base, w: 300, h: 220, type: 'wordprocessor',
        content: '', fontSize: 14, fontFamily: 'Georgia, serif', lineHeight: 1.6 }
    case 'callout':
      return { ...base, w: 280, h: 110, type: 'callout',
        content: '', backgroundColor: '#3a1e2a', borderColor: '#d94a7a', textColor: '#ffffff' }
    case 'image':
      return { ...base, w: 240, h: 180, type: 'image',
        src: '', alt: '', objectFit: 'cover' as const }
    case 'spreadsheet':
      return { ...base, w: 340, h: 220, type: 'spreadsheet',
        cells: {}, colCount: 5, rowCount: 10 }
    case 'presentation':
      return { ...base, w: 320, h: 200 }
    case 'chart':
      return { ...base, w: 280, h: 200 }
    case 'database':
      return { ...base, w: 300, h: 200 }
    case 'diagram':
    case 'orgchart':
    case 'mindmap':
      return { ...base, w: 280, h: 200 }
    case 'code':
      return { ...base, w: 320, h: 200, type: 'code',
        code: '', language: 'typescript' }
    case 'math':
      return { ...base, w: 220, h: 90 }
    case 'citation':
      return { ...base, w: 240, h: 90 }
    case 'video':
    case 'audio':
      return { ...base, w: 240, h: 160 }
    case 'pdf':
      return { ...base, w: 240, h: 300 }
    case 'ai':
      return { ...base, w: 260, h: 180 }
    case 'shape':
      return { ...base, w: 120, h: 120 }
    case 'ink':
      // Ink objects cover the full paper; placed at paper origin
      return { ...base, w: 900, h: 1400, x: position.x, y: position.y,
        wrapMode: 'none' as const, locked: true, type: 'ink', strokes: [] }
    default:
      return { ...base, w: 220, h: 140 }
  }
}

export function newDocument(): CanvasDocument {
  const now = new Date().toISOString()
  return {
    id:       crypto.randomUUID(),
    title:    'Untitled Canvas',
    bodyText: '',
    objects:  [],
    layers: [
      { name: 'background', visible: true, locked: false, opacity: 1 },
      { name: 'content',    visible: true, locked: false, opacity: 1 },
      { name: 'float',      visible: true, locked: false, opacity: 1 },
      { name: 'overlay',    visible: true, locked: false, opacity: 1 },
      { name: 'foreground', visible: true, locked: false, opacity: 1 },
    ],
    pageSize: {
      name:        'letter',
      width:       816,
      height:      1056,
      orientation: 'portrait',
    },
    zoom:      1,
    panX:      0,
    panY:      0,
    createdAt: now,
    updatedAt: now,
    ownerId:   'local',
  }
}

// ── Supabase persistence ──────────────────────────────────

export interface DocSummary {
  id:         string
  title:      string
  updated_at: string
}

export async function createDocumentInDB(userId: string): Promise<string> {
  const { data, error } = await supabase
    .from('omnioffice_documents')
    .insert({ title: 'Untitled Canvas', body_text: '', objects: [], owner_id: userId })
    .select('id')
    .single()
  if (error) throw error
  return data.id as string
}

export async function saveDocument(
  id: string,
  title: string,
  bodyText: string,
  objects: AnyCanvasObject[],
): Promise<void> {
  const { error } = await supabase
    .from('omnioffice_documents')
    .update({ title, body_text: bodyText, objects })
    .eq('id', id)
  if (error) throw error
}

export async function listDocuments(): Promise<DocSummary[]> {
  const { data, error } = await supabase
    .from('omnioffice_documents')
    .select('id, title, updated_at')
    .order('updated_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as DocSummary[]
}

export async function deleteDocument(id: string): Promise<void> {
  const { error } = await supabase
    .from('omnioffice_documents')
    .delete()
    .eq('id', id)
  if (error) throw error
}

export async function loadDocument(
  id: string,
): Promise<{ title: string; bodyText: string; objects: AnyCanvasObject[] } | null> {
  const { data, error } = await supabase
    .from('omnioffice_documents')
    .select('title, body_text, objects')
    .eq('id', id)
    .single()
  if (error) return null
  return {
    title:    data.title as string,
    bodyText: data.body_text as string,
    objects:  data.objects as AnyCanvasObject[],
  }
}
