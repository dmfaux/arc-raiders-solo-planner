import { Card } from "./Card";
import { Crosshair } from "lucide-react";

export default function HighValueTargetsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1 h-12 bg-cyan-400" />
        <div>
          <h2 className="text-3xl font-bold text-slate-100">
            High Value Targets
          </h2>
          <div className="text-sm text-cyan-400 uppercase tracking-wider mt-1">
            Combat Intel
          </div>
        </div>
      </div>

      <Card variant="tactical">
        <div className="flex items-start gap-3 mb-4">
          <Crosshair className="w-5 h-5 text-red-400 mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-cyan-300 uppercase tracking-wide">
              Target Priority By XP
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Solo you want long, controlled fights with big
              ARCs and very short fights with players.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="text-red-400 font-semibold mb-2 uppercase tracking-wide text-xs">
              Tier 1 - Prime XP
            </h4>
            <ul className="space-y-2">
              <li>
                Bastions and Rocketeers you can farm from cover.
              </li>
              <li>
                Bombardiers in open ground where you control
                angles.
              </li>
              <li>
                Queens and other named bosses during events.
              </li>
            </ul>
          </div>
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="text-amber-300 font-semibold mb-2 uppercase tracking-wide text-xs">
              Tier 2 - Worth if safe
            </h4>
            <ul className="space-y-2">
              <li>
                Mixed ARC packs you can funnel through doors or
                choke points.
              </li>
              <li>
                Turrets and Shredders in Stella Montis that you
                can peek safely.
              </li>
              <li>
                Leaper packs that have already committed to
                other players.
              </li>
            </ul>
          </div>
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="text-slate-200 font-semibold mb-2 uppercase tracking-wide text-xs">
              Tier 3 - Usually skip
            </h4>
            <ul className="space-y-2">
              <li>Bosses in open fields with no hard cover.</li>
              <li>
                Any ARC cluster that requires you to cross
                sniper sightlines.
              </li>
              <li>
                Player plus boss stacks when you are low on
                shield rechargers or ammo.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-700/40 text-sm text-slate-300">
          <p>
            For XP it is better to take a Bastion from half
            health to zero in a safe lane than to tap it once
            and run. Once a boss dies, loot every visible piece
            of the corpse. Each segment counts.
          </p>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
          Boss Behaviour Cheat Sheet
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="text-red-300 font-semibold mb-2 uppercase tracking-wide text-xs">
              Bastions and Rocketeers
            </h4>
            <ul className="space-y-2">
              <li>
                Fight them from the side or rear. Their frontal
                cone hurts.
              </li>
              <li>
                Use vertical cover on Buried City roofs or Dam
                walkways.
              </li>
              <li>
                Blaze grenades and LMG fire on weak spots give
                excellent XP.
              </li>
            </ul>
          </div>
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="text-red-300 font-semibold mb-2 uppercase tracking-wide text-xs">
              Bombardiers and grenade spam
            </h4>
            <ul className="space-y-2">
              <li>
                Circle them around solid objects, not in open
                courtyards.
              </li>
              <li>
                On Spaceport, use container rows to break arcs
                and grenades.
              </li>
              <li>
                Save sprint for dodging barrages, not for
                chasing them.
              </li>
            </ul>
          </div>
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="text-red-300 font-semibold mb-2 uppercase tracking-wide text-xs">
              Queens, Matriarchs and event bosses
            </h4>
            <ul className="space-y-2">
              <li>
                Arrive late and let squads crack the first
                armour plates.
              </li>
              <li>
                Focus on add control and safe damage rather than
                winning the duel.
              </li>
              <li>
                During loud global events, do not be the first
                Raider standing in the open.
              </li>
            </ul>
          </div>
          <div className="bg-slate-900/40 p-4 rounded border border-slate-700/40">
            <h4 className="text-red-300 font-semibold mb-2 uppercase tracking-wide text-xs">
              Indoor threats - Stella and Blue Gate
            </h4>
            <ul className="space-y-2">
              <li>
                Break line of sight with turrets and Shredders
                every few shots.
              </li>
              <li>
                In tunnels, treat every bend like a proper
                corner clear.
              </li>
              <li>
                Smoke is for breaking tracking and sightlines,
                not only looting.
              </li>
            </ul>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4 text-cyan-300 uppercase tracking-wide">
          Player Interaction Around Bosses
        </h3>
        <ul className="space-y-3 text-slate-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              If a squad has already claimed a boss, play clean
              up. Control adds, loot safely and only third party
              if they push you first.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              During events, position yourself where you can
              exit to extraction after one or two boss cycles.
              Do not let greed keep you in for all phases.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-1">▸</span>
            <span>
              Treat every boss arena as a funnel. Know your
              retreat direction before you take the first shot.
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
}

