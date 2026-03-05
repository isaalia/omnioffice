# OmniOffice — Complete Product Specification
**Version 1.0 | March 2026**  
**Owner: Agyeman Enterprises / Inov8if LLC**  
**Domains: omnioffice.co | omnioffice.app | omnioffice.io**  
**Entity: Inov8if LLC**  
**Status: Pre-development specification — North Star Document**

---

## The One Sentence

> OmniOffice is a perpetual intelligent canvas where every office capability — documents, spreadsheets, presentations, databases, communications, diagrams, project management, publishing, and AI — exists as a native tool you place and use in place, with full text reflow around every object, and exports to any format on demand.

---

## The Problem Nobody Has Solved

Every office suite ever built forces you to choose your tool before you work.
Need to write? Open Word. Need to calculate? Open Excel. Need to present? Open PowerPoint.

The result: content trapped in silos, exports that break layouts, images that destroy reflow, and a working life spent copying between applications.

Word has had broken image reflow since 1989. Everyone has accepted it.
**OmniOffice doesn't.**

---

## Core Principles

```
ONE canvas.          Everything lives here.
INFINITE surface.    No page boundaries while working.
TOOLS come to you.   You never leave the canvas.
REFLOW is native.    Text breathes around everything, always.
EXPORT anything.     PDF, DOCX, PPTX, XLSX, HTML, any format, on demand.
AI is a peer.        Not bolted on. Lives on canvas. Works alongside you.
```

---

## Canvas Architecture

### The Surface
- Infinite canvas by default — no page boundaries while working
- Paginate on export — define page size at export time (A4, Letter, Legal, Tabloid, custom)
- Pages are a print/export concept, not a working concept
- Zoom: 10% (full overview) to 400% (pixel detail)
- Minimap navigator — always visible, always oriented
- Layers: Background, Content, Foreground, Overlay (like InDesign/Illustrator)
- Grid and guides — snap to grid, custom guides, smart alignment
- Rulers — horizontal and vertical, unit-switchable
- Dark mode / Light mode / High contrast — per user
- Full keyboard navigation — every action has a keyboard shortcut
- Touch and stylus support — iPad/tablet native

### The Reflow Engine
The foundational innovation. Every other tool has broken this. OmniOffice does not.

- Every object is a constraint on the text surface
- Text regions are calculated dynamically around all objects
- Object resize → instant text reflow recalculation
- Object move → instant text reflow recalculation
- Multiple objects → text flows through all gaps intelligently
- Magazine-style wrap: square, tight, through, top-bottom, behind, in-front
- Exclusion zones: manually define areas text cannot enter
- Anchor options: fixed position, inline with text, relative to page, relative to margin

### Object Model
Every element is a first-class canvas citizen:
- Position (x, y), size (w, h), rotation, opacity
- Anchor point (9-point or custom)
- Lock (position, size, or both)
- Group (treat multiple objects as one)
- Layer assignment
- Link to other objects (clicking one highlights linked)
- Z-order (send to back, bring to front, precise layer control)
- Nesting (objects can contain objects)
- Named objects — find by name in canvas navigator

### Canvas Navigator
- Thumbnail outline of entire canvas
- Named objects list — click to jump
- Layer panel — show/hide/lock layers
- History panel — full undo/redo tree, not just linear
- Search canvas — find any text, object, or tool instance

---

## TOOL SUITE — COMPLETE FEATURE SPECIFICATION

Every tool is a panel you pull onto the canvas.
Every tool is functional in place.
Every tool reflows text around it.
Every tool saves as part of the single canvas document.

---

### TOOL 1 — WORD PROCESSOR
*Everything Word does. Native. In place.*

**Text & Formatting**
- Full rich text: bold, italic, underline, strikethrough, superscript, subscript
- Font family, size, color, background highlight
- Paragraph styles: Heading 1–6, Body, Caption, Quote, Code, Custom
- Custom style definitions — create, save, apply, share
- Line spacing, paragraph spacing before/after, indentation
- Numbered lists, bulleted lists, nested lists, custom list styles, multilevel lists
- Text alignment: left, center, right, justified, distributed
- Drop caps — first letter or first word
- Text columns: 1–6 columns, custom gutter width, column breaks
- Section breaks, column breaks, page breaks (applied on export)
- Borders and shading — paragraph, page
- Text direction: left-to-right, right-to-left, vertical

**Advanced Document Features**
- Track changes — per author, per change type, accept/reject individually or all
- Comments — inline anchored, threaded replies, resolve, reopen, filter by author
- Compare documents — visual diff of two canvas versions
- Document versions — named snapshots, restore any version
- Word count, character count, paragraph count, reading time estimate
- Find and replace — plain text, with regex, with formatting
- Spell check — multi-language, custom dictionary
- Grammar check — AI-powered (Claude/GPT API)
- Thesaurus — right-click any word
- Readability scoring — Flesch-Kincaid, grade level
- Autocorrect — custom rules, smart quotes, fractions, symbols
- AutoText snippets — save and reuse text blocks
- Mail merge — pull data from embedded database tool or external CSV
- Table of contents — auto-generated from heading styles, clickable in doc
- Table of figures — auto-generated
- Index — mark entries manually or AI-assisted, auto-generate
- Footnotes and endnotes — numbered, lettered, or custom symbols
- Cross-references — link to any heading, figure, table, bookmark
- Bookmarks — named locations, link to from anywhere
- Watermarks — text or image, opacity control
- Headers and footers — different on first page, odd/even pages, per section
- Page numbers — Roman, Arabic, letters, custom format, custom start value
- Line numbers — continuous, per page, per section
- Widow and orphan control
- Keep with next, keep lines together paragraph options
- Hyphenation — automatic or manual

---

### TOOL 2 — SPREADSHEET
*Everything Excel does. Live calculations. In place.*

**Cell Operations**
- Full formula engine — HyperFormula (Excel-compatible, MIT license)
- All Excel functions: SUM, AVERAGE, VLOOKUP, XLOOKUP, INDEX/MATCH, IF, IFS, COUNTIF, SUMIF, PIVOT, and 400+ more
- Array formulas
- Dynamic arrays — FILTER, SORT, SORTBY, UNIQUE, SEQUENCE, RANDARRAY
- Structured references (Table[Column] syntax)
- Cell formatting: number, currency, percentage, date, time, text, custom format
- Conditional formatting — rules-based, color scales, data bars, icon sets
- Data validation — dropdown lists, number ranges, date ranges, custom formulas
- Cell comments and notes
- Named ranges and named formulas
- Freeze rows/columns
- Split view — view two parts of sheet simultaneously

**Data Operations**
- Sort — single or multi-level, custom sort order
- Filter — AutoFilter, advanced filter, filter by color
- Remove duplicates
- Text to columns
- Flash Fill — pattern-based auto-fill
- Data consolidation
- What-if analysis: Goal Seek, Scenario Manager, Data Tables
- Solver (optimization)
- Group and outline rows/columns
- Subtotals

**Pivot Tables**
- Full pivot table creation from any data range
- Drag-and-drop field assignment
- Calculated fields and items
- Pivot charts linked to pivot tables
- Slicer controls — visual filter buttons
- Timeline controls — date-based filtering

**Charts (all types, embedded in canvas)**
- Column, bar, line, area, pie, donut, scatter, bubble
- Stock (OHLC), surface, radar, treemap, sunburst, waterfall, funnel, histogram, box plot, map
- Combo charts — multiple chart types on one axis
- Sparklines — mini charts in cells
- All chart elements editable: title, axes, gridlines, data labels, legend, trendlines, error bars
- Chart animations on data change

