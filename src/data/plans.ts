import { RunType, MapId, MapModifier } from "../types";

export interface PoiStop {
  name: string;
  purpose: string;
  notes: string;
}

export interface AdaptivePlan {
  id: string;
  runType: RunType;
  map: MapId;
  modifier: MapModifier | "Any";
  /** Optional spawn id, or "Any" for spawn agnostic */
  spawn?: string;
  title: string;
  summary: string;
  xpNote: string;
  keyActions: string[];
  cautions: string[];
  poiRoute?: PoiStop[];
}

export interface SpawnPoint {
  id: string;
  map: MapId;
  label: string;
  description: string;
}

export const spawnPoints: SpawnPoint[] = [
  // Buried City
  {
    id: "buried-santa-maria",
    map: "Buried City",
    label: "Santa Maria rooftops",
    description:
      "High rooftop start overlooking Santa Maria and Marano Park. Strong for boss loops and mid risk loot runs along balconies and streets.",
  },
  {
    id: "buried-grandioso",
    map: "Buried City",
    label: "Grandioso offices",
    description:
      "Office and apartment mix with quick access to tower lines and Marano Park. Excellent for controlled loot runs.",
  },
  // Spaceport
  {
    id: "spaceport-containers",
    map: "Spaceport",
    label: "Container Storage edge",
    description:
      "Rows of shipping containers with strong cover and quick access to Rocket Assembly. Designed for boss kiting and safe rotations.",
  },
  {
    id: "spaceport-terminal",
    map: "Spaceport",
    label: "Terminal forecourt",
    description:
      "Open start near parking and terminal buildings. Best used for fast loot sweeps then rotating into safer container lanes.",
  },
  // The Dam
  {
    id: "dam-control-tower",
    map: "The Dam",
    label: "Control Tower access",
    description:
      "Elevated control building with sightlines over dam structures. Good for cautious boss and mixed ARC fights.",
  },
  {
    id: "dam-residential",
    map: "The Dam",
    label: "Residential side",
    description:
      "Apartment and housing blocks with lots of interiors. Suits stealth and medium risk loot routes.",
  },
  // Blue Gate
  {
    id: "blue-village",
    map: "Blue Gate",
    label: "Village outskirts",
    description:
      "Edge of Blue Gate village with short lanes into streets and tunnels. Strong for stealth farming and low risk loot runs.",
  },
  {
    id: "blue-tunnel-mouth",
    map: "Blue Gate",
    label: "Tunnel mouth",
    description:
      "Spawn near the lower tunnels. Great for controlled stealth clears and ARC funnel fights.",
  },
  // Stella Montis
  {
    id: "stella-medical",
    map: "Stella Montis",
    label: "Medical Research wing",
    description:
      "Dense interior spawn with labs and side rooms. Ideal for slow, safe stealth farming and key hunts.",
  },
  {
    id: "stella-assembly",
    map: "Stella Montis",
    label: "Assembly workshops",
    description:
      "Industrial wing with heavier ARCs and machinery. Good for mixed boss and loot play if you know the lines.",
  },
];

