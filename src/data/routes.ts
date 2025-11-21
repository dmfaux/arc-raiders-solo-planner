import { Route } from "../types";

export const routes: Route[] = [
  {
    id: "buried-city-boss-loop",
    name: "Buried City boss loop",
    map: "Buried City",
    estXp: "Around 40k to 60k XP per 10 to 15 minutes",
    timePerRun: "10 to 15 minutes",
    risk: "High",
    style: "Boss hunting",
    description:
      "Chain Bastion and Bombardier spawns around Santa Maria and Marano Park. Focus on big ARC enemies, burn them with Blaze grenades, then loot every corpse part quickly before rotating.",
  },
  {
    id: "spaceport-seed-vault",
    name: "Spaceport Seed Vault rush",
    map: "Spaceport",
    estXp: "Around 15k to 50k XP per 5 to 10 minutes",
    timePerRun: "5 to 10 minutes",
    risk: "Medium",
    style: "Loot running",
    description:
      "Spawn and sprint to Seed Vault and loading bays. Open every container you can reach, even if already looted. Works very well with free kit suicide runs where you do not care about extraction.",
  },
  {
    id: "dam-night-apartments",
    name: "Dam night apartments sweep",
    map: "The Dam (Night)",
    estXp: "Around 30k to 45k XP per 20 to 25 minutes",
    timePerRun: "20 to 25 minutes",
    risk: "Low",
    style: "Stealth",
    description:
      "Quiet solo route indoors. Walk, clear and loot all flats and side rooms. Very safe XP and scrap with minimal PvP if you move slowly and listen for footsteps.",
  },
];