**Multiple Sheets**
- Multiple sheets per spreadsheet tool instance
- Sheet navigation tabs
- Sheet-level protection
- Cross-sheet references
- Sheet templates

---

### TOOL 3 — PRESENTATION
*Everything PowerPoint does. Slides live on canvas.*

**Slide Operations**
- Slide panel — thumbnail navigator, drag to reorder
- Slide layouts — title, content, two-column, blank, custom
- Slide masters — define once, apply everywhere
- Themes — color palette, font pair, background
- Slide size: standard (4:3), widescreen (16:9), custom
- Presenter view — notes visible to presenter only
- Slide transitions: fade, push, wipe, zoom, morph, and more
- Transition timing and triggers
- Slide animations — entrance, emphasis, exit, motion path
- Animation pane — sequence, timing, trigger control
- Looping slideshow mode
- Auto-advance timing

**Presentation Objects**
- All canvas objects available: text, images, shapes, tables, charts, video, audio
- SmartArt equivalents — process, hierarchy, cycle, relationship diagrams
- Embedded live spreadsheet on a slide (data updates live)
- Embedded live diagram on a slide
- Speaker notes — rich text, per slide
- Slide numbers, date, footer fields

**Presenting**
- Full-screen presentation mode
- Laser pointer tool during presentation
- Draw/annotate during presentation — saved or discarded
- Remote control support (clicker devices)
- Export to video (MP4) with transitions and animations
- Export to PDF with or without notes
- Export to PPTX

---

### TOOL 4 — DATABASE
*Everything Access does. Queries, forms, reports. In place.*

**Tables**
- Define tables with typed columns: text, number, currency, date, boolean, attachment, lookup
- Primary keys, foreign keys, relationships
- Cascade update/delete rules
- Field validation rules
- Default values
- Required fields

**Queries**
- Query builder — visual drag-and-drop, no SQL required
- SQL view — write raw SQL for power users
- Select, insert, update, delete queries
- Parameterized queries
- Saved queries — reuse across canvas
- Query results display inline as a table tool

**Forms**
- Visual form designer — drag fields onto form layout
- Form controls: text input, dropdown, checkbox, radio, date picker, file upload, signature
- Form validation rules
- Conditional visibility — show/hide fields based on values
- Form themes
- Forms can be published as standalone fillable documents
- Form submissions saved to database table automatically

**Reports**
- Report designer — define layout, grouping, sorting
- Aggregate functions in reports: sum, count, average, min, max
- Subreports
- Export reports to PDF, Excel

**Relationships**
- Visual relationship diagram between tables
- One-to-one, one-to-many, many-to-many
- Referential integrity enforcement

---

### TOOL 5 — COMMUNICATIONS (Teams/Slack equivalent)
*Messaging, channels, calls. Pulled onto canvas as a panel.*

**Messaging**
- Channels — public, private, topic-based
- Direct messages — 1:1 and group
- Threaded replies
- Message reactions (emoji)
- Message editing and deletion
- @mentions — notify specific people
- #channel links
- Message search — full text across all channels
- Pinned messages
- Message bookmarks
- Rich text in messages — bold, code blocks, bullet lists
- File sharing in messages — files attach and preview inline
- Link previews — URLs unfurl to show title, description, image
- Message scheduling — send later
- Do not disturb status
- Custom status messages
- Presence indicators — online, away, busy, offline

**Calls**
- Voice calls — 1:1 and group
- Video calls — 1:1 and group
- Screen sharing — full screen or specific window
- Canvas sharing — show your OmniOffice canvas to call participants
- Call recording
- Transcription — AI-generated, saved to canvas
- Raise hand in group calls
- Background blur/replace

**Notifications**
- Desktop notifications
- Mobile push notifications
- Email digest — daily or weekly summary
- Notification preferences per channel

---

### TOOL 6 — CITATION & BIBLIOGRAPHY (EndNote equivalent)
*Research, cite, and bibliography. Automatic. In place.*

**Reference Management**
- Reference library — store unlimited references
- Reference types: journal article, book, book chapter, website, conference paper, thesis, patent, report, dataset, and more
- Import from PubMed, CrossRef, Google Scholar, DOI lookup, ISBN lookup
- Import from RIS, BibTeX, EndNote XML, Zotero RDF
- Duplicate detection and merge
- Full-text PDF attachment to references
- PDF annotation — highlight and note directly in attached PDF
- Reference search — full text across all fields
- Reference groups and subgroups — organize by project, topic, author
- Smart groups — auto-populate based on rules
- Tag references

**In-Document Citation**
- Insert citation — search library, click to insert
- Citation appears inline as formatted citation
- Multiple references in one citation
- Page numbers within citation
- Citation preview — hover to see full reference
- Citation styles — APA, MLA, Chicago, Harvard, Vancouver, IEEE, AMA, and 10,000+ CSL styles
- Switch citation style — entire document reformats instantly
- Ibid, op cit handling — automatic
- Footnote citations — auto-converted from inline if style requires

**Bibliography**
- Auto-generated from cited references
- Updates automatically as citations are added/removed
- Appears as a live tool on canvas — moves and reflows like any object
- Annotation bibliography option — add notes to each reference
- Sort order: alphabetical, citation order, chronological

**Research Tools**
- PubMed search — search directly from citation tool panel
- DOI resolver — paste DOI, get full reference
- AI-assisted citation — paste a sentence, AI finds the reference
- Plagiarism-adjacent check — highlights uncited factual claims

---

### TOOL 7 — NOTEBOOK (OneNote equivalent)
*The canvas IS the notebook. But notebook tool for structured notes.*

**Note Structure**
- Notebooks → Sections → Pages hierarchy
- Unlimited nesting depth
- Drag pages between sections
- Page templates
- Quick notes — capture without organizing, sort later
- Page versions — see how a page evolved

**Freeform Input**
- Type anywhere on a notebook page — no text boxes needed
- Ink/stylus drawing — pressure sensitive
- Handwriting recognition — convert ink to text
- Shape recognition — draw a circle, get a perfect circle
- Math recognition — write equations by hand, get formatted math
- Audio recording — embedded in page, timestamped
- Click timestamp to jump to that moment in recording
- Transcription of audio — AI-generated
- Screen clipping — capture any area of screen, paste to page
- Web clipper — clip articles, save to notebook

**Organization**
- Tags — mark any content: to-do, important, question, definition
- Tag summary — see all tagged items across all notebooks
- Full-text search across all notebooks
- Linked notes — take notes while viewing another canvas document, link automatically

---

### TOOL 8 — EMAIL & CALENDAR (Outlook equivalent)
*Email and calendar as canvas tools. Pull and use in place.*

**Email**
- Connect multiple accounts: IMAP/SMTP, Gmail, Microsoft 365, Exchange
- Inbox, sent, drafts, trash, spam, custom folders
- Unified inbox — all accounts in one view
- Conversation threading
- Rich text compose — all canvas formatting tools available
- Attachments — drag from canvas directly
- Embed canvas content in email — screenshot or live link
- Email templates — save and reuse
- Schedule send
- Undo send — configurable window
- Read receipts
- Follow-up flags and reminders
- Rules and filters — auto-sort, auto-label, auto-forward
- Search — full text, by sender, by date, by attachment
- Snooze emails — hide until later
- Priority inbox — AI-sorted by importance
- Focused inbox — separate important from newsletters
- Labels and tags
- Email signature — rich text, per account
- Out of office — set dates, custom message, auto-reply

