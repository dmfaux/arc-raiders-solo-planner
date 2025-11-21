import type { MapId, MapModifier } from "../types";

export type MapModifierSummary = {
  id: MapModifier;
  shortLabel: string;
  description: string;
  xpImpact: "None" | "Slight" | "High";
  danger: "Low" | "Medium" | "High" | "Extreme";
  bestFor: string;
  recommendedMaps: MapId[] | "All";
  soloTips: string[];
};

export const mapModifierSummaries: MapModifierSummary[] = [
  {
    id: "Hidden bunker event",
    shortLabel: "Hidden Bunker",
    description:
      "Puzzle event on Spaceport that opens an underground bunker after activating multiple antennas. Very crowded and PvP heavy, but full of high tier loot and ARC enemies once inside.",
    xpImpact: "High",
    danger: "Extreme",
    bestFor: "Boss hunting and risky loot runs",
    recommendedMaps: ["Spaceport"],
    soloTips: [
      "Let squads open the bunker and clear the first waves, then go in late and sweep any rooms they missed.",
      "Avoid playing this aggressively as a solo unless you know the antenna locations and puzzle steps inside.",
      "Always plan your extraction route before entering the bunker because hatches and returns may be limited during big events.",
    ],
  },
  {
    id: "Electromagnetic storm",
    shortLabel: "ARC Storm",
    description:
      "Map wide lightning storm with heavy wind and thunder. Lightning strikes are telegraphed on the ground and can one shot players or ARCs. Extraction options are reduced and hatches are often disabled, but XP rewards and event loot opportunities increase during the window.",
    xpImpact: "High",
    danger: "High",
    bestFor: "Boss hunting and aggressive XP farming",
    recommendedMaps: "All",
    soloTips: [
      "Keep moving and avoid high ground in open fields where lightning strikes more frequently.",
      "Use lightning to your advantage by baiting ARC patrols into telegraphed strike zones.",
      "Treat extracts as chokepoints and scout them from cover before you commit.",
    ],
  },
  {
    id: "Night raid",
    shortLabel: "Night Raid",
    description:
      "Full darkness map condition with more elite ARC encounters, fewer return points and no hatch escapes. Loot values are improved and Trials progress is accelerated during night runs.",
    xpImpact: "High",
    danger: "High",
    bestFor: "Stealth farms and focused Trials objectives",
    recommendedMaps: "All",
    soloTips: [
      "Use suppressed weapons and move slowly so you can hear both ARCs and other players.",
      "Carry a torch or optic that works in low light, but avoid shining light in obvious directions where it makes you a target.",
      "Arrive early at a chosen extraction and observe before committing, as other solos and squads will often camp these at night.",
    ],
  },
  {
    id: "Uncovered caches",
    shortLabel: "Uncovered Caches",
    description:
      "Storms uncover buried Raider caches all over the map. They tick and eventually explode if ignored, and each holds useful gear and materials.",
    xpImpact: "Slight",
    danger: "Medium",
    bestFor: "Fast loot runs and free kit farming",
    recommendedMaps: "All",
    soloTips: [
      "Listen for the ticking sound and look for the small sign near each cache to locate them quickly.",
      "Wear a light loadout so you can chain multiple caches before they explode.",
      "Prioritise high value items for your safe pocket and extract once your bag is stacked.",
    ],
  },
  {
    id: "Prospecting probes",
    shortLabel: "Prospecting Probes",
    description:
      "ARC probes land across the map guarded by drones and turrets. Breaching them drops valuable circuitry and motion cores used for high tier crafting.",
    xpImpact: "Slight",
    danger: "Medium",
    bestFor: "Targeted crafting material farms",
    recommendedMaps: "All",
    soloTips: [
      "Track probes by their audio ping and vertical silhouette and approach from cover.",
      "Use suppressed weapons to clear the guards, then breach panels as quickly as possible.",
      "Rotate between probes and safe slot rare parts between runs.",
    ],
  },
  {
    id: "Husk graveyard",
    shortLabel: "Husk Graveyard",
    description:
      "The map is littered with disabled ARC husks that can be breached for components and undamaged drivers. Some husks are electrified when you open them.",
    xpImpact: "Slight",
    danger: "Medium",
    bestFor: "Safe resource farming",
    recommendedMaps: "All",
    soloTips: [
      "Time your breach so you dodge any shock pulse from the husk, then immediately loot the cavity.",
      "Plan a route that chains as many husks as possible in one loop for steady coins and parts.",
      "Use free loadouts and treat this as a low risk salvage run.",
    ],
  },
  {
    id: "Lush blooms",
    shortLabel: "Lush Blooms",
    description:
      "Good weather boosts plant growth. Fruit baskets and plant nodes appear in greater numbers and drop more food, which can be sold or used for upgrades.",
    xpImpact: "None",
    danger: "Low",
    bestFor: "Money farming and relaxed runs",
    recommendedMaps: "All",
    soloTips: [
      "Focus on routes with many baskets and crates rather than random plants.",
      "Fill your bag with high value fruits and trade goods then extract quickly.",
      "Use this as a low stress break between harder events and raids.",
    ],
  },
  {
    id: "Harvester event",
    shortLabel: "Harvester",
    description:
      "Large Harvester machine guarded by a Queen ARC and a multi step puzzle inside. Completing the objective or killing the Queen can reward legendary blueprints and high tier components.",
    xpImpact: "High",
    danger: "Extreme",
    bestFor: "Boss hunting and blueprint chasing",
    recommendedMaps: "All",
    soloTips: [
      "As a solo, avoid being the first to engage the Queen. Let other players start the fight and look for ways to help from the edge.",
      "If you go inside the Harvester, learn the purge cycle and always be ready to retreat when alarms sound.",
      "Safe slot any legendary blueprint as soon as possible then plan a careful extraction.",
    ],
  },
  {
    id: "Matriarch sighting",
    shortLabel: "Matriarch",
    description:
      "World boss level ARC with multiple weapon systems and the ability to call in reinforcements. Very rare and extremely dangerous.",
    xpImpact: "High",
    danger: "Extreme",
    bestFor: "Endgame boss hunting and big XP spikes",
    recommendedMaps: "All",
    soloTips: [
      "Only engage directly if the Matriarch is already fighting a squad and you have ample heavy ammo and explosives.",
      "Look for safe angles to contribute damage without drawing its full attention.",
      "Third party the fight carefully and be ready for players turning on each other once the boss dies.",
    ],
  },
  {
    id: "Launch tower event",
    shortLabel: "Launch Tower",
    description:
      "Tower structure is locked down and packed with ARCs. Reactivating access and clearing floors grants access to elite loot at the top.",
    xpImpact: "Slight",
    danger: "High",
    bestFor: "Aggressive loot runs",
    recommendedMaps: "All",
    soloTips: [
      "Start your climb early to avoid being trapped between squads on the stairwells.",
      "Use shotguns or SMGs for tight corridors and bring grenades for clustered ARC spawns.",
      "After looting the top, exit quickly by the safest route rather than trying to hold the tower.",
    ],
  },
];

