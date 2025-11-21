import { Card } from "./Card";
import { Target, Calculator } from "lucide-react";
import { RunLogPanel } from "./RunLogPanel";

export default function OverviewSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1 h-12 bg-cyan-400" />
        <div>
          <h2 className="text-3xl font-bold text-slate-100">
            Overview
          </h2>
          <div className="text-sm text-cyan-400 uppercase tracking-wider mt-1">
            Mission Briefing
          </div>
        </div>
      </div>

      <Card variant="tactical">
        <div className="flex items-start gap-3 mb-4">
          <Target className="w-5 h-5 text-cyan-400 mt-1" />
          <div>
            <h3 className="text-xl font-semibold mb-2">
              How this app helps
            </h3>
          </div>
        </div>
        <div className="space-y-3 text-slate-300 leading-relaxed">
          <p>
            This companion app compresses a long solo XP guide
            for Arc Raiders into something you can glance at
            between raids.
          </p>
          <p>It is tailored for solo PC players.</p>
          <p className="text-cyan-300/90">It focuses on:</p>
          <ul className="list-none ml-4 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>
                choosing a type of run (boss, loot, stealth)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>
                adapting that run to the actual map, spawn and
                modifier you get
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>
                giving rough XP expectations and planning how
                many runs you need
              </span>
            </li>
          </ul>
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-3 mb-4">
          <Calculator className="w-5 h-5 text-amber-400 mt-1" />
          <div>
            <h3 className="text-xl font-semibold">
              XP basics recap
            </h3>
          </div>
        </div>
        <div className="space-y-3 text-slate-300 leading-relaxed">
          <p>
            XP gives you levels, and each level gives you a
            skill point.
          </p>
          <p className="text-cyan-300/90">Main XP sources:</p>
          <ul className="list-none ml-4 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>damage and kills on ARC enemies</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>scavenging containers and corpses</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>time survived and extracting</span>
            </li>
          </ul>
          <div className="pt-3 mt-3 border-t border-slate-700/50">
            <p className="text-amber-300/90">
              Looting is very efficient:
            </p>
            <ul className="list-none ml-4 space-y-2 mt-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">▸</span>
                <span>
                  opening containers and corpses gives XP even
                  if they are already looted
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">▸</span>
                <span>
                  looting big ARC corpses in multiple pieces is
                  a major XP source
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="mt-4">
        <RunLogPanel />
      </Card>
    </div>
  );
}

