import { useEffect, useState } from "react";
import ReactFlow, {
  Controls,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

export default function SDLCDiagram({ model }) {
  const [activePhase, setActivePhase] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);


  /* ------------------ BUILD GRAPH WHEN MODEL CHANGES ------------------ */
  useEffect(() => {
    if (!model?.phases) return;

    const newNodes = model.phases.map((phase, index) => ({
      id: phase._id || String(index),
      data: { label: phase.name },
      position: { x: 200, y: index * 120 },
      style: {
        background: "linear-gradient(135deg, #06b6d4, #0891b2)",
        color: "#fff",
        borderRadius: 10,
        padding: "12px 16px",
        fontWeight: 600,
        border: "2px solid #0891b2",
        boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
        cursor: "pointer",
      },
    }));

    const newEdges = model.phases.slice(0, -1).map((phase, index) => ({
      id: `e-${index}`,
      source: phase._id || String(index),
      target: model.phases[index + 1]._id || String(index + 1),
      animated: true,
      style: {
        stroke: "#06b6d4",
        strokeWidth: 3,
      },
    }));

    setNodes(newNodes);
    setEdges(newEdges);
  }, [model._id, model.phases, setEdges, setNodes]); // 🔥 ONLY depend on model id

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white mb-1">
          SDLC Diagram
        </h3>
        <p className="text-sm text-slate-400">
          Interactive lifecycle visualization based on AI analysis
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Diagram */}
        <div className="md:col-span-2 h-[300px] md:h-[420px] bg-slate-900 rounded-lg border border-slate-700">
          <ReactFlow
            key={model._id}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            onNodeClick={(_, node) => {
              const phase = model.phases.find(
                (p, i) => (p._id || String(i)) === node.id
              );
              setActivePhase(phase);
            }}
          >
            <Controls />
            <div className="hidden md:block">
              <MiniMap nodeColor="#06b6d4" />
            </div>
            <Background gap={18} color="#334155" />
          </ReactFlow>
        </div>

        {/* Phase Details */}
        <div className="bg-slate-900/60 rounded-lg p-5 border border-slate-700">
          {activePhase ? (
            <>
              <h4 className="text-lg font-bold text-cyan-400 mb-2">
                {activePhase.name}
              </h4>
              <p className="text-sm text-slate-300 mb-4">
                {activePhase.description}
              </p>

              <h5 className="text-sm font-semibold text-white mb-2">
                Steps
              </h5>
              <ul className="text-sm text-slate-300 space-y-2">
                {activePhase.steps.map((step, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-cyan-400">•</span>
                    {step}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-sm text-slate-400">
              Click on a phase to view details
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