**Calendar**
- Day, week, month, year views
- Multiple calendars — color coded
- Connect Google Calendar, Microsoft 365, iCal
- Create events — title, time, location, description, attendees
- Recurring events — daily, weekly, monthly, yearly, custom
- Event invitations — send and receive
- Availability check — see attendee free/busy before scheduling
- Time zone support — per event
- Meeting rooms — if connected to Exchange/M365
- Reminders — email, popup, at custom intervals
- Calendar sharing
- Event attachments — link to canvas documents
- Task integration — tasks appear on calendar
- Time blocking — drag tasks onto calendar to schedule

---

### TOOL 9 — PROJECT MANAGEMENT (MS Project equivalent)
*Gantt charts, timelines, task boards. In place.*

**Task Management**
- Task list — title, description, assignee, due date, priority, status, tags
- Subtasks — unlimited depth
- Task dependencies — finish-to-start, start-to-start, finish-to-finish, start-to-finish
- Lag and lead time on dependencies
- Critical path calculation and highlight
- Milestones
- Recurring tasks
- Task templates
- Bulk edit tasks

**Views**
- Gantt chart — drag bars to adjust dates, dependencies drawn as lines
- Kanban board — columns by status, drag to move
- Calendar view — tasks on calendar
- Timeline view — roadmap-style
- List view — spreadsheet-style
- Workload view — who has too much, who has capacity
- Switch views without losing data

**Resources**
- Resource list — people, equipment, materials
- Assign resources to tasks
- Resource calendar — availability and vacation
- Resource leveling — auto-resolve over-allocation
- Cost tracking — hourly rate, fixed cost per task
- Budget vs actual

**Reporting**
- Burndown chart — auto-generated
- Velocity chart
- Status report — AI-generated summary of project health
- Export to PDF, Excel

**Integrations on Canvas**
- Gantt chart appears as reflow-respecting object
- Link tasks to canvas documents — task links to research paper section
- Embed project status widget anywhere on canvas

---

### TOOL 10 — DIAGRAMMING (Visio equivalent)
*Flowcharts, org charts, network diagrams, floor plans. In place.*

**Diagram Types**
- Flowcharts — process flows, decision trees
- Org charts — hierarchy, matrix
- Network diagrams — IT infrastructure, topology
- ER diagrams — database entity relationships
- UML diagrams — class, sequence, use case, activity, state
- BPMN — business process notation
- Mind maps — radial, tree, fishbone
- Value stream maps
- Floor plans — rooms, furniture, dimensions
- Electrical schematics
- Swimlane diagrams
- Timeline diagrams
- Venn diagrams
- Wireframes / UI mockups

**Drawing Tools**
- Shape libraries — 1000+ shapes per diagram type
- Custom shapes — draw with pen tool, save to library
- Connectors — smart routing, auto-route around shapes
- Connector styles — straight, curved, elbow, custom
- Arrowheads — 50+ styles
- Shape data — attach properties to any shape
- Shape search
- Alignment and distribution tools
- Auto-layout — DAG, tree, circular, force-directed
- Layers in diagrams
- Group shapes
- Container shapes — shapes that contain other shapes

**Diagram Canvas Integration**
- Diagram reflows text around it like any other object
- Diagram data links to spreadsheet tool — org chart from data
- Click shape to navigate to linked document section
- Embed diagram in presentation slides

---

### TOOL 11 — PDF & FORMS
*View, create, annotate, fill, sign. In place.*

**PDF Viewer**
- Render any PDF natively on canvas
- Zoom, pan, search within PDF
- PDF thumbnail navigator
- Bookmark pages

**PDF Annotation**
- Highlight — multiple colors
- Underline, strikethrough
- Sticky notes — anchored to text or position
- Freehand drawing on PDF
- Text boxes on PDF
- Stamps — approved, draft, confidential, custom
- Shapes on PDF
- Redaction — permanently remove content
- Compare two PDFs — visual diff

**Form Fill**
- Detect form fields in PDF automatically
- Fill text fields, checkboxes, radio buttons, dropdowns
- Digital signature — draw, type, or upload image
- Date fields
- Save filled form
- Submit form to URL

**PDF Creation**
- Export any canvas content to PDF
- Set page size, orientation, margins at export
- Include/exclude layers
- Flatten annotations option
- PDF/A archival format option
- Password protection — open password, permissions password
- Permissions — restrict printing, copying, editing

**Form Builder**
- Build forms from scratch (also in Database tool)
- Publish as standalone fillable PDF
- Publish as web form
- Responses collected into database tool automatically
- Form analytics — completion rate, time to complete, drop-off fields

---

### TOOL 12 — PUBLISHER / PAGE LAYOUT
*The canvas IS Publisher. But tool for precise layout work.*

**Layout**
- Master pages — define repeating elements
- Facing pages — left/right page spreads
- Bleeds, slugs, crop marks for print
- Precise object positioning — X/Y coordinates, exact dimensions
- Text frames — linked text frames that flow between
- Image frames — placeholder frames for consistent layout
- Color management — CMYK, RGB, Pantone
- Print-ready export — PDF/X-1a, PDF/X-4

**Typography (Extended)**
- OpenType features — ligatures, alternate characters, swashes, small caps
- Optical margin alignment
- Baseline grid snap
- Vertical text alignment in frames
- Text on a path — text that follows a curve or shape
- Text wrap refinement — per-object, per-paragraph

**Assets**
- Asset panel — colors, fonts, styles, graphics, saved for document
- Brand kit — define brand colors, fonts, logos, apply across document
- Stock image search — built-in (Unsplash, Pexels integration)
- Icon library — 10,000+ icons searchable
- QR code generator — placed as object, updates if URL changes

---

### TOOL 13 — AI TOOL
*A peer on the canvas. Not a feature. A collaborator.*

**Canvas Presence**
- AI panel opens as a tool on canvas — same as any other tool
- Persistent conversation per document
- AI sees the entire canvas context
- AI knows what is selected, what is near the cursor
- AI knows what tools are active

**Canvas Actions**
- Write text directly to canvas
- Create and populate any tool (spreadsheet, table, diagram, slide)
- Move and resize objects on instruction
- Find and replace across canvas
- Summarize selected content
- Expand selected content
- Rewrite selected content in different tone/style
- Translate selected content
- Format selected content per instructions
- Generate chart from selected data
- Generate diagram from selected text description
- Generate slides from selected outline

**Research & Writing**
- Find citations for selected factual claims
- Suggest references from PubMed/CrossRef for selected text
- Draft literature review from reference library
- Summarize attached PDFs
- Compare multiple documents
- Generate executive summary
- Generate meeting agenda from notes
- Generate email from bullet points
- Answer questions about canvas content

**Intelligence**
- Multi-model: Claude API (primary), GPT-4 API (fallback)
- Model selection — user can choose which model
- JARVIS routing — sensitive/HIPAA documents route through JARVIS locally
- Context window management — handles large documents automatically
- Conversation memory — remembers earlier in same document session
- Custom instructions — define AI behavior per document or globally

---

## COLLABORATION

### Real-Time Multiplayer
- Multiple users on same canvas simultaneously
- Conflict-free concurrent editing (CRDT via Yjs)
- Changes appear in real time — no refresh needed

### Presence Awareness
- See every collaborator's cursor on canvas — color coded
- See their name tag following their cursor
- See what they have selected (highlighted in their color)
- See what tool they are working in
- See their status: active, idle, away
- Collaborator list panel — who is on canvas right now
- Click collaborator name — jump to their location on canvas
- Follow mode — your view follows another collaborator

