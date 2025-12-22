import ModelHeader from "./ModelHeader";
import WhySelected from "./WhySelected";
import SDLCDiagram from "./SDLCDiagram";
import PhaseTimeline from "./PhaseTimeline";
import ProsCons from "./ProsCons";
import UsageHints from "./UsageHints";

export default function ModelView({ model }) {
  return (
    <div className="space-y-8">
      <ModelHeader model={model} />
      <WhySelected text={model.whySelected} />
      <SDLCDiagram model={model} />
      <PhaseTimeline phases={model.phases} />
      <ProsCons pros={model.pros} cons={model.cons} />
      <UsageHints bestFor={model.bestFor} avoid={model.whenNotToUse} />
      <div className="mt-8 pb-4">
        {model.notes && (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">Additional Notes</h2>
            <p className="text-slate-300 whitespace-pre-line">{model.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
