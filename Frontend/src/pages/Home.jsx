import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                FlowIQ - Smart SDLC
                <span className="bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent">
                  {" "}AI Decisions
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Revolutionize your software development lifecycle with AI-powered analysis,
                interactive diagrams, and data-driven insights for better project outcomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-slate-600 hover:border-slate-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-600/10"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Choose Our Platform?
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                Experience the future of software development with cutting-edge AI technology
                and interactive visualizations.
              </p>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition-all">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Analysis</h3>
                <p className="text-slate-300">
                  Get intelligent recommendations for your SDLC methodology based on project parameters,
                  team size, and requirements.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-cyan-500/50 transition-all">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Interactive Diagrams</h3>
                <p className="text-slate-300">
                  Visualize complex SDLC processes with interactive, customizable diagrams
                  that bring your project to life.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-green-500/50 transition-all">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Real-time Insights</h3>
                <p className="text-slate-300">
                  Monitor project progress with real-time analytics and get actionable insights
                  to optimize your development workflow.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-24 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
                <div className="text-3xl font-bold text-blue-400 mb-2">10K+</div>
                <p className="text-slate-300">Active Users</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
                <div className="text-3xl font-bold text-cyan-400 mb-2">500+</div>
                <p className="text-slate-300">Projects Analyzed</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
                <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
                <p className="text-slate-300">Success Rate</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
                <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                <p className="text-slate-300">AI Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-24 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What Our Users Say
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                Hear from developers who have transformed their SDLC with FlowIQ.
              </p>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">JD</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-semibold">John Doe</h4>
                    <p className="text-slate-400 text-sm">Senior Developer</p>
                  </div>
                </div>
                <p className="text-slate-300 italic">
                  "FlowIQ helped us choose the perfect SDLC model for our project. The AI analysis was spot-on and saved us weeks of planning."
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">JS</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-semibold">Jane Smith</h4>
                    <p className="text-slate-400 text-sm">Project Manager</p>
                  </div>
                </div>
                <p className="text-slate-300 italic">
                  "The interactive diagrams made it easy to explain complex processes to stakeholders. Highly recommend FlowIQ!"
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">MB</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-semibold">Mike Brown</h4>
                    <p className="text-slate-400 text-sm">Tech Lead</p>
                  </div>
                </div>
                <p className="text-slate-300 italic">
                  "Real-time insights have improved our team's productivity significantly. FlowIQ is a game-changer for SDLC management."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your SDLC?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Join thousands of developers who are already using our AI platform
              to make better software development decisions.
            </p>
            <Link
              to="/signup"
              className="inline-block bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-12 py-4 rounded-lg text-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}