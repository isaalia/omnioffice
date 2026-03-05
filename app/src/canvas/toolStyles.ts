import type { ToolType } from '@/types/canvas'

interface ToolStyle {
  bg:     string
  border: string
  label:  string
}

export const TOOL_STYLES: Record<ToolType, ToolStyle> = {
  wordprocessor: { bg: '#1e3a5f', border: '#4a90d9', label: 'Word Processor' },
  spreadsheet:   { bg: '#1b3a2a', border: '#4ad98a', label: 'Spreadsheet'    },
  presentation:  { bg: '#3a2a1b', border: '#d9844a', label: 'Presentation'   },
  database:      { bg: '#2a1b3a', border: '#9a4ad9', label: 'Database'       },
  chart:         { bg: '#3a1b2a', border: '#d94a7a', label: 'Chart'          },
  image:         { bg: '#1e2a3a', border: '#4ab4d9', label: 'Image'          },
  video:         { bg: '#1b1e3a', border: '#4a4ad9', label: 'Video'          },
  audio:         { bg: '#2a3a1b', border: '#84d94a', label: 'Audio'          },
  pdf:           { bg: '#3a1b1b', border: '#d94a4a', label: 'PDF'            },
  diagram:       { bg: '#1b3a3a', border: '#4ad9d9', label: 'Diagram'        },
  orgchart:      { bg: '#3a3a1b', border: '#d9d94a', label: 'Org Chart'      },
  mindmap:       { bg: '#2a3a2a', border: '#6ad94a', label: 'Mind Map'       },
  citation:      { bg: '#3a2a2a', border: '#d9844a', label: 'Citations'      },
  code:          { bg: '#1a1a2a', border: '#7a7ad9', label: 'Code'           },
  math:          { bg: '#2a1a2a', border: '#b44ad9', label: 'Math'           },
  ink:           { bg: '#1a2a2a', border: '#4ad9b4', label: 'Ink'            },
  callout:       { bg: '#3a1e2a', border: '#d94a7a', label: 'Callout'        },
  shape:         { bg: '#2a2a2a', border: '#aaaaaa', label: 'Shape'          },
  ai:            { bg: '#1a1a1a', border: '#c0392b', label: 'ARIA'           },
}
