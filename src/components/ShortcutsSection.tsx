import { Card } from "./Card";
import { Zap } from "lucide-react";

export default function ShortcutsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1 h-12 bg-cyan-400" />
        <div>
          <h2 className="text-3xl font-bold text-slate-100">
            Shortcuts
          </h2>
          <div className="text-sm text-cyan-400 uppercase tracking-wider mt-1">
            Advanced Tactics
          </div>
        </div>
      </div>

      <Card variant="tactical">
        <div className="flex items-start gap-3 mb-4">
          <Zap className="w-5 h-5 text-amber-400 mt-1" />
          <h3 className="text-xl font-semibold text-cyan-300 uppercase tracking-wide">
            High XP per Minute Tricks
          </h3>
        </div>
        <div className="space-y-4 text-slate-300 text-sm">
          <div className="bg-amber-950/20 p-4 rounded border border-amber-800/30">
            <h4 className="font-semibold text-amber-300 mb-2 uppercase tracking-wider text-xs">
              Free kit suicide runs
            </h4>
            <ul className="space-y-2">
              <li>
                Take a free loadout, ignore gear and focus
                purely on XP.
              </li>
              <li>
                Run straight to high density zones like Seed
                Vault or domes.
              </li>
              <li>
                Open every container and corpse you can reach.
              </li>
              <li>
                If you die that is acceptable. You keep
                scavenging XP and lose only the free gear.
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="font-semibold text-cyan-400 mb-2 uppercase tracking-wider text-xs">
              Partial loot trick
            </h4>
            <p>
              You gain XP when a search starts, not only when
              you take items. Tapping already looted containers,
              bodies and crates still gives XP, especially in
              busy Buried City blocks or Spaceport warehouses.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
          Time Saving Patterns
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="font-semibold text-cyan-400 mb-2 uppercase tracking-wider text-xs">
              Late entry event swoops
            </h4>
            <ul className="space-y-2">
              <li>
                For Hidden Bunker, Launch Tower or Harvester,
                aim to arrive mid phase, not at the start.
              </li>
              <li>
                Let squads open doors and clear first waves,
                then sweep containers and corpses.
              </li>
              <li>
                Leave as soon as the area is stripped of XP and
                loot.
              </li>
            </ul>
          </div>
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="font-semibold text-cyan-400 mb-2 uppercase tracking-wider text-xs">
              Double dip extractions
            </h4>
            <ul className="space-y-2">
              <li>
                Finish a short loop that ends near an
                extraction.
              </li>
              <li>
                Hit one more quick side point of interest on the
                way out.
              </li>
              <li>
                Extract on the same call so you compress two
                pockets of XP into one timer.
              </li>
            </ul>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
          Low Effort Options
        </h3>
        <div className="space-y-4 text-sm text-slate-300">
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="font-semibold text-cyan-400 mb-2 uppercase tracking-wider text-xs">
              AFK night survival
            </h4>
            <p>
              In Night Raid conditions you can hide in a deep
              interior room on Dam or Buried City and gain slow
              XP from time on surface and a few containers.
              Extremely slow but completely hands off.
            </p>
          </div>
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="font-semibold text-cyan-400 mb-2 uppercase tracking-wider text-xs">
              Safe end of raid sweeps
            </h4>
            <p>
              Late game, quieter wings like apartments, Dam
              residential or Stella side wings often have
              leftover containers with no players around. A
              quick five minute sweep can top up a run safely.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
          Boss Tricks
        </h3>
        <ul className="space-y-3 text-slate-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Blaze grenades and traps are excellent for melting
              large ARC bosses while stacking damage XP. Place
              them where bosses must walk.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Use smoke before looting boss corpses so you are
              not an easy target for other players.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Try to fight bosses near natural barriers. A
              Bastion on a staircase or a Queen near a pillar is
              far easier for a solo to control.
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
}

