import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type {
  AnyCanvasObject,
  CanvasDocument,
  InteractionMode,
  Viewport,
  DragState,
  ResizeState,
  InkPoint,
  InkStroke,
  InkObject,
} from '@/types/canvas'

interface CanvasState {
  // Document
  doc: CanvasDocument | null
  objects: AnyCanvasObject[]

  // Body text
  bodyText: string
  setBodyText: (text: string) => void

  // Text editing mode (canvas body text)
  textEditMode: boolean
  setTextEditMode: (active: boolean) => void

  // Object content editing
  editingObjectId: string | null
  setEditingObjectId: (id: string | null) => void

  // Selection
  selectedId: string | null
  select: (id: string | null) => void

  // Interaction
  mode: InteractionMode
  setMode: (mode: InteractionMode) => void

  // Drag
  drag: DragState | null
  setDrag: (drag: DragState | null) => void

  // Resize
  resize: ResizeState | null
  setResize: (resize: ResizeState | null) => void

  // Viewport
  viewport: Viewport
  setViewport: (vp: Partial<Viewport>) => void
  zoomIn: () => void
  zoomOut: () => void
  zoomReset: () => void

  // Object manipulation
  addObject: (obj: AnyCanvasObject) => void
  updateObject: (id: string, patch: Partial<AnyCanvasObject>) => void
  removeObject: (id: string) => void
  bringToFront: (id: string) => void

  // Document
  setDoc: (doc: CanvasDocument) => void
  setDocTitle: (title: string) => void

  // Ink
  inkObjectId: string | null
  liveStroke: InkPoint[] | null
  setInkObjectId: (id: string | null) => void
  startLiveStroke: (pt: InkPoint) => void
  extendLiveStroke: (pt: InkPoint) => void
  commitLiveStroke: (color: string, width: number) => void
}

const DEFAULT_VIEWPORT: Viewport = {
  zoom: 1,
  panX: 0,
  panY: 0,
  width:  window.innerWidth,
  height: window.innerHeight,
}

const ZOOM_STEP = 0.1
const ZOOM_MIN  = 0.1
const ZOOM_MAX  = 4.0

export const useCanvasStore = create<CanvasState>()(
  subscribeWithSelector((set, _get) => ({
    doc:             null,
    objects:         [],
    bodyText:        '',
    textEditMode:    false,
    editingObjectId: null,
    selectedId:      null,
    mode:            'select',
    drag:            null,
    resize:          null,
    viewport:        DEFAULT_VIEWPORT,
    inkObjectId:     null,
    liveStroke:      null,

    setBodyText:        (text)   => set({ bodyText: text }),
    setTextEditMode:    (active) => set({ textEditMode: active }),
    setEditingObjectId: (id)     => set({ editingObjectId: id }),
    select:    (id)   => set({ selectedId: id }),
    setMode:   (mode) => set({ mode }),
    setDrag:   (drag) => set({ drag }),
    setResize: (resize) => set({ resize }),

    setViewport: (vp) =>
      set(state => ({ viewport: { ...state.viewport, ...vp } })),

    zoomIn: () =>
      set(state => ({
        viewport: {
          ...state.viewport,
          zoom: Math.min(ZOOM_MAX, +(state.viewport.zoom + ZOOM_STEP).toFixed(2)),
        },
      })),

    zoomOut: () =>
      set(state => ({
        viewport: {
          ...state.viewport,
          zoom: Math.max(ZOOM_MIN, +(state.viewport.zoom - ZOOM_STEP).toFixed(2)),
        },
      })),

    zoomReset: () =>
      set(state => ({ viewport: { ...state.viewport, zoom: 1 } })),

    addObject: (obj) =>
      set(state => ({ objects: [...state.objects, obj] })),

    updateObject: (id, patch) =>
      set(state => ({
        objects: state.objects.map(o => o.id === id ? { ...o, ...patch } : o),
      })),

    removeObject: (id) =>
      set(state => ({
        objects:         state.objects.filter(o => o.id !== id),
        selectedId:      state.selectedId      === id ? null : state.selectedId,
        editingObjectId: state.editingObjectId === id ? null : state.editingObjectId,
        inkObjectId:     state.inkObjectId     === id ? null : state.inkObjectId,
      })),

    bringToFront: (id) =>
      set(state => {
        const obj = state.objects.find(o => o.id === id)
        if (!obj) return state
        return {
          objects: [
            ...state.objects.filter(o => o.id !== id),
            obj,
          ],
        }
      }),

    setDoc: (doc) =>
      set(state => {
        const inkObj = doc.objects.find(o => o.type === 'ink')
        return {
          doc,
          objects:     doc.objects,
          bodyText:    doc.bodyText ?? '',
          inkObjectId: inkObj ? inkObj.id : state.inkObjectId,
        }
      }),

    setDocTitle: (title) =>
      set(state => state.doc ? { doc: { ...state.doc, title } } : {}),

    // ── Ink actions ────────────────────────────────────────
    setInkObjectId: (id) => set({ inkObjectId: id }),

    startLiveStroke: (pt) => set({ liveStroke: [pt] }),

    extendLiveStroke: (pt) =>
      set(state => ({
        liveStroke: state.liveStroke ? [...state.liveStroke, pt] : [pt],
      })),

    commitLiveStroke: (color, width) =>
      set(state => {
        const { liveStroke, inkObjectId, objects } = state
        if (!liveStroke || liveStroke.length < 2 || !inkObjectId) {
          return { liveStroke: null }
        }
        const stroke: InkStroke = { points: liveStroke, color, width }
        const updatedObjects = objects.map(o => {
          if (o.id !== inkObjectId) return o
          const inkObj = o as InkObject
          return { ...inkObj, strokes: [...inkObj.strokes, stroke] }
        })
        return { liveStroke: null, objects: updatedObjects }
      }),
  }))
)
