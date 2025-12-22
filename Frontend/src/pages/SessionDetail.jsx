import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModels, analyzeSession } from "../features/model/modelSlice";
import { useParams } from "react-router-dom";
import ModelView from "../components/ModelView";

export default function SessionDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { list: models, loading } = useSelector((state) => state.models);

    const [activeIndex, setActiveIndex] = useState(0);
    const [_aiAnalyzed, setAiAnalyzed] = useState(false);

    const handleAnalyze = async () => {
        try {
            await dispatch(analyzeSession(id));
            setAiAnalyzed(true);
        } catch (error) {
            console.error("Analysis failed:", error);
        }
    };
    //console.log("Ai Analyzed:", aiAnalyzed);

    useEffect(() => {
        dispatch(fetchModels(id));
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

                        {/* Active Model View */}
                        <ModelView model={models[activeIndex]} />
                    </>
                )}
            </div>
        </div>
    );
}
