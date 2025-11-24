export type RunType = "Boss hunt" | "Loot run" | "Stealth farm";
export type SpawnRegionId = string;

export type MapId =
  | "Buried City"
  | "Spaceport"
  | "The Dam"
  | "Blue Gate"
  | "Stella Montis";

export type MapModifier =
  | "Standard"
  | "Night"
  | "Storm"
  | "Heavy ARC presence"
  | "Low visibility"
  | "Hidden bunker event"
  | "Electromagnetic storm"
  | "Night raid"
  | "Uncovered caches"
  | "Prospecting probes"
  | "Husk graveyard"
  | "Lush blooms"
  | "Harvester event"
  | "Matriarch sighting"
  | "Launch tower event";

export type PoiStopPurpose =
  | "High value loot"
  | "Safe loot"
  | "Blueprint farm"
  | "Quest progress"
  | "Materials"
  | "Boss access"
  | "Extraction";

export type PoiStop = {
  name: string;
  purpose: PoiStopPurpose;
  notes: string;
};

export type AdaptivePlan = {
  id: string;
  runType: RunType;
  map: MapId;
  modifier: MapModifier | "Any";
  spawnRegion?: SpawnRegionId | "Any";
  title: string;
  summary: string;
  keyActions: string[];
  cautions: string[];
  xpNote: string;
  tags?: string[];
  poiRoute?: PoiStop[];
};

export type RouteStyle =
  | "Boss hunting"
  | "Loot running"
  | "Stealth";

export type Route = {
  id: string;
  name: string;
  map: string;
  estXp: string;
  timePerRun: string;
  risk: "Low" | "Medium" | "High";
  style: RouteStyle;
  description: string;
};

export type Loadout = {
  id: string;
  name: string;
  focus: string;
  primary: string;
  secondary: string;
  utilities: string[];
  skills: string[];
  notes: string;
  inventory: string[];
};

export type SectionId =
  | "overview"
  | "run-assistant"
  | "farming-routes"
  | "high-value-targets"
  | "loadouts"
  | "shortcuts"
  | "general-tips"
  | "xp-planner"
  | "recyclables"
  | "recycling-planner";

export interface SpawnRegion {
  id: SpawnRegionId;
  map: MapId;
  label: string;
  /** What the player will recognise on the in game map. */
  exampleCallouts: string[];
  /** Short text you can surface in the UI as helper text or tooltip. */
  notes: string;
}

export type RecyclableDensity = "Low" | "Medium" | "High" | "Very High";

export interface RecyclableArea {
  id: string;
  map: MapId;
  regionId?: SpawnRegionId;
  name: string;
  density: RecyclableDensity;
  description: string;
  approximateYield?: string;
  notes?: string;
}