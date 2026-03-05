import type { CanvasDocument, AnyCanvasObject, ToolType } from '@/types/canvas'

function uuid(): string {
  return crypto.randomUUID()
}

export function createObject(
  type: ToolType,
  position: { x: number; y: number }
): AnyCanvasObject {
  const now = new Date().toISOString()
  return {
    id:        uuid(),
    type,
    x:         position.x,
    y:         position.y,
    w:         220,
    h:         140,
    rotation:  0,
    wrapMode:  'square',
    anchorMode: 'fixed',
    layer:     'content',
    zIndex:    0,
    opacity:   1,
    locked:    false,
    visible:   true,
    name:      type,
    createdAt: now,
    updatedAt: now,
    createdBy: 'local',
  } as AnyCanvasObject
}

export function newDocument(): CanvasDocument {
  const now = new Date().toISOString()
  return {
    id:      crypto.randomUUID(),
    title:   'Untitled Canvas',
    objects: [],
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