### Permissions
- Owner, Editor, Commenter, Viewer roles
- Per-object permissions — lock specific areas from specific roles
- Guest access — time-limited, no account required
- Share by link — view only or edit
- Organization sharing — everyone in org gets access

### Async Collaboration
- Comments — anchor to any object, any text selection, any position
- Threaded comment replies
- @mention in comments — notify specific people
- Resolve comments — archive when addressed
- Comment history — see resolved comments
- Suggestions mode — proposed edits, accept/reject like Track Changes
- Version history — named versions, restore any point, compare versions
- Activity feed — log of all changes, by whom, when

---

## FILE FORMAT & STORAGE

### Native Format
- `.omni` — OmniOffice native format
- Single file contains everything: all tools, all content, all versions, all comments
- JSON-based internally — inspectable, recoverable
- Compressed — large canvases remain small files
- Encrypted at rest option — password-protected `.omni` files

### Import
- `.docx` — Microsoft Word (full fidelity)
- `.xlsx` — Microsoft Excel (full fidelity including formulas)
- `.pptx` — Microsoft PowerPoint (full fidelity)
- `.accdb` / `.mdb` — Microsoft Access (tables and queries)
- `.pdf` — render and annotate
- `.rtf` — rich text
- `.odt`, `.ods`, `.odp` — OpenDocument formats
- `.md` — Markdown
- `.html` — web pages
- `.csv` — spreadsheet data
- `.jpg`, `.png`, `.gif`, `.svg`, `.webp` — images
- `.mp3`, `.wav`, `.m4a`, `.ogg` — audio
- `.mp4`, `.mov`, `.webm` — video
- `.ris`, `.bib` — citation formats
- `.vsdx` — Visio diagrams
- `.mpp` — Microsoft Project files

### The .omni File
`.omni` is the master source file — the RAW format of your work.
Everything is preserved. Nothing is lost. Every export is a rendered output from this single truth.

```
.omni source
├── → .docx  (the prose layer)
├── → .xlsx  (the data layer)
├── → .pptx  (the slides layer)
├── → .pdf   (the print layer)
├── → .csv   (the raw data)
├── → .epub  (the book layer)
├── → .html  (the web layer)
└── → .mp4   (the video layer)
```

Each export renders only the relevant layer — `.docx` ignores spreadsheet tools, `.xlsx` ignores prose, `.pptx` ignores database tools. The source loses nothing.

### Export Formats
- `.pdf` — full document, slides, report, form, or selection
- `.docx` — Word-compatible
- `.xlsx` — Excel-compatible
- `.pptx` — PowerPoint-compatible
- `.html` — web-ready
- `.md` — Markdown
- `.rtf` — rich text
- `.txt` — plain text
- `.csv` — data export
- `.png` / `.svg` — canvas as image
- `.epub` — e-book (for Inkwell Publishing integration)
- `.mp4` — presentation as video
- Print — direct to printer with full print dialog

### Selective Export
Every export dialog offers full control over what gets rendered:

- **Entire canvas** — everything, paginated at export time
- **Selected objects only** — export only what is highlighted
- **By layer** — export content layer only, background only, etc.
- **By page range** — pages 1–5, odd pages, even pages, custom range
- **By tool instance** — right-click any spreadsheet tool → Export as .xlsx
- **By section** — named sections of the canvas exported independently
- **Exclude tools** — export prose only, exclude all embedded spreadsheets/diagrams
- **Flatten** — merge all layers into single output (PDF, image)
- **Package** — export canvas + all linked files as a single folder

---

## OUTPUTS & PUBLISHING

### Document Types (export profiles)
- Research paper — academic formatting, citations, bibliography
- Business report — executive summary, sections, page numbers
- Presentation deck — slides output
- Invoice / proposal — professional layout
- Newsletter — multi-column, publisher style
- Book / manuscript — Inkwell Publishing ready
- Form — fillable PDF
- Poster — large format print
- Web page — HTML export
- Email — HTML email export

### Publishing
- Publish to web — shareable URL, view in browser, no account needed
- Embed in website — iframe embed code
- Publish to Inkwell — direct integration with Inkwell Publishing platform
- Publish to TLS/SVA — direct integration with learning platforms
- Version publishing — publish specific named version, update later

---

## PLATFORM DELIVERY

### Web App (primary)
- Next.js App Router
- Progressive Web App — installable from browser
- Offline mode — cached canvas, sync when reconnected
- Works in Chrome, Firefox, Safari, Edge

### Desktop App
- Electron wrapper around web app
- Native file system access — open/save `.omni` files locally
- Native menus and keyboard shortcuts
- Auto-update
- Windows, macOS, Linux

### Mobile App
- Capacitor wrapper — iOS and Android
- View and comment on any canvas
- Light editing — text, comments, approvals
- Capture mode — photo, audio, sketch → sends to canvas
- Notifications — comments, mentions, task assignments

---

## TECHNICAL ARCHITECTURE

### Frontend
- Next.js App Router (web)
- React
- Canvas rendering: Custom layout engine + CSS constraint solver
- Real-time: Yjs CRDT for conflict-free collaboration
- Formula engine: HyperFormula (Excel-compatible, MIT license)
- Diagram rendering: Custom SVG engine
- PDF rendering: PDF.js
- Rich text: Custom (not ProseMirror — reflow requires full custom engine)

### Backend
- Next.js API routes
- PostgreSQL (self-hosted Supabase on Hetzner)
- Supabase Auth — magic link, OAuth (Google, Microsoft, Apple)
- Supabase Storage — file attachments, media assets
- Supabase Realtime — presence awareness, live cursors
- WebSockets — real-time canvas sync

### AI Layer
- Claude API (Anthropic) — primary
- GPT-4 API (OpenAI) — fallback
- JARVIS routing — HIPAA-sensitive content stays local
- Streaming responses — AI text appears character by character on canvas

### Infrastructure
- Deployed on Hetzner AX52 (Finland) via Coolify
- Self-hosted Supabase for all data
- Backblaze B2 for file storage backup
- Cloudflare for CDN and DDoS protection
- Tailscale for private network access

### File Storage
- Canvas files in Supabase Storage
- Media assets (images, audio, video) in Supabase Storage
- PDF attachments in Supabase Storage
- Backblaze B2 backup of all storage daily

---

## PRICING MODEL (Proposed)

| Tier | Price | Includes |
|------|-------|---------|
| **Solo** | $12/mo | 1 user, unlimited canvases, 10GB storage, all tools |
| **Pro** | $24/mo | 1 user, unlimited everything, 100GB, AI included |
| **Team** | $18/user/mo | Up to 50 users, shared canvases, admin controls |
| **Enterprise** | Custom | Unlimited users, SSO, self-hosted option, SLA |
| **Inkwell Add-on** | $6/mo | Direct publish to Inkwell, book formatting templates |
| **HIPAA Add-on** | $30/mo | Encrypted canvases, audit log, BAA available |

---

## INTEGRATION ECOSYSTEM

### Native Integrations (built-in)
- PubMed — citation search
- CrossRef — DOI resolution
- Google Scholar — reference import
- Unsplash / Pexels — stock images
- Google Calendar / Microsoft 365 Calendar — calendar sync
- Gmail / Microsoft 365 Mail — email tool connection
- JARVIS (Agyeman Enterprises) — AI routing
- GHEXIT (Agyeman Enterprises) — communications backbone
- NEXUS (Agyeman Enterprises) — business OS integration
- Inkwell Publishing — direct publish
- TLS / SVA — learning platform publish

### API
- REST API — full canvas CRUD
- Webhooks — events trigger external actions
- OAuth 2.0 — third parties can embed OmniOffice canvas
- Embed SDK — drop OmniOffice canvas into any web app

