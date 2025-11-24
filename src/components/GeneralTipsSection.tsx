import { useState } from "react";
import { Card } from "./Card";
import { Pill } from "./Pill";

export default function GeneralTipsSection() {
  type TipCategory =
    | "early-game"
    | "solo-habits"
    | "combat"
    | "bosses"
    | "economy"
    | "extraction"
    | "mental"
    | "settings";

  type TipSkillBand = "Rookie" | "Seasoned" | "Veteran";

  type Tip = {
    id: string;
    title: string;
    summary: string;
    details: string[];
    category: TipCategory;
    skillBand: TipSkillBand;
    risk: "Low" | "Medium" | "High";
    priority: number;
  };

  const [activeCategory, setActiveCategory] = useState<TipCategory | "all">(
    "all"
  );
  const [sortKey, setSortKey] = useState<"recommended" | "risk" | "skill">(
    "recommended"
  );

  const categoryMeta: {
    id: TipCategory | "all";
    label: string;
    description: string;
  }[] = [
    {
      id: "all",
      label: "All",
      description: "Every tip in one feed, sorted by your preference.",
    },
    {
      id: "early-game",
      label: "Early game",
      description: "Getting started, first kits, not being broke all the time.",
    },
    {
      id: "solo-habits",
      label: "Solo habits",
      description: "Routines that keep you alive and levelling steadily.",
    },
    {
      id: "combat",
      label: "Combat",
      description: "Positioning, timing and how to stop getting deleted.",
    },
    {
      id: "bosses",
      label: "Bosses and ARCs",
      description: "How to approach heavy ARCs and events without feeding.",
    },
    {
      id: "economy",
      label: "Economy and stash",
      description: "Coins, recyclables, stash management and progression.",
    },
    {
      id: "extraction",
      label: "Extraction",
      description: "When to leave, how to leave and how not to get beamed.",
    },
    {
      id: "mental",
      label: "Mindset",
      description: "Tilt control, realistic goals and avoiding burnout.",
    },
    {
      id: "settings",
      label: "Settings",
      description: "FOV, audio and small tweaks that make fights clearer.",
    },
  ];

  const tips: Tip[] = [
    {
      id: "early-purpose",
      category: "early-game",
      skillBand: "Rookie",
      risk: "Low",
      priority: 1,
      title: "Every raid needs a purpose",
      summary:
        "Go in with one clear job such as XP, coins, a key, a boss or a specific material. Everything else is optional.",
      details: [
        "Before you ready up, say out loud what this raid is for and build your kit around that one purpose.",
        "If you are on an XP run, you do not need to chase long range PvP or awkward bosses. Tap every container and corpse instead.",
        "If you are on a coin or material run, avoid risky detours. Hit your money rooms, then leave as soon as your bag is worth saving.",
      ],
    },
    {
      id: "early-free-kits",
      category: "early-game",
      skillBand: "Rookie",
      risk: "Medium",
      priority: 2,
      title: "Abuse free kits and accept dying",
      summary:
        "Free kits exist so you can learn routes and bosses without risking your real stash.",
      details: [
        "Use free kits for suicide scouting runs into places like Grandioso, Seed Vault or Dam domes and treat every container and corpse as XP.",
        "Expect to die on these runs. Your win condition is learning spawns, sound cues and sight lines for future serious raids.",
        "Once you have a route you like, switch to proper gear and run the same pattern for real extractions.",
      ],
    },
    {
      id: "solo-open-doors",
      category: "solo-habits",
      skillBand: "Rookie",
      risk: "Low",
      priority: 3,
      title: "Use doors and sound as your early warning system",
      summary:
        "Doors, lifts and glass tell you when someone is on your trail long before you see them.",
      details: [
        "Notice which doors are closed when you arrive. If a door that you know was shut is suddenly open behind you, someone is walking your route.",
        "When clearing indoors, close doors behind you unless you need them as escape options. Any door opening later is free information.",
        "On Dam and Stella Montis in particular, try to keep one clean path of closed doors behind you so you always know if you are being followed.",
      ],
    },
    {
      id: "solo-three-strikes",
      category: "solo-habits",
      skillBand: "Seasoned",
      risk: "Medium",
      priority: 4,
      title: "Three strike rule for risk",
      summary:
        "Once three bad signs line up, you rotate out or extract even if the raid looks promising.",
      details: [
        "Count things like low shields, low ammo, multiple teams nearby, a boss raging in the open or bad weather on top of it all.",
        "The first sign is a warning, the second means be careful and the third is your cue to leave or at least shift to a safer half of the map.",
        "This rule will save your best kits from the greedy last push that usually gets you killed.",
      ],
    },
    {
      id: "combat-cover",
      category: "combat",
      skillBand: "Rookie",
      risk: "Low",
      priority: 5,
      title: "Never fight in the open if you can help it",
      summary:
        "Your best buff as a solo player is good cover and angles. Standing in a street is how you get farmed by ARCs and squads.",
      details: [
        "On Buried City and Spaceport, always fight from inside a doorway, behind a pillar, roof edge or container stack.",
        "On Dam, use railings, stairs and the inside of buildings. Do not stand on the skyline of the dam itself for long.",
        "If you realise you are stuck in the open, commit to a sprint into the nearest hard cover rather than trying to trade shots while exposed.",
      ],
    },
    {
      id: "combat-focus-targets",
      category: "combat",
      skillBand: "Seasoned",
      risk: "Medium",
      priority: 6,
      title: "Turn chaotic fights into a queue",
      summary:
        "Crowds of ARCs will kill you if you let them all act at once. Make them take turns.",
      details: [
        "Break line of sight so that only one cluster can see you at a time. Doors, corners and height changes are your best tools.",
        "Focus on threats that remove your cover first such as Bombardiers, Rocketeers and any ARC already on your flank.",
        "If you cannot fix the angle, move. Rotating fifteen metres to a better piece of cover is worth more than landing one extra magazine.",
      ],
    },
    {
      id: "boss-soft-commit",
      category: "bosses",
      skillBand: "Seasoned",
      risk: "High",
      priority: 7,
      title: "Soft commit to bosses before you hard commit",
      summary:
        "Poke a boss and the surrounding area before betting your whole raid on the fight.",
      details: [
        "Approach boss arenas from cover and scan for other players first. You are looking for muzzles, tracers and ARCs already aggroed.",
        "Take a few safe shots at weak spots from range. If the boss positioning is bad, or players appear on your flank, break off and rotate.",
        "Only hard commit when you know where you will move if a squad shows up and which cover pieces you will bounce between.",
      ],
    },
    {
      id: "boss-corpse-looting",
      category: "bosses",
      skillBand: "Seasoned",
      risk: "Medium",
      priority: 8,
      title: "Boss corpse looting is where the XP really is",
      summary:
        "Killing the boss is half the job. Quickly stripping every corpse segment is where the XP and profit spike.",
      details: [
        "After a boss dies, take two seconds to clear obvious surviving ARCs and then sprint a tight loop touching every visible piece of the body.",
        "Use smoke or natural cover between corpse segments so you are not standing silhouetted in the open while looting.",
        "If players are close, prioritise the safest segments and leave any that would require you to stand in a kill lane.",
      ],
    },
    {
      id: "economy-dont-hoard",
      category: "economy",
      skillBand: "Rookie",
      risk: "Low",
      priority: 9,
      title: "Do not hoard rubbish in your stash",
      summary:
        "A bloated stash makes it harder to build clean kits and see your real progression.",
      details: [
        "Regularly recycle or sell low tier weapons you never use and materials that you can easily farm on your favourite maps.",
        "Keep a small reserve of safe, comfortable kits that you know how to pilot, rather than ten half finished builds.",
        "If an item has sat in your stash for five sessions without you wanting to take it, it is probably safe to break down.",
      ],
    },
    {
      id: "economy-session-plan",
      category: "economy",
      skillBand: "Seasoned",
      risk: "Medium",
      priority: 10,
      title: "Plan sessions, not only raids",
      summary:
        "Think in blocks of four to six raids with a theme, such as XP sprint, coin stacking or material farming.",
      details: [
        "Start a session with one or two lower risk routes to warm up and rebuild confidence if needed.",
        "Move into your big profit or boss routes once you feel dialled in, then wind down with one safe loot run if you are ahead.",
        "Stop while you are up. Ending a night by forcing one last raid while tired is when you usually throw away a whole evening of gains.",
      ],
    },
    {
      id: "extraction-pathing",
      category: "extraction",
      skillBand: "Rookie",
      risk: "Low",
      priority: 11,
      title: "Know your extraction before you leave spawn",
      summary:
        "Every raid should have a default extraction and at least one backup picked in your head.",
      details: [
        "As soon as you see your spawn, decide which extraction you would like to use if the raid goes well.",
        "While you run your route, periodically check that you are not drifting so far away that extraction will be a horrible cross map sprint.",
        "If your bag is already strong and you are close to your chosen exit, do not be afraid to leave early and bank the win.",
      ],
    },
    {
      id: "extraction-timing",
      category: "extraction",
      skillBand: "Seasoned",
      risk: "Medium",
      priority: 12,
      title: "Extract on green, not on greed",
      summary:
        "Once your kit and bag are solid, you are supposed to leave. Anything after that is bonus, not the plan.",
      details: [
        "Have a personal rule such as leave when your bag is 70 percent full of things you would be sad to lose.",
        "If you have taken a big fight, won and used most of your shield rechargers or healing items, treat that as the end of the raid and go home.",
        "Trying to squeeze one more boss or event out of a damaged kit is how otherwise perfect runs die.",
      ],
    },
    {
      id: "mental-small-goals",
      category: "mental",
      skillBand: "Rookie",
      risk: "Low",
      priority: 13,
      title: "Set tiny goals and celebrate them",
      summary:
        "You do not need to become a tournament player. You need to get a bit better every few sessions.",
      details: [
        "Examples of healthy goals: survive three raids in a row, learn one new boss pattern, or memorise a safe route on a new map.",
        "Avoid goals that depend on other players such as winning every fight or never being third partied.",
        "At the end of a session, notice what went well instead of only replaying the worst death in your head.",
      ],
    },
    {
      id: "mental-tilt-stop",
      category: "mental",
      skillBand: "Seasoned",
      risk: "Medium",
      priority: 14,
      title: "Respect tilt before it eats your stash",
      summary:
        "Losing a few raids in a row is normal. The danger is when you start playing angry and careless.",
      details: [
        "If you catch yourself sprinting everywhere, ignoring audio, or hot dropping bosses you would normally skip, call that a tilt warning.",
        "Set a simple rule such as two bad raids means a short break, three in a row means you are done for the night.",
        "Keep one or two comfy, safe routes for tilt days where you just want to loot calmly and leave.",
      ],
    },
    {
      id: "settings-clarity",
      category: "settings",
      skillBand: "Rookie",
      risk: "Low",
      priority: 15,
      title: "Prioritise visual clarity over prettiness",
      summary:
        "You cannot react to threats you cannot see. Clarity is a massive hidden power spike.",
      details: [
        "Use a FOV that lets you track your surroundings without turning every fight into a tiny target nightmare. Slightly wider than default is usually good.",
        "Turn off or reduce heavy post processing that makes the world hazy such as film grain and heavy motion blur if available.",
        "Check that your brightness is high enough to see shapes in dark interiors without making the whole map washed out.",
      ],
    },
    {
      id: "settings-audio",
      category: "settings",
      skillBand: "Seasoned",
      risk: "Low",
      priority: 16,
      title: "Tune audio for footsteps and mechanical noise",
      summary:
        "In an extraction game, hearing things two seconds earlier often saves your raid.",
      details: [
        "Lower music and loud ambient effects so you can actually hear footsteps, reloads and ARC movement.",
        "If your headset allows it, use a profile that makes mid range sounds such as steps and metal clanks clearer.",
        "Use consistent audio across sessions. Constantly changing EQ and volumes makes it harder to build intuition.",
      ],
    },
  ];

  const skillWeight: Record<TipSkillBand, number> = {
    Rookie: 0,
    Seasoned: 1,
    Veteran: 2,
  };

  const riskWeight: Record<"Low" | "Medium" | "High", number> = {
    Low: 0,
    Medium: 1,
    High: 2,
  };

  const getRiskVariant = (risk: string) => {
    if (risk === "Low") return "success";
    if (risk === "Medium") return "warning";
    if (risk === "High") return "danger";
    return "default";
  };

  const filteredTips = tips.filter((tip) =>
    activeCategory === "all" ? true : tip.category === activeCategory
  );

  const sortedTips = [...filteredTips].sort((a, b) => {
    if (sortKey === "recommended") {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      return skillWeight[a.skillBand] - skillWeight[b.skillBand];
    }
    if (sortKey === "risk") {
      if (riskWeight[a.risk] !== riskWeight[b.risk]) {
        return riskWeight[a.risk] - riskWeight[b.risk];
      }
      return a.priority - b.priority;
    }
    // sortKey === "skill"
    if (skillWeight[a.skillBand] !== skillWeight[b.skillBand]) {
      return skillWeight[a.skillBand] - skillWeight[b.skillBand];
    }
    return a.priority - b.priority;
  });

  const activeCategoryMeta =
    categoryMeta.find((c) => c.id === activeCategory) ||
    categoryMeta[0];

  return (
    <div className="space-y-6">
      <div className="flex items-centre gap-4 mb-8">
        <div className="w-1 h-12 bg-cyan-400" />
        <div>
          <h2 className="text-3xl font-bold text-slate-100">
            General Tips
          </h2>
          <div className="text-sm text-cyan-400 uppercase tracking-wider mt-1">
            Field Manual and Solo Survival Guide
          </div>
        </div>
      </div>

      {/* Filter and sort controls */}
      <Card variant="tactical">
        <div className="flex flex-col md:flex-row md:items-centre md:justify-between gap-4 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-1">
              Focus
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Choose what you want help with, then pick how to sort the tips.
              Start with Recommended if you are new, or sort by Risk when you are
              looking for spicier ideas.
            </p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
              Sort Tips
            </label>
            <select
              value={sortKey}
              onChange={(e) =>
                setSortKey(e.target.value as "recommended" | "risk" | "skill")
              }
              className="bg-slate-900/80 border border-cyan-800/50 rounded px-3 py-2 text-xs text-slate-200 backdrop-blur-sm"
            >
              <option value="recommended">Recommended order</option>
              <option value="risk">By risk level</option>
              <option value="skill">By experience band</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categoryMeta.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setActiveCategory(cat.id as TipCategory | "all")
              }
              className={`px-3 py-2 rounded text-xs font-semibold uppercase tracking-wide transition-all ${
                activeCategory === cat.id
                  ? "bg-cyan-600 text-white shadow-lg"
                  : "bg-slate-800/60 text-slate-300 hover:bg-slate-700/70 border border-slate-700/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-4 border-t border-slate-700/50 pt-3">
          <p className="text-xs text-slate-400">
            Currently viewing{" "}
            <span className="text-cyan-300 font-semibold">
              {activeCategoryMeta.label}
            </span>{" "}
            tips.{" "}
            <span className="text-slate-300">
              {activeCategoryMeta.description}
            </span>
          </p>
        </div>
      </Card>

      {/* Tip cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedTips.map((tip) => (
          <Card
            key={tip.id}
            className="bg-slate-900/60 border border-slate-700/60"
          >
            <div className="flex flex-wrap gap-2 mb-3">
              <Pill variant="info">
                {categoryMeta.find((c) => c.id === tip.category)?.label ??
                  "Tip"}
              </Pill>
              <Pill>
                {tip.skillBand === "Rookie"
                  ? "Rookie raider"
                  : tip.skillBand === "Seasoned"
                  ? "Seasoned raider"
                  : "Veteran raider"}
              </Pill>
              <Pill variant={getRiskVariant(tip.risk)}>
                {tip.risk} risk
              </Pill>
            </div>
            <h3 className="text-lg font-semibold text-cyan-300 mb-1">
              {tip.title}
            </h3>
            <p className="text-sm text-slate-300 mb-3">
              {tip.summary}
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              {tip.details.map((line, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">▸</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* Footer note */}
      <Card>
        <p className="text-xs text-slate-400">
          Use these as guidelines, not strict rules. The goal is to stack small,
          consistent advantages. If a tip fights your personal style, adapt it
          until it feels natural on your routes and loadouts.
        </p>
      </Card>
    </div>
  );
}