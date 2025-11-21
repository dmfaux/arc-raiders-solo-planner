export type RunType = "Boss hunt" | "Loot run" | "Stealth farm";

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
  title: string;
  summary: string;
  keyActions: string[];
  cautions: string[];
  xpNote: string;
  tags?: string[];
  poiRoute?: PoiStop[];
};

export type RouteStyle = "Boss hunting" | "Loot running" | "Stealth";

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
};

export type SectionId =
  | "overview"
  | "run-assistant"
  | "farming-routes"
  | "high-value-targets"
  | "loadouts"
  | "shortcuts"
  | "general-tips"
  | "xp-planner";

