import { Loadout } from "../types";

export const loadouts: Loadout[] = [
  {
    id: "boss-hunter",
    name: "Boss hunter",
    focus: "Maximise XP from heavy ARC kills and corpse loot.",
    primary: "Mid range AR or LMG with a big magazine, good stability and armour piercing rounds if available",
    secondary: "Hullcracker cannon or similar high damage heavy weapon",
    utilities: [
      "Blaze grenades for burn damage on bosses",
      "Smoke grenades to cover looting",
      "Large medkits and extra ammo",
      "One panic grenade such as stun or flash if Blaze is on cooldown",
    ],
    skills: [
      "Perks that speed up looting and healing animations",
      "Stamina and recoil control perks for automatic weapons",
      "Any skill that improves explosive or heavy weapon damage and handling",
    ],
    notes:
      "Use the primary to clear small enemies and chip bosses, then swap to the heavy weapon for burst damage on weak points. Always throw smoke before looting big ARC corpses and take the time to loot every visible piece for maximum XP.",
  },
  {
    id: "loot-runner",
    name: "Loot runner",
    focus: "Fast looting with minimal combat.",
    primary: "Suppressed SMG or compact rifle for emergency fights",
    secondary: "Light shotgun or sidearm you are comfortable with at close range",
    utilities: [
      "Extra stamina or movement boosts",
      "Light medkits and bandages",
      "A single Blaze or stun grenade for self defence if caught",
    ],
    skills: [
      "Perks that speed up prying, lockpicking and search animations",
      "Loot speed and carry weight perks",
      "Noise reduction for movement and breaches",
    ],
    notes:
      "Prioritise loot speed and mobility first. Your main goal is to touch as many containers and corpses as possible, then leave. Avoid long fights and disengage from players whenever you can rather than contesting every angle.",
  },
  {
    id: "stealth-farmer",
    name: "Stealth farmer",
    focus: "Safe XP and key farming indoors.",
    primary: "Suppressed semi automatic rifle that you can double tap accurately at mid range",
    secondary: "Reliable close range weapon such as a shotgun or SMG",
    utilities: [
      "Torch or night vision if available",
      "Smoke or flash grenades for escapes and repositioning",
      "Medkits and light armour",
    ],
    skills: [
      "Movement perks that improve sprint and stamina without making you too loud",
      "Noise reduction on movement and breaches",
      "Looting perks for faster searches and interaction speed",
    ],
    notes:
      "Stay inside multi floor buildings, clear rooms methodically and loot every container and corpse. Close doors behind you to limit angles and control sound. Move in short bursts, pausing often to listen for players, and avoid obvious lines of sight from outside such as big windows and exposed stair landings.",
  },
];