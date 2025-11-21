import { AdaptivePlan } from "../types";

export const adaptivePlans: AdaptivePlan[] = [
  // Boss hunt - Buried City
  {
    id: "boss-buried-standard",
    runType: "Boss hunt",
    map: "Buried City",
    modifier: "Any",
    title: "Buried City boss loop",
    summary:
      "Loop Bastion and Bombardier spawns around Santa Maria and Marano Park, using buildings as cover.",
    keyActions: [
      "Start near Santa Maria and grab grenades or ammo from nearby lockers if possible.",
      "Scan for Bombardiers and Bastions, pull them to building corners and burn them with Blaze grenades.",
      "After each kill, throw smoke on the corpse, loot every visible part, then rotate to the next spawn.",
      "Extract once you have two or three good boss kills to bank your XP safely.",
    ],
    cautions: [
      "Open street fights are dangerous, stay close to solid cover.",
      "Do not chase a boss across half the map, you will often get third partied.",
    ],
    xpNote: "Very strong XP per minute if you can reliably solo heavy ARC enemies.",
  },
  {
    id: "boss-buried-storm",
    runType: "Boss hunt",
    map: "Buried City",
    modifier: "Storm",
    title: "Close range boss hunts in storms",
    summary:
      "Use poor visibility to close in on bosses and avoid long sight line PvP.",
    keyActions: [
      "Stay in tight alleyways and courtyards instead of long roads.",
      "Focus on Bastions that push into you rather than chasing Bombardiers across open ground.",
      "Track bosses and players mainly by audio and fight around corners, not in the open.",
    ],
    cautions: [
      "Storms make it harder to see players approaching, pull back early if you hear nearby gunfire.",
    ],
    xpNote:
      "Slightly slower pace but safer from long range third parties and snipers.",
  },
  // Loot run - Spaceport
  {
    id: "loot-spaceport-standard",
    runType: "Loot run",
    map: "Spaceport",
    modifier: "Any",
    title: "Seed Vault sprint",
    summary:
      "Classic sprint to Seed Vault and loading bays, opening every container you can reach.",
    keyActions: [
      "Spawn, mark Seed Vault and run there, ignoring fights whenever you can.",
      "Open every crate, locker and bag, even if it was already looted.",
      "If time allows, sweep the loading bay and nearby warehouses on the way to extraction.",
    ],
    cautions: [
      "Seed Vault is a popular hotspot, listen for other players and avoid overcommitting to fights.",
      "If you are using a free kit, do not worry about dying once you have made a good sweep of containers.",
    ],
    xpNote:
      "Very efficient for quick runs, especially when chaining free kit suicide loops.",
  },
  {
    id: "loot-spaceport-bunker",
    runType: "Loot run",
    map: "Spaceport",
    modifier: "Hidden bunker event",
    title: "Pivot into Hidden Bunker",
    summary:
      "If someone opens the bunker and it becomes quiet, switch your run to clearing it for dense loot.",
    keyActions: [
      "Start as a normal Seed Vault sprint.",
      "Watch for bunker open notifications and increased player movement towards the event.",
      "If gunfire has died down, move in late and sweep bunker rooms methodically.",
      "Prioritise locked rooms and high tier chests, then extract by a safe route.",
    ],
    cautions: [
      "The event attracts squads, so only go in when the area has calmed down or you know your escape route.",
    ],
    xpNote:
      "Potentially huge XP in a short time, but only when the bunker is open and not full of enemy squads.",
  },
  // Stealth farm - The Dam
  {
    id: "stealth-dam-night",
    runType: "Stealth farm",
    map: "The Dam",
    modifier: "Night",
    title: "Night apartments sweep",
    summary:
      "Slow indoor sweep of the flats near the dam during night raids, aiming for safe XP and key farming.",
    keyActions: [
      "Walk instead of sprinting as you move through corridors and flats.",
      "Open every container and cabinet and loot every corpse you find.",
      "Stay inside the building for most of the raid to avoid outside lines of sight.",
      "Leave a few minutes at the end to walk to a quieter extraction for the bonus XP.",
    ],
    cautions: [
      "Footsteps echo in quiet buildings, stop at stairwells and listen before moving.",
      "Avoid shooting near windows, as that advertises your position to the entire area.",
    ],
    xpNote:
      "Not the fastest option, but very safe and consistent XP with useful keys and scrap on the side.",
  },
  // Generic fallback
  {
    id: "boss-generic",
    runType: "Boss hunt",
    map: "Buried City",
    modifier: "Any",
    title: "Generic boss hunt pattern",
    summary:
      "Look for heavy ARC spawns on your current map and loop between them, maximising damage on each boss.",
    keyActions: [
      "Identify two or three heavy spawn areas and rotate between them.",
      "Use explosives and heavy weapons for burst damage, but do not skip the final health that still gives damage XP.",
      "Always loot boss corpses fully before you move on.",
    ],
    cautions: [
      "Do not tunnel vision on a single boss if multiple players are clearly converging on it.",
    ],
    xpNote: "Baseline boss hunting plan when no specific route is defined.",
  },
  // Blue Gate - Loot run during Uncovered Caches
  {
    id: "loot-bluegate-uncovered",
    runType: "Loot run",
    map: "Blue Gate",
    modifier: "Uncovered caches",
    title: "Blue Gate cache sprint",
    summary:
      "Use the tunnel network to chain uncovered caches while avoiding most surface combat.",
    keyActions: [
      "Enter Blue Gate through a tunnel passage and route between known cache rich side rooms.",
      "Listen for ticking and quickly open uncovered caches before they explode.",
      "Prioritise high value items and keys, then rotate deeper into the tunnels instead of returning to the surface.",
    ],
    cautions: [
      "Avoid staying in open shafts where other players can easily ambush you from above.",
      "Do not linger near a cache for too long once it is ticking loudly, it can still kill you if it detonates.",
    ],
    xpNote:
      "Efficient solo XP and loot with low direct combat as you gain scavenging XP from multiple caches.",
    tags: ["Blue Gate", "Uncovered Caches", "Loot run"],
  },
  // Blue Gate - Loot run during Electromagnetic Storm
  {
    id: "loot-bluegate-storm",
    runType: "Loot run",
    map: "Blue Gate",
    modifier: "Electromagnetic storm",
    title: "Storm shelter tunnel loop",
    summary:
      "Hide from lightning in Blue Gate tunnels, looting key rooms while the surface is a death trap.",
    keyActions: [
      "Stay underground whenever possible during the storm and use side rooms for cover when lightning hits.",
      "Target the Confiscation Room or other high value tunnel rooms if you have the right keys.",
      "Use short sprints between tunnel entrances only when strikes are not telegraphed nearby.",
    ],
    cautions: [
      "Do not cross open valleys when the storm is active unless absolutely necessary.",
      "Expect other solos to be hiding in tunnels as well, check corners and listen carefully before pushing forward.",
    ],
    xpNote:
      "High XP potential thanks to boosted event rewards while keeping lightning risk manageable underground.",
    tags: ["Blue Gate", "Electromagnetic Storm", "Loot run"],
  },
  // Blue Gate - Boss hunt when Matriarch is present
  {
    id: "boss-bluegate-matriarch",
    runType: "Boss hunt",
    map: "Blue Gate",
    modifier: "Matriarch sighting",
    title: "Opportunistic Matriarch support",
    summary:
      "Join the Matriarch fight from safe angles, contributing damage and looting safely without taking centre stage.",
    keyActions: [
      "Locate the Matriarch from the event icon and sound, then approach from a flank rather than the main path.",
      "Use long range or heavy weapons to hit exposed weak points whenever other Raiders have its attention.",
      "Once the Matriarch falls, grab any available components or loot quickly and disengage before the remaining players turn on each other.",
    ],
    cautions: [
      "Never stand in the open while the Matriarch's rockets or mortars are targeting your area.",
      "Do not greed for every drop, take one or two key pieces and focus on surviving.",
    ],
    xpNote:
      "Huge XP spike if you survive the fight, but very high risk for a solo player.",
    tags: ["Blue Gate", "Matriarch", "Boss hunt"],
  },
  // Dam - Stealth farm during Husk Graveyard
  {
    id: "stealth-dam-husks",
    runType: "Stealth farm",
    map: "The Dam",
    modifier: "Husk graveyard",
    title: "Dam husk salvage walk",
    summary:
      "Walk a quiet loop through Dam Battlegrounds breaching ARC husks for parts and XP with minimal open combat.",
    keyActions: [
      "Plan a loop that hits several known husk clusters and stay off the main roads.",
      "Time your breaches so you avoid the electric stun pulses, then loot quickly.",
      "Safe slot high value drivers and components before you risk pushing deeper.",
    ],
    cautions: [
      "Even during husk events, a few live ARCs and players still roam, so do not treat the map as completely safe.",
      "Avoid standing in the open while you check inventory or rearrange loot.",
    ],
    xpNote:
      "Steady solo income and XP from salvage with relatively low danger compared to boss events.",
    tags: ["The Dam", "Husk Graveyard", "Stealth"],
  },
  // Buried City - Loot run during Lush Blooms
  {
    id: "loot-buried-lush",
    runType: "Loot run",
    map: "Buried City",
    modifier: "Lush blooms",
    title: "Market garden harvest",
    summary:
      "Short loops through food rich districts to gather fruit and trade goods during Lush Blooms.",
    keyActions: [
      "Route through markets, courtyards and any known food basket locations.",
      "Fill your backpack with high value fruit and consumables instead of chasing fights.",
      "Extract early and often to bank coins from selling surplus food.",
    ],
    cautions: [
      "Some players will ignore the event, so stay ready for random PvP around common POIs.",
      "Do not wander far into high threat ARC areas just to chase one more basket.",
    ],
    xpNote:
      "Not the fastest XP, but strong for funding gear and safe loadouts for harder events.",
    tags: ["Buried City", "Lush Blooms", "Loot run"],
  },
  // Spaceport - Loot run during Hidden Bunker (updated)
  {
    id: "loot-spaceport-bunker-solo",
    runType: "Loot run",
    map: "Spaceport",
    modifier: "Hidden bunker event",
    title: "Late entry bunker sweep",
    summary:
      "Treat Hidden Bunker as a high risk bonus. Let others open and fight, then rotate in late to clear side rooms and extract.",
    keyActions: [
      "Begin with a normal Seed Vault or warehouse sweep while watching for bunker activation.",
      "Once the bunker door is open and gunfire slows, approach from a quieter angle and check side rooms first.",
      "Take only what you can carry safely and leave through the least contested extract.",
    ],
    cautions: [
      "Avoid entering the bunker during the first chaotic minutes when squads are fighting at the entrance.",
      "Be ready to abandon the bunker if you hear multiple players pushing in behind you.",
    ],
    xpNote:
      "Can add a burst of extra XP and loot to a standard Spaceport run if you pick your moment carefully.",
    tags: ["Spaceport", "Hidden Bunker", "Loot run"],
  },
  // Stella Montis - Stealth farm (Night Raid)
  {
    id: "stealth-stella-night",
    runType: "Stealth farm",
    map: "Stella Montis",
    modifier: "Night raid",
    title: "Stella Montis shadow sweep",
    summary:
      "Slow, careful indoor clear of Stella Montis using darkness and tight corridors to your advantage.",
    keyActions: [
      "Pick a single floor or wing and clear it room by room instead of roaming the whole facility.",
      "Use doors and barricades to control lines of sight and seal off angles behind you.",
      "Loot every android, locker and crate you pass, then rotate to a quieter extraction once your bag is full.",
    ],
    cautions: [
      "New ARC types like Shredders and turrets hit very hard in close quarters, so never push blindly into long corridors.",
      "Sound travels well indoors, so stop and listen between rooms to catch other raiders before they catch you.",
    ],
    xpNote:
      "High XP and loot density if you survive, but heavily punishing if you get cornered.",
    tags: ["Stella Montis", "Night Raid", "Stealth"],
  },
  // Stella Montis - Loot run (standard)
  {
    id: "loot-stella-standard",
    runType: "Loot run",
    map: "Stella Montis",
    modifier: "Standard",
    title: "Upper floor loot strip",
    summary:
      "Hit a focused path through high yield rooms on one level of Stella Montis instead of trying to clear the entire complex.",
    keyActions: [
      "Enter from a side entrance and move through a handful of known loot rooms such as labs and storage.",
      "Ignore unnecessary fights and close doors behind you to slow any pursuers.",
      "Once your bag is heavy with rare loot, take a safe staircase or lift to a quieter extraction.",
    ],
    cautions: [
      "Do not overcommit to long stair fights where you can be shot from above and below.",
      "Always leave a clear fallback path in case you run into a squad in a narrow corridor.",
    ],
    xpNote:
      "Good XP to time ratio thanks to very dense loot and ARC spawns, as long as you avoid getting trapped.",
    tags: ["Stella Montis", "Loot run"],
  },
  // Dam - Stealth farm, standard conditions with POI route
  {
    id: "stealth-dam-standard-poi",
    runType: "Stealth farm",
    map: "The Dam",
    modifier: "Standard",
    title: "Quiet Dam loop - Scrapyard and swamp",
    summary:
      "Low pressure Dam route that focuses on quest friendly POIs and quiet loot rather than hot Control Tower fights.",
    keyActions: [
      "From your spawn, angle towards the southern Scrapyard and stay in cover to avoid early Control Tower traffic.",
      "Sweep Scrapyard cars and containers for quest items, rusted tools and weapon cases, then push into the trees rather than the road.",
      "Cut across to South Swamp Outpost and carefully clear the main cylinder building and any side huts for journals, containers and field depots.",
      "If you are still healthy and have space, rotate north west towards Ruby Residence for a quick pass through the flats before extracting.",
    ],
    cautions: [
      "Scrapyard can be busier than it looks if Broken Monument or similar quests are active so listen for other Raiders and ARCs before committing.",
      "South Swamp Outpost is a common quest location so expect at least one other player pathing through most raids.",
      "Ruby Residence sits on the outer edge but players often visit it for blueprints and toasters so do not stand in windows while sorting loot.",
    ],
    xpNote:
      "Good steady XP from salvage, containers and light ARC kills without ever going near the main Dam meat grinder.",
    tags: ["The Dam", "Stealth farm", "Scrapyard", "South Swamp Outpost"],
    poiRoute: [
      {
        name: "Scrapyard",
        purpose: "Materials",
        notes:
          "Work the southern car rows and scrap piles for rusted tools, Broken Monument quest items and mechanical scrap while staying near cover.",
      },
      {
        name: "South Swamp Outpost",
        purpose: "Quest progress",
        notes:
          "Clear the central cylinder building for journals, documents and field depot objectives, then hit outer shacks if it is quiet.",
      },
      {
        name: "Ruby Residence",
        purpose: "Blueprint farm",
        notes:
          "Pass through a single apartment block for Raider containers, mementos and toaster spawns then leave before other players rotate in.",
      },
      {
        name: "Swamp Extraction",
        purpose: "Extraction",
        notes:
          "Watch the tree line and shipping containers for campers before calling the lift, then use smoke or hard cover while the cat meows.",
      },
    ],
  },
  // Dam - Loot run, standard high value route with POI route
  {
    id: "loot-dam-standard-poi",
    runType: "Loot run",
    map: "The Dam",
    modifier: "Standard",
    title: "Dam high value strip - Control Tower to domes",
    summary:
      "Fast but risky Dam route that chains the best industrial and residential loot rooms before exiting through a safer extract.",
    keyActions: [
      "Start at the lower levels of Control Tower or Research & Administration and pick through offices, tech rooms and server spaces for high tier loot.",
      "Move through Dam Surveillance Room and the upper Control Tower floors, clearing ARC patrols and checking weapon cases and safes.",
      "Drop towards Water Treatment Control and Hydroponic Dome Complex, looting the control room, maintenance catwalks and central dome floor.",
      "If you have space and it sounds quiet, finish with a short stop at Pale Apartments or Pattern House for a quick pass through residential loot before extracting.",
    ],
    cautions: [
      "Control Tower and Research & Administration are very popular openers so be ready for early PvP and use grenades on clustered ARCs.",
      "Hydroponic Dome Complex is open and loud so keep an eye on the balconies and high walkways for other Raiders.",
      "Pale Apartments, Ruby Residence and Pattern House all attract blueprint hunters so treat them as contested even late in the raid.",
    ],
    xpNote:
      "Very strong coin and XP rate if you survive, but you are travelling through almost every hot zone on the map.",
    tags: ["The Dam", "Loot run", "Control Tower", "Hydroponic Dome"],
    poiRoute: [
      {
        name: "Control Tower / Research & Administration",
        purpose: "High value loot",
        notes:
          "Hit offices, armouries and tech rooms for weapon cases, safes and rare materials. Expect both ARCs and players within the first few minutes.",
      },
      {
        name: "Dam Surveillance Room",
        purpose: "High value loot",
        notes:
          "Quick indoor stop for electronics and cases that keeps you close to cover and stairwells if a squad pushes in.",
      },
      {
        name: "Water Treatment Control",
        purpose: "Materials",
        notes:
          "Clear the lower floors for rusted tools and industrial crates, keeping line of sight to a fast fallback path.",
      },
      {
        name: "Hydroponic Dome Complex",
        purpose: "High value loot",
        notes:
          "Circle the dome floor and catwalks for crates, resource nodes and event objectives, then leave by the quietest side exit.",
      },
      {
        name: "Pale Apartments or Pattern House",
        purpose: "Blueprint farm",
        notes:
          "Dip into a single stairwell and floor for residential containers and blueprint friendly drops rather than clearing the whole block.",
      },
      {
        name: "Swamp Extraction or North Complex Elevator",
        purpose: "Extraction",
        notes:
          "Pick the extract that avoids crossing open ground. If the Swamp lift is crowded, consider wrapping to North Complex instead.",
      },
    ],
  },
  // Buried City - Loot run with POI route
  {
    id: "loot-buried-standard-poi",
    runType: "Loot run",
    map: "Buried City",
    modifier: "Standard",
    title: "Buried City tower and station sweep",
    summary:
      "Residential and transport focused Buried City loop that stacks coins, blueprints and scrap without wandering the whole desert.",
    keyActions: [
      "Open at Grandioso Apartments and work upwards through the towers, checking flats and stairwells for weapon cases and toasters.",
      "Use the internal lift shaft zipline to reach the rooftop blueprint room and loot the high value containers there.",
      "Drop towards Marano Station or the nearby parking garage at Marano Park to clear train interiors, platforms and quest containers.",
      "Finish by cutting through one or two quieter side streets or plazas on the way to your chosen extract rather than diving back into main roads.",
    ],
    cautions: [
      "Grandioso Apartments are a known blueprint and quest spot so assume other Raiders are already on the roof or in the stairwells.",
      "The rooftop zipline room is loud and exposed so loot fast and leave rather than lingering to sort your inventory.",
      "Marano Station can be a death trap if you start breaching loudly during peak times, so listen for gunfire before committing.",
    ],
    xpNote:
      "Excellent coin and blueprint potential per run with manageable risk if you keep your fights short and leave once your bag is full.",
    tags: ["Buried City", "Loot run", "Grandioso Apartments"],
    poiRoute: [
      {
        name: "Grandioso Apartments",
        purpose: "High value loot",
        notes:
          "Clear a single tower at a time, looting fridges, wardrobes and weapon cases while staying aware of the opposite tower windows.",
      },
      {
        name: "Grandioso Rooftop zipline room",
        purpose: "Blueprint farm",
        notes:
          "Use the lift shaft zipline to reach the platform just below the zipline end and loot the blueprint friendly containers before repositioning.",
      },
      {
        name: "Marano Park Parking Garage",
        purpose: "Quest progress",
        notes:
          "Drop into the sand filled lower levels to search marked cases and bags for quest items and extra containers.",
      },
      {
        name: "Marano Station",
        purpose: "High value loot",
        notes:
          "Sweep train cars and station halls for crates and Raider gear but be ready to leave quickly if you hear other players breaching.",
      },
    ],
  },
  // Spaceport - Loot run with POI route
  {
    id: "loot-spaceport-standard-poi",
    runType: "Loot run",
    map: "Spaceport",
    modifier: "Standard",
    title: "Spaceport freight crawl",
    summary:
      "Industrial Spaceport loop that runs through the best warehouse and container POIs then exits before launch events get too hot.",
    keyActions: [
      "Route through Vehicle Maintenance and the outer checkpoint rooms for toolboxes, gas canisters and early cases.",
      "Move into Container Storage and Shipping Warehouse, clearing rows of containers and mezzanines for weapon cases and rare materials.",
      "If it is quiet, push towards Rocket Assembly or the Pipe Walk for additional containers and keycard doors.",
      "Extract through a quieter metro or hatch rather than staying for full Launch Tower fights unless your loadout and time budget are strong.",
    ],
    cautions: [
      "Container Storage and Shipping Warehouse are extremely popular so use vertical cover and do not stand on catwalks for long.",
      "Rocket Assembly and Launch Tower lines of sight are long so smoke and hard cover are more important than usual.",
      "Many keys are used in this area, so listen for doors and breaches that reveal players arriving mid route.",
    ],
    xpNote:
      "High coin and XP per hour once you know the container layouts and safe angles.",
    tags: ["Spaceport", "Loot run", "Container Storage"],
    poiRoute: [
      {
        name: "Vehicle Maintenance",
        purpose: "Materials",
        notes:
          "Loot red toolboxes and parts crates around vehicle bays, then rotate before lingering in the open floor space.",
      },
      {
        name: "Outer Checkpoint Rooms",
        purpose: "Safe loot",
        notes:
          "Sweep small offices and security rooms for consumables and light containers while staying near doors for a fast exit.",
      },
      {
        name: "Container Storage",
        purpose: "High value loot",
        notes:
          "Work one lane at a time, checking stacked containers and side shacks for cases. Keep an ear out for footsteps on metal above you.",
      },
      {
        name: "Shipping Warehouse",
        purpose: "High value loot",
        notes:
          "Clear shelves and raised walkways for crates and weapon cases, then leave through a side door instead of the main loading bay.",
      },
      {
        name: "Rocket Assembly or Pipe Walk",
        purpose: "Blueprint farm",
        notes:
          "Only add this step if the area is quiet. Hit a small section for cases and key rooms then drop towards a hatch or metro extract.",
      },
    ],
  },
  // Blue Gate - Loot run with POI route
  {
    id: "loot-bluegate-standard-poi",
    runType: "Loot run",
    map: "Blue Gate",
    modifier: "Standard",
    title: "Blue Gate village and underground sweep",
    summary:
      "High risk, high reward loop that combines Blue Gate Village housing, a key locked sector and the underground puzzle rooms.",
    keyActions: [
      "Start in or move towards the Village and work a ring around the outer houses for basic loot while checking for players on the main street.",
      "Use the Blue Gate Village key if you have it to open the gated sector and loot the dense apartments and courtyards inside.",
      "Drop into the underground route beneath the village and follow corridors towards battery and fusebox puzzle rooms for epic parts.",
      "Finish by coming up near Warehouse Complex or Overlook Shaft and choose an extract that does not force you across open valley ground.",
    ],
    cautions: [
      "Village is both a blueprint and food farming hotspot so plan for early PvP and arc patrols at every corner.",
      "The keyed sector is very profitable but often camped. Do not stand in doorways while you unlock and open the gate.",
      "Underground puzzle rooms can trap you if you carry fuel cells alone so always keep an eye on your exits.",
    ],
    xpNote:
      "Top tier XP and loot, but best attempted with a comfortable loadout and some map knowledge.",
    tags: ["Blue Gate", "Loot run", "Village"],
    poiRoute: [
      {
        name: "Village outskirts",
        purpose: "Safe loot",
        notes:
          "Circle the outer houses and gardens for fridges and wardrobes while listening for gunfire and doors slamming deeper in the village.",
      },
      {
        name: "Village keyed sector",
        purpose: "High value loot",
        notes:
          "Open the gated quarter with the Village key and sweep a few rooms for concentrated loot, then close doors behind you as you move.",
      },
      {
        name: "Underground route",
        purpose: "High value loot",
        notes:
          "Follow tunnels beneath the village, checking side chambers for crates, cases and occasional blueprint friendly rooms.",
      },
      {
        name: "Battery or fusebox puzzle room",
        purpose: "Materials",
        notes:
          "Bring or steal fuel cells, open red or locked rooms and loot quickly, then leave before other players converge on the sound.",
      },
      {
        name: "Warehouse Complex or Overlook Shaft",
        purpose: "Extraction",
        notes:
          "Use these areas as exit staging grounds, clearing a few last containers and then leaving once you hear other players rotating.",
      },
    ],
  },
  // Stella Montis - Loot run with POI route
  {
    id: "loot-stella-standard-poi",
    runType: "Loot run",
    map: "Stella Montis",
    modifier: "Standard",
    title: "Stella Montis research run",
    summary:
      "Dense indoor loop through the strongest loot rooms in Stella Montis, with a focus on quick extracts after your bag is full.",
    keyActions: [
      "From Lobby or Loading Bay, push towards Medical Research and clear labs, treatment rooms and storage cupboards for containers and android bodies.",
      "Rotate into Assembly Workshops and work one side of the floor at a time to avoid being pinned between ARCs and other raiders.",
      "If the path is clear, drop into Cultural Archives for a quick pass through museum and archive rooms.",
      "Exit via Loading Bay extraction or the Airshaft near Sandbox and Seed Vault instead of trying to hold central corridors.",
    ],
    cautions: [
      "Shredders, turrets and Bastions make long corridors very punishing so round corners slowly and lean on cover.",
      "Lobby is often contested at the start of a raid so clear it carefully before you start looting and moving deeper.",
      "Healing is limited so avoid chip damage and pull back to safe rooms to patch up.",
    ],
    xpNote:
      "Very strong XP and loot density for every minute spent in raid if you avoid unnecessary fights and move with intent.",
    tags: ["Stella Montis", "Loot run", "Medical Research"],
    poiRoute: [
      {
        name: "Medical Research",
        purpose: "High value loot",
        notes:
          "Sweep operating rooms and labs for androids, medical crates and rare materials, using side rooms as safe pockets.",
      },
      {
        name: "Assembly Workshops",
        purpose: "High value loot",
        notes:
          "Check tool benches, storage rooms and raised walkways for crates and cases, clearing one direction at a time.",
      },
      {
        name: "Cultural Archives",
        purpose: "Safe loot",
        notes:
          "Pick through display cases and archive stacks for extra loot while watching long sightlines across the hall.",
      },
      {
        name: "Airshaft between Sandbox and Seed Vault",
        purpose: "Extraction",
        notes:
          "Use the Airshaft extract tucked between Sandbox and Seed Vault when possible, as it is easier to cover with only a couple of approaches.",
      },
    ],
  },
  // Stella Montis - Stealth farm with POI route
  {
    id: "stealth-stella-standard-poi",
    runType: "Stealth farm",
    map: "Stella Montis",
    modifier: "Standard",
    title: "Stella Montis quiet lower loop",
    summary:
      "Lower risk Stella Montis route that favours side wings and short pushes over holding central lanes.",
    keyActions: [
      "Start from Sandbox or Seed Vault and clear a small number of side rooms, focusing on containers and androids rather than full wing clears.",
      "Use back corridors to reach Loading Bay and tidy up tool benches and crates there while staying out of the main lines of fire.",
      "Rotate towards Cultural Archives or a quieter edge of Lobby for a final pocket of loot before returning to the Airshaft or Lobby extraction.",
      "Move slowly and close doors behind you to control how many angles can see you at any given moment.",
    ],
    cautions: [
      "Narrow stairwells can trap you between players and ARCs, so avoid pushing up or down if there is gunfire on both ends.",
      "Shredders are relentless so always have a route in mind that breaks their line of sight.",
      "Sound travels well indoors so pausing to listen between pushes will keep you alive more than any perk.",
    ],
    xpNote:
      "Good XP for a more cautious solo player who wants to learn the map without committing to constant straight fights.",
    tags: ["Stella Montis", "Stealth farm"],
    poiRoute: [
      {
        name: "Sandbox",
        purpose: "Safe loot",
        notes:
          "Work side rooms and labs at the edge of Sandbox for a gentle start and a feel for how contested the raid is.",
      },
      {
        name: "Seed Vault",
        purpose: "High value loot",
        notes:
          "Check vault chambers and side storage for crates and rare items, then slip back out before other players arrive.",
      },
      {
        name: "Loading Bay",
        purpose: "Materials",
        notes:
          "Loot tools and containers in the bay while keeping an eye on access ramps and catwalks that connect to more dangerous central areas.",
      },
      {
        name: "Airshaft between Sandbox and Seed Vault",
        purpose: "Extraction",
        notes:
          "If things get too hot, cut back to the Airshaft extract which has limited approach angles and is easy to defend while the lift runs.",
      },
    ],
  },
];

