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

## CORE DESIGN LAWS
### These govern every decision in OmniOffice. Every feature, every tool, every interaction is measured against them. If something violates a Core Design Law, it does not ship.

---

### Law 1 — No Walls
**Every capability is available everywhere on the canvas. Always.**

There are no modes. No tool types that gatekeep features. No "you can only cite in a document, not a spreadsheet." No "org charts live in the diagram tool, not the word processor." No "math only works in equation objects."

If a capability exists in OmniOffice, it exists on the entire canvas, in every context, at all times. The user decides what goes where. The application has no opinion about that.

- Boxes and connectors: available in prose, spreadsheets, presentations, clinical notes, anywhere
- Citations: any text field on the canvas — cell, caption, footnote, slide, margin note, callout, anywhere text lives
- Math rendering: any text block, not just designated equation objects
- Charts: generated from any data anywhere, not just from spreadsheet tool data
- Media: any canvas position, any layer, any context
- ARIA: summoned anywhere, acts on anything
- Drawing tools: available in every tool, every context, not a separate mode

Microsoft built separate applications and bolted them together. The walls between them are an accident of corporate history, not a design decision. OmniOffice has one canvas. No walls. Ever.

---

### Law 2 — Data and Display Are Always Separate
**The visual presentation of data never corrupts the data itself.**

Excel's merge cells corrupts sort order, breaks formulas, and destroys structure — because Excel conflated data and display. This is the original sin of spreadsheet design.

In OmniOffice, what you see and what is stored are always independent layers:
- Visual merge never touches the underlying data grid
- Layout changes never alter data structure
- Export formatting never modifies the source canvas
- Display styles are metadata on top of data, never baked into it

You can make anything look like anything. The data underneath is always intact.

---

### Law 3 — The Canvas Is the Master
**The .omni file is the truth. Every export is a downstream render.**

Nothing that happens during export changes the canvas. No export format is treated as authoritative. The .omni file is always the RAW master — every other format is a lossy render of it, like a JPEG from a RAW photo.

This means:
- Export to .docx and the canvas is unchanged
- Open a .docx in OmniOffice and it imports into a canvas — it does not become the master
- Export settings (page size, paper format, citation style) are export parameters, not document parameters
- The canvas never degrades to match an export format's limitations

---

### Law 4 — The Application Never Surprises You
**Degradation is always predictable, always visible, always your choice.**

When something cannot survive an export — a blend mode, a video, a free-placed object — OmniOffice tells you before export, not after. You see exactly what will be lost, exactly why, and exactly what your options are. You are never blocked. You are always informed.

The same applies on the canvas: no silent reformatting, no invisible style changes, no layout shifts you did not request. The canvas does what you tell it. Nothing else.

---

### Law 5 — The File Does the Selling
**Every export carries the canvas with it.**

Every document that leaves OmniOffice is an ambassador. Recipients see a better document than they could make themselves — and they know where it came from. The double-click brings them to the live canvas. They see the original breathing, layered, media playing in place. The file is the pitch. The product sells itself through every artifact it produces.

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

---

## THE LAYOUT MODEL — PAGE EDGE IS THE ONLY LAW

### One Sentence
The page edge is where ink stops. Everything inside it is yours.

---

### The Mental Model

OmniOffice borrows from publishing and creative tools — InDesign, Figma, Canva — not from word processors and spreadsheets. Those tools understood something Microsoft never did: **content and layout are separate concerns.** You design the layout. You place the content. The application does not have opinions about where things go.

The only constraint OmniOffice enforces is the page boundary at output time. Everything inside that boundary is free placement, free layering, free overlap, free positioning. The application never fights you.

---

### The Layer System

Every object on the canvas lives on a layer. Layers stack. Objects on higher layers render in front of objects on lower layers. This is how magazines work. This is how publishing works. This is how OmniOffice works.

**Default layer stack (bottom to top)**

| Layer | Name | What lives here |
|-------|------|-----------------|
| 0 | Background | Page color, background images, watermarks |
| 1 | Content | Body text, spreadsheets, charts, primary content |
| 2 | Float | Images, callouts, objects placed in flow |
| 3 | Overlay | Annotations, highlights, review marks |
| 4 | Foreground | Objects that must always appear on top |
| 5 | UI | Selection handles, guides, grid — never exports |

**Layer controls**
- Layer panel: shows all layers, toggle visibility, toggle lock, rename
- Every object shows its current layer in the position panel
- Drag objects between layers in the layer panel
- Lock a layer: objects on it cannot be selected or moved (useful for background images while working on content)
- Hide a layer: objects invisible in canvas view but still export (useful for working without distraction)
- Per-layer opacity: fade an entire layer without touching individual objects

**Z-order within a layer**
Within any layer, objects stack in creation order by default. Control z-order:
- Bring to Front / Send to Back (absolute)
- Bring Forward / Send Backward (one step)
- Send to Layer (move to a different layer entirely)
- Right-click → Z-order panel shows the full stack for that layer at a glance

---

### Overlays and Divs — Real Time

Overlays are first-class. Any object can overlay any other object. Transparency, blend modes, and opacity are per-object properties — not workarounds.

