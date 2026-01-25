import ReactFlow, {
  Background,
  Controls,
  type Node,
  type Edge,
  MarkerType,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

const cloudflareStyle = {
  background: "linear-gradient(135deg, #f4a261 0%, #e76f51 100%)",
  color: "#fff",
  border: "2px solid #e76f51",
  borderRadius: 16,
  padding: 20,
  width: 250,
  textAlign: "center" as const,
  fontWeight: 600,
  boxShadow: "0 8px 24px rgba(231, 111, 81, 0.3)",
};

const awsStyle = {
  background: "linear-gradient(135deg, #ff9900 0%, #ff7700 100%)",
  color: "#000",
  border: "2px solid #cc7a00",
  borderRadius: 16,
  padding: 20,
  width: 250,
  textAlign: "center" as const,
  fontWeight: 600,
  boxShadow: "0 8px 24px rgba(255, 153, 0, 0.3)",
};

const flowStyle = {
  stroke: "#2a9d8f",
  strokeWidth: 3,
};

const nodes: Node[] = [
  {
    id: "acm",
    position: { x: 50, y: 50 },
    data: { label: "🔒 AWS ACM\n(Request Certificate)" },
    style: awsStyle,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: "cloudflare",
    position: { x: 450, y: 50 },
    data: { label: "☁️ Cloudflare DNS\n(Add CNAME Record)" },
    style: cloudflareStyle,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: "apigw",
    position: { x: 250, y: 300 },
    data: { label: "🌐 API Gateway\n(Custom Domain Name)" },
    style: awsStyle,
    targetPosition: Position.Top,
  },
];

const edges: Edge[] = [
  {
    id: "acm-cf",
    source: "acm",
    target: "cloudflare",
    label: "1. Get CNAME",
    animated: true,
    style: flowStyle,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#2a9d8f" },
  },
  {
    id: "cf-acm",
    source: "cloudflare",
    target: "acm",
    label: "2. Validate",
    animated: true,
    style: { ...flowStyle, strokeDasharray: "5,5" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#2a9d8f" },
  },
  {
    id: "acm-apigw",
    source: "acm",
    target: "apigw",
    label: "3. Attach Cert",
    animated: true,
    style: flowStyle,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#2a9d8f" },
  },
  {
    id: "cf-apigw",
    source: "cloudflare",
    target: "apigw",
    label: "4. Point Domain",
    animated: true,
    style: flowStyle,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#2a9d8f" },
  },
];

export default function CustomDomainFlow() {
  return (
    <div className="h-[500px] w-full rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden relative shadow-lg my-8">
      <div className="absolute top-4 left-6 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow border border-slate-200">
        <h3 className="text-sm font-bold text-slate-800">
          ACM Validation Flow
        </h3>
      </div>
      <ReactFlow nodes={nodes} edges={edges} fitView className="bg-transparent">
        <Background gap={20} size={2} color="#cbd5e1" />
        <Controls className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl shadow-lg" />
      </ReactFlow>
    </div>
  );
}
