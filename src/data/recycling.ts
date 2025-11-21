/**
 * Recycling Planner Data
 * 
 * This module provides data for the reverse recyclables lookup feature:
 * "I want more X; what can I break down to get X, and how efficient are the options"
 * 
 * Data structure maps recyclable source items to their yields, allowing
 * players to find which items to recycle to obtain specific materials.
 */

export interface RecyclingYield {
  targetId: string;      // id of the resulting material / part
  amount: number;        // how many units you get per recycle
}

export interface RecyclableSource {
  id: string;
  name: string;
  category?: string;     // e.g., "Junk", "Weapon", "Armour", "Robot Part", "Consumable"
  rarity?: string;       // e.g., "Common", "Rare", "Epic", "Legendary"
  tags?: string[];       // e.g., ["Residential", "Industrial", "Blue Gate", "Buried City"]
  yields: RecyclingYield[];
}

export interface TargetMaterial {
  id: string;
  name: string;
  rarity?: string;
  category?: string;
}

/**
 * Recyclable source items that can be broken down into materials.
 * Each item yields one or more materials when recycled.
 */
export const recyclableSources: RecyclableSource[] = [
  // Common Junk Items
  {
    id: "fried-motherboard",
    name: "Fried Motherboard",
    category: "Junk",
    rarity: "Common",
    tags: ["Industrial", "Residential", "Buried City", "Spaceport"],
    yields: [
      { targetId: "arc-alloy", amount: 2 },
      { targetId: "scrap-metal", amount: 1 },
    ],
  },
  {
    id: "rusted-tools",
    name: "Rusted Tools",
    category: "Junk",
    rarity: "Common",
    tags: ["Industrial", "The Dam", "Blue Gate"],
    yields: [
      { targetId: "arc-alloy", amount: 3 },
      { targetId: "scrap-metal", amount: 2 },
    ],
  },
  {
    id: "broken-circuit-board",
    name: "Broken Circuit Board",
    category: "Junk",
    rarity: "Common",
    tags: ["Industrial", "Residential", "Stella Montis"],
    yields: [
      { targetId: "arc-alloy", amount: 1 },
      { targetId: "electronic-components", amount: 2 },
    ],
  },
  {
    id: "scrap-metal-pile",
    name: "Scrap Metal Pile",
    category: "Junk",
    rarity: "Common",
    tags: ["Industrial", "All Maps"],
    yields: [
      { targetId: "scrap-metal", amount: 3 },
    ],
  },
  {
    id: "damaged-fabric",
    name: "Damaged Fabric",
    category: "Junk",
    rarity: "Common",
    tags: ["Residential", "Buried City", "The Dam"],
    yields: [
      { targetId: "synthetic-fibre", amount: 2 },
    ],
  },
  {
    id: "old-battery",
    name: "Old Battery",
    category: "Junk",
    rarity: "Common",
    tags: ["Industrial", "Residential", "All Maps"],
    yields: [
      { targetId: "electronic-components", amount: 1 },
      { targetId: "scrap-metal", amount: 1 },
    ],
  },
  {
    id: "worn-cable",
    name: "Worn Cable",
    category: "Junk",
    rarity: "Common",
    tags: ["Industrial", "All Maps"],
    yields: [
      { targetId: "synthetic-fibre", amount: 1 },
      { targetId: "electronic-components", amount: 1 },
    ],
  },
  {
    id: "plastic-scraps",
    name: "Plastic Scraps",
    category: "Junk",
    rarity: "Common",
    tags: ["Residential", "All Maps"],
    yields: [
      { targetId: "synthetic-fibre", amount: 1 },
    ],
  },

  // Rare Junk Items
  {
    id: "intact-motherboard",
    name: "Intact Motherboard",
    category: "Junk",
    rarity: "Rare",
    tags: ["Industrial", "Stella Montis", "Spaceport"],
    yields: [
      { targetId: "arc-alloy", amount: 5 },
      { targetId: "electronic-components", amount: 3 },
      { targetId: "refined-alloy", amount: 1 },
    ],
  },
  {
    id: "precision-tools",
    name: "Precision Tools",
    category: "Junk",
    rarity: "Rare",
    tags: ["Industrial", "The Dam", "Stella Montis"],
    yields: [
      { targetId: "arc-alloy", amount: 4 },
      { targetId: "refined-alloy", amount: 2 },
    ],
  },
  {
    id: "advanced-circuit-board",
    name: "Advanced Circuit Board",
    category: "Junk",
    rarity: "Rare",
    tags: ["Industrial", "Stella Montis", "Blue Gate"],
    yields: [
      { targetId: "arc-alloy", amount: 3 },
      { targetId: "electronic-components", amount: 5 },
      { targetId: "refined-alloy", amount: 1 },
    ],
  },
  {
    id: "reinforced-fabric",
    name: "Reinforced Fabric",
    category: "Junk",
    rarity: "Rare",
    tags: ["Residential", "Buried City"],
    yields: [
      { targetId: "synthetic-fibre", amount: 4 },
      { targetId: "advanced-fibre", amount: 1 },
    ],
  },

  // Epic Junk Items
  {
    id: "master-circuit-board",
    name: "Master Circuit Board",
    category: "Junk",
    rarity: "Epic",
    tags: ["Industrial", "Stella Montis"],
    yields: [
      { targetId: "arc-alloy", amount: 8 },
      { targetId: "electronic-components", amount: 6 },
      { targetId: "refined-alloy", amount: 3 },
      { targetId: "pristine-alloy", amount: 1 },
    ],
  },
  {
    id: "masterwork-tools",
    name: "Masterwork Tools",
    category: "Junk",
    rarity: "Epic",
    tags: ["Industrial", "The Dam"],
    yields: [
      { targetId: "arc-alloy", amount: 6 },
      { targetId: "refined-alloy", amount: 4 },
      { targetId: "pristine-alloy", amount: 2 },
    ],
  },

  // Weapon Parts
  {
    id: "damaged-weapon-core",
    name: "Damaged Weapon Core",
    category: "Weapon Part",
    rarity: "Common",
    tags: ["Industrial", "All Maps"],
    yields: [
      { targetId: "arc-alloy", amount: 4 },
      { targetId: "electronic-components", amount: 2 },
    ],
  },
  {
    id: "weapon-barrel",
    name: "Weapon Barrel",
    category: "Weapon Part",
    rarity: "Rare",
    tags: ["Industrial", "All Maps"],
    yields: [
      { targetId: "refined-alloy", amount: 3 },
      { targetId: "arc-alloy", amount: 2 },
    ],
  },
  {
    id: "weapon-receiver",
    name: "Weapon Receiver",
    category: "Weapon Part",
    rarity: "Epic",
    tags: ["Industrial", "All Maps"],
    yields: [
      { targetId: "refined-alloy", amount: 5 },
      { targetId: "pristine-alloy", amount: 2 },
      { targetId: "electronic-components", amount: 3 },
    ],
  },

  // Armour Parts
  {
    id: "damaged-armour-plate",
    name: "Damaged Armour Plate",
    category: "Armour Part",
    rarity: "Common",
    tags: ["Industrial", "Residential", "All Maps"],
    yields: [
      { targetId: "arc-alloy", amount: 3 },
      { targetId: "synthetic-fibre", amount: 2 },
    ],
  },
  {
    id: "armour-reinforcement",
    name: "Armour Reinforcement",
    category: "Armour Part",
    rarity: "Rare",
    tags: ["Industrial", "All Maps"],
    yields: [
      { targetId: "refined-alloy", amount: 4 },
      { targetId: "advanced-fibre", amount: 2 },
    ],
  },
  {
    id: "armour-core",
    name: "Armour Core",
    category: "Armour Part",
    rarity: "Epic",
    tags: ["Industrial", "All Maps"],
    yields: [
      { targetId: "pristine-alloy", amount: 3 },
      { targetId: "refined-alloy", amount: 3 },
      { targetId: "advanced-fibre", amount: 2 },
    ],
  },

  // Robot Parts
  {
    id: "arc-servo",
    name: "ARC Servo",
    category: "Robot Part",
    rarity: "Rare",
    tags: ["Industrial", "All Maps"],
    yields: [
      { targetId: "refined-alloy", amount: 3 },
      { targetId: "electronic-components", amount: 4 },
    ],
  },
  {
    id: "arc-processor",
    name: "ARC Processor",
    category: "Robot Part",
    rarity: "Epic",
    tags: ["Industrial", "Stella Montis", "Blue Gate"],
    yields: [
      { targetId: "pristine-alloy", amount: 2 },
      { targetId: "electronic-components", amount: 6 },
      { targetId: "refined-alloy", amount: 2 },
    ],
  },
  {
    id: "arc-power-cell",
    name: "ARC Power Cell",
    category: "Robot Part",
    rarity: "Epic",
    tags: ["Industrial", "All Maps"],
    yields: [
      { targetId: "pristine-alloy", amount: 3 },
      { targetId: "electronic-components", amount: 5 },
    ],
  },

  // Consumables (Quest Items)
  {
    id: "medical-supplies",
    name: "Medical Supplies",
    category: "Consumable",
    rarity: "Common",
    tags: ["Residential", "Stella Montis", "The Dam"],
    yields: [
      { targetId: "synthetic-fibre", amount: 1 },
    ],
  },
  {
    id: "research-data",
    name: "Research Data",
    category: "Consumable",
    rarity: "Rare",
    tags: ["Industrial", "Stella Montis"],
    yields: [
      { targetId: "electronic-components", amount: 3 },
    ],
  },
];

