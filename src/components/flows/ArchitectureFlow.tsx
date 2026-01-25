import ReactFlow, {
  Background,
  Controls,
  type Node,
  type Edge,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

const awsStyle = {
  background: "linear-gradient(135deg, #ff9900 0%, #ff7700 100%)",
  color: "#000",
  border: "2px solid #cc7a00",
  borderRadius: 16,
  padding: 20,
  width: 280,
  textAlign: "center" as const,
  fontWeight: 600,
  boxShadow: "0 8px 24px rgba(255, 153, 0, 0.3)",
};

const dbStyle = {
  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
  color: "#fff",
  border: "2px solid #15803d",
  borderRadius: 20,
  padding: 20,
  width: 240,
  textAlign: "center" as const,
  fontWeight: 600,
  boxShadow: "0 8px 24px rgba(34, 197, 94, 0.3)",
};

const flowStyle = {
  stroke: "#6366f1",
  strokeWidth: 3,
};

const nodes: Node[] = [
  {
    id: "user",
    position: { x: 400, y: 0 },
    data: { label: "👤 User" },
    type: "input",
    style: {
      background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
      color: "#fff",
      borderRadius: "999px",
      border: "3px solid #c2410c",
      fontWeight: 700,
      padding: 18,
      fontSize: "16px",
      boxShadow: "0 8px 24px rgba(249, 115, 22, 0.4)",
    },
  },

  {
    id: "frontend",
    position: { x: 350, y: 120 },
    data: { label: "⚛️ Vite + React\nsrkrcodingclub.in\n☁️ Cloudflare Pages" },
    style: {
      background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
      color: "#fff",
      border: "3px solid #0369a1",
      borderRadius: 16,
      padding: 20,
      width: 240,
      textAlign: "center",
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "1.6",
      boxShadow: "0 8px 24px rgba(14, 165, 233, 0.3)",
    },
  },

  {
    id: "apigw",
    position: { x: 330, y: 280 },
    data: {
      label:
        "🌐 API Gateway\napi.iconcoderz.srkrcodingclub.in\nHTTPS • CORS • SPA",
    },
    style: {
      ...awsStyle,
      fontSize: "13px",
      lineHeight: "1.5",
    },
  },
  {
    id: "lambda",
    position: { x: 310, y: 440 },
    data: { label: "Lambda Functions\nNode.js • Express • Prisma\n" },
    style: {
      ...awsStyle,
      width: 300,
      padding: 22,
      fontSize: "13px",
      lineHeight: "1.6",
    },
  },

  {
    id: "neon",
    position: { x: 80, y: 620 },
    data: { label: "🐘 Neon PostgreSQL\n📊 Registrations • Admins • Sessions" },
    style: {
      ...dbStyle,
      width: 260,
      fontSize: "13px",
      lineHeight: "1.6",
    },
  },
  {
    id: "cloudinary",
    position: { x: 380, y: 620 },
    data: { label: "☁️ Cloudinary\n🖼️ Screenshots • Payment Proof" },
    style: {
      ...dbStyle,
      width: 260,
      fontSize: "13px",
      lineHeight: "1.6",
    },
  },
  {
    id: "secrets",
    position: { x: 680, y: 440 },
    data: { label: "🔐 Secrets Manager\nDB URL • SMTP • Cloudinary Keys" },
    style: {
      ...awsStyle,
      width: 260,
      fontSize: "13px",
      lineHeight: "1.5",
    },
  },

  {
    id: "smtp",
    position: { x: 680, y: 620 },
    data: { label: "📧 SMTP Service\n✉️ Verification • QR Codes • Results" },
    style: {
      background: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)",
      color: "#fff",
      border: "2px solid #7e22ce",
      borderRadius: 16,
      padding: 20,
      width: 260,
      textAlign: "center",
      fontWeight: 600,
      fontSize: "13px",
      lineHeight: "1.6",
      boxShadow: "0 8px 24px rgba(168, 85, 247, 0.3)",
    },
  },
];

const edges: Edge[] = [
  {
    id: "user-fe",
    source: "user",
    target: "frontend",
    animated: true,
    style: { ...flowStyle, stroke: "#f97316" },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#f97316",
      width: 25,
      height: 25,
    },
  },
  {
    id: "fe-apigw",
    source: "frontend",
    target: "apigw",
    label: "REST API",
    animated: true,
    style: flowStyle,
    labelStyle: { fill: "#6366f1", fontWeight: 600, fontSize: 12 },
    labelBgStyle: { fill: "#fff", fillOpacity: 0.9 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#6366f1",
      width: 25,
      height: 25,
    },
  },
  {
    id: "apigw-lambda",
    source: "apigw",
    target: "lambda",
    animated: true,
    style: flowStyle,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#6366f1",
      width: 25,
      height: 25,
    },
  },
  {
    id: "lambda-neon",
    source: "lambda",
    target: "neon",
    label: "Prisma ORM",
    animated: true,
    style: { ...flowStyle, stroke: "#22c55e" },
    labelStyle: { fill: "#22c55e", fontWeight: 600, fontSize: 12 },
    labelBgStyle: { fill: "#fff", fillOpacity: 0.9 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#22c55e",
      width: 25,
      height: 25,
    },
  },
  {
    id: "lambda-cloudinary",
    source: "lambda",
    target: "cloudinary",
    label: "Upload",
    animated: true,
    style: { ...flowStyle, stroke: "#22c55e" },
    labelStyle: { fill: "#22c55e", fontWeight: 600, fontSize: 12 },
    labelBgStyle: { fill: "#fff", fillOpacity: 0.9 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#22c55e",
      width: 25,
      height: 25,
    },
  },
  {
    id: "lambda-secrets",
    source: "lambda",
    target: "secrets",
    label: "Fetch",
    animated: false,
    style: {
      strokeDasharray: "8 8",
      stroke: "#fbbf24",
      strokeWidth: 3,
    },
    labelStyle: { fill: "#f59e0b", fontWeight: 600, fontSize: 12 },
    labelBgStyle: { fill: "#fff", fillOpacity: 0.9 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#fbbf24",
      width: 25,
      height: 25,
    },
  },
  {
    id: "lambda-smtp",
    source: "lambda",
    target: "smtp",
    label: "Send Email",
    animated: true,
    style: { ...flowStyle, stroke: "#a855f7" },
    labelStyle: { fill: "#a855f7", fontWeight: 600, fontSize: 12 },
    labelBgStyle: { fill: "#fff", fillOpacity: 0.9 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#a855f7",
      width: 25,
      height: 25,
    },
  },
];

export default function ArchitectureFlow() {
  return (
    <div className="h-[900px] w-full rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden relative shadow-2xl">
      <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800">
          System Architecture
        </h2>
        <p className="text-sm text-slate-600">IconCoderz Platform</p>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        className="bg-transparent"
        minZoom={0.5}
        maxZoom={1.5}
      >
        <Background gap={20} size={2} color="#cbd5e1" />
        <Controls className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl shadow-lg" />
      </ReactFlow>
    </div>
  );
}
