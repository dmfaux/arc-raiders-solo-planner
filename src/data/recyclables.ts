import { RecyclableArea, MapId, RecyclableDensity } from "../types";

/**
 * Recyclables farming areas in Arc Raiders.
 * 
 * Recyclables are items found throughout the map that can be broken down
 * into materials for crafting and upgrades. This data helps solo players
 * identify high value areas where recyclables spawn frequently.
 */
export const recyclableAreas: RecyclableArea[] = [
  // BURIED CITY
  {
    id: "buried-grandioso-recyclables",
    map: "Buried City",
    regionId: "buried-west-village",
    name: "Grandioso Apartments & Offices",
    density: "Very High",
    description:
      "Dense interior rooms with many containers, lockers and desks. Excellent for finding electronics, scrap metal and fabric recyclables.",
    approximateYield: "25-40 recyclables per full sweep",
    notes:
      "Sweep all floors systematically. Many recyclables spawn in office drawers and apartment storage areas. This area overlaps well with loot running routes.",
  },
  {
    id: "buried-old-town-recyclables",
    map: "Buried City",
    regionId: "buried-old-town-core",
    name: "Old Town Shops & Plazas",
    density: "High",
    description:
      "Tight streets with shops, market stalls and residential buildings. Good mix of electronics, consumables and fabric recyclables.",
    approximateYield: "18-30 recyclables per loop",
    notes:
      "Focus on ground floor shops and market areas. Upper floors have fewer recyclables but more loot containers.",
  },
  {
    id: "buried-new-district-recyclables",
    map: "Buried City",
    regionId: "buried-new-district-north",
    name: "New District Offices & Research",
    density: "High",
    description:
      "Modern buildings with labs, offices and parking garages. Strong for electronics and rare material recyclables.",
    approximateYield: "20-35 recyclables per sweep",
    notes:
      "Research buildings and parking garages have the highest density. Skip residential floors if you are short on time.",
  },
  {
    id: "buried-seed-vault-recyclables",
    map: "Buried City",
    name: "Seed Vault Complex",
    density: "Very High",
    description:
      "Large underground facility with multiple floors. Exceptional recyclables density, especially electronics and rare materials.",
    approximateYield: "35-50 recyclables per full clear",
    notes:
      "High risk area but unmatched recyclables yield. Best approached during quieter raid phases or with a stealth loadout.",
  },

  // SPACEPORT
  {
    id: "spaceport-terminal-recyclables",
    map: "Spaceport",
    regionId: "spaceport-core-central",
    name: "Terminal Buildings & Offices",
    density: "Very High",
    description:
      "Ticket halls, offices and back rooms in Arrival and Departure buildings. Excellent for electronics and consumable recyclables.",
    approximateYield: "28-42 recyclables per sweep",
    notes:
      "Focus on ticket counters, offices and staff areas. Skip the main concourse unless you need to pass through.",
  },
  {
    id: "spaceport-containers-recyclables",
    map: "Spaceport",
    regionId: "spaceport-east-plains",
    name: "Container Storage & Warehouses",
    density: "High",
    description:
      "Shipping containers and warehouse interiors. Good for scrap metal, electronics and fabric recyclables.",
    approximateYield: "22-35 recyclables per loop",
    notes:
      "Many containers are already opened but still contain recyclables. Check both container interiors and warehouse floors.",
  },
  {
    id: "spaceport-hangars-recyclables",
    map: "Spaceport",
    regionId: "spaceport-trench-and-hangars-north",
    name: "Hangar Workshops & Storage",
    density: "Medium",
    description:
      "Workshop areas and storage rooms in the hangar complex. Moderate recyclables, mostly scrap metal and electronics.",
    approximateYield: "15-25 recyclables per clear",
    notes:
      "Workshop benches and tool storage areas have the best density. Skip open hangar floors unless you are already there.",
  },
  {
    id: "spaceport-fuel-depot-recyclables",
    map: "Spaceport",
    regionId: "spaceport-alberi-west",
    name: "Fuel Depot & Processing",
    density: "Medium",
    description:
      "Fuel processing buildings and storage tanks. Moderate recyclables, mostly industrial materials.",
    approximateYield: "12-20 recyclables per sweep",
    notes:
      "Lower density than terminal areas but often quieter. Good for mixing recyclables farming with loot runs.",
  },

  // THE DAM
  {
    id: "dam-control-tower-recyclables",
    map: "The Dam",
    regionId: "dam-dam-complex-centre",
    name: "Control Tower & Admin Buildings",
    density: "High",
    description:
      "Office floors, control rooms and admin areas. Strong for electronics and consumable recyclables.",
    approximateYield: "20-32 recyclables per clear",
    notes:
      "Upper floors have better density than ground level. Use vertical cover to avoid boss fights while farming.",
  },
  {
    id: "dam-residential-recyclables",
    map: "The Dam",
    regionId: "dam-swamp-west",
    name: "Residential Apartments & Shops",
    density: "High",
    description:
      "Apartment blocks and small shops in the village area. Good mix of fabric, consumables and electronics.",
    approximateYield: "18-28 recyclables per loop",
    notes:
      "Ground floor shops and apartment storage areas are most productive. Upper floors have fewer recyclables.",
  },
  {
    id: "dam-testing-annex-recyclables",
    map: "The Dam",
    regionId: "dam-red-lakes-east",
    name: "Testing Annex Labs",
    density: "Very High",
    description:
      "Research labs and testing facilities. Exceptional for rare material and electronics recyclables.",
    approximateYield: "30-45 recyclables per full clear",
    notes:
      "High value area but often contested. Approach quietly and clear systematically to avoid attracting attention.",
  },
  {
    id: "dam-substation-recyclables",
    map: "The Dam",
    regionId: "dam-south-industrial",
    name: "Electrical Substation & Scrapyard",
    density: "Medium",
    description:
      "Industrial areas with electrical equipment and scrap. Moderate recyclables, mostly scrap metal and electronics.",
    approximateYield: "15-24 recyclables per sweep",
    notes:
      "Scrapyard has scattered recyclables. Substation buildings are more concentrated but smaller.",
  },

  // BLUE GATE
  {
    id: "blue-village-recyclables",
    map: "Blue Gate",
    regionId: "bluegate-village-north",
    name: "Village Houses & Shops",
    density: "Medium",
    description:
      "Small village buildings with shops and residential areas. Moderate recyclables, mostly consumables and fabric.",
    approximateYield: "12-20 recyclables per loop",
    notes:
      "Lower density than city maps but often quieter. Good for mixing with stealth routes.",
  },
  {
    id: "blue-gate-complex-recyclables",
    map: "Blue Gate",
    regionId: "bluegate-gate-approach-core",
    name: "Gate Control & Warehouse",
    density: "High",
    description:
      "Control rooms and warehouse areas near the gate structure. Good for electronics and scrap metal recyclables.",
    approximateYield: "18-28 recyclables per clear",
    notes:
      "Control rooms have the best density. Warehouse floors are secondary but still productive.",
  },
  {
    id: "blue-data-vault-recyclables",
    map: "Blue Gate",
    regionId: "bluegate-mountains-east",
    name: "Data Vault & Mountain Facilities",
    density: "Very High",
    description:
      "Underground data vault and mountain research facilities. Exceptional for electronics and rare material recyclables.",
    approximateYield: "25-40 recyclables per full clear",
    notes:
      "High value target but often contested. Best approached with stealth or during quieter phases.",
  },
  {
    id: "blue-ancient-fort-recyclables",
    map: "Blue Gate",
    regionId: "bluegate-farmlands-south",
    name: "Ancient Fort & Ruins",
    density: "Low",
    description:
      "Scattered ruins and fort structures. Low recyclables density, mostly consumables and fabric.",
    approximateYield: "8-15 recyclables per sweep",
    notes:
      "Low priority unless you are already in the area. Focus on interior rooms rather than open ruins.",
  },

  // STELLA MONTIS
  {
    id: "stella-medical-recyclables",
    map: "Stella Montis",
    regionId: "stella-medical-west",
    name: "Medical Research Labs",
    density: "Very High",
    description:
      "Medical labs, consulting rooms and storage areas. Excellent for electronics, consumables and rare material recyclables.",
    approximateYield: "28-42 recyclables per full sweep",
    notes:
      "One of the best recyclables areas in the game. Clear systematically room by room for maximum yield.",
  },
  {
    id: "stella-assembly-recyclables",
    map: "Stella Montis",
    regionId: "stella-assembly-north",
    name: "Assembly Workshops & Storage",
    density: "High",
    description:
      "Workshop floors and storage areas. Strong for scrap metal and electronics recyclables.",
    approximateYield: "22-35 recyclables per clear",
    notes:
      "Workshop benches and tool storage have the best density. Watch for turrets and Shredders while farming.",
  },
  {
    id: "stella-archives-recyclables",
    map: "Stella Montis",
    regionId: "stella-business-archives-east",
    name: "Cultural Archives & Business Centre",
    density: "High",
    description:
      "Archive rooms, offices and business areas. Good for electronics and consumable recyclables.",
    approximateYield: "20-30 recyclables per sweep",
    notes:
      "Archive storage rooms have better density than office floors. Clear systematically to avoid missing areas.",
  },
  {
    id: "stella-comms-recyclables",
    map: "Stella Montis",
    regionId: "stella-comms-atrium-core",
    name: "Communications & Atrium",
    density: "Medium",
    description:
      "Communications rooms and atrium areas. Moderate recyclables, mostly electronics.",
    approximateYield: "15-24 recyclables per clear",
    notes:
      "Communications rooms are more productive than the open atrium. Focus on side rooms and offices.",
  },
];

/**
 * Get recyclable areas filtered by map and optional region.
 */
export function getRecyclableAreasByMap(
  map: MapId,
  regionId?: string,
): RecyclableArea[] {
  return recyclableAreas.filter((area) => {
    if (area.map !== map) return false;
    if (regionId && area.regionId && area.regionId !== regionId) return false;
    return true;
  });
}

/**
 * Get recyclable areas filtered by density.
 */
export function getRecyclableAreasByDensity(
  density: RecyclableArea["density"],
): RecyclableArea[] {
  return recyclableAreas.filter((area) => area.density === density);
}

