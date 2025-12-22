import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Planning' },
    position: { x: 250, y: 25 },
    style: {
      background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      color: 'white',
      border: '2px solid #0891b2',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      fontWeight: 'bold',
    },
  },
  {
    id: '2',
    data: { label: 'Requirements' },
    position: { x: 100, y: 125 },
    style: {
      background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      color: 'white',
      border: '2px solid #0891b2',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      fontWeight: 'bold',
    },
  },
  {
    id: '3',
    data: { label: 'Design' },
    position: { x: 400, y: 125 },
    style: {
      background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      color: 'white',
      border: '2px solid #0891b2',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      fontWeight: 'bold',
    },
  },
  {
    id: '4',
    data: { label: 'Development' },
    position: { x: 250, y: 225 },
    style: {
      background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      color: 'white',
      border: '2px solid #0891b2',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      fontWeight: 'bold',
    },
  },
  {
    id: '5',
    type: 'output',
    data: { label: 'Testing & Deployment' },
    position: { x: 250, y: 325 },
    style: {
      background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      color: 'white',
      border: '2px solid #0891b2',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      fontWeight: 'bold',
    },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#06b6d4', strokeWidth: 3 } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#06b6d4', strokeWidth: 3 } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#06b6d4', strokeWidth: 3 } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#06b6d4', strokeWidth: 3 } },
  { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#06b6d4', strokeWidth: 3 } },
];

export default function InteractiveDiagram() {
  const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const [selectedNode, setSelectedNode] = useState(null);

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  const nodeDetails = {
    '1': {
      title: 'Planning Phase',
      description: 'Define project scope, objectives, and create a roadmap for successful delivery.',
      duration: '1-2 weeks',
      deliverables: ['Project Charter', 'Initial Requirements', 'Project Timeline']
    },
    '2': {
      title: 'Requirements Gathering',
      description: 'Collect and document detailed functional and non-functional requirements.',
      duration: '2-4 weeks',
      deliverables: ['Requirements Document', 'Use Cases', 'Acceptance Criteria']
    },
    '3': {
      title: 'System Design',
      description: 'Create architectural and detailed design specifications for the system.',
      duration: '3-6 weeks',
      deliverables: ['System Architecture', 'Database Design', 'UI/UX Mockups']
    },
    '4': {
      title: 'Development',
      description: 'Implement the system according to design specifications using chosen technologies.',
      duration: '8-20 weeks',
      deliverables: ['Source Code', 'Unit Tests', 'Documentation']
    },
    '5': {
      title: 'Testing & Deployment',
      description: 'Thoroughly test the system and deploy it to production environment.',
      duration: '4-8 weeks',
      deliverables: ['Test Reports', 'Deployed System', 'User Training']
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 mb-8">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white">Interactive SDLC Flow</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div style={{ height: '300px', minHeight: '300px' }} className="md:h-[400px] rounded-lg border border-slate-600">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              fitView
              attributionPosition="top-right"
            >
              <Controls className="bg-slate-800 border-slate-600" />
              <div className="hidden md:block">
                <MiniMap
                  className="bg-slate-800 border-slate-600"
                  nodeColor="#06b6d4"
                  maskColor="rgba(15, 23, 42, 0.8)"
                />
              </div>
              <Background color="#334155" gap={16} />
            </ReactFlow>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-2">How to Interact</h4>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>• Click nodes to see details</li>
              <li>• Drag nodes to reposition</li>
              <li>• Use controls to zoom/pan</li>
              <li>• Connect nodes by dragging</li>
            </ul>
          </div>

          {selectedNode && nodeDetails[selectedNode.id] && (
            <div className="bg-slate-900/50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-cyan-400 mb-3">
                {nodeDetails[selectedNode.id].title}
              </h4>
              <p className="text-slate-300 text-sm mb-3">
                {nodeDetails[selectedNode.id].description}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Duration:</span>
                  <span className="text-cyan-300">{nodeDetails[selectedNode.id].duration}</span>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Deliverables:</div>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {nodeDetails[selectedNode.id].deliverables.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-1 h-1 bg-cyan-400 rounded-full mr-2"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}