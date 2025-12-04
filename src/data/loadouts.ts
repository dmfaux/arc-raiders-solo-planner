import { Loadout } from "../types";

export const loadouts: Loadout[] = [
  {
    id: "solo-boss-hunter-ferro-anvil",
    name: "Solo Boss Hunter – Ferro and Anvil",
    focus:
      "High risk, high reward boss hunting from mid range, built for Bastions, Bombardiers and Harvester style events.",
    primary:
      "Ferro battle rifle (medium ammo). Run a 3x or 4x optic, recoil control mod and extended mag if available. Carry around 180 to 210 medium rounds (6 to 7 magazines).",
    secondary:
      "Anvil or Vulcano (heavy or shotgun ammo). Treat this as your panic button for close pushes and last shield recharger trades. Carry 36 heavy rounds or 24 shotgun shells.",
    utilities: [
      "2x Frag grenade for finishing stunned bosses or clearing raider positions.",
      "2x EMP or disruption grenades to strip ARC shields and stop abilities.",
      "1x Explosive mine for boss paths or choke points leading into your position.",
      "1x Smoke grenade for resetting bad fights or crossing open ground.",
    ],
    skills: [
      "Mobility tree: Marathon Runner and Youthful Lungs for stamina when repositioning between boss lanes.",
      "Conditioning tree: Used to the Weight for heavy shield mobility, Survivor's Stamina for clutch escapes.",
      "Conditioning tree: Downed but Determined extends bleed-out time if you get caught.",
      "Survival tree: In-Round Crafting lets you make shield chargers and bandages mid-raid.",
    ],
    inventory: [
      "6 to 8 armour shield rechargers, at least blue quality if you can afford it.",
      "5 to 6 strong healing items (medkits or recharge stims).",
      "2 to 3 emergency light heals for topping off between pulls.",
      "1 spare ammo stack for both primary and secondary beyond what is loaded.",
      "1 spare utility slot reserved for a repair tool or extra mine if you like traps.",
    ],
    notes:
      "Open with the Ferro from safe mid range and only swap to the Anvil or Vulcano when a boss is committing to you. Keep hard cover between you and open fields. Commit to a fight only if you have a clear extraction plan after the kill. Loot every segment of large ARC corpses for maximum XP, then rotate immediately to avoid squads drawn by the noise. If you spawn with poor sightlines, reposition first before starting a boss engagement.",
  },
  {
    id: "loot-runner-tempest-kettle",
    name: "Fast Loot Runner – Tempest and Kettle",
    focus:
      "High speed scavenging with enough firepower to delete small patrols while avoiding long fights.",
    primary:
      "Tempest assault rifle (medium ammo). Run a 1x or 2x optic, hip fire or handling mod. Carry around 150 to 180 medium rounds (5 to 6 magazines).",
    secondary:
      "Kettle semi auto rifle (light ammo). Budget-friendly but effective for accurate taps on raiders and drones. 20-round magazine, light and ammo-efficient. Carry 80 to 100 light rounds.",
    utilities: [
      "2x Smoke grenades for crossing exposed streets or breaking sightlines.",
      "2x Flashbangs or stun grenades for quick room entries and disengages.",
      "1x Frag grenade for wiping clustered raiders or finishing downed players.",
      "1x Utility slot flex – extra smoke, decoy or a healing station if you have it.",
    ],
    skills: [
      "Mobility tree priority: Marathon Runner, Youthful Lungs, Effortless Roll, Calming Stroll for sustained movement.",
      "Survival tree: Looter's Instincts (max level 5) for faster looting, Security Breach for locked containers.",
      "Survival tree: In-Round Crafting lets you extend runs by making supplies on the fly.",
      "Mobility tree: Vault on Vaults eliminates vaulting stamina cost for faster traversal.",
    ],
    inventory: [
      "4 to 5 armour shield rechargers, mostly used to escape rather than re fight.",
      "4 to 5 mid tier heals, enough to reset after one or two bad skirmishes.",
      "A full stack of medium ammo and a smaller stack of light ammo in reserve.",
      "Food or drink items to avoid getting caught with low stamina.",
      "A key or two for your chosen route if the map uses locked rooms.",
    ],
    notes:
      "This build is about tempo. You are not here to clear every fight, you are here to tap every container and corpse you can find while staying ahead of the lobby. Only commit to fights that block your route or look like free third party kills. If you burn through half your shield rechargers or most of your meds, start angling towards your planned extraction rather than overextending.",
  },
  {
    id: "stealth-stella-stitcher-venator",
    name: "Stealth Indoor Farmer – Stitcher and Venator",
    focus:
      "Slow, methodical room clearing in Stella Montis and other dense indoor spaces, leaning on audio and positioning.",
    primary:
      "Stitcher SMG (light ammo). Ideally suppressed if the mod exists. Carry 180 to 210 light rounds (6 to 7 magazines).",
    secondary:
      "Venator handgun (medium ammo). S-tier weapon that fires 2 bullets per trigger pull for high burst damage. Only 2kg weight, lightest in the game. Use for precise taps at range. Carry 40 to 60 medium rounds.",
    utilities: [
      "2x Flashbangs for tight corners and stairwells.",
      "1x Smoke grenade for retreating from over committed pushes.",
      "1x Breach charge or similar tool if you plan to hit locked rooms.",
      "1x Mine or trap to cover flanks and staircases behind you.",
    ],
    skills: [
      "Survival tree priority: Looter's Instincts for faster looting, Security Breach for locked containers.",
      "Mobility tree: Calming Stroll for stamina regen while walking, Effortless Roll for emergency dodges.",
      "Survival tree: In-Round Crafting for making supplies during long indoor clears.",
      "Conditioning tree: basic shield perks only – you should not be trading in the open.",
    ],
    inventory: [
      "4 to 6 armour shield rechargers, mostly for mistakes or surprise third parties.",
      "6 small to medium heals, prioritising ones that work quickly in fights.",
      "One full stack of light ammo and a half stack of medium ammo in reserve.",
      "At least one spare utility slot for a key item or puzzle tool if the event needs it.",
      "Room in your bag for keys, data drives and compact valuables rather than bulky scrap.",
    ],
    notes:
      "Treat every doorway as a kill funnel. Clear one wing or block at a time, closing doors behind you so any opened door is a clear audio warning. You win by surviving multiple small skirmishes, not by taking huge brawls. If another team starts mirroring your path, shift one wing sideways rather than fighting over the same rooms.",
  },
  {
    id: "budget-dam-starter-rattler-stitcher",
    name: "Budget Dam Starter – Rattler and Stitcher",
    focus:
      "Entry level solo setup for The Dam and Buried City when your stash and skill trees are still thin.",
    primary:
      "Rattler assault rifle (medium ammo). No fancy mods needed. Note: only 10 rounds per magazine, so reload discipline is key. Carry around 150 medium rounds (15 reloads).",
    secondary:
      "Stitcher SMG (light ammo). Available in free loadouts and cheap to craft. High fire rate for close quarters panic situations. Carry 100 to 120 light rounds.",
    utilities: [
      "1x Frag grenade for emergency crowd control.",
      "1x Smoke grenade to cover revives or retreats even when playing solo.",
      "2x basic healing consumables on quick access.",
      "1x cheap mine or trap for ladder tops and narrow bridges.",
    ],
    skills: [
      "Mobility tree first: Marathon Runner and Youthful Lungs for better stamina.",
      "Survival tree: Looter's Instincts for faster looting, In-Round Crafting when available.",
      "Conditioning tree: Used to the Weight if you carry heavier shields later.",
      "Security Breach (Survival) unlocks valuable Security Lockers.",
    ],
    inventory: [
      "3 to 4 basic shield rechargers. Treat them as a finite resource and disengage once you hit your last one.",
      "4 to 5 cheap heals instead of one or two expensive ones.",
      "A small stack of extra medium ammo so you can finish a run without going dry.",
      "Room left in your backpack for recyclables and materials rather than pure junk.",
    ],
    notes:
      "This loadout will not let you bully full teams, so you should avoid wide open boss arenas and noisy events until you understand the flow of the map. The Rattler's small magazine means you need to reload often, so always fight near cover. Focus on picking around the edges of fights, cleaning up stray ARCs and looting fresh corpses. If you get a good drop, do not be afraid to cut the run short and bank the profit.",
  },
];