/**
 * Target materials that players want to obtain through recycling.
 * These are the materials that appear in the dropdown for selection.
 */
export const targetMaterials: TargetMaterial[] = [
  // Common Materials
  {
    id: "scrap-metal",
    name: "Scrap Metal",
    rarity: "Common",
    category: "Material",
  },
  {
    id: "synthetic-fibre",
    name: "Synthetic Fibre",
    rarity: "Common",
    category: "Material",
  },
  {
    id: "electronic-components",
    name: "Electronic Components",
    rarity: "Common",
    category: "Material",
  },
  
  // Rare Materials
  {
    id: "arc-alloy",
    name: "Arc Alloy",
    rarity: "Rare",
    category: "Material",
  },
  {
    id: "refined-alloy",
    name: "Refined Alloy",
    rarity: "Rare",
    category: "Material",
  },
  {
    id: "advanced-fibre",
    name: "Advanced Fibre",
    rarity: "Rare",
    category: "Material",
  },
  
  // Epic Materials
  {
    id: "pristine-alloy",
    name: "Pristine Alloy",
    rarity: "Epic",
    category: "Material",
  },
];

/**
 * Find all recyclable source items that yield a specific target material.
 * Returns an array of source items with their corresponding yield information,
 * sorted by yield amount (highest first), then by rarity.
 * 
 * @param targetId - The ID of the target material to find sources for
 * @returns Array of source items and their yields for the target material
 */