**Overlay properties (every object)**
- Opacity: 0–100%
- Blend mode: Normal, Multiply, Screen, Overlay, Darken, Lighten, Color Dodge, Color Burn, Difference — same as Photoshop/Figma
- Clip to container: object clips to its parent's boundary (like CSS overflow:hidden)
- Clip mask: use any shape as a clipping mask for any object

**Real-time rendering**
All layer compositing renders in real time on the Canvas 2D engine. Move an overlay object — the blend updates instantly. Change opacity — instant. No re-render lag. No "updating layout" spinner. The canvas is live.

**Practical uses**
- Transparent color block over an image — caption background that lets the image show through
- Watermark text on the foreground layer at 15% opacity across the entire page
- Annotation layer over a clinical diagram — highlight structures without touching the diagram
- Chart overlay on a data table — chart sits directly on the numbers it represents
- Pull quote overlaid on body text with a white background block underneath it
- Full-bleed background image on layer 0, all content above it on layer 1

This is magazine layout. This is what InDesign users do every day. OmniOffice brings it to every knowledge worker.

---

### What This Replaces

| Old workflow | OmniOffice |
|-------------|------------|
| Word text box inside a borderless table to position text freely | Place text block anywhere, done |
| Excel merge cells to create visual layout zones | Visual merge — data untouched, display free |
| PowerPoint placeholder box fighting your content | Free placement, no placeholders |
| InDesign just for layout then copy-paste to Word | One canvas, layout and content together |
| Canva for the visual layer, Word for the text layer | One canvas, all layers, everything live |
| Photoshop layers exported flat into Word | Native layer system, everything editable |

---

### The Publishing Analogy

A magazine page has:
- A background (color, texture, full-bleed photo)
- A grid the designer chose (not imposed by software)
- Text that flows in columns the designer defined
- Images placed exactly where the art director wanted them
- Callouts and pull quotes overlaid on top of body text
- Page numbers in the margin
- A folio line at the bottom
- All of it composited in real time, all of it editable at any time

That is an OmniOffice canvas in Page View. Not a special "publisher mode." Not a separate tool. The same canvas every user works on every day — with the page boundary as the only law, and layers doing everything else.

*The page edge is where ink stops. Everything inside it is yours.*
 z-order | Flattened in z-order | Exact |
| Blend modes | Dropped, Normal only | Dropped | Dropped | Flattened to pixels |
| Video | Removed, placeholder image left | Removed | Poster frame only | Poster frame, link in caption |
| Audio | Removed | Removed | Removed | QR code link to audio file |
| Animations | Removed | N/A | Converted to PPT transitions | Removed |
| Visual merge | Becomes real merge (warned) | Becomes real merge (warned) | Preserved as grouped shapes | Exact |
| Layer opacity | Flattened | Flattened | Flattened | Exact |
| Canvas waypoints | N/A | N/A | Become slides, one per waypoint | N/A |
| Free-placed text | Approximated text box | Floating shape | Preserved within slide | Exact |
| Fonts not installed | System substitute | System substitute | Embedded in file | Embedded in file |

**Compatibility Check UI**
- Traffic light per element type: green (survives), amber (approximated), red (lost)
- Click any amber/red item → see exactly what happens and why
- One-click fixes where possible: "Flatten this layer", "Convert blend mode", "Embed font"
- "Export anyway" always available — you are never blocked, only informed
- "Save export profile" — save your fix decisions for next time

**The footer — the silent salesman**
Every export from a free or Pro account carries a footer element:
- On .docx/.xlsx/.pptx: a discreet last-line credit — "Created in OmniOffice · Open original: omnioffice.co/doc/[id]"
- On .pdf: same line, hyperlinked
- On shared link: "Open in OmniOffice" button in the viewer chrome
- Enterprise accounts: footer removable (they paid for the right)
- The link opens a guest view — no account required to see the live canvas

**The double-click moment**
The recipient clicks the link. They see:
- The live canvas, exactly as you built it
- Media playing in place
- Layers visible, reflow live, full fidelity
- No signup wall — they see everything first
- A quiet "Create your own" invitation after 30 seconds
- "Edit a copy" button if they want to work with the content

They do not need a sales pitch. They just received one.

**The Figma lesson**
Figma did not market to designers. It was sent to developers who needed to inspect designs. The file was the acquisition channel. The product spread through the artifact, not the advertisement.

OmniOffice does the same — but the audience is not developers. It is everyone who receives a Word document. Which is everyone.

Every export is a demo. Every recipient is a prospect. The file does the selling.

---

*Presentation Mode, Media, and Export Contract added to spec.*
*The canvas is the product. The export is the marketing. The double-click is the pitch.*

---

## COMPETITIVE AUDIT — BEST IN CLASS (CONTINUED)

---

### SPREADSHEET — Google Sheets, Apple Numbers, Airtable

**Google Sheets — steal these**

- **Real-time collaboration that actually works** — cursor presence per cell, cell-level locking, per-cell change history. Excel co-authoring is still unreliable. Sheets just works. OmniOffice matches this via Yjs CRDT — every cell edit is a discrete operation, conflicts are impossible by design.

