import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSessions, createSession } from "../features/session/sessionSlice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: sessions, loading } = useSelector(
    (state) => state.sessions
  );

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    projectDescription: "",
    teamSize: {
      frontend: 1,
      backend: 1,
      tester: 0,
      devops: 0,
      aiengineer: 0,
    },
    budget: 500000, // Default budget in rupees
    timeline: "short-term",
    requirementsClarity: "partial",
    riskLevel: "medium",
    clientInvolvement: "medium",
    complianceRequired: false,
    groqModel: "llama-3.1-8b-instant", // Default model
  });

  const [selectedModel, setSelectedModel] = useState("llama-3.1-8b-instant");

  // fetch sessions on load
  useEffect(() => {
    dispatch(fetchSessions());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("teamSize.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        teamSize: {
          ...formData.teamSize,
          [key]: Number(value),
        },
      });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (name === "budget") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleModelChange = (e) => {
    const model = e.target.value;
    setSelectedModel(model);
    setFormData({ ...formData, groqModel: model });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await dispatch(createSession(formData));
    if (res.payload?._id) {
      navigate(`/session/${res.payload._id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              📊 FlowIQ - SDLC AI Dashboard
            </h1>
            <p className="text-slate-300">
              Analyze your projects and get AI-powered SDLC recommendations
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            {showForm ? "Close Form" : "New Analysis"}
          </button>
        </div>

        {/* Create Session Form */}
        {showForm && (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Project Analysis Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Project Description
                </label>
                <textarea
                  name="projectDescription"
                  placeholder="Describe your project idea, goals, and requirements..."
                  value={formData.projectDescription}
                  onChange={handleChange}
                  required
                  className="w-full p-4 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  rows="4"
                />
              </div>

              {/* Team Size */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Team Composition
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {Object.keys(formData.teamSize).map((role) => (
                    <div key={role} className="space-y-2">
                      <label className="block text-xs text-slate-400 capitalize">
                        {role.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="number"
                        min="0"
                        name={`teamSize.${role}`}
                        value={formData.teamSize[role]}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-900/50 rounded-lg border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Parameters */}
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Budget (₹)
                  </label>
                  <input
                    type="number"
                    name="budget"
                    min="50000"
                    max="5000000"
                    step="25000"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-900/50 rounded-lg border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter budget in rupees"
                  />
                  <div className="mt-2 text-sm text-slate-400">
                    Range: ₹50,000 - ₹50,00,000
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    AI Model Selection
                  </label>
                  <select
                    name="groqModel"
                    value={selectedModel}
                    onChange={handleModelChange}
                    className="w-full p-3 bg-slate-900/50 rounded-lg border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="llama-3.1-8b-instant">Llama 3.1 8B - Fast & Cost-effective</option>
                    <option value="llama-3.3-70b-versatile">Llama 3.3 70B - Balanced Performance</option>
                    <option value="qwen/qwen3-32b">Qwen 3.3 32B - Best for Complex Tasks</option>
                    <option value="groq/compound">Groq Compound - High Performance</option>
                  </select>
                </div>
              </div>

              {/* Additional Parameters */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Timeline
                  </label>
                  <select
                    name="timeline"
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-900/50 rounded-lg border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="short-term">Short Term (1-3 months)</option>
                    <option value="medium-term">Medium Term (3-6 months)</option>
                    <option value="long-term">Long Term (6+ months)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Requirements Clarity
                  </label>
                  <select
                    name="requirementsClarity"
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-900/50 rounded-lg border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="clear">Clear & Detailed</option>
                    <option value="partial">Partially Defined</option>
                    <option value="unclear">Unclear/Changing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Risk Level
                  </label>
                  <select
                    name="riskLevel"
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-900/50 rounded-lg border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="low">Low Risk</option>
                    <option value="medium">Medium Risk</option>
                    <option value="high">High Risk</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Client Involvement
                  </label>
                  <select
                    name="clientInvolvement"
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-900/50 rounded-lg border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="low">Low Involvement</option>
                    <option value="medium">Medium Involvement</option>
                    <option value="high">High Involvement</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Compliance
                  </label>
                  <div className="flex items-center space-x-3 h-[46px]">
                    <input
                      type="checkbox"
                      name="complianceRequired"
                      checked={formData.complianceRequired}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-600 bg-slate-900/50 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label className="text-sm font-medium text-slate-300">
                      Required
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Analyze Project
              </button>
            </form>
          </div>
        )}

        {/* Sessions List */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Recent Analyses</h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-slate-400">Loading your analyses...</p>
            </div>
          ) : sessions.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-12 text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-white mb-2">No Analyses Yet</h3>
              <p className="text-slate-400 mb-6">
                Create your first project analysis to get AI-powered SDLC recommendations.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                Start Your First Analysis
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((s) => (
                <div
                  key={s._id}
                  onClick={() => navigate(`/session/${s._id}`)}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 cursor-pointer hover:border-blue-500/50 transition-all transform hover:scale-105 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-sm text-slate-400 mb-2">
                        {new Date(s.createdAt).toLocaleDateString()} • {new Date(s.createdAt).toLocaleTimeString()}
                      </p>
                      <p className="text-white line-clamp-3 group-hover:text-blue-400 transition-colors">
                        {s.projectDescription}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`inline-block text-xs px-3 py-1 rounded-full ${
                      s.analysisStatus === 'completed'
                        ? 'bg-green-500/20 text-green-400'
                        : s.analysisStatus === 'processing'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-slate-500/20 text-slate-400'
                    }`}>
                      {s.analysisStatus}
                    </span>
                    <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    
  );
}
