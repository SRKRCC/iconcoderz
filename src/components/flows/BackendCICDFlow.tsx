import ReactFlow, {
  Background,
  Controls,
  type Node,
  type Edge,
  MarkerType,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

const stepStyle = {
  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
  color: "#fff",
  border: "2px solid #1d4ed8",
  borderRadius: 16,
  padding: 20,
  width: 220,
  textAlign: "center" as const,
  fontWeight: 600,
  boxShadow: "0 8px 24px rgba(59, 130, 246, 0.3)",
};

const actionStyle = {
  background: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
  color: "#fff",
  border: "2px solid #334155",
  borderRadius: 16,
  padding: 15,
  width: 180,
  textAlign: "center" as const,
  fontWeight: 600,
  fontSize: "14px",
};

const awsStyle = {
  background: "linear-gradient(135deg, #ff9900 0%, #ff7700 100%)",
  color: "#000",
  border: "2px solid #cc7a00",
  borderRadius: 16,
  padding: 20,
  width: 220,
  textAlign: "center" as const,
  fontWeight: 600,
  boxShadow: "0 8px 24px rgba(255, 153, 0, 0.3)",
};

const flowStyle = {
  stroke: "#64748b",
  strokeWidth: 3,
};

const nodes: Node[] = [
  {
    id: "dev",
    position: { x: 50, y: 300 },
    data: { label: "Developer\n(Push Code)" },
    style: { ...actionStyle, background: "#0f172a", borderColor: "#0f172a" },
    sourcePosition: Position.Right,
  },
  {
    id: "github",
    position: { x: 300, y: 300 },
    data: { label: "GitHub Actions\n(Triggered)" },
    style: actionStyle,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ci",
    position: { x: 550, y: 150 },
    data: { label: "CI: Tests\nESLint • Vitest • TSC" },
    style: stepStyle,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Left,
  },
  {
    id: "build",
    position: { x: 550, y: 450 },
    data: { label: "CD: Build\nDocker Image → ECR" },
    style: stepStyle,
    sourcePosition: Position.Right,
    targetPosition: Position.Top,
  },
  {
    id: "terraform",
    position: { x: 850, y: 450 },
    data: { label: "CD: Infrastructure\nTerraform Apply" },
    style: stepStyle,
    sourcePosition: Position.Top,
    targetPosition: Position.Left,
  },
  {
    id: "deploy",
    position: { x: 850, y: 150 },
    data: { label: "CD: Deploy\nUpdate Lambda" },
    style: awsStyle,
    targetPosition: Position.Bottom,
  },
];

const edges: Edge[] = [
  {
    id: "dev-gh",
    source: "dev",
    target: "github",
    animated: true,
    style: flowStyle,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
  },
  {
    id: "gh-ci",
    source: "github",
    target: "ci",
    label: "PR / Push",
    animated: true,
    style: flowStyle,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
  },
  {
    id: "ci-build",
    source: "ci",
    target: "build",
    label: "If Main",
    animated: true,
    style: flowStyle,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
  },
  {
    id: "build-tf",
    source: "build",
    target: "terraform",
    animated: true,
    style: flowStyle,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
  },
  {
    id: "tf-deploy",
    source: "terraform",
    target: "deploy",
    label: "If Infra OK",
    animated: true,
    style: flowStyle,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
  },
];

export default function BackendCICDFlow() {
  return (
    <div className="h-[600px] w-full rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden relative shadow-lg my-8">
      <div className="absolute top-4 left-6 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow border border-slate-200">
        <h3 className="text-sm font-bold text-slate-800">
          Backend Pipeline (Server Repo)
        </h3>
      </div>
      <ReactFlow nodes={nodes} edges={edges} fitView className="bg-transparent">
        <Background gap={20} size={2} color="#cbd5e1" />
        <Controls className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl shadow-lg" />
      </ReactFlow>
    </div>
  );
}
