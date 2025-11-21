/**
 * Recyclables Breakdown Data
 * 
 * This module provides data for the recyclables planner feature:
 * "I want X crafting part; what items can I recycle to get X, and how many per item"
 * 
 * Data structure maps recyclable source items to their yields, allowing
 * players to find which items to recycle to obtain specific crafting parts.
 */

export type CraftingPartId = string;      // eg "polymer-tubes"
export type RecyclableItemId = string;    // eg "broken-rifle"

export interface CraftingPart {
  id: CraftingPartId;
  name: string;
  rarity: "Common" | "Uncommon" | "Rare" | "Epic";
  description?: string;
}

export interface RecyclableItem {
  id: RecyclableItemId;
  name: string;
  category: string; // eg "Weapon", "Armour", "Gadget", "Junk"
  sourceNote?: string; // short flavour about where it usually drops
}

export interface BreakdownYield {
  partId: CraftingPartId;
  quantity: number;
}

export interface RecyclableBreakdown {
  itemId: RecyclableItemId;
  yields: BreakdownYield[];
}

/**
 * Crafting parts that players want to obtain through recycling.
 */
export const craftingParts: CraftingPart[] = [
  // Common parts
  {
    id: "scrap-metal",
    name: "Scrap Metal",
    rarity: "Common",
    description: "Basic metal scrap used in many crafting recipes",
  },
  {
    id: "synthetic-fibre",
    name: "Synthetic Fibre",
    rarity: "Common",
    description: "Woven synthetic material for fabric-based crafting",
  },
  {
    id: "electronic-components",
    name: "Electronic Components",
    rarity: "Common",
    description: "Basic circuit components and wiring",
  },
  {
    id: "polymer-tubes",
    name: "Polymer Tubes",
    rarity: "Common",
    description: "Flexible polymer conduits for fluid systems",
  },
  
  // Uncommon parts
  {
    id: "arc-alloy",
    name: "Arc Alloy",
    rarity: "Uncommon",
    description: "Refined metal alloy with enhanced properties",
  },
  {
    id: "reinforced-plating",
    name: "Reinforced Plating",
    rarity: "Uncommon",
    description: "Hardened armor plating material",
  },
  {
    id: "power-cells",
    name: "Power Cells",
    rarity: "Uncommon",
    description: "Energy storage cells for devices",
  },
  
  // Rare parts
  {
    id: "refined-alloy",
    name: "Refined Alloy",
    rarity: "Rare",
    description: "High-grade alloy with superior durability",
  },
  {
    id: "advanced-circuits",
    name: "Advanced Circuits",
    rarity: "Rare",
    description: "Sophisticated electronic circuitry",
  },
  {
    id: "optics-lens",
    name: "Optics Lens",
    rarity: "Rare",
    description: "Precision optical components for scopes and sensors",
  },
  
  // Epic parts
  {
    id: "pristine-alloy",
    name: "Pristine Alloy",
    rarity: "Epic",
    description: "Perfectly refined alloy with exceptional properties",
  },
  {
    id: "master-circuit",
    name: "Master Circuit",
    rarity: "Epic",
    description: "Top-tier electronic circuit board",
  },
];

/**
 * Recyclable items that can be broken down into crafting parts.
 */