export type MapSummary = {
  id: MapId;
  label: string;
  description: string;
  soloNote: string;
};

export const mapSummaries: MapSummary[] = [
  {
    id: "The Dam",
    label: "Dam Battlegrounds",
    description:
      "Compact industrial and swamp map with Control Tower, Research & Administration, Scrapyard, Hydroponic Dome Complex and scattered residential blocks like Pale Apartments, Ruby Residence and Pattern House.",
    soloNote:
      "Stealth farming favours Scrapyard and South Swamp Outpost with exits at Swamp Extraction or North Complex. High risk loot runs focus on Control Tower, Research & Administration, Dam Surveillance Room, Water Treatment Control and the domes.",
  },
  {
    id: "Buried City",
    label: "Buried City",
    description:
      "Desert city map with residential towers like Grandioso Apartments, transport hubs such as Marano Station and Marano Park, plus scattered industrial and residential zones.",
    soloNote:
      "Grandioso Apartments and the rooftop zipline blueprint room offer blueprint farming and high value loot. Marano Station and Marano Park Parking Garage provide quest items and containers. Avoid open streets and focus on indoor routes.",
  },
  {
    id: "Spaceport",
    label: "Spaceport",
    description:
      "Large industrial facility with Container Storage, Shipping Warehouse, Vehicle Maintenance, Rocket Assembly, Launch Tower, Pipe Walk and the Seed Vault.",
    soloNote:
      "Container Storage and Shipping Warehouse are high value but contested. Vehicle Maintenance and outer checkpoint rooms offer safer early loot. Rocket Assembly, Pipe Walk and Launch Tower are endgame hotspots.",
  },
  {
    id: "Blue Gate",
    label: "Blue Gate",
    description:
      "High mountain map with open valleys, Blue Gate Village, underground tunnels, Warehouse Complex, Overlook Shaft and key locations such as the Confiscation Room.",
    soloNote:
      "Village outskirts and keyed sectors offer concentrated loot. Underground routes and puzzle rooms provide high value materials. Use tunnels to avoid surface fights and plan extraction routes carefully.",
  },
  {
    id: "Stella Montis",
    label: "Stella Montis",
    description:
      "Multi floor indoor facility with Medical Research, Assembly Workshops, Cultural Archives, Sandbox, Seed Vault, Loading Bay and the Airshaft extraction point.",
    soloNote:
      "Medical Research and Assembly Workshops are high value but dangerous. Sandbox and Seed Vault offer safer starts. Use the Airshaft extract for easier coverage. Move slowly and control angles.",
  },
];

