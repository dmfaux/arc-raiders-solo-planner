// data/spawns.ts

import { MapId, SpawnRegion } from "../types";

export const spawnRegions: SpawnRegion[] = [
  // THE DAM
  {
    id: "dam-victory-ridge-north",
    map: "The Dam",
    label: "Victory Ridge north road",
    exampleCallouts: ["Victory Ridge", "West Broken Ridge", "East Broken Ridge"],
    notes:
      "Any spawn along the top road overlooking the Dam, usually near the broken ridges and Victory Ridge huts.",
  },
  {
    id: "dam-swamp-west",
    map: "The Dam",
    label: "Western Swamp & Apartments",
    exampleCallouts: [
      "Pale Apartments",
      "Old Battleground",
      "South Swamp Outpost",
      "Central Swamp Lift",
    ],
    notes:
      "Spawns that look into the tree heavy swamp on the west side, around apartments, outposts and the old battlefield.",
  },
  {
    id: "dam-dam-complex-centre",
    map: "The Dam",
    label: "Dam Complex & Control Tower",
    exampleCallouts: [
      "Loading Bay",
      "Maintenance",
      "Control Tower",
      "Research & Administration",
    ],
    notes:
      "Spawns close to the actual Dam superstructure, with the tower, domes and admin buildings in view.",
  },
  {
    id: "dam-red-lakes-east",
    map: "The Dam",
    label: "Red Lakes & Testing Annex",
    exampleCallouts: [
      "Red Lakes Bluff",
      "Red Lakes Balcony",
      "Testing Annex",
      "Electrical Tower",
    ],
    notes:
      "Eastern spawns that look over the cracked lake beds and the Testing Annex side of the map.",
  },
  {
    id: "dam-south-industrial",
    map: "The Dam",
    label: "Substation & Scrapyard south",
    exampleCallouts: [
      "Electrical Substation",
      "Scrap Yard",
      "Willow",
      "Small Creek",
    ],
    notes:
      "Southern edge spawns around towers, substations and the lower industrial yards.",
  },

  // SPACEPORT
  {
    id: "spaceport-alberi-west",
    map: "Spaceport",
    label: "Alberi Hills & Fuel west",
    exampleCallouts: [
      "Water Towers",
      "Fuel Depot",
      "Jiangsu Warehouse",
      "Fuel Processing",
    ],
    notes:
      "West side spawns out by Alberi Hills, fuel tanks and warehouses before you reach the main Spaceport.",
  },
  {
    id: "spaceport-trench-and-hangars-north",
    map: "Spaceport",
    label: "Trench Towers & Hangars north",
    exampleCallouts: [
      "West Hangar",
      "East Hangar",
      "North Trench Tower",
      "South Trench Tower",
      "The Trench",
    ],
    notes:
      "Spawns along the northern ridge and hangars that look down into the trench complex.",
  },
  {
    id: "spaceport-core-central",
    map: "Spaceport",
    label: "Spaceport core",
    exampleCallouts: [
      "Arrival Building",
      "Departure Building",
      "Car Park",
      "Launch Towers",
    ],
    notes:
      "Central spawns in or just outside the main terminal buildings and launch pads.",
  },
  {
    id: "spaceport-east-plains",
    map: "Spaceport",
    label: "East Plains & container yards",
    exampleCallouts: [
      "East Container Yard",
      "Container Storage",
      "Communications Tower",
      "East Plains Warehouse",
    ],
    notes:
      "Eastern spawns with lots of containers, small buildings and the communications tower nearby.",
  },
  {
    id: "spaceport-la-chiesa-south",
    map: "Spaceport",
    label: "La Chiesa & service south",
    exampleCallouts: [
      "La Chiesa",
      "Storage",
      "Staff Parking",
      "Security Checkpoint",
      "Electrical Substation",
    ],
    notes:
      "Southern edge spawns near La Chiesa town, staff parking and the security checkpoint roads.",
  },

  // BURIED CITY
  {
    id: "buried-outskirts-west",
    map: "Buried City",
    label: "Outskirts west",
    exampleCallouts: ["Wardhouse", "Outskirts", "Abandoned Highway Camp"],
    notes:
      "Rough outer edge spawns on the western side, looking into Wardhouse and the dunes.",
  },
  {
    id: "buried-west-village",
    map: "Buried City",
    label: "West Village & Grandioso",
    exampleCallouts: [
      "West Village",
      "Grandioso Apartments",
      "Piazza Roma",
    ],
    notes:
      "Spawns that drop you around the dense west village blocks and the large Grandioso apartment complex.",
  },
  {
    id: "buried-new-district-north",
    map: "Buried City",
    label: "New District north",
    exampleCallouts: [
      "Hospital",
      "Library",
      "Parking Garage",
      "Space Travel Research",
    ],
    notes:
      "Northern new build area, with taller buildings and more modern streets.",
  },
  {
    id: "buried-old-town-core",
    map: "Buried City",
    label: "Old Town & central plazas",
    exampleCallouts: [
      "Old Town",
      "Plaza Rosa",
      "Town Hall",
      "Piazza Arbusto",
    ],
    notes:
      "Central and southern spawns that face the tight old town streets and main plazas.",
  },
  {
    id: "buried-east-ruins",
    map: "Buried City",
    label: "East ruins & church",
    exampleCallouts: [
      "Buried Prophets",
      "Church Ruin",
      "Dune’s End",
      "Casa Station",
    ],
    notes:
      "Eastern spawns pointing towards the ruined church and dune heavy outskirts.",
  },

  // BLUE GATE
  {
    id: "bluegate-village-north",
    map: "Blue Gate",
    label: "Village north",
    exampleCallouts: ["Village", "Barnie Clearing"],
    notes:
      "Northern spawns above or around the cliff village, with forest behind you.",
  },
  {
    id: "bluegate-forest-west",
    map: "Blue Gate",
    label: "Forest & Raider’s Refuge",
    exampleCallouts: [
      "Raider’s Refuge",
      "Trapper’s Glade",
      "Abandoned Wreckage",
    ],
    notes:
      "Western treeline and ravine spawns that look into the forest and raider camp areas.",
  },
  {
    id: "bluegate-gate-approach-core",
    map: "Blue Gate",
    label: "Gate Approach",
    exampleCallouts: [
      "Checkpoint",
      "Outer Gates",
      "Warehouse Complex",
      "Gate Control Room",
    ],
    notes:
      "Spawns near the central gate structure and main approach lanes.",
  },
  {
    id: "bluegate-farmlands-south",
    map: "Blue Gate",
    label: "Farmlands & Ancient Fort",
    exampleCallouts: [
      "Olive Grove",
      "Ruined Homestead",
      "Ancient Fort",
    ],
    notes:
      "Southern edge spawns among fields and ruins leading down to the coast and fort.",
  },
  {
    id: "bluegate-mountains-east",
    map: "Blue Gate",
    label: "Mountains & east housing",
    exampleCallouts: [
      "Pilgrim’s Peak",
      "Data Vault",
      "Abandoned Housing",
      "Ridgefort",
    ],
    notes:
      "Eastern high ground spawns around mountain paths and scattered housing.",
  },

  // STELLA MONTIS
  {
    id: "stella-medical-west",
    map: "Stella Montis",
    label: "Medical Research wing",
    exampleCallouts: ["Medical Research", "Viewing Dock"],
    notes:
      "Spawns at the far west of Stella, entering through the Medical Research labs and dock areas.",
  },
  {
    id: "stella-assembly-north",
    map: "Stella Montis",
    label: "Assembly & workshops",
    exampleCallouts: [
      "Assembly Workshops",
      "Assembly Line",
      "Central Corridor (north)",
    ],
    notes:
      "Northern industrial decks with Assembly lines and workshop floors.",
  },
  {
    id: "stella-lobby-north-east",
    map: "Stella Montis",
    label: "Lobby & security side",
    exampleCallouts: ["Lobby", "Security Bridge"],
    notes:
      "Spawns that drop you into the large lobby complex and its raised security bridge.",
  },
  {
    id: "stella-comms-atrium-core",
    map: "Stella Montis",
    label: "Communications & Atrium",
    exampleCallouts: ["Communications", "Atrium", "Cafeteria"],
    notes:
      "Central interior hubs where communications and the big open atrium sit back to back.",
  },
  {
    id: "stella-business-archives-east",
    map: "Stella Montis",
    label: "Business Centre & Cultural Archives",
    exampleCallouts: [
      "Business Centre",
      "Auditorium",
      "Business Lounge",
      "Cultural Archives",
      "Storage Room",
    ],
    notes:
      "Eastern curved wing with offices, auditorium and the Cultural Archives halls.",
  },
];

export const spawnRegionsByMap: Record<MapId, SpawnRegion[]> = {
  "The Dam": spawnRegions.filter((s) => s.map === "The Dam"),
  Spaceport: spawnRegions.filter((s) => s.map === "Spaceport"),
  "Buried City": spawnRegions.filter((s) => s.map === "Buried City"),
  "Blue Gate": spawnRegions.filter((s) => s.map === "Blue Gate"),
  "Stella Montis": spawnRegions.filter((s) => s.map === "Stella Montis"),
};