export const recyclableItems: RecyclableItem[] = [
  // Common Junk
  {
    id: "broken-rifle",
    name: "Broken Rifle",
    category: "Weapon",
    sourceNote: "Commonly found in weapon caches and military areas",
  },
  {
    id: "damaged-armor",
    name: "Damaged Armor Plate",
    category: "Armour",
    sourceNote: "Drops from defeated enemies and armor lockers",
  },
  {
    id: "fried-motherboard",
    name: "Fried Motherboard",
    category: "Junk",
    sourceNote: "Found in industrial and tech areas",
  },
  {
    id: "rusted-tools",
    name: "Rusted Tools",
    category: "Junk",
    sourceNote: "Common in workshop and industrial zones",
  },
  {
    id: "broken-circuit-board",
    name: "Broken Circuit Board",
    category: "Junk",
    sourceNote: "Scattered throughout tech facilities",
  },
  {
    id: "scrap-metal-pile",
    name: "Scrap Metal Pile",
    category: "Junk",
    sourceNote: "Found in industrial areas and scrapyards",
  },
  {
    id: "damaged-fabric",
    name: "Damaged Fabric",
    category: "Junk",
    sourceNote: "Common in residential and clothing areas",
  },
  {
    id: "old-battery",
    name: "Old Battery",
    category: "Junk",
    sourceNote: "Found in electronics and power systems",
  },
  
  // Uncommon Items
  {
    id: "intact-motherboard",
    name: "Intact Motherboard",
    category: "Junk",
    sourceNote: "Rare find in high-tech facilities",
  },
  {
    id: "precision-tools",
    name: "Precision Tools",
    category: "Junk",
    sourceNote: "Found in advanced workshop areas",
  },
  {
    id: "weapon-barrel",
    name: "Weapon Barrel",
    category: "Weapon",
    sourceNote: "Drops from weapon caches and elite enemies",
  },
  {
    id: "armor-reinforcement",
    name: "Armor Reinforcement",
    category: "Armour",
    sourceNote: "Found in military installations",
  },
  
  // Rare Items
  {
    id: "advanced-circuit-board",
    name: "Advanced Circuit Board",
    category: "Junk",
    sourceNote: "Rare tech component from research facilities",
  },
  {
    id: "weapon-receiver",
    name: "Weapon Receiver",
    category: "Weapon",
    sourceNote: "High-value weapon part from elite caches",
  },
  {
    id: "armor-core",
    name: "Armor Core",
    category: "Armour",
    sourceNote: "Premium armor component from boss drops",
  },
  {
    id: "arc-servo",
    name: "ARC Servo",
    category: "Gadget",
    sourceNote: "Mechanical component from robot enemies",
  },
  
  // Epic Items
  {
    id: "master-circuit-board",
    name: "Master Circuit Board",
    category: "Junk",
    sourceNote: "Ultra-rare tech component from high-tier areas",
  },
  {
    id: "masterwork-tools",
    name: "Masterwork Tools",
    category: "Junk",
    sourceNote: "Exceptional tools from elite workshops",
  },
  {
    id: "arc-processor",
    name: "ARC Processor",
    category: "Gadget",
    sourceNote: "Advanced processor from boss-level robots",
  },
  {
    id: "arc-power-cell",
    name: "ARC Power Cell",
    category: "Gadget",
    sourceNote: "High-capacity power source from elite enemies",
  },
];

/**
 * Breakdown data mapping recyclable items to their yields.
 */
