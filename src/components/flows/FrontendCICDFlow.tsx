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

const cloudflareStyle = {
  background: "linear-gradient(135deg, #f4a261 0%, #e76f51 100%)",
  color: "#fff",
  border: "2px solid #e76f51",
  borderRadius: 16,
  padding: 20,
  width: 220,
  textAlign: "center" as const,
  fontWeight: 600,
  boxShadow: "0 8px 24px rgba(231, 111, 81, 0.3)",
};

const flowStyle = {
  stroke: "#64748b",
  strokeWidth: 3,
};

const nodes: Node[] = [
  {
    id: "dev",
    position: { x: 50, y: 150 },
    data: { label: "Developer\n(Push Code)" },
    style: { ...actionStyle, background: "#0f172a", borderColor: "#0f172a" },
    sourcePosition: Position.Right,
  },
  {
    id: "github",
    position: { x: 300, y: 150 },
    data: { label: "GitHub Actions\n(Triggered)" },
    style: actionStyle,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "install",
    position: { x: 550, y: 150 },
    data: { label: "Setup & Install\n(pnpm install)" },
    style: stepStyle,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "build",
    position: { x: 550, y: 350 },
    data: { label: "Build\n(pnpm build)" },
    style: stepStyle,
    sourcePosition: Position.Right,
    targetPosition: Position.Top,
  },
  {
    id: "deploy",
    position: { x: 800, y: 350 },
    data: { label: "Deploy\n(Cloudflare Pages)" },
    style: cloudflareStyle,
    targetPosition: Position.Left,
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
    id: "gh-install",
    source: "github",
    target: "install",
    label: "Push Main",
    animated: true,
    style: flowStyle,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
  },
  {
    id: "install-build",
    source: "install",
    target: "build",
    animated: true,
    style: flowStyle,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
  },
  {
    id: "build-deploy",
    source: "build",
    target: "deploy",
    label: "Upload Assets",
    animated: true,
    style: flowStyle,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
  },
];

export default function FrontendCICDFlow() {
  return (
    <div className="h-[500px] w-full rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden relative shadow-lg my-8">
      <div className="absolute top-4 left-6 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow border border-slate-200">
        <h3 className="text-sm font-bold text-slate-800">
          Frontend Pipeline (Client Repo)
        </h3>
      </div>
      <ReactFlow nodes={nodes} edges={edges} fitView className="bg-transparent">
        <Background gap={20} size={2} color="#cbd5e1" />
        <Controls className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl shadow-lg" />
      </ReactFlow>
    </div>
  );
}