export function findSourcesForTarget(targetId: string): {
  source: RecyclableSource;
  yield: RecyclingYield;
}[] {
  const results: { source: RecyclableSource; yield: RecyclingYield }[] = [];

  for (const source of recyclableSources) {
    const yieldMatch = source.yields.find((y) => y.targetId === targetId);
    if (yieldMatch) {
      results.push({
        source,
        yield: yieldMatch,
      });
    }
  }

  // Sort by yield amount (highest first), then by rarity priority
  const rarityPriority: Record<string, number> = {
    Epic: 3,
    Rare: 2,
    Common: 1,
  };

  results.sort((a, b) => {
    // First sort by yield amount (descending)
    if (b.yield.amount !== a.yield.amount) {
      return b.yield.amount - a.yield.amount;
    }
    // Then by rarity (Epic > Rare > Common)
    const aRarity = a.source.rarity ? rarityPriority[a.source.rarity] || 0 : 0;
    const bRarity = b.source.rarity ? rarityPriority[b.source.rarity] || 0 : 0;
    return bRarity - aRarity;
  });

  return results;
}

/**
 * Get unique rarities from target materials for filtering.
 */
export function getTargetMaterialRarities(): string[] {
  const rarities = new Set<string>();
  targetMaterials.forEach((material) => {
    if (material.rarity) {
      rarities.add(material.rarity);
    }
  });
  return Array.from(rarities).sort();
}

/**
 * Get unique categories from target materials for filtering.
 */
export function getTargetMaterialCategories(): string[] {
  const categories = new Set<string>();
  targetMaterials.forEach((material) => {
    if (material.category) {
      categories.add(material.category);
    }
  });
  return Array.from(categories).sort();
}