- **ARRAYFORMULA and LAMBDA** — one formula operating on an entire column without dragging. OmniOffice: native via HyperFormula, and ARIA writes them from plain language. "Apply this formula to the whole column" → done.

- **Live data import** — IMPORTHTML, IMPORTDATA, IMPORTFEED, IMPORTRANGE. Pull live data from the web directly into a cell. OmniOffice: native live data import from URL, RSS, JSON endpoint, REST API — all as spreadsheet formula functions. ARIA sets them up from plain language.

- **Conditional notifications** — "Alert me when cell B4 exceeds 100." OmniOffice: canvas triggers — notify, ping ARIA, or fire a workflow action when any cell meets any condition.

- **Named ranges surfaced visibly** — not buried in menus. OmniOffice: named ranges panel always accessible, searchable, color-coded on canvas.

**Apple Numbers — steal these**

- **Tables float on a page** — multiple independent tables per sheet, each positioned freely. This is exactly the OmniOffice model. Numbers proved it works. OmniOffice does it natively across the whole canvas, not just within a sheet.

- **Publication-quality chart defaults** — Numbers charts look designed without customization. OmniOffice: every chart defaults to publication quality. The first chart looks like it was laid out by a designer.

- **Forms linked to tables** — data entry form, responses populate the table live. OmniOffice: every spreadsheet tool can have a linked canvas form. Build the form anywhere on canvas, data flows into the spreadsheet in real time.

- **Summary row/column** — one-click statistical summary (sum, average, min, max, count) at the bottom or side of any table. OmniOffice: persistent summary bar on any spreadsheet edge, configurable per column.

**Airtable — steal these**

- **Multiple views of the same data** — Grid, Kanban, Calendar, Gallery, Gantt, Form — all showing the same underlying records, switchable instantly. OmniOffice: every spreadsheet tool supports all view modes. The data never changes — only the lens. (Note: this overlaps with the database tool — in OmniOffice, spreadsheet and database are the same tool with different view modes active.)

- **Field types** — not just text and numbers. Attachment, checkbox, single/multi-select, date, phone, email, URL, rating, barcode, formula, lookup, rollup, count. OmniOffice: full Airtable-equivalent field type library in every spreadsheet/database tool.

- **Linked records** — a cell in one table references a record in another table. The relationship is live — change the source, the reference updates. OmniOffice: linked records across any two spreadsheet or database objects on any canvas. Cross-document linking on roadmap.

- **Interface designer** — build a custom view of your data for non-technical users. OmniOffice: canvas form builder — design the interface on canvas, wire it to the data, share the form view with anyone.

**What none of them got right — and OmniOffice fixes**

- None of them let you place a chart, a summary card, or a KPI block *anywhere on the canvas* independent of the sheet it came from. In OmniOffice, any data visualization derived from a spreadsheet is a free canvas object — place it anywhere, layer it over anything, it stays live.

- None of them have ARIA. "What does this data tell me?" → ARIA reads the spreadsheet, writes the analysis, places it in a text block next to the data.

---

### MATH & CODE — Notion, Obsidian, Overleaf, Jupyter

**The problem everywhere**
Math in documents is an afterthought. Word has an equation editor that produces ugly output and breaks reflow. Notion supports LaTeX inline but it's static — rendered as an image, no live computation. Overleaf is the gold standard for math but it's a separate application entirely, and the output is a PDF — you can't mix it with live data, org charts, or video. Jupyter is brilliant for code + output but the document model is cells in a fixed sequence — no canvas, no free placement, no reflow.

**OmniOffice math — steal from Overleaf, fix what Overleaf can't do**

- **LaTeX rendering natively** — type LaTeX anywhere in any text block, rendered inline using KaTeX (fast, accurate, MIT license). Not an equation object. Not a separate mode. Just math, wherever you type it, rendered live as you type.

- **Visual equation editor** — for users who don't know LaTeX. Click-to-build equations from a palette. Output is LaTeX under the hood — always editable as code. Same as MathType but native, free, on canvas.

- **Math in any context** — per Law 1: math renders in prose blocks, spreadsheet cells, callouts, slide text, table captions, margin notes, chart labels. Everywhere text lives, math lives.

- **Numbered equations** — auto-numbered, referenceable by number anywhere on canvas. Change the order, numbers update everywhere. Same as Overleaf \label and \ref but visual and automatic.

- **Equation library** — save frequently used equations, tag them, search them, insert anywhere. Synced to your OmniOffice vault.

- **ARIA writes math** — "Write the formula for logistic regression in LaTeX" → ARIA inserts it rendered, inline, correctly numbered.

**OmniOffice code — steal from Jupyter, fix what Jupyter can't do**

- **Live code blocks** — place a code block anywhere on canvas. Syntax highlighted. Executable. Supported languages: Python, R, JavaScript, SQL, Julia. Output renders inline below the code block — text, tables, charts, images. Exactly like Jupyter cells but as free canvas objects.

- **Code output as canvas objects** — when a code block produces a chart or table, that output is a live canvas object. Place it anywhere. Layer it. Reflow text around it. It is not a static image — re-run the code, the output updates in place.