---

## SECURITY & COMPLIANCE

- SOC 2 Type II (target Year 2)
- HIPAA compliant tier — BAA available
- GDPR compliant — EU data stays in EU (Hetzner Finland/Germany)
- End-to-end encryption option for sensitive canvases
- Audit log — every action logged with timestamp and user
- Two-factor authentication — TOTP, SMS, hardware key
- SSO — SAML 2.0, OIDC (Enterprise tier)
- Role-based access control
- IP allowlisting (Enterprise)
- Data residency selection — EU, US
- Penetration testing — annual third-party

---

## BUILD ROADMAP

| Phase | Milestone | Duration | Deliverable |
|-------|-----------|----------|-------------|
| **0** | Infrastructure | Month 1 | Hetzner + Coolify + Supabase live |
| **1** | Layout engine proof of concept | Months 2–4 | Reflow works with text + one object type |
| **2** | Core canvas + Word tool | Months 5–7 | Full word processor on infinite canvas |
| **3** | Spreadsheet + PDF tools | Months 8–10 | HyperFormula live in canvas, PDF render |
| **4** | Presentation + Export | Months 11–13 | Slides on canvas, PDF/PPTX/DOCX export |
| **5** | AI tool + Collaboration | Months 14–16 | AI peer on canvas, multiplayer presence |
| **6** | Database + Forms + Citations | Months 17–20 | Access equivalent, EndNote equivalent |
| **7** | Communications + Calendar + Email | Months 21–23 | Teams/Outlook equivalent tools |
| **8** | Diagrams + Project + Publisher | Months 24–27 | Visio + Project + Publisher equivalents |
| **9** | Mobile + Desktop apps | Months 28–30 | Electron + Capacitor wrappers |
| **10** | Polish + SOC 2 + Launch | Months 31–33 | Public launch, pricing live |

**Total to full v1.0: ~33 months at bootstrapped pace**  
**Usable product (Word + Spreadsheet + PDF + AI): Month 13**

---

## COMPETITIVE POSITIONING

| Product | What they are | What they miss |
|---------|--------------|----------------|
| Microsoft 365 | Collection of separate apps | No unified canvas, broken reflow |
| Google Workspace | Web-based separate apps | No unified canvas, limited formatting |
| Notion | Block-based notes/DB hybrid | No real calculations, no reflow, weak export |
| Coda | Doc/spreadsheet hybrid | Still siloed, limited layout |
| Apple iWork | Beautiful but limited | No DB, no diagrams, Apple-only |
| **OmniOffice** | **Everything, one canvas, reflow solved** | **Nothing** |

---

## THE MOAT

1. **Reflow engine** — 30 years unsolved. We solve it. First mover advantage.
2. **Compound document native** — not integrated, not embedded, truly native
3. **AI as canvas peer** — not a sidebar, not a button, a collaborator with canvas access
4. **Single file format** — your entire work product in one `.omni` file
5. **Self-hostable** — enterprises with data sovereignty needs, healthcare (HIPAA), government

---

*Document maintained by Agyeman Enterprises Engineering*  
*OmniOffice is a product of Inov8if LLC, an Agyeman Enterprises company*  
*Next review: When Phase 1 infrastructure is complete*

---

## UX COMPATIBILITY & PLATFORM PARITY

### The Two Laws of Unseating Incumbents

**Law 1 — Zero Learning Curve**
Users have 20+ years of muscle memory in Word, Excel, and PowerPoint. If they have to relearn anything, they won't switch. OmniOffice must feel like home from minute one.

**Law 2 — Works Where They Work**
If OmniOffice isn't on the device they're using, they stay with Office. Every platform must feel native, not ported.

---

### Keyboard Shortcut Parity — Non-Negotiable

Every Microsoft Office shortcut works identically in OmniOffice. No exceptions.

| Action | Shortcut | Must match |
|--------|----------|-----------|
| Bold | Ctrl+B | ✅ Identical |
| Italic | Ctrl+I | ✅ Identical |
| Underline | Ctrl+U | ✅ Identical |
| Undo | Ctrl+Z | ✅ Identical |
| Redo | Ctrl+Y / Ctrl+Shift+Z | ✅ Identical |
| Save | Ctrl+S | ✅ Identical |
| Save As | Ctrl+Shift+S | ✅ Identical |
| Print | Ctrl+P | ✅ Identical |
| Find | Ctrl+F | ✅ Identical |
| Find & Replace | Ctrl+H | ✅ Identical |
| Select All | Ctrl+A | ✅ Identical |
| Copy | Ctrl+C | ✅ Identical |
| Cut | Ctrl+X | ✅ Identical |
| Paste | Ctrl+V | ✅ Identical |
| Paste Special | Ctrl+Shift+V | ✅ Identical |
| New Document | Ctrl+N | ✅ Identical |
| Open | Ctrl+O | ✅ Identical |
| Close | Ctrl+W | ✅ Identical |
| Zoom In | Ctrl++ | ✅ Identical |
| Zoom Out | Ctrl+- | ✅ Identical |
| Heading 1 | Ctrl+Alt+1 | ✅ Identical |
| Heading 2 | Ctrl+Alt+2 | ✅ Identical |
| Normal style | Ctrl+Alt+0 | ✅ Identical |
| Insert hyperlink | Ctrl+K | ✅ Identical |
| Spell check | F7 | ✅ Identical |
| Next cell (spreadsheet) | Tab | ✅ Identical |
| Formula bar (spreadsheet) | F2 | ✅ Identical |
| Sum formula | Alt+= | ✅ Identical |
| New slide (presentation) | Ctrl+M | ✅ Identical |
| Start presentation | F5 | ✅ Identical |
| All Mac equivalents | Cmd replaces Ctrl | ✅ Identical |

---

### Mouse & Touch Behavior Parity

| Behavior | Must match Office |
|----------|-----------------|
| Double-click text | Enter edit mode immediately |
| Single click object | Select it |
| Drag object | Move it |
| Drag corner handle | Resize it |
| Right-click | Context menu — same options, same order as Office |
| Scroll wheel | Scroll document vertically |
| Ctrl+Scroll | Zoom in/out |
| Shift+Click | Add to selection |
| Click empty canvas | Deselect all |
| Double-click word | Select word |
| Triple-click | Select paragraph |
| Drag to select | Text selection highlight |

---

### Right-Click Context Menus — Parity

**Text selection right-click:**
Cut, Copy, Paste, Paste Special, Font, Paragraph, Styles, Link, Comment, Synonyms, Translate, AI Assist

**Object right-click:**
Cut, Copy, Paste, Delete, Group, Order (Bring Forward/Send Back), Wrap Text, Size & Position, Link, AI Assist

**Spreadsheet cell right-click:**
Cut, Copy, Paste, Paste Special, Insert, Delete, Clear Contents, Format Cells, Define Name, Hyperlink, Comment, AI Assist

**These menus must feel identical to Office.** Users should not notice they are in a different product.

---

### Toolbar & UI Familiarity

- **Ribbon mode** — optional classic ribbon layout identical to Microsoft Office
- **Compact mode** — modern minimal toolbar (default for new users)
- **User can switch modes** — Settings → Interface → Ribbon / Compact
- Font selector — same position, same behavior as Word
- Font size selector — same position, same behavior
- Formatting buttons — B, I, U in same position
- Paragraph alignment buttons — same position
- Style selector — same position, same behavior
- Zoom control — bottom right corner (same as Office)
- Page view toggle — bottom right (same as Office)
- Status bar — bottom of screen, word count, zoom, view modes (same as Office)

