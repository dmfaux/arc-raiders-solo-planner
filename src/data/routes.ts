import { MapId, RouteStyle } from "../types";

export type RouteRisk = "Low" | "Medium" | "High";

export interface FarmingRoute {
  id: string;
  map: MapId;
  name: string;
  style: RouteStyle;
  risk: RouteRisk;
  estXp: string;
  timePerRun: string;
  description: string;
  /** Optional list of spawn ids this route particularly favours */
  recommendedSpawns?: string[];
}

export const routes: FarmingRoute[] = [
  // BURIED CITY
  {
    id: "buried-boss-santa-loop",
    map: "Buried City",
    name: "Santa Maria to Marano boss loop",
    style: "Boss hunting",
    risk: "High",
    estXp: "10,000 – 18,000 XP",
    timePerRun: "18 – 25 minutes",
    description:
      "From Santa Maria rooftops you rotate through Marano Park and the nearby tower lines, pulling Bastions and Bombardiers into lanes you can control from height.",
    recommendedSpawns: ["buried-santa-maria"],
  },
  {
    id: "buried-loot-grandioso-circuit",
    map: "Buried City",
    name: "Grandioso apartment circuit",
    style: "Loot running",
    risk: "Medium",
    estXp: "6,000 – 12,000 XP",
    timePerRun: "15 – 22 minutes",
    description:
      "Start at Grandioso offices, sweep all floors, then spiral into surrounding apartments and side streets before exiting via the nearest lift.",
    recommendedSpawns: ["buried-grandioso"],
  },
  {
    id: "buried-stealth-backstreets",
    map: "Buried City",
    name: "Back street stealth sweep",
    style: "Stealth",
    risk: "Low",
    estXp: "4,000 – 8,000 XP",
    timePerRun: "18 – 25 minutes",
    description:
      "Work the quieter back streets and inner courtyards, clearing one side of each alley at a time and avoiding major plazas unless you have to cross them.",
  },

  // SPACEPORT
  {
    id: "spaceport-boss-container-lanes",
    map: "Spaceport",
    name: "Container boss lanes",
    style: "Boss hunting",
    risk: "High",
    estXp: "12,000 – 20,000 XP",
    timePerRun: "17 – 24 minutes",
    description:
      "Use the rows of containers to drag bosses into tight firing lanes where rockets and beams are easier to break with solid cover.",
    recommendedSpawns: ["spaceport-containers"],
  },
  {
    id: "spaceport-loot-terminal-to-containers",
    map: "Spaceport",
    name: "Terminal to containers loot sweep",
    style: "Loot running",
    risk: "Medium",
    estXp: "7,000 – 14,000 XP",
    timePerRun: "16 – 23 minutes",
    description:
      "Start in the terminal forecourt, sweep ticket halls and back offices, then drift towards Container Storage to finish in safer lanes near extraction.",
    recommendedSpawns: ["spaceport-terminal", "spaceport-containers"],
  },
  {
    id: "spaceport-stealth-side-buildings",
    map: "Spaceport",
    name: "Side building stealth crawl",
    style: "Stealth",
    risk: "Low",
    estXp: "4,000 – 9,000 XP",
    timePerRun: "18 – 26 minutes",
    description:
      "Focus on smaller offices, maintenance buildings and upper walkways, keeping to cover and avoiding Launch Tower and main assembly floors.",
  },

  // THE DAM
  {
    id: "dam-boss-tower-and-domes",
    map: "The Dam",
    name: "Control Tower and dome bosses",
    style: "Boss hunting",
    risk: "High",
    estXp: "10,000 – 18,000 XP",
    timePerRun: "18 – 26 minutes",
    description:
      "Rotate between Control Tower balconies and the nearby domes, taking advantage of vertical cover to handle bosses and heavy ARCs.",
    recommendedSpawns: ["dam-control-tower"],
  },
  {
    id: "dam-loot-residential-apartments",
    map: "The Dam",
    name: "Residential apartment chain",
    style: "Loot running",
    risk: "Medium",
    estXp: "6,000 – 12,000 XP",
    timePerRun: "16 – 22 minutes",
    description:
      "Chain residential blocks, garages and small shops, tapping every container then cutting to a nearby extraction on the village edge.",
    recommendedSpawns: ["dam-residential"],
  },
  {
    id: "dam-stealth-village-side",
    map: "The Dam",
    name: "Quiet village stealth route",
    style: "Stealth",
    risk: "Low",
    estXp: "4,000 – 8,000 XP",
    timePerRun: "18 – 25 minutes",
    description:
      "Stay on the quieter half of the village, clearing one side street at a time and using buildings as shields from Control Tower lines.",
    recommendedSpawns: ["dam-residential"],
  },

  // BLUE GATE
  {
    id: "blue-boss-tunnel-funnels",
    map: "Blue Gate",
    name: "Tunnel funnel bosses",
    style: "Boss hunting",
    risk: "High",
    estXp: "10,000 – 17,000 XP",
    timePerRun: "17 – 24 minutes",
    description:
      "Work the lower tunnels and entrances, funnelling bosses and heavy packs through choke points where you can cut them down safely.",
    recommendedSpawns: ["blue-tunnel-mouth"],
  },
  {
    id: "blue-loot-village-ring",
    map: "Blue Gate",
    name: "Village ring loot run",
    style: "Loot running",
    risk: "Medium",
    estXp: "6,000 – 11,000 XP",
    timePerRun: "15 – 22 minutes",
    description:
      "Circle the outer village, clearing houses and sheds while limiting time spent in the open valley floor.",
    recommendedSpawns: ["blue-village"],
  },
  {
    id: "blue-stealth-tunnel-and-huts",
    map: "Blue Gate",
    name: "Tunnel and hut stealth path",
    style: "Stealth",
    risk: "Low",
    estXp: "4,000 – 8,000 XP",
    timePerRun: "18 – 26 minutes",
    description:
      "Alternate between small huts on the slopes and short tunnel segments, always keeping rock and terrain between you and the valley.",
    recommendedSpawns: ["blue-village", "blue-tunnel-mouth"],
  },

  // STELLA MONTIS
  {
    id: "stella-boss-assembly-floor",
    map: "Stella Montis",
    name: "Assembly floor boss circuit",
    style: "Boss hunting",
    risk: "High",
    estXp: "10,000 – 18,000 XP",
    timePerRun: "18 – 25 minutes",
    description:
      "Rotate around the Assembly workshops and heavy machinery areas, using pillars, rails and staircases to manage bosses and Shredders.",
    recommendedSpawns: ["stella-assembly"],
  },
  {
    id: "stella-loot-medical-and-archives",
    map: "Stella Montis",
    name: "Medical to archives loot path",
    style: "Loot running",
    risk: "Medium",
    estXp: "7,000 – 13,000 XP",
    timePerRun: "18 – 26 minutes",
    description:
      "Start in Medical Research, sweep labs and consulting rooms, then drift into quieter archive wings for extra containers and bodies.",
    recommendedSpawns: ["stella-medical"],
  },
  {
    id: "stella-stealth-medical-crawl",
    map: "Stella Montis",
    name: "Medical crawl stealth loop",
    style: "Stealth",
    risk: "Low",
    estXp: "5,000 – 9,000 XP",
    timePerRun: "20 – 28 minutes",
    description:
      "Methodically clear the medical wing corridor by corridor, closing doors and never holding long sightlines for too long.",
    recommendedSpawns: ["stella-medical"],
  },
];