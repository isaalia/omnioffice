import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type {
  AnyCanvasObject,
  CanvasDocument,
  InteractionMode,
  Viewport,
  DragState,
  ResizeState,
} from '@/types/canvas'

interface CanvasState {
  // Document
  doc: CanvasDocument | null
  objects: AnyCanvasObject[]

  // Body text
  bodyText: string
  setBodyText: (text: string) => void

  // Text editing mode
  textEditMode: boolean
  setTextEditMode: (active: boolean) => void

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
    doc:          null,
    objects:      [],
    bodyText:     '',
    textEditMode: false,
    selectedId:   null,
    mode:         'select',
    drag:         null,
    resize:       null,
    viewport:     DEFAULT_VIEWPORT,

    setBodyText:     (text)   => set({ bodyText: text }),
    setTextEditMode: (active) => set({ textEditMode: active }),
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
        objects:    state.objects.filter(o => o.id !== id),
        selectedId: state.selectedId === id ? null : state.selectedId,
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
      set({ doc, objects: doc.objects }),
  }))
)