- **Shared kernel** — all code blocks on a canvas share a session kernel by default. Variables defined in one block are available in another. The canvas is the notebook. No fixed cell sequence — run blocks in any order.

- **SQL against spreadsheet data** — write a SQL query on canvas, target any spreadsheet tool on the same canvas as the data source. Query results render as a new spreadsheet object. Live — re-run on data change.

- **ARIA writes code** — "Write Python to plot this data as a violin plot" → ARIA writes the code, places it in a code block, runs it, output appears. Fully editable.

- **Version history per code block** — every code block tracks its execution history. Roll back to any previous version of the code and its output.

**What Overleaf got right that nobody else has**
- Real-time collaborative LaTeX editing with live PDF preview
- Git integration — full version control on the document
- Journal submission templates built in

OmniOffice takes: live math rendering everywhere, collaborative editing (already have it), version history (already have it). Leaves behind: the PDF-only output model, the fixed document structure, the separation from data and media.

**What Jupyter got right that nobody else has**
- Code and output as first-class document content
- Reproducible research — the analysis lives in the document
- Mix prose, math, code, and output in one artifact

OmniOffice takes: all of it. Fixes: the rigid cell sequence, the lack of canvas freedom, the inability to mix with non-code content naturally.

---

### PEN & INK INPUT — GoodNotes, Notability, Apple Notes, OneNote

**The problem everywhere**
Pen input is always a separate mode, a separate layer, or a separate app. In Word, "draw" is a tab you switch to — and your ink floats over the document with no relationship to the text. In OneNote, ink and text coexist but OneNote itself is a silo. GoodNotes and Notability are excellent ink apps but they are ink apps — not document tools. The ink never connects to live data, citations, or computation.

**What GoodNotes got right — steal everything**
- **Pressure-sensitive ink** that looks and feels like real pen on paper. Ballpoint, fountain pen, brush — each with authentic feel.
- **Lasso selection** — draw around any ink strokes, move them, resize them, copy them. Ink is not a raster image. It is a vector object.
- **Shape recognition** — draw a rough circle, it snaps to a perfect circle. Draw a rectangle, arrow, line — all recognized and converted to clean geometry. Toggle on/off.
- **Handwriting search** — search your handwritten notes. GoodNotes OCR is best-in-class. Find any word you ever wrote by hand.
- **Handwriting to text conversion** — select ink strokes, convert to typed text. Accurate, fast, preserves formatting intent.
- **Wrist rejection** — palm on screen while writing, only the pen registers. Non-negotiable for stylus users.
- **Zoom writing mode** — a magnified writing window at the bottom of the screen. Write small, precise strokes in the zoom window, they appear at normal scale in the document. Essential for detailed annotation.

**What Notability got right — steal these**
- **Audio sync** — record audio while taking notes. Tap any word in your notes, playback jumps to the moment you wrote it. Essential for lectures, meetings, clinical rounds. OmniOffice: audio recording attached to ink strokes and text blocks, synchronized playback.
- **Multi-note split view** — two notes side by side. OmniOffice: two canvas sections side by side — already supported by the layer/section model.
- **PDF annotation** — open any PDF, annotate directly with ink, highlights, text. OmniOffice: PDF tool on canvas, full ink annotation, annotations saved as a canvas overlay layer — non-destructive, always removable.

**What Apple Notes got right — steal these**
- **Instant ink** — zero latency between stylus touch and ink appearing. Feels physical. This is an engineering target, not a feature — but it must be matched.
- **Smart Script** — handwriting smoothed in real time to look cleaner without losing your style. OmniOffice: ink smoothing toggle, adjustable aggressiveness.
- **Collaboration on ink** — multiple people inking on the same document simultaneously. OmniOffice: ink strokes are Yjs CRDT objects — collaborative ink is native.

**What OneNote got right — steal these**
- **Ink anywhere on an infinite canvas** — OneNote's canvas model is the closest to OmniOffice in the Microsoft suite. Ink floats freely, text floats freely, images float freely. The execution is poor but the concept is right.
- **Math ink recognition** — write a math equation by hand, OneNote converts it to formatted math. OmniOffice: handwritten math → LaTeX → rendered inline. ARIA assists with ambiguous recognition.
- **Ink to shape** — draw any shape by hand, it converts to a clean vector shape. Already in our GoodNotes steal list.

**What none of them got right — and OmniOffice fixes**

- **Ink connected to data** — draw an arrow between two cells on a spreadsheet. The arrow is a relationship annotation — ARIA can read it. Sketch a rough chart shape next to data — ARIA recognizes the intent and generates the actual chart.

- **Ink as a first-class canvas object** — not a separate layer, not a mode. An ink stroke is a canvas object with position, size, layer, opacity, z-order. It reflows text around it like any other object (per the reflow engine). It can be grouped with typed text. It can be exported as SVG.

- **Clinical ink use cases** — annotate a medical diagram directly with pen. Draw on an ultrasound image. Sketch a surgical approach on an anatomy diagram. All of this is ink on canvas, layered over the relevant content, saved as a non-destructive overlay, exportable as annotated PDF.