export const adaptivePlans: AdaptivePlan[] = [
  // BURIED CITY – BOSS
  {
    id: "buried-boss-santa-standard",
    runType: "Boss hunt",
    map: "Buried City",
    modifier: "Standard",
    spawn: "buried-santa-maria",
    title: "Santa Maria boss loop",
    xpNote: "High XP spikes from Bastions and Bombardiers near Santa Maria.",
    summary:
      "From Santa Maria rooftops you work the streets and plazas between Santa Maria, Marano Park and the nearby tower lines, hunting heavy ARCs from height and cover.",
    keyActions: [
      "Open with a quick clear of nearby roof and balcony threats, then scan Marano Park and the streets below for heavy ARC audio.",
      "Use rooftops and balconies to chip Bastions and Bombardiers from the side, dropping down only when you need better angles.",
      "Rotate between Santa Maria, the park and Grandioso rather than chasing single audio cues across the whole city.",
      "After each boss or heavy ARC, loot every corpse segment then break line of sight and move to the next leg of the loop.",
    ],
    cautions: [
      "Do not overstay on exposed rooftops; take a lane, take your shots, then reposition.",
      "Avoid being caught between tower snipers and ground bosses. If both are active, reset the fight from a safer angle.",
      "If multiple squads converge on the same boss, focus on add control and survival instead of forcing a duel.",
    ],
    poiRoute: [
      {
        name: "Santa Maria roof block",
        purpose: "Initial boss scan and safe elevation",
        notes:
          "Clear immediate ARCs and use the height to mark Bastions and Bombardiers in nearby streets.",
      },
      {
        name: "Marano Park",
        purpose: "Open ground boss fights",
        notes:
          "Fight from trees, statues and low walls rather than the centre of the park.",
      },
      {
        name: "Grandioso and side apartments",
        purpose: "Boss clean up and extra loot",
        notes:
          "Rotate here once park dies down, picking off stragglers and looting interiors before you reset to Santa Maria.",
      },
    ],
  },
  {
    id: "buried-boss-any-night",
    runType: "Boss hunt",
    map: "Buried City",
    modifier: "Night raid",
    spawn: "Any",
    title: "Night city boss sweeps",
    xpNote:
      "Night Raid boosts boss and ARC presence but also raises the risk of ambush.",
    summary:
      "At night you focus on illuminated plazas and busy avenues where bosses and players naturally collide. Your goal is to arrive late and leave early.",
    keyActions: [
      "Shadow gunfire and bright lit areas instead of pushing in first. Let other squads wake up bosses and strip their armour.",
      "Use darkness to flank boss arenas and add packs rather than standing in the centre.",
      "Loot boss corpses under smoke whenever possible, then rotate along the darkest streets to your next angle.",
    ],
    cautions: [
      "Avoid standing in strong artificial lighting; you become an easy silhouette.",
      "Night Raid audio is noisy. Slow down more often to make sure you are not walking into multiple squads.",
      "Do not waste time hunting a single boss that has clearly moved far away. Reset your loop instead.",
    ],
  },

  // BURIED CITY – LOOT
  {
    id: "buried-loot-grandioso-standard",
    runType: "Loot run",
    map: "Buried City",
    modifier: "Standard",
    spawn: "buried-grandioso",
    title: "Grandioso apartment circuit",
    xpNote:
      "Slow but reliable XP from container and corpse taps with limited open ground.",
    summary:
      "From Grandioso you chain apartments, side offices and inner streets, touching as many interiors as possible before exiting via a nearby lift.",
    keyActions: [
      "Sweep Grandioso floors first, tapping every container and body even if they have already been looted.",
      "Spiral out into side apartments and offices, clearing one side of each street at a time.",
      "Use short street crossings to link building clusters instead of long exposed runs.",
      "Angle your loop so that you finish near a comfortable extraction and do not have to cross the whole map to leave.",
    ],
    cautions: [
      "Do not become stuck chasing loot deep into open plazas when gunfire warns you off.",
      "If you have already looted most interiors in a block, move on. Staying adds risk without much extra XP.",
      "Reset the loop if you lose most of your armour plates; you are a loot runner first, not a duellist.",
    ],
  },

  // SPACEPORT – BOSS
  {
    id: "spaceport-boss-containers-standard",
    runType: "Boss hunt",
    map: "Spaceport",
    modifier: "Standard",
    spawn: "spaceport-containers",
    title: "Container lane boss pulls",
    xpNote:
      "High XP if bosses path into the lanes, with good safety from solid cover.",
    summary:
      "From the Container Storage edge you lure bosses and heavy ARCs into the rows where cover is strongest and long sightlines are limited.",
    keyActions: [
      "Clear nearby small ARCs in the lanes so you are not flanked while fighting bosses.",
      "Tag Bastions and Bombardiers in adjacent yards and pull them into the container maze where you can break line of sight.",
      "Rotate between two or three deeper lanes to avoid being predictable to players.",
      "After each kill, sweep containers and corpses in that lane before crossing to the next.",
    ],
    cautions: [
      "Avoid fighting bosses in open loading yards where multiple angles can see you.",
      "Listen for other squads rotating along the top of the container stacks and be ready to disengage.",
      "Do not chase bosses too far towards Launch Tower unless you are ready to commit to that event.",
    ],
  },

  // SPACEPORT – LOOT
  {
    id: "spaceport-loot-terminal-standard",
    runType: "Loot run",
    map: "Spaceport",
    modifier: "Standard",
    spawn: "spaceport-terminal",
    title: "Terminal forecourt loot sweep",
    xpNote:
      "Medium XP from high density interior rooms if you keep moving and avoid long fights.",
    summary:
      "From the terminal forecourt you sweep through interior ticket halls, offices and garages before turning towards safer extraction routes.",
    keyActions: [
      "Clear the nearest terminal buildings first, tapping counters, lockers and offices.",
      "Use covered walkways and underpasses to move between structures.",
      "Skip bosses that spawn in wide forecourts; stick to interiors and near cover.",
      "Finish the run by cutting towards either Container Storage or a nearby extraction rather than crossing Launch Tower ground.",
    ],
    cautions: [
      "The forecourt is open and often busy. Do not linger in the centre if you hear fighting.",
      "Avoid chasing squads up into Launch Tower unless you are built and ready for the event.",
      "If grenade spam starts covering the forecourt, rotate away instead of forcing your route.",
    ],
  },

  // DAM – STEALTH
  {
    id: "dam-stealth-residential-standard",
    runType: "Stealth farm",
    map: "The Dam",
    modifier: "Standard",
    spawn: "dam-residential",
    title: "Residential block stealth clear",
    xpNote:
      "Reliable XP from slow, methodical clears of flats and corridors with low exposure.",
    summary:
      "From residential you own one side of the dam village at a time, clearing flats, stairwells and small courtyards while listening for other players rotating in.",
    keyActions: [
      "Clear one building fully before moving to the next so you are never flanked from behind.",
      "Close doors where possible so you hear them reopen behind you.",
      "Use windows and balconies to scout street movement without fully exposing yourself.",
      "After clearing two or three blocks, either repeat on the other side of the street or push towards a safe extraction.",
    ],
    cautions: [
      "Do not chase gunfire up towards Control Tower unless you deliberately switch to a boss run.",
      "Avoid staying in long outside corridors and walkways where you can be sniped from far away.",
      "Keep an eye on raid timer; stealth clears can quietly consume a whole raid.",
    ],
  },

  // STELLA – STEALTH
  {
    id: "stella-stealth-medical-standard",
    runType: "Stealth farm",
    map: "Stella Montis",
    modifier: "Standard",
    spawn: "stella-medical",
    title: "Medical wing slow sweep",
    xpNote:
      "Low to medium XP but very safe if you commit to room by room clearing.",
    summary:
      "From the Medical Research wing you clear one corridor and bank of rooms at a time, looting labs, offices and storage while avoiding long corridor crossfires.",
    keyActions: [
      "Work one side of a corridor at a time and avoid leaving uncleared rooms behind you.",
      "Use corners, pillars and equipment as frequent line breaks when trading with turrets or Shredders.",
      "Tap every locker, crate and corpse, even if team players have already taken the loot.",
      "If you hear a full squad crashing through the wing, shift sideways to another branch of the complex.",
    ],
    cautions: [
      "Never fight Shredders or turrets from deep, straight corridors.",
      "Sound travels strangely indoors. Do not assume a fight is far away just because it is muffled.",
      "The safest route is not always the fastest; accept slower levelling in exchange for near zero wipe risk.",
    ],
  },

  // GENERIC PLAN – ANY MAP, ANY SPAWN
  {
    id: "generic-loot-any-map",
    runType: "Loot run",
    map: "Buried City",
    modifier: "Any",
    spawn: "Any",
    title: "Generic interior loot chain",
    xpNote:
      "Fallback pattern when no bespoke route exists for your current setup.",
    summary:
      "When no detailed plan exists, chain together nearby interiors and short streets, focusing on container taps and safe ARCs rather than big boss plays.",
    keyActions: [
      "Identify three or four close buildings or POIs and chain them into a rough loop.",
      "Tap every container and corpse in reach and ignore out of the way boxes that require risky exposure.",
      "Avoid lingering in big open plazas or main roads; treat them as transitions, not farming grounds.",
    ],
    cautions: [
      "If the loop dries up, rotate to a neighbouring cluster instead of wandering aimlessly.",
      "Switch to a safer extraction once you feel your bag is worth saving or you run low on plates.",
    ],
  },
];