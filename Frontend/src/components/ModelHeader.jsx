export default function ModelHeader({ model }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {model.name}
          </h1>
          <p className="text-slate-300 text-lg">
            AI-Recommended SDLC Methodology
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <span className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-400 text-sm font-semibold">
            {model.diagramType.toUpperCase()}
          </span>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">
              {Math.round(model.llmConfidenceScore * 100)}%
            </div>
            <div className="text-xs text-slate-400">Confidence</div>
          </div>
        </div>
      </div>
    </div>
  );
}