- **Ink in presentation mode** — during a canvas presentation, the presenter can ink on the canvas live. Annotations appear on the audience screen in real time. Saved as an overlay layer after the presentation — not burned into the canvas.

---

*Competitive audit complete. Every best-in-class feature absorbed. Every gap identified. OmniOffice does all of it — natively, on canvas, with no walls between contexts.*

---

## THE DATABASE TOOL — THE ACCESS REPLACEMENT

### Why This Is the Most Complex Tool

Every other tool in OmniOffice operates on content — text, numbers, media, shapes. The database tool operates on *structure*. It defines relationships between things. It enforces data types. It executes queries. It generates forms and reports from schemas. It is the only tool in the suite that has opinions about your data.

Done wrong, it is Access — powerful, impenetrable, legacy. Done right, it is Airtable plus Notion database plus a relational engine, all on canvas, all connected to everything else.

**The design challenge:** make relational database power accessible to a physician, a researcher, a business analyst — without requiring them to think like a database administrator.

---

### What Access Got Right
- True relational data model — tables, primary keys, foreign keys, relationships
- Query builder — visual query design without writing SQL
- Forms bound to tables — data entry that validates against schema
- Reports — formatted output generated from queries
- Macros — automation without code

### What Access Got Catastrophically Wrong
- UI that has not meaningfully evolved since 1997
- .accdb file format that is a black box
- No collaboration — one user at a time
- No web access — desktop only
- Relationships defined in a separate Relationships window nobody can find
- Forms and reports are separate objects with their own complex designers
- No connection to the rest of the document — Access lives in total isolation

### What Airtable Got Right
- Multiple views of the same data (grid, kanban, calendar, gallery, form)
- Rich field types (attachments, linked records, lookups, rollups)
- Automations — trigger actions when records change
- Interface designer — custom views for non-technical users
- Accessible to non-developers

### What Airtable Got Wrong
- Not truly relational — linked records are powerful but not a full relational model
- No real query language — filtered views are not queries
- Expensive at scale
- Data lives in Airtable's cloud — no self-hosted option
- No canvas — it is a standalone grid tool

---

### OmniOffice Database Tool — Full Spec

**The mental model**
A database tool on canvas is a window into a structured data store. You place it like any canvas object. Inside it, you define tables, fields, and relationships. The data lives in the canvas's PostgreSQL backend (self-hosted Supabase). The tool is the interface to that data.

Per Law 1: the database tool's data is available to every other tool on the canvas. A spreadsheet can query it. A chart can visualize it. ARIA can read and write it. A form placed anywhere on canvas can feed into it. No walls.

---

**Tables**
Every database tool starts with one table. Add more tables within the same tool. Each table has:
- A name
- A primary key (auto-generated UUID by default, or custom)
- Any number of fields

**Field types — full library**

| Type | Description |
|------|-------------|
| Text | Short text, max length configurable |
| Long text | Rich text with formatting |
| Number | Integer, decimal, currency, percentage |
| Date | Date only, date+time, time only |
| Checkbox | Boolean true/false |
| Single select | One value from a defined list |
| Multi select | Multiple values from a defined list |
| Attachment | Files, images, PDFs — stored in canvas file store |
| Link to record | Foreign key relationship to another table |
| Lookup | Pull a field value from a linked record |
| Rollup | Aggregate linked records (sum, count, average, min, max) |
| Formula | Calculated from other fields in the same record |
| Autonumber | Auto-incrementing integer |
| User | Links to an OmniOffice user account |
| Rating | 1–5 or 1–10 star rating |
| Barcode/QR | Generate or scan barcodes |
| Canvas link | Links to any object on the canvas |

**Relationships**
- One-to-many: one record in Table A links to many records in Table B
- Many-to-many: junction table auto-created and managed by OmniOffice
- One-to-one: enforced at field level
- Relationships defined visually — draw a line between two fields in the relationship diagram view
- Relationship diagram is always accessible — not hidden in a separate window
- Referential integrity enforced — delete a parent record, choose: cascade delete children, set null, restrict deletion

---

**Views**
Every table supports multiple simultaneous views. Views are canvas objects — place any view anywhere on canvas. The same data, different lenses.

| View | Description |
|------|-------------|
| Grid | Spreadsheet-style rows and columns — default |
| Kanban | Cards grouped by a single-select field |
| Calendar | Records placed on calendar by date field |
| Gallery | Card grid with image field prominent |
| Timeline/Gantt | Records on a timeline by start/end date fields |
| Form | Data entry view — sharable as a link |
| Map | Records with location fields plotted on a map |
| Pivot | Aggregate view — rows, columns, values |

Each view has its own:
- Filter (show only records matching conditions)
- Sort (one or multiple fields, ascending/descending)
- Group (group records by any field value)
- Hidden fields (show only relevant fields in this view)
- Row height (compact, medium, tall, extra tall)

---

**Query builder**
Visual query designer — no SQL required, SQL available for power users.

- Drag tables into the query canvas
- Draw joins between related fields
- Select which fields to include in output
- Add WHERE conditions with a condition builder
- Add ORDER BY, GROUP BY, HAVING
- Preview results live as you build the query
- Save query as a named view
- Export query results as a spreadsheet tool on canvas, a chart, or a downloadable CSV
- SQL editor toggle — view and edit the generated SQL directly
- ARIA writes queries: "Show me all patients admitted in the last 30 days with a diagnosis of pneumonia" → ARIA writes the query, runs it, results appear as a grid view on canvas