export const recyclableBreakdowns: RecyclableBreakdown[] = [
  // Common Junk breakdowns
  {
    itemId: "broken-rifle",
    yields: [
      { partId: "scrap-metal", quantity: 3 },
      { partId: "arc-alloy", quantity: 2 },
    ],
  },
  {
    itemId: "damaged-armor",
    yields: [
      { partId: "scrap-metal", quantity: 2 },
      { partId: "reinforced-plating", quantity: 1 },
    ],
  },
  {
    itemId: "fried-motherboard",
    yields: [
      { partId: "arc-alloy", quantity: 2 },
      { partId: "scrap-metal", quantity: 1 },
      { partId: "electronic-components", quantity: 1 },
    ],
  },
  {
    itemId: "rusted-tools",
    yields: [
      { partId: "arc-alloy", quantity: 3 },
      { partId: "scrap-metal", quantity: 2 },
    ],
  },
  {
    itemId: "broken-circuit-board",
    yields: [
      { partId: "arc-alloy", quantity: 1 },
      { partId: "electronic-components", quantity: 2 },
    ],
  },
  {
    itemId: "scrap-metal-pile",
    yields: [
      { partId: "scrap-metal", quantity: 3 },
    ],
  },
  {
    itemId: "damaged-fabric",
    yields: [
      { partId: "synthetic-fibre", quantity: 2 },
    ],
  },
  {
    itemId: "old-battery",
    yields: [
      { partId: "electronic-components", quantity: 1 },
      { partId: "scrap-metal", quantity: 1 },
      { partId: "power-cells", quantity: 1 },
    ],
  },
  
  // Uncommon breakdowns
  {
    itemId: "intact-motherboard",
    yields: [
      { partId: "arc-alloy", quantity: 5 },
      { partId: "electronic-components", quantity: 3 },
      { partId: "refined-alloy", quantity: 1 },
    ],
  },
  {
    itemId: "precision-tools",
    yields: [
      { partId: "arc-alloy", quantity: 4 },
      { partId: "refined-alloy", quantity: 2 },
    ],
  },
  {
    itemId: "weapon-barrel",
    yields: [
      { partId: "refined-alloy", quantity: 3 },
      { partId: "arc-alloy", quantity: 2 },
    ],
  },
  {
    itemId: "armor-reinforcement",
    yields: [
      { partId: "refined-alloy", quantity: 4 },
      { partId: "reinforced-plating", quantity: 2 },
    ],
  },
  
  // Rare breakdowns
  {
    itemId: "advanced-circuit-board",
    yields: [
      { partId: "arc-alloy", quantity: 3 },
      { partId: "electronic-components", quantity: 5 },
      { partId: "refined-alloy", quantity: 1 },
      { partId: "advanced-circuits", quantity: 1 },
    ],
  },
  {
    itemId: "weapon-receiver",
    yields: [
      { partId: "refined-alloy", quantity: 5 },
      { partId: "pristine-alloy", quantity: 2 },
      { partId: "electronic-components", quantity: 3 },
    ],
  },
  {
    itemId: "armor-core",
    yields: [
      { partId: "pristine-alloy", quantity: 3 },
      { partId: "refined-alloy", quantity: 3 },
      { partId: "reinforced-plating", quantity: 2 },
    ],
  },
  {
    itemId: "arc-servo",
    yields: [
      { partId: "refined-alloy", quantity: 3 },
      { partId: "electronic-components", quantity: 4 },
    ],
  },
  
  // Epic breakdowns
  {
    itemId: "master-circuit-board",
    yields: [
      { partId: "arc-alloy", quantity: 8 },
      { partId: "electronic-components", quantity: 6 },
      { partId: "refined-alloy", quantity: 3 },
      { partId: "pristine-alloy", quantity: 1 },
      { partId: "master-circuit", quantity: 1 },
    ],
  },
  {
    itemId: "masterwork-tools",
    yields: [
      { partId: "arc-alloy", quantity: 6 },
      { partId: "refined-alloy", quantity: 4 },
      { partId: "pristine-alloy", quantity: 2 },
    ],
  },
  {
    itemId: "arc-processor",
    yields: [
      { partId: "pristine-alloy", quantity: 2 },
      { partId: "electronic-components", quantity: 6 },
      { partId: "refined-alloy", quantity: 2 },
      { partId: "master-circuit", quantity: 1 },
    ],
  },
  {
    itemId: "arc-power-cell",
    yields: [
      { partId: "pristine-alloy", quantity: 3 },
      { partId: "electronic-components", quantity: 5 },
      { partId: "power-cells", quantity: 3 },
    ],
  },
];

/**
 * Get recyclable items that yield a specific crafting part.
 * Returns items sorted by yield quantity (highest first).
 */
export function getRecyclableOptionsForPart(targetPartId: CraftingPartId): {
  item: RecyclableItem;
  quantity: number;
}[] {
  return recyclableBreakdowns
    .map((b) => {
      const item = recyclableItems.find((i) => i.id === b.itemId);
      if (!item) return null;
      const yieldForPart = b.yields.find((y) => y.partId === targetPartId);
      if (!yieldForPart) return null;
      return {
        item,
        quantity: yieldForPart.quantity,
      };
    })
    .filter(
      (x): x is { item: RecyclableItem; quantity: number } => Boolean(x),
    )
    .sort((a, b) => b.quantity - a.quantity);
}

