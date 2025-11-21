Solo Ops: Visual & Interaction Aesthetic

Design notes inspired by ARC Raiders

This document describes the desired look and feel of the Solo Ops companion app, grounded in ARC Raiders visuals, world and tone. Treat this as a design north star rather than pixel perfect spec.

⸻

1. Core Aesthetic Pillars
	1.	Retro future defence console
The app should feel like a ground operator’s tactical terminal connected to the wider ARC conflict. It is not corporate UI or gamer neon clutter. It is a functional, slightly rough field system.
	2.	Analogue tech in a digital frame
Mix clean modern UI with hints of analogue hardware. Think radar screens, scan lines, subtle grain, terminal labels, old warning placards.
	3.	Scavenger professionalism
Raiders are scrappy but not amateurs. The UI should feel battle tested and practical. No cartoon UI. Clean hierarchy, clear labels, purposeful motion.
	4.	“Secondary system” vibe
This is not the primary orbital HUD. It is the operator’s optimiser. Think side console sitting next to a main game screen.

⸻

2. Colour and Light

2.1 Base palette
	•	Backgrounds
	•	Almost black with a hint of blue
	•	#02040a, #040712, #050a1a
	•	Use gentle vertical and radial gradients to suggest depth rather than flat black.
	•	Primary highlight
	•	Cyan scan energy
	•	#25f0ff, #52d7ff, #8df7ff
	•	Used for key interactive states, accents and active elements.
	•	Secondary highlight and danger
	•	Amber and red for warnings, bosses, risk
	•	Amber: #fbbf24, #f59e0b
	•	Red: #f97373, #ef4444
	•	Support neutrals
	•	Slate and cyan grey tones for text and borders
	•	#e5e7eb (titles)
	•	#9ca3af and #6b7280 (body text, labels)
	•	#1f2933, #111827 (cards and panels)

2.2 Light behaviour
	•	Highlight states should feel like energy bleed rather than solid blocks
	•	Use glows, soft outer shadows, gradients to communicate “powered” elements
	•	Avoid flat, highly saturated RGB bars
	•	Avoid pure white. Use soft off white for text to keep the console feel.

⸻

3. Layout and Structure

3.1 Overall structure
	•	Left column
	•	Feels like a fixed console. Dark glass, subtle border, slight glow.
	•	Contains app identity, icon, version and navigation.
	•	Right content area
	•	Feels like mission readout or tactical report.
	•	Content is card based. Each card is a “data tile” or “briefing panel”.

3.2 Cards and sections
	•	Cards are the primary unit. Each card should feel like a panel bolted onto the console.
	•	Use:
	•	Rounded corners, but restrained. Not overly pill shaped.
	•	Thin borders with low opacity cyan or slate.
	•	Subtle inner or outer glow for “tactical” variants.
	•	Section headers:
	•	Strong left accent bar in cyan.
	•	Title plus small uppercase sub label such as “Mission Briefing”, “Tactical Planner”, “Route Database”.

3.3 Density
	•	Medium density. Text is readable without feeling sparse.
	•	Use comfortable padding. No full width text walls if they can be broken into bullets or info blocks.

⸻

4. Typography and Labelling

4.1 Typeface
	•	System style sans serif. For example
	•	system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
	•	Avoid decorative or script fonts. Function over fashion.

4.2 Hierarchy
	•	Titles
	•	Large, bold, clean.
	•	Example: text-3xl font-bold for main section titles.
	•	Subtitles and labels
	•	Uppercase, wider tracking, small size.
	•	For example: text-xs uppercase tracking-widest for tags like “Tactical System” or “Route Database”.
	•	Body copy
	•	text-sm to text-base. Calm, neutral tone.
	•	Use colour differences instead of many sizes.

4.3 Voice and copy tone
	•	Concise, tactical and practical.
	•	Use in universe language lightly
	•	ARC presence
	•	Night Raid
	•	Harvester
	•	Raider
	•	Avoid slang and memes. This is a field manual, not a Discord chat.

⸻

5. Iconography and Motifs

5.1 Visual motifs
	•	Radar circles and arcs.
	•	Directional arrows and simple chevrons.
	•	Triangles and small pointers for emphasis.
	•	Status dots and “signal” indicators.

5.2 Icon style
	•	Line icons in the style of lucide-react.
	•	Use simple, geometric icons for:
	•	Targets
	•	Routes
	•	Maps
	•	Warnings or risk
	•	Packages or loot
	•	Lightning or shortcuts
	•	XP or calculator elements
	•	Icons support text, they do not replace labels.

⸻

6. Motion and Feedback

6.1 Overall motion
	•	Motion is subtle. The app should feel like a scanning console rather than a mobile app.
	•	Use animation for:
	•	Hover scale and glow on interactive cards.
	•	Tiny movement on selected run type and active navigation items.
	•	Pulsing status lights such as “System Online”.
	•	Avoid:
	•	Large bouncy transitions.
	•	Staggered, attention demanding animations on every interaction.

6.2 Micro interactions
	•	“Lock in” moments
	•	Selecting a run type should feel like arming a plan. Slight glow ramp, subtle scale, maybe a short highlight sweep.
	•	XP planner updates
	•	Numbers can ease into new values rather than jumping, as if digits are being recalculated by a machine.

⸻

7. Data Presentation Style

7.1 Pill tags
	•	Use pill components to indicate:
	•	Map name
	•	Risk level
	•	Route style
	•	XP impact
	•	Modifier and spawn region
	•	Colour code these carefully
	•	Risk: green for low, amber for medium, red for high or extreme.
	•	XP impact: info blue or cyan for positive, neutral for none.

7.2 Lists and bullet patterns
	•	Prefer:
	•	Bulleted lists with a small cyan triangle or bullet.
	•	Short, punchy lines such as “Use cover near Santa Maria before pushing into Marano Park.”
	•	Route details:
	•	Show estimated XP and time per run in compact info boxes.
	•	Use small labels in uppercase with subtle colour to suggest instrumentation.

⸻

8. Thematic Anchors From ARC Raiders

The aesthetic should feel compatible with the following ARC Raiders themes and visuals.
	1.	Orbital threat and ground resistance
	•	UI looks like it belongs to the ground forces trying to read ARC patterns and optimise raids.
	2.	Salvage and scavenging
	•	Small wear hints through grain, texture, and used metal feeling backgrounds.
	•	Clear focus on loot and recyclables as practical resources.
	3.	Cold war style space radar
	•	Radial graphics, arcs and crosshairs.
	•	Radar and scanner logic in the centre icon and decorative pieces.
	4.	Somber but hopeful
	•	Colour is not childish. It is serious but with glowing energy where the system is active.
	•	Text encourages careful, methodical play, not reckless bravado.

⸻

9. Accessibility and Practical Considerations
	•	Ensure contrast between text and background stays high.
	•	Avoid relying only on colour to indicate risk or state. Combine colour with text labels such as “High Risk” and “Low Risk”.
	•	Motion should be lightweight enough that it does not distract during long sessions. Where possible, keep idle animations low key.

⸻

10. Summary Design Sentence

If you need a single guiding line when creating or reviewing UI flows:

“Solo Ops should look and feel like a raider’s own tactical console. A grounded, retro future ARC terminal that helps you plan smarter raids, not a flashy overlay.”