---

### File Compatibility — Open Anything, Save Anything

Users must be able to open their existing files without friction:

| File type | Behavior |
|-----------|----------|
| .docx | Opens directly, full fidelity, no conversion dialog |
| .xlsx | Opens directly, all formulas live and calculated |
| .pptx | Opens directly, all slides and animations |
| .pdf | Opens directly, renders and annotates |
| .csv | Opens as spreadsheet tool on canvas |
| .txt / .md | Opens as text on canvas |
| .omni | Native — instant open |

**Save As must offer all formats first, .omni as one option among many** — not forced on users. They can work entirely in .docx if they prefer and never touch .omni.

---

### Platform Parity — Works Everywhere

#### Desktop (Windows / macOS / Linux) via Electron
- Full feature parity with web version
- Native file system — File → Open opens OS file picker
- Native menus — File, Edit, View, Insert, Format, Tools, Window, Help
- Native keyboard shortcuts including Mac Cmd equivalents
- Native drag-and-drop from OS file system onto canvas
- Native print dialog
- Works fully offline
- Auto-updates silently in background
- Window management — multiple documents in tabs or separate windows
- Retina/HiDPI display support

#### Web App (Browser)
- Chrome, Firefox, Safari, Edge — full feature parity
- Progressive Web App — installable from browser (Add to Home Screen)
- Offline mode — Service Worker caches app and last-opened documents
- Sync on reconnect — changes made offline sync automatically
- No plugin required — pure web, no Java, no Flash, no extensions needed
- Works on Chromebook natively

#### iPad / Tablet
- Touch-optimized — all tap targets minimum 44×44px
- Apple Pencil / stylus support — pressure sensitive drawing and annotation
- Split view — OmniOffice alongside another app
- Drag and drop from Files app onto canvas
- Keyboard support — full keyboard shortcut parity when external keyboard attached
- Trackpad support — same as desktop mouse behavior
- Landscape and portrait modes
- iPadOS Files integration — .omni files appear in Files app

#### iPhone / Android Phone
- View any canvas — full render
- Comment and annotate
- Approve and sign
- Light editing — text changes, quick replies
- Capture mode — photograph → sends to canvas, voice note → sends to canvas, sketch → sends to canvas
- Notifications — mentions, comments, task assignments, approvals needed
- Offline view — last-synced version available without internet
- Share sheet integration — share .omni files from any app

---

### The One Unfamiliar Thing — And Why It's OK

The infinite canvas and reflow behavior is the only experience that differs from Office. This is intentional and the only acceptable deviation because:

1. It is **instantly intuitive** — drag object, text moves. No training required.
2. It is **obviously better** — users feel the improvement in seconds.
3. It is **the reason they switched** — this is the value proposition.

Everything else must be invisible. Users should feel they are using a better version of the tools they already know — not learning something new.

---

### Accessibility

- Full keyboard navigation — every action reachable without mouse
- Screen reader support — ARIA labels on all controls
- High contrast mode — WCAG AA compliant
- Font size scaling — system font size respected
- Color blind modes — alternative color schemes
- Reduced motion mode — respects OS preference
- Focus indicators — visible focus rings on all interactive elements

---

## UX COMPATIBILITY & PLATFORM PARITY

### The Two Laws of Unseating Incumbents

**Law 1 — Zero Learning Curve**
Users have 20 years of muscle memory in Word, Excel, and PowerPoint. OmniOffice must feel like home from minute one. They should not notice they switched — only notice that things work better.

**Law 2 — Works Where They Work**
If OmniOffice is not available where a user works, they stay with Office. Every platform, every context, full functionality.

---

### Keyboard Shortcut Parity
Every Microsoft Office keyboard shortcut works identically in OmniOffice. No exceptions.

| Action | Shortcut | Matches Office |
|--------|----------|---------------|
| Bold | Ctrl+B | ✅ |
| Italic | Ctrl+I | ✅ |
| Underline | Ctrl+U | ✅ |
| Undo | Ctrl+Z | ✅ |
| Redo | Ctrl+Y | ✅ |
| Save | Ctrl+S | ✅ |
| Open | Ctrl+O | ✅ |
| New | Ctrl+N | ✅ |
| Print | Ctrl+P | ✅ |
| Find | Ctrl+F | ✅ |
| Find & Replace | Ctrl+H | ✅ |
| Select All | Ctrl+A | ✅ |
| Copy | Ctrl+C | ✅ |
| Cut | Ctrl+X | ✅ |
| Paste | Ctrl+V | ✅ |
| Paste Special | Ctrl+Alt+V | ✅ |
| Insert hyperlink | Ctrl+K | ✅ |
| Spelling | F7 | ✅ |
| Go to | Ctrl+G | ✅ |
| Zoom in/out | Ctrl+scroll | ✅ |
| New slide (PPT mode) | Ctrl+M | ✅ |
| Insert row (spreadsheet) | Ctrl+Shift++ | ✅ |
| Delete row (spreadsheet) | Ctrl+- | ✅ |
| Format cells (spreadsheet) | Ctrl+1 | ✅ |
| All remaining Office shortcuts | Identical | ✅ |

Mac users: Cmd replaces Ctrl throughout. Identical behavior.

---

### Right-Click Context Menu Parity
Right-click menus match Office option-for-option, in the same order where possible. Users who right-click instinctively get exactly what they expect.

**On text selection:**
- Cut, Copy, Paste, Paste Special
- Font, Paragraph settings
- Bullets and Numbering
- Styles
- Insert Comment
- AI: Rewrite, Summarize, Translate (OmniOffice addition — at bottom, clearly separated)

**On object:**
- Cut, Copy, Paste
- Edit (opens tool in place)
- Format Object
- Size and Position
- Wrap Text options (unique to OmniOffice — this is the reflow control)
- Send to Back, Bring to Front
- Group, Ungroup
- Link, Bookmark
- Export as... (OmniOffice addition)

**On spreadsheet cell:**
- Cut, Copy, Paste, Paste Special
- Insert, Delete
- Format Cells
- Define Name
- Insert Comment
- Quick Analysis (OmniOffice AI addition — at bottom)

---

### Toolbar & UI Parity

**Ribbon option**
- Users can switch between OmniOffice toolbar and a Microsoft Ribbon-style interface
- Ribbon layout matches Office tab structure: Home, Insert, Layout, References, Review, View
- Same icons, same groupings, same tab order
- Ribbon setting persists per user

**Toolbar option (default)**
- Clean floating toolbar — context-sensitive
- Shows relevant tools based on what is selected
- Collapses when not needed

**Status bar**
- Bottom of screen: word count, page number, zoom slider, view toggles
- Identical position and behavior to Word/Excel

**Formula bar**
- Appears above spreadsheet tool when active
- Identical to Excel formula bar: cell reference box + formula input
- Same behavior: click cell shows formula, edit in bar or in cell

---

### File Compatibility

**Open without conversion dialog**
- `.docx` → opens directly, full fidelity, no "converting" message
- `.xlsx` → opens directly, all formulas live, all formatting preserved
- `.pptx` → opens directly, all slides, transitions, animations preserved
- `.pdf` → opens directly for view/annotate
- `.csv` → opens directly as spreadsheet tool
- `.rtf`, `.odt`, `.ods`, `.odp` → opens directly

**Save as Office format**
- Ctrl+S on a document opened from `.docx` → saves back as `.docx` by default
- User is never forced into `.omni` format
- "Save as OmniOffice format" is an option, not a mandate
- First save of a new document → user chooses format, `.omni` is suggested but not forced

**Recent files**
- Same recent files list across web, desktop, mobile
- Pinned files
- Search recent files
- Files opened from local disk remember their location

---

### Platform Parity — Full Feature Matrix

| Feature | Web | Desktop | iOS | Android |
|---------|-----|---------|-----|---------|
| Full canvas editing | ✅ | ✅ | ✅ | ✅ |
| All tool suite | ✅ | ✅ | ✅ | ✅ |
| Keyboard shortcuts | ✅ | ✅ | ✅ (BT keyboard) | ✅ (BT keyboard) |
| Touch/stylus input | ✅ | ✅ | ✅ | ✅ |
| Offline mode | ✅ PWA | ✅ | ✅ | ✅ |
| Local file open/save | ✅ (File API) | ✅ native | ✅ Files app | ✅ Files app |
| Real-time collaboration | ✅ | ✅ | ✅ | ✅ |
| AI tool | ✅ | ✅ | ✅ | ✅ |
| Print | ✅ | ✅ native | ✅ AirPrint | ✅ |
| Export all formats | ✅ | ✅ | ✅ | ✅ |
| External keyboard shortcuts | ✅ | ✅ | ✅ | ✅ |

---

### Touch & Mobile UX

**Touch targets**
- Minimum 44×44px for all interactive elements — Apple HIG standard
- Toolbar buttons sized for finger tap, not mouse click
- No hover-dependent functionality — everything accessible by tap

**Touch gestures**
- Pinch to zoom canvas
- Two-finger pan to scroll canvas
- Double-tap text to edit
- Long-press object to get context menu (replaces right-click)
- Long-press canvas to place new object
- Swipe toolbar to reveal more tools

**Stylus (iPad Pro, Surface, Galaxy Tab)**
- Pressure-sensitive drawing in notebook tool
- Hover preview before placing objects
- Palm rejection
- Stylus barrel button = right-click

**Mobile-specific adaptations**
- Floating toolbar repositions above keyboard when keyboard is open
- Canvas auto-scrolls to keep cursor visible when typing
- Formatting toolbar above keyboard (like iOS native keyboard accessory view)
- Compact mode for phone screens — full canvas, collapsed chrome

---

### Offline Behavior

**What works offline (everything):**
- Full canvas editing
- All tools — word processor, spreadsheet, diagrams, etc.
- Local file open and save
- Export to any format
- AI tool — cached responses for common operations

**What requires connection:**
- Real-time collaboration sync (queued, syncs on reconnect)
- AI tool — live Claude/GPT API calls
- Citation search (PubMed, CrossRef)
- Email and calendar tools
- Cloud file sync

**Sync on reconnect:**
- Offline changes merge automatically via Yjs CRDT
- Conflict resolution — user prompted only if true conflict
- Sync status indicator — always visible, never silent

---

### Performance Standards
Users will not tolerate a slower experience than Office. These are hard performance targets:

| Metric | Target |
|--------|--------|
| App launch (web, cached) | < 1.5 seconds |
| App launch (desktop) | < 2 seconds |
| Keystroke to screen | < 16ms (60fps) |
| Reflow recalculation on drag | < 16ms (60fps) |
| Open 100-page document | < 3 seconds |
| Export 50-page PDF | < 5 seconds |
| Spreadsheet with 100k cells | No lag |
| Collaboration sync latency | < 200ms |

---

### Accessibility
- WCAG 2.1 AA compliance
- Full keyboard navigation — every action reachable without mouse
- Screen reader support — ARIA labels on all canvas objects
- High contrast mode
- Font size scaling — independent of zoom
- Reduced motion option — disables animations
- Color blind modes — deuteranopia, protanopia, tritanopia

---

*Platform parity is not a feature. It is the price of entry.*
*Users will not switch if they have to relearn. They will switch if OmniOffice does everything they know, plus things Office cannot do.*

---

## THE AI TOOL — ARIA (Adaptive Reasoning & Intelligence Agent)

### Philosophy
Every competitor puts AI in a sidebar. You type a prompt, it responds over there, you copy-paste back. That is a 2023 mindset bolted onto a 1990s document model.

ARIA lives on the canvas. It is a named entity with a presence — placed like any other object, but aware of everything around it. It can read the entire canvas. It can reach out and write into text blocks, populate spreadsheets, generate charts, draft tables, restructure content, and move objects. It does not wait to be asked. It observes, suggests, and acts when invited.

ARIA is not a chatbot embedded in a document. It is a collaborator with canvas access.

---

### ARIA on Canvas

**Placement**
ARIA is placed like any tool — drag it onto the canvas from the tool palette, or press A to summon it anywhere. It appears as a distinct panel object with a subtle animated border indicating it is live. You can resize it, move it, dock it to an edge, or float it anywhere.

**Canvas awareness**
ARIA reads the entire canvas at all times. It knows what every object contains — the text in every prose block, the data in every spreadsheet, the structure of every diagram, the slides in every presentation layer. When you ask it a question, it answers in context. "Summarize this document" means the whole canvas. "What does the data show?" means the spreadsheet three objects to the left.

**Canvas actions**
ARIA does not just respond in its own panel. It acts on the canvas directly:
- Writes prose into a text block (streamed, character by character, visibly)
- Populates a spreadsheet with data, formulas, and formatting
- Generates a chart from selected data
- Creates a new tool instance and places it on canvas
- Moves, resizes, or reorganizes objects on request
- Annotates objects with comments
- Fills a citation block from PubMed search
- Drafts a slide sequence in the presentation tool

Every action is undoable. ARIA never acts without a visible trace.

**Conversation model**
ARIA maintains conversation history scoped to the canvas session. It remembers what it wrote, what you changed, what you asked. Multi-turn refinement works naturally: "Make it shorter." "Add a third column for p-values." "Now format this as a clinical summary."

**Invocation modes**
- Natural language in ARIA panel — full conversation
- Inline: select any text → press Cmd+K → type instruction → ARIA rewrites in place
- Object command: right-click any object → AI → choose action (summarize, expand, reformat, translate, critique)
- Canvas command: press A anywhere on empty canvas → type → ARIA creates the appropriate tool and populates it

---

### ARIA Technical Architecture

**Model routing**
- Default: Claude API (Anthropic) — primary intelligence
- Fallback: GPT-4 API — automatic failover if Claude unavailable
- HIPAA mode: JARVIS local inference — no data leaves the device or local network
- Model is transparent to the user — they interact with ARIA, not the underlying model

**Context construction**
Each ARIA request packages:
- Full canvas object manifest (what exists, where, what type)
- Content of all text objects (truncated if > context limit, with summary)
- Content of relevant data objects (spreadsheet ranges, chart data)
- Conversation history (last N turns)
- User instruction
- Canvas action schema (what actions ARIA can take)

**Streaming**
All ARIA responses stream — prose appears word by word, spreadsheet cells populate in sequence, chart renders progressively. No waiting for a complete response before seeing output.

**Action schema**
ARIA communicates canvas actions as structured JSON tool calls, parsed and executed by the canvas engine. The canvas engine is the authority — ARIA requests actions, the engine validates and executes them. ARIA cannot take actions the canvas engine does not permit.

---

### ARIA in HIPAA Mode

When a document is flagged as HIPAA-sensitive (automatic for healthcare workspaces, or manually set), ARIA routes all inference to JARVIS — the local AI stack running on THE BEAST or the Hetzner Germany node. No PHI ever touches a third-party API. ARIA behavior is identical to the user — same interface, same capabilities, same streaming — but the model runs locally.

