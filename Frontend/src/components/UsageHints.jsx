export default function UsageHints({ bestFor, avoid }) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-8">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-blue-400">Best For</h4>
        </div>
        <div className="flex flex-wrap gap-3">
          {bestFor.map((b, i) => (
            <span
              key={i}
              className="bg-blue-500/20 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-colors"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-8">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-orange-400">Avoid When</h4>
        </div>
        <div className="flex flex-wrap gap-3">
          {avoid.map((a, i) => (
            <span
              key={i}
              className="bg-orange-500/20 border border-orange-500/30 text-orange-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-500/30 transition-colors"
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
