import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModels, analyzeSession } from "../features/model/modelSlice";
import { fetchSessionById } from "../features/session/sessionSlice";
import { useParams } from "react-router-dom";
import ModelView from "../components/ModelView";
import ModelHeader from "../components/ModelHeader";

export default function SessionDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { list: models, loading } = useSelector((state) => state.models);
    const { current: session } = useSelector((state) => state.sessions);

    const [activeIndex, setActiveIndex] = useState(0);
    const [aiAnalyzed, setAiAnalyzed] = useState(false);
    const [budgetMultiplier, setBudgetMultiplier] = useState(1); // 0.5 to 2.0

    const handleAnalyze = async () => {
        try {
            await dispatch(analyzeSession(id));
            setAiAnalyzed(true);
        } catch (error) {
            console.error("Analysis failed:", error);
        }
    };

    // Calculate adjusted time based on budget multiplier
    const getAdjustedTime = (baseTime, multiplier) => {
        if (!baseTime) return baseTime;
        
        // Parse the time string and adjust
        const timeMatch = baseTime.match(/(\d+)-(\d+)\s*(weeks?|months?)/i);
        if (!timeMatch) return baseTime;
        
        const min = Math.max(1, Math.round(parseInt(timeMatch[1]) / multiplier));
        const max = Math.max(1, Math.round(parseInt(timeMatch[2]) / multiplier));
        const unit = timeMatch[3].toLowerCase();
        
        return `${min}-${max} ${unit}`;
    };

    useEffect(() => {
        dispatch(fetchModels(id));
        dispatch(fetchSessionById(id));
    }, [dispatch, id]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            📘 FlowIQ - SDLC Analysis Results
                        </h1>
                        <p className="text-slate-300">
                            AI-powered recommendations for your software development lifecycle
                        </p>
                    </div>
                    {models.length === 0 && (
                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "🔄 Analyzing..." : "🤖 Run AI Analysis"}
                        </button>
                    )
                    }

                </div>

                {/* Loading State */}
                {loading && (
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-12 text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-6"></div>
                        <h3 className="text-xl font-semibold text-white mb-2">AI Analysis in Progress</h3>
                        <p className="text-slate-400">
                            Our AI is analyzing your project parameters and generating SDLC model recommendations...
                        </p>
                    </div>
                )}

                {/* No models yet */}
                {!loading && models.length === 0 && (
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-12 text-center">
                        <div className="text-6xl mb-6">🧠</div>
                        <h3 className="text-2xl font-bold text-white mb-4">Ready for AI Analysis</h3>
                        <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                            Click the "Run AI Analysis" button above to generate personalized SDLC model recommendations
                            based on your project parameters, team composition, and requirements.
                        </p>
                        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            <div className="bg-slate-900/50 rounded-lg p-6">
                                <div className="text-2xl mb-3">🎯</div>
                                <h4 className="font-semibold text-white mb-2">Smart Matching</h4>
                                <p className="text-slate-400 text-sm">
                                    AI analyzes your project details to recommend the most suitable SDLC methodology.
                                </p>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-6">
                                <div className="text-2xl mb-3">📊</div>
                                <h4 className="font-semibold text-white mb-2">Detailed Insights</h4>
                                <p className="text-slate-400 text-sm">
                                    Get comprehensive analysis with pros, cons, and implementation guidance.
                                </p>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-6">
                                <div className="text-2xl mb-3">🔄</div>
                                <h4 className="font-semibold text-white mb-2">Interactive Diagrams</h4>
                                <p className="text-slate-400 text-sm">
                                    Visualize SDLC flows with interactive, customizable diagrams.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Model Selector and View */}
                {models.length > 0 && (
                    <>
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                            <h2 className="text-xl font-semibold text-white mb-4">Available SDLC Models</h2>
                            <div className="flex flex-wrap gap-3">
                                {models.map((m, i) => (
                                    <button
                                        key={m._id}
                                        onClick={() => setActiveIndex(i)}
                                        className={`px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${activeIndex === i
                                                ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg"
                                                : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                                            }`}
                                    >
                                        {m.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <ModelHeader 
                        model={models[activeIndex]}
                        adjustedTime={getAdjustedTime(models[activeIndex]?.estimatedTime, budgetMultiplier)}
                        />

                        {/* Budget Range Slider */}
                        {session && (
                            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8 mt-8">
                                <h2 className="text-xl font-semibold text-white mb-4">Budget Adjustment</h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-slate-300">Budget Multiplier: {budgetMultiplier.toFixed(1)}x</label>
                                        <span className="text-green-400 font-semibold">
                                            ₹{(session.budget * budgetMultiplier).toLocaleString()}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="2.0"
                                        step="0.1"
                                        value={budgetMultiplier}
                                        onChange={(e) => setBudgetMultiplier(parseFloat(e.target.value))}
                                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                                    />
                                    <div className="flex justify-between text-sm text-slate-400">
                                        <span>Lower Budget (Slower But Affordable)</span>
                                        <span>Higher Budget (Faster But Expensive)</span>
                                    </div>
                                    <div className="text-center text-slate-300">
                                        Adjusted Time: <span className="text-cyan-400 font-semibold">
                                            {getAdjustedTime(models[activeIndex]?.estimatedTime, budgetMultiplier)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Active Model View */}
                        <ModelView 
                            model={models[activeIndex]} 
                            adjustedTime={getAdjustedTime(models[activeIndex]?.estimatedTime, budgetMultiplier)}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
