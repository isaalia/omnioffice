// ============================================================
// OMNIOFFICE — Core Type Definitions
// Every canvas object, tool, and engine type lives here.
// ============================================================

// ── Wrap modes (reflow engine) ────────────────────────────
export type WrapMode = 'square' | 'tight' | 'through' | 'topbottom' | 'none'

// ── Anchor modes ──────────────────────────────────────────
export type AnchorMode = 'fixed' | 'inline' | 'page' | 'margin'

// ── Tool types ────────────────────────────────────────────
export type ToolType =
  | 'wordprocessor'
  | 'spreadsheet'
  | 'presentation'
  | 'database'
  | 'chart'
  | 'image'
  | 'video'
  | 'audio'
  | 'pdf'
  | 'diagram'
  | 'orgchart'
  | 'mindmap'
  | 'citation'
  | 'code'
  | 'math'
  | 'ink'
  | 'callout'
  | 'shape'
  | 'ai'

// ── Layer system ──────────────────────────────────────────
export type LayerName = 'background' | 'content' | 'float' | 'overlay' | 'foreground'

export interface Layer {
  name: LayerName
  visible: boolean
  locked: boolean
  opacity: number  // 0-1
}

// ── Base canvas object ────────────────────────────────────
export interface CanvasObject {
  id: string
  type: ToolType

  // Position and size
  x: number
  y: number
  w: number
  h: number
  rotation: number  // degrees

  // Layout
  wrapMode: WrapMode
  anchorMode: AnchorMode
  layer: LayerName
  zIndex: number

  // Visual
  opacity: number   // 0-1
  locked: boolean
  visible: boolean

  // Metadata
  name: string
  createdAt: string
  updatedAt: string
  createdBy: string
}

// ── Word processor object ─────────────────────────────────
export interface WordProcessorObject extends CanvasObject {
  type: 'wordprocessor'
  content: string        // HTML content (ProseMirror serialized)
  fontSize: number
  fontFamily: string
  lineHeight: number
}

// ── Image object ──────────────────────────────────────────
export interface ImageObject extends CanvasObject {
  type: 'image'
  src: string
  alt: string
  objectFit: 'cover' | 'contain' | 'fill'
}

// ── Callout object ────────────────────────────────────────
export interface CalloutObject extends CanvasObject {
  type: 'callout'
  content: string
  backgroundColor: string
  borderColor: string
  textColor: string
}

// ── Union of all object types ─────────────────────────────
export type AnyCanvasObject =
  | WordProcessorObject
  | ImageObject
  | CalloutObject
  | CanvasObject   // fallback for unimplemented types

// ── Canvas document ───────────────────────────────────────
export interface CanvasDocument {
  id: string
  title: string
  objects: AnyCanvasObject[]
  layers: Layer[]
  pageSize: PageSize
  zoom: number
  panX: number
  panY: number
  createdAt: string
  updatedAt: string
  ownerId: string
}

// ── Page size ─────────────────────────────────────────────
export type PageSizeName = 'letter' | 'a4' | 'a3' | 'legal' | 'tabloid' | 'custom'

export interface PageSize {
  name: PageSizeName
  width: number   // px at 96dpi
  height: number  // px at 96dpi
  orientation: 'portrait' | 'landscape'
}

export const PAGE_SIZES: Record<PageSizeName, Omit<PageSize, 'name' | 'orientation'>> = {
  letter:  { width: 816,  height: 1056 },
  a4:      { width: 794,  height: 1123 },
  a3:      { width: 1123, height: 1587 },
  legal:   { width: 816,  height: 1344 },
  tabloid: { width: 1056, height: 1632 },
  custom:  { width: 816,  height: 1056 },
}

// ── Reflow engine types ───────────────────────────────────
export interface FreeSpan {
  x: number
  w: number
}

export interface TextSegment {
  x: number
  y: number
  text: string
  lineIndex: number
}

export interface ReflowConfig {
  canvasWidth: number
  canvasHeight: number
  marginLeft: number
  marginRight: number
  marginTop: number
  lineHeight: number
  fontSize: number
  fontFamily: string
  objectGap: number
}

// ── Interaction state ─────────────────────────────────────
export type InteractionMode = 'select' | 'place' | 'pan' | 'text' | 'ink'

export interface DragState {
  objectId: string
  startX: number
  startY: number
  offsetX: number
  offsetY: number
}

export interface ResizeState {
  objectId: string
  handleX: number
  handleY: number
  startX: number
  startY: number
  origX: number
  origY: number
  origW: number
  origH: number
}

// ── Viewport ──────────────────────────────────────────────
export interface Viewport {
  zoom: number    // 0.1 - 4.0
  panX: number
  panY: number
  width: number
  height: number
}
