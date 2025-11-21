import { Card } from "./Card";

export default function GeneralTipsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1 h-12 bg-cyan-400" />
        <div>
          <h2 className="text-3xl font-bold text-slate-100">
            General Tips
          </h2>
          <div className="text-sm text-cyan-400 uppercase tracking-wider mt-1">
            Field Manual
          </div>
        </div>
      </div>

      <Card variant="tactical">
        <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
          Pre Raid Checklist
        </h3>
        <ul className="space-y-3 text-slate-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Decide the purpose of the run: XP, coin, keys or
              quest progress. Build around that, not random
              vibes.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Pick a route and stick to it unless an event or
              player movement gives you a clear reason to pivot.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Bring at least one escape tool. Smoke, flash or a
              strong movement skill saves more gear than one
              extra grenade.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Know which extraction you prefer and how you will
              reach it from your first point of interest.
            </span>
          </li>
        </ul>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
          Solo Habits That Speed Up Levelling
        </h3>
        <ul className="space-y-3 text-slate-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Open every container and body you see, even when
              you do not need the loot. XP from searching is
              what you are really farming.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Avoid pointless PvP. Take fights when they protect
              your XP, remove a direct threat or give a clear
              advantage like height or audio.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Learn one route for each mood: fast and risky,
              safe and slow, and a balanced money route.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              If you are on a great run, do not get greedy.
              Extract once your bag is worth keeping or your
              armour stack is low.
            </span>
          </li>
        </ul>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
          Mid Run Decision Making
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="font-semibold text-cyan-400 mb-2 uppercase tracking-wider text-xs">
              When to push
            </h4>
            <ul className="space-y-2">
              <li>You hear heavy ARC fire and panic shots.</li>
              <li>
                You are already near the point of interest.
              </li>
              <li>
                You have spare plates, ammo and at least one
                escape tool.
              </li>
            </ul>
          </div>
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="font-semibold text-cyan-400 mb-2 uppercase tracking-wider text-xs">
              When to leave
            </h4>
            <ul className="space-y-2">
              <li>
                Your bag is mostly full and you are low on
                healing.
              </li>
              <li>
                You hear multiple squads rotating into your
                zone.
              </li>
              <li>
                You have already hit the main points of interest
                in your plan.
              </li>
            </ul>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
          Staying Sane During The Grind
        </h3>
        <ul className="space-y-3 text-slate-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Set small targets such as a couple of levels or a
              handful of successful extractions per session.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Swap routes or playstyles when you feel yourself
              tilting. Move from boss hunting to quiet loops to
              reset.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Future seasons may change progression. Map
              knowledge and calm decision making will always
              carry over.
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
}

