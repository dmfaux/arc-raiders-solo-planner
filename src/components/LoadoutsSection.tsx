import { Card } from "./Card";
import { loadouts } from "../data/loadouts";

export default function LoadoutsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1 h-12 bg-cyan-400" />
        <div>
          <h2 className="text-3xl font-bold text-slate-100">
            Loadouts
          </h2>
          <div className="text-sm text-cyan-400 uppercase tracking-wider mt-1">
            Equipment Profiles
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {loadouts.map((loadout) => (
          <Card key={loadout.id} variant="tactical">
            <h3 className="text-xl font-semibold mb-2 text-cyan-300 uppercase tracking-wide">
              {loadout.name}
            </h3>
            <p className="text-slate-400 mb-6 italic">
              {loadout.focus}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-900/30 p-4 rounded border border-slate-700/30">
                <h4 className="font-semibold text-cyan-400 mb-3 uppercase tracking-wider text-sm">
                  Weapons
                </h4>
                <div className="space-y-3 text-slate-300 text-sm">
                  <div>
                    <span className="text-slate-500 uppercase tracking-wider text-xs block mb-1">
                      Primary
                    </span>
                    <span>{loadout.primary}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase tracking-wider text-xs block mb-1">
                      Secondary
                    </span>
                    <span>{loadout.secondary}</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/30 p-4 rounded border border-slate-700/30">
                <h4 className="font-semibold text-cyan-400 mb-3 uppercase tracking-wider text-sm">
                  Utilities
                </h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  {loadout.utilities.map((util, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2"
                    >
                      <span className="text-cyan-400 mt-0.5">
                        ▸
                      </span>
                      <span>{util}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-cyan-950/20 p-4 rounded border border-cyan-800/30">
                <h4 className="font-semibold text-cyan-400 mb-3 uppercase tracking-wider text-sm">
                  Key Skills
                </h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  {loadout.skills.map((skill, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2"
                    >
                      <span className="text-cyan-400 mt-0.5">
                        ▸
                      </span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
                <h4 className="font-semibold text-slate-400 mb-3 uppercase tracking-wider text-sm">
                  Notes
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {loadout.notes}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