---

**Forms**
Any view can be a form. But the form builder goes further:

- Drag and drop field arrangement — fields appear in the order you choose
- Field labels — rename fields for the form without changing the database field name
- Required fields — validation enforced before submission
- Conditional fields — show field B only if field A equals a specific value
- Helper text — instructions per field
- Section headers and dividers — organize long forms into sections
- Progress bar for multi-section forms
- File upload fields — attachments submitted with the record
- Form branding — logo, background color, header image
- Share as link — anyone with the link can submit, no OmniOffice account required
- Embed as canvas object — the form lives on canvas, submissions appear in the table in real time
- Post-submission action — show a message, redirect to a URL, or open a canvas waypoint

---

**Automations**
Trigger → Condition → Action chains. No code required.

**Triggers:**
- Record created
- Record updated (specific field or any field)
- Record deleted
- Form submitted
- Scheduled time (daily, weekly, on a date)
- Webhook received

**Conditions:**
- Field equals / does not equal value
- Field is empty / not empty
- Field contains text
- Number field greater than / less than
- Date field is before / after / on

**Actions:**
- Create a record in any table
- Update a record
- Send an email (via canvas email tool)
- Send a notification (in-app)
- Call a webhook (POST to any URL)
- Ask ARIA to do something (natural language action)
- Run a canvas code block

---

**Reports**
Generated output from any query or view. Reports are canvas objects — place them anywhere, layer them, reflow text around them.

- Table report — formatted grid output with headers, totals, grouping
- Summary report — aggregate statistics (counts, sums, averages) with charts
- Label report — formatted cards for each record (mailing labels, name badges, patient labels)
- Custom report — full canvas layout freedom — place any field value anywhere on a page template, repeat per record

Reports export to PDF, DOCX, or as a standalone canvas section.

---

**Clinical use cases**
- Patient tracking database — admission date, diagnosis, attending, status, discharge date — Kanban view by status, Calendar view by admission, Form view for intake
- Research participant registry — enrollment, demographics, intervention group, outcome measures — query builder for cohort analysis, ARIA writes the inclusion/exclusion logic
- Quality metrics database — incident reports, near misses, outcomes — linked to staff records, automated notifications when thresholds are met
- Drug formulary — medications, doses, interactions, formulary status — lookup fields, ARIA answers "what is the renal dosing for vancomycin" against the database
- CME tracker — courses completed, credits, expiry dates — Calendar view for upcoming renewals, automated reminders

---

## COMMUNICATIONS TOOL — THE TEAMS REPLACEMENT

### The Problem With Every Communications Tool
Teams, Slack, Discord — they are all standalone applications. The conversation about a document is never in the document. You share a link to the document in Slack, discuss it in a thread, make decisions in the thread, then go back to the document and implement them manually. The conversation and the work are permanently separated.

This is the same wall that OmniOffice tears down everywhere else. Per Law 1: the conversation lives where the work lives.

---

### The OmniOffice Communications Model

**Conversations are canvas objects.**

A channel, a thread, a DM — all are canvas objects. Place a channel next to the document section it's about. The conversation about the data table lives next to the data table. The discussion about the clinical protocol lives inside the protocol document. The decision made in the thread is one click from implementation — ARIA reads the thread and acts on it.

---

### Channels
- Create a channel as a canvas object — place it anywhere
- Channel has a name, description, member list, and permissions
- Messages appear in the channel in real time (WebSocket)
- @mention any user, any canvas object, any database record
- Threads on any message — keep side conversations organized
- Reactions — emoji responses
- Pin messages — pinned messages visible at top of channel
- Search — full text search across all channel history
- Channel types: public (anyone in workspace), private (invited members only), canvas-scoped (visible only on this canvas)

**Canvas-scoped channels** — the differentiator nobody has. A channel that exists only in the context of a specific canvas. When you open the canvas, the conversation is there. It is not a separate Slack workspace or Teams channel — it is the conversation about this document, living in this document.

---

### Direct Messages
- DM any OmniOffice user
- Group DMs up to 8 people
- DM history searchable
- File sharing — any canvas object shareable directly in a DM
- Voice call from any DM — one click
- Video call from any DM — one click

---

### Voice and Video
- Voice call: click call button in any channel or DM — all members in the channel get a notification
- Video call: same — cameras optional
- Screen sharing: share entire screen or a specific canvas
- Canvas sharing: share a live canvas in a call — all participants see it, presenter controls the view
- Recording: calls recordable, recording saves as a video object on the canvas
- Transcription: ARIA transcribes calls in real time, summary posted to the channel automatically after the call ends

---

### Presence
- User status: online, away, do not disturb, custom message
- Last seen: visible per user
- In-canvas presence: when another user is on the same canvas, their cursor is visible (colored, named) — same as collaborative canvas presence
- Status integrates with calendar tool: meeting in progress → status automatically set to "In a meeting"

