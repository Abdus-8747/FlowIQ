import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModels } from "../features/model/modelSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ModelCard from "../components/ModelCard";
import InteractiveDiagram from "../components/InteractiveDiagram";
import { Link } from "react-router-dom";

export default function Models() {
    const dispatch = useDispatch();
    const { list: models, loading: _loading } = useSelector((state) => state.models);

    useEffect(() => {
        // Fetch all models or a general set
        // For now, we'll assume we can fetch without session ID
        dispatch(fetchModels());
    }, [dispatch]);

    const modelTypes = [
        {
            name: "Agile",
            description: "Flexible and iterative approach to software development",
            icon: "🔄",
            phases: ["Planning", "Development", "Testing", "Review"],
            learnmoreLink: "https://en.wikipedia.org/wiki/Agile_software_development",
        },
        {
            name: "Waterfall",
            description: "Sequential approach with distinct phases",
            icon: "🌊",
            phases: ["Requirements", "Design", "Implementation", "Testing", "Maintenance"],
            learnmoreLink: "https://en.wikipedia.org/wiki/Waterfall_model",
        },
        {
            name: "Spiral",
            description: "Risk-driven approach with iterative cycles",
            icon: "🌀",
            phases: ["Planning", "Risk Analysis", "Engineering", "Evaluation"],
            learnmoreLink: "https://en.wikipedia.org/wiki/Spiral_model",
        },
        {
            name: "V-Model",
            description: "Extension of waterfall with testing phases",
            icon: "🔺",
            phases: ["Requirements", "Design", "Coding", "Unit Testing", "Integration Testing"],
            learnmoreLink: "https://en.wikipedia.org/wiki/V-model",
        },
        {
            name: "Scrum",
            description: "Agile framework with sprints and ceremonies",
            icon: "🏉",
            phases: ["Sprint Planning", "Daily Scrum", "Sprint Review", "Sprint Retrospective"],
            learnmoreLink: "https://en.wikipedia.org/wiki/Scrum_(software_development)",
        },
        {
            name: "Kanban",
            description: "Visual workflow management method",
            icon: "📋",
            phases: ["Backlog", "To Do", "In Progress", "Done"],
            learnmoreLink: "https://en.wikipedia.org/wiki/Kanban_(development)",
        },
        {
            name: "Incremental",
            description: "Builds software in increments or parts",
            icon: "➕",
            phases: ["Requirement Analysis", "Design", "Implementation", "Testing", "Deployment"],
            learnmoreLink: "https://en.wikipedia.org/wiki/Incremental_build_model",
        },
        {
            name: "RAD",
            description: "Rapid Application Development focusing on speed and iteration",
            icon: "⚡",
            phases: ["Planning", "Design", "Build", "Test"],
            learnmoreLink: "https://en.wikipedia.org/wiki/Rapid_application_development",
        },
        {
            name: "Prototype",
            description: "Creates prototypes to refine requirements",
            icon: "🛠️",
            phases: ["Requirement Gathering", "Prototype Development", "User Evaluation", "Refinement"],
            learnmoreLink: "https://en.wikipedia.org/wiki/Prototyping_model",
        }
    ];

    return (

        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar />
            <main className="flex-grow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        SDLC Models
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        Explore different software development lifecycle methodologies.
                        Each model offers unique approaches to project management and execution.
                    </p>
                </div>

                {/* Models Grid */}
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {modelTypes.map((model, index) => (
                        <div
                            key={index}
                            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all group"
                        >
                            <div className="flex items-center mb-4">
                                <div className="text-3xl mr-3">{model.icon}</div>
                                <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                                    {model.name}
                                </h3>
                            </div>
                            <p className="text-slate-300 mb-4">{model.description}</p>
                            <div className="mb-4">
                                <h4 className="text-sm font-medium text-slate-400 mb-2">Key Phases:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {model.phases.map((phase, i) => (
                                        <span
                                            key={i}
                                            className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs"
                                        >
                                            {phase}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <Link
                                to={model.learnmoreLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white py-2 rounded-lg transition-all transform hover:scale-105">
                                    Learn More
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Interactive Diagram Section */}
                <InteractiveDiagram />
            </div>

            {/* Recent Sessions */}
            {models.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-white mb-6">Recent Analyses</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {models.slice(0, 6).map((model) => (
                            <ModelCard key={model._id} model={model} />
                        ))}
                    </div>
                </div>
            )}
            </main>
            <Footer />
        </div>
    );
}