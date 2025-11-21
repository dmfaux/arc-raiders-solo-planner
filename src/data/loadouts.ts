import { Loadout } from "../types";

export const loadouts: Loadout[] = [
  {
    id: "boss-hunter",
    name: "Boss hunter",
    focus: "Maximise XP from heavy ARC kills and corpse loot.",
    primary: "Mid range AR or LMG with armour piercing rounds",
    secondary: "Hullcracker cannon or similar high damage heavy weapon",
    utilities: [
      "Blaze grenades for burn damage on bosses",
      "Smoke grenades to cover looting",
      "Large medkits and extra ammo",
    ],
    skills: [
      "Loot animation speed perks",
      "Stamina and recoil control perks",
      "Any skill that improves explosive or heavy weapon handling",
    ],
    notes:
      "Use the primary for clearing small enemies and softening bosses, then swap to the heavy weapon for burst damage on weak points. Always throw smoke before looting big ARC corpses.",
  },
  {
    id: "loot-runner",
    name: "Loot runner",
    focus: "Fast looting with minimal combat.",
    primary: "Suppressed SMG or DMR for emergency fights",
    secondary:
      "Light shotgun or pistol you are comfortable with at close range",
    utilities: [
      "Extra stamina or movement boosts",
      "Light medkits",
      "Occasional Blaze grenade for self defence",
    ],
    skills: [
      "Proficient Pryor style perk for faster breaches",
      "Loot speed perks",
      "Noise reduction for lockpicking and prying",
    ],
    notes:
      "Prioritise loot speed skills first. Your main goal is to touch as many containers as possible. Avoid long fights and disengage from players whenever you can.",
  },
  {
    id: "stealth-farmer",
    name: "Stealth farmer",
    focus: "Safe XP and key farming indoors.",
    primary: "Suppressed DMR or rifle",
    secondary: "Reliable close range weapon such as a shotgun or SMG",
    utilities: [
      "Torch or night vision if available",
      "Smoke or flash grenades for escapes",
      "Medkits and light armour",
    ],
    skills: [
      "Movement perks for sprint and stamina",
      "Noise reduction on movement and breaches",
      "Looting perks",
    ],
    notes:
      "Stay inside multi floor buildings, clear methodically and loot every container and corpse. Listen for players and avoid obvious lines of sight from outside.",
  },
];