---

### ARIA in Communications
- Summarize a channel: "ARIA, summarize the last 48 hours of discussion in this channel" → threaded summary posted
- Action items: "ARIA, extract all action items from this thread" → creates tasks in the project tool, assigns to mentioned users
- Draft responses: "ARIA, draft a reply to this message" → drafts in the message compose box, editable before sending
- Answer questions from canvas: "ARIA, what does the data table say about Q3 admissions?" → ARIA reads the canvas and posts the answer in the channel
- Meeting notes: after a call, ARIA posts a structured summary — decisions made, action items, next steps

---

### Notifications
- In-app notification panel — all mentions, replies, reactions
- Email digest — configurable frequency (immediate, hourly, daily)
- Mobile push — iOS and Android
- Do not disturb schedule — quiet hours, auto-responder
- Per-channel notification level: all messages, mentions only, nothing

---

### Integration With the Rest of Canvas
- Any message can reference any canvas object — @[object name] creates a live link
- Click the link → canvas jumps to that object
- Any canvas object can have a linked channel — right-click any object → "Open discussion" → canvas-scoped channel for that object appears
- Database automations can post to channels — "When a patient is discharged, post a summary to the #discharges channel"
- Form submissions can notify a channel
- Code block execution results can be posted to a channel

---

## FULL BUILD ROADMAP — REFINED

### Governing Constraints
- Solo developer (Akua) until revenue funds hiring
- Local AI inference on THE BEAST and Hetzner for HIPAA compliance
- Infrastructure live on Hetzner before any app development begins
- Usable clinical product by Month 13 — the wedge must be functional before the full suite

### The Sequence Logic
Build the reflow engine first — it is the foundation everything else sits on. Build the canvas and word processor next — this is the wedge product. Add data tools. Add AI. Add collaboration. Add the remaining tools in order of clinical relevance. Polish and launch.

Every phase produces something usable. No phase is purely infrastructure with nothing to show.

---

### Phase 0 — Infrastructure (Months 1-2)
**Goal: Everything runs on Hetzner. Local development unchanged.**

- Order and provision Hetzner AX52 (Finland primary)
- Install Coolify — replaces Vercel
- Deploy self-hosted Supabase — replaces Supabase.com
- Configure Tailscale mesh (Finland + Germany + US + THE BEAST)
- Set up Backblaze B2 encrypted backups
- Configure Hetzner Germany node for HIPAA workloads (encrypted volumes)
- Deploy JARVIS local inference stack on THE BEAST
- Migrate existing apps: GHEXIT → NEXUS → JARVIS → all others
- Cancel Supabase.com and Vercel only after all apps confirmed stable
- **Deliverable:** Full infrastructure operational, $700/mo savings locked in

### Phase 1 — Reflow Engine (Months 2-4)
**Goal: Prove the core innovation works at production quality.**

- POC already complete (Canvas 2D, single HTML file)
- Rebuild as production TypeScript module
- Text buffer with cursor positioning
- Scanline reflow with full object constraint model
- Wrap modes: square, tight, through, top/bottom, none
- Object anchor system: fixed, inline, relative to page/margin
- Performance target: reflow recalculation < 16ms at 60fps
- Unit test suite: reflow correctness across 50+ layout scenarios
- **Deliverable:** Reflow engine npm package, fully tested, ready to integrate

### Phase 2 — Canvas + Word Processor (Months 4-7)
**Goal: A designed document tool that replaces Word for clinical researchers.**

- Infinite canvas with zoom, pan, minimap
- Layer system (Background, Content, Float, Overlay, Foreground)
- Free placement with position panel (x, y, w, h, rotation, lock)
- Grid system with snap-to and smart guides
- Page view with paper size selection and section-level orientation
- Word processor tool: full rich text, styles, track changes, comments, TOC
- Citation tool: CSL styles, PubMed search, live bibliography
- Math rendering: KaTeX inline, visual equation editor
- Pen/ink input: pressure sensitive, lasso, shape recognition, handwriting search
- PDF tool: view, annotate, fill forms, sign
- Export: .docx, .pdf with compatibility check and footer
- **Deliverable:** Beta — clinical researcher word processor. Invite 50 users.

### Phase 3 — Spreadsheet + Database (Months 7-10)
**Goal: Excel and Access replacement on canvas.**

- Spreadsheet tool: HyperFormula engine, 400+ functions, all chart types
- Visual merge (data-safe)
- All view modes: grid, kanban, calendar, gallery, timeline, pivot
- Database tool: full relational model, field types, relationships, query builder, forms, automations, reports
- Live data import (URL, JSON, REST API)
- Airtable-equivalent field types
- SQL editor
- ARIA writes formulas, queries, and automations from plain language
- Export: .xlsx, .csv with compatibility check
- **Deliverable:** Data tools beta. Expand to 200 users.

### Phase 4 — AI Tool (ARIA) + Collaboration (Months 10-13)
**Goal: ARIA on canvas. Real-time multiplayer. The wedge is complete.**

- ARIA canvas object: Claude API primary, GPT-4 fallback, JARVIS for HIPAA
- Full canvas awareness: reads all objects, writes into all objects
- Inline invocation: Cmd+K anywhere
- Object commands: right-click → AI actions
- Streaming responses
- HIPAA mode: automatic routing to JARVIS, no PHI to third-party APIs
- Real-time collaboration: Yjs CRDT for all canvas objects including ink and database records
- Presence: cursor awareness, user status, in-canvas presence indicators
- Version history: full canvas history, per-object history, branching
- **Deliverable:** Full wedge product. Clinical researcher workflow complete. Launch to 1,000 users.

### Phase 5 — Presentation Mode + Media (Months 13-16)
**Goal: PowerPoint replacement. Canvas presentations. Media native.**

- Waypoint system: place, sequence, animate camera through canvas
- Presenter mode: current/next view, speaker notes, timer, laser pointer
- Section-based presentation mode (slide-equivalent structure)
- Video tool: inline playback, trim, captions, webcam record
- Audio tool: waveform display, voiceover, background audio, sync to waypoints
- Screen recording: record canvas directly
- Export: .pptx (waypoints → slides), .mp4 (recorded presentation)
- **Deliverable:** Presentation beta. Expand to academic medicine conference circuit.

### Phase 6 — Communications Tool (Months 16-19)
**Goal: Teams/Slack replacement. Conversation lives in the document.**

- Channels: canvas-scoped and workspace-wide
- Direct messages and group DMs
- Voice and video calls with canvas sharing
- Call recording and ARIA transcription
- Presence and status
- ARIA in channels: summarize, extract actions, draft responses
- Notification system: in-app, email digest, mobile push
- **Deliverable:** Communications beta. Teams/Slack cancellation possible for early adopters.

### Phase 7 — Remaining Tools (Months 19-24)
**Goal: Complete the tool suite.**

- Code tool: live execution, Python/R/JS/SQL, shared kernel, SQL against canvas data
- Org chart tool: data-first, self-arranging, live updates, import from CSV/HR systems
- Mind map tool: all node types, all connection types, linked to canvas objects
- Diagramming: flowcharts, UML, BPMN, network diagrams, 1000+ shapes
- Project management: Gantt, Kanban, resource management, critical path
- Publisher tool: CMYK, bleed zones, print-ready PDF/X export
- Email and calendar tools: IMAP/SMTP, unified inbox, availability
- Notebook tool: freeform canvas notes, audio sync, full ink support
- **Deliverable:** Full tool suite. Feature-complete OmniOffice.

### Phase 8 — Mobile + Desktop Apps (Months 24-28)
**Goal: Every platform, full feature parity.**

- Electron desktop app: Windows, macOS, Linux
- Capacitor iOS app: App Store submission
- Capacitor Android app: Play Store submission
- Full offline mode: complete functionality, sync on reconnect
- Touch optimization: 44px targets, gesture suite, stylus pressure
- Platform-specific features: AirPrint, Files app integration, external keyboard shortcuts
- **Deliverable:** All platform apps live.

### Phase 9 — Polish + Security + Launch (Months 28-33)
**Goal: Production-ready for enterprise. SOC 2. General availability.**

- SOC 2 Type II audit (starts Month 24, completes Month 30)
- HIPAA BAA framework finalized, legal review
- Penetration testing
- Performance optimization to all targets (see performance standards section)
- Accessibility: WCAG 2.1 AA full compliance
- Onboarding: interactive canvas tour, template library (50+ clinical templates)
- Admin console: workspace management, user provisioning, SSO (SAML, OIDC)
- Enterprise features: custom ARIA fine-tuning, dedicated Hetzner tenant, SLA
- Academic medical center pilot: 3 institutions, 500 users, 90 days
- Public launch: Product Hunt, academic medicine conferences, direct outreach
- **Deliverable:** OmniOffice v1.0. General availability.

---

### Revenue Milestones

| Milestone | Users | MRR | Timeline |
|-----------|-------|-----|----------|
| Beta launch | 50 | $0 (free beta) | Month 7 |
| Paid launch | 200 | $4,800 | Month 13 |
| Post-collaboration | 1,000 | $24,000 | Month 16 |
| Post-presentation | 2,500 | $60,000 | Month 19 |
| Full suite | 5,000 | $120,000 | Month 24 |
| Enterprise tier | 8,000 | $250,000 | Month 30 |
| General availability | 15,000+ | $500,000+ | Month 33 |

*These are conservative. The wedge strategy with viral export loop can accelerate these significantly.*

---

### Hiring Triggers
- Month 13 ($24k MRR): First hire — full-stack developer
- Month 19 ($60k MRR): Second hire — frontend/canvas specialist
- Month 24 ($120k MRR): Third hire — DevOps/infrastructure
- Month 30 ($250k MRR): Fourth and fifth hire — product designer + clinical success manager

Solo until Month 13. Lean until Month 24. The infrastructure cost stays flat at $189/mo regardless of user growth until enterprise dedicated tenants kick in.

---

*Spec complete. All four remaining sections written.*
*Total: competitive audit, database tool, communications tool, full build roadmap.*
*OmniOffice is fully specced from Core Design Laws to revenue milestones.*
*The canvas is ready. The build begins when the servers are ordered.*