This is the feature no competitor can offer without a complete infrastructure rebuild. Most are contractually prohibited from HIPAA use. OmniOffice HIPAA mode is on by default for clinical workspaces.

---

## GO-TO-MARKET — THE WEDGE STRATEGY

### The Problem With Attacking Office Head-On
Microsoft Office has 1.2 billion users. 20 years of muscle memory. IT departments that standardized on it a decade ago. You cannot unseat it by being "better at everything." You unseat it by being so obviously superior for one specific use case that a specific group of people cannot justify staying.

That group is clinical researchers and physician-scientists.

---

### The Wedge: Clinical Documentation + Research Workflow

**Who they are**
Physicians who write. Hospitalists, academic clinicians, researchers, department chiefs, medical educators. People who in a single workday: write clinical notes, pull PubMed literature, build data tables, draft presentations for grand rounds, manage project timelines, write grant sections, and correspond with collaborators.

Today they do this across Word, Excel, PowerPoint, Endnote, Outlook, Teams, and a browser with seventeen tabs open. Every transition between tools costs time and breaks thinking.

**What OmniOffice gives them**
One canvas. The clinical note flows around the data table. The literature citations are live — click a reference, the full abstract appears in a panel. The chart updates when the spreadsheet updates. The grand rounds presentation pulls from the same data as the paper. The AI reads all of it and helps write the discussion section.

This is not a feature comparison. It is a different way of doing clinical work.

**Why they switch**
- Academic medical centers pay enormous licensing fees for tools that do not talk to each other
- Clinical researchers are early adopters by training — they evaluate evidence and change practice when evidence is clear
- They have budget authority (grant funds, departmental budgets) — they do not wait for IT approval for a $24/month tool
- Word-of-mouth in academic medicine is fast — grand rounds, journal clubs, department meetings
- The physician-founder story resonates — built by someone who lived the problem

---

### Phase 1 Target: 1,000 Users in Year 1

Not 1 million. Not 100,000. One thousand physicians and clinical researchers who switch completely and cannot imagine going back.

Those 1,000 users:
- Generate $288,000 ARR at Pro pricing ($24/mo)
- Produce the case studies, testimonials, and workflow examples that sell the next 10,000
- Surface the edge cases and missing features that make v2 complete
- Become the community that defends OmniOffice in every academic medicine forum

**Acquisition channels**
- Direct: Clinical conferences (SGIM, CHEST, ACP, SHM) — demo the reflow live, physicians are visual
- Content: "The compound clinical document" — publish in academic medicine blogs, LinkedIn, X
- Community: Academic hospitalist networks, GME program directors (medical education angle)
- Referral: Every user gets a shareable link — colleague signs up, both get 30 days Pro free
- Akua as face: MD/PhD/MBA/MPH Chief Hospitalist who built the tool she always needed

---

### Expansion After Wedge

Once the clinical researcher workflow is owned, expand outward in rings:

**Ring 2 — All academic medicine** (year 2)
Medical students, residents, fellows. They do not pay — free tier. They become the physicians who mandate OmniOffice when they have purchasing authority in five years.

**Ring 3 — Healthcare administration** (year 2-3)
Hospital administrators, quality officers, CMOs. They already live in Word and Excel. OmniOffice + HIPAA tier + the compound document workflow wins them on the operations side.

**Ring 4 — Research broadly** (year 3)
Scientists, academics, think tanks. The citation tool + compound canvas + AI is a natural fit. Same product, different marketing.

**Ring 5 — General knowledge work** (year 4+)
Lawyers, consultants, analysts, writers. This is where you compete with Office directly. By this point you have 100,000 users, SOC 2 Type II, a proven product, and a moat the incumbents cannot replicate.

---

### Pricing for the Wedge

| Tier | Price | Who |
|------|-------|-----|
| Free | $0 | Medical students, residents, tryout |
| Pro | $24/mo | Clinical researchers, physicians |
| HIPAA Pro | $54/mo | Pro + HIPAA tier + BAA + local AI routing |
| Team | $18/user/mo | Department, research group (min 5) |
| HIPAA Team | $38/user/mo | Team + HIPAA + BAA |
| Enterprise | Custom | Health systems, academic medical centers |

The HIPAA surcharge is not punitive — it reflects real infrastructure cost (Hetzner Germany node, JARVIS local inference, BAA administration). And it is still a fraction of what Epic charges for a module.

---

## HIPAA TIER — THE HEALTHCARE VERSION

### Why This Is a Moat

Nobody building a compound document platform or office suite has:
- A physician founder who understands PHI workflows from inside clinical practice
- An existing HIPAA-covered entity structure (OHIMAA umbrella, 9 covered entities)
- Local AI inference infrastructure (JARVIS on Hetzner Germany — air-gapped from third-party APIs)
- A BAA framework already in place
- Clinical credibility to sell into academic medical centers

Google Workspace can sign a BAA. Microsoft can sign a BAA. Neither was designed from the ground up for clinical documentation workflow. OmniOffice HIPAA tier is not Office + compliance checkbox. It is built for clinical work with compliance as a first-class architectural decision.

---

### What the HIPAA Tier Is

**At the infrastructure level**
- All PHI stored on Hetzner Germany node (encrypted volumes, AES-256 at rest)
- All PHI transmitted over TLS 1.3 minimum
- JARVIS local AI — no PHI sent to Claude API or GPT-4 API
- Audit logging — every access, every edit, every export, every AI action logged immutably
- Automatic session timeout — configurable, default 15 minutes idle
- MFA required — no exceptions for HIPAA workspaces
- BAA provided and countersigned before workspace activation

**At the product level**
- HIPAA workspace badge — visible indicator on every canvas in a HIPAA workspace
- PHI detection — ARIA flags potential PHI when it appears in documents (names, DOBs, MRNs, etc.)
- De-identification tool — one-click PHI scrubbing for research exports (HIPAA Safe Harbor method)
- Consent tracking — document patient consent within the canvas, linked to relevant clinical content
- Role-based access — attending, resident, student, administrator — configurable permissions per role
- Export restrictions — HIPAA workspace canvases cannot be exported to unencrypted formats without explicit override
- No third-party integrations that are not HIPAA-compliant

**At the clinical workflow level**
- Clinical note templates — H&P, SOAP, Discharge Summary, Procedure Note — pre-built, customizable
- ARIA in HIPAA mode — reads clinical context, assists with documentation, never phones home
- Literature integration — PubMed search and citation directly from clinical note canvas
- Quality metrics tools — built-in tables for tracking clinical outcomes data
- CME tracker — log continuing medical education activity within OmniOffice

---

### The Academic Medical Center Play

Individual physicians buy Pro or HIPAA Pro. Department chiefs notice. They bring it to the CMO. The CMO sees: one tool replacing Word + Excel + PowerPoint + Endnote + a PHI-compliant document store, at a fraction of the Microsoft enterprise licensing cost.

Enterprise deal structure:
- Per-seat annual contract
- Dedicated Hetzner node (fully isolated tenant) for health systems > 500 seats
- Custom ARIA fine-tuning on institutional clinical documentation style
- Integration with Epic (read-only pull of structured data into canvas) — roadmap item
- 99.9% SLA, dedicated support channel, quarterly business review

---

### The Unfair Advantage Statement

*OmniOffice HIPAA tier was designed by a physician who spent 30 years doing the work it supports. Every clinical template, every ARIA prompt, every PHI workflow reflects lived clinical practice — not a product manager's assumption about what clinicians need.*

*That is not a marketing line. It is an architectural fact.*

---

*AI + Go-to-Market + HIPAA tier added to spec. These three sections are the business.*
