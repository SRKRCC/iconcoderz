import ArchitectureFlow from "../../components/flows/ArchitectureFlow";
import {
  DocTitle,
  DocSection,
  DocSubSection,
  DocParagraph,
  DocList,
  DocListItem,
  DocTable,
  DocTh,
  DocTd,
  DocCode,
  DocCallout,
} from "../../components/ui/DocComponents";

export default function DocArchitecture() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <DocTitle>System Architecture – Iconcoderz-2k26</DocTitle>

      <DocParagraph>
        High-level technical overview of the entire Iconcoderz platform.
      </DocParagraph>

      <div className="my-8 border-t border-border" />

      <DocSection id="overview">Architecture Overview</DocSection>
      <div className="my-8">
        <ArchitectureFlow />
      </div>

      <DocSection id="components">Components</DocSection>

      <DocSubSection id="frontend">
        Frontend (Vite + React + TypeScript)
      </DocSubSection>
      <DocList>
        <DocListItem>
          <strong>Pages:</strong> Home, About, Register (multi-step), Support,
          Results.
        </DocListItem>
        <DocListItem>
          <strong>Features:</strong>
          <DocList>
            <DocListItem>
              SPA routing (all routes → index.html via Cloudflare rule).
            </DocListItem>
            <DocListItem>
              Multi-step registration form with validation.
            </DocListItem>
            <DocListItem>Payment screenshot upload.</DocListItem>
            <DocListItem>Leaderboard display (post-event).</DocListItem>
          </DocList>
        </DocListItem>
      </DocList>

      <DocSubSection id="backend">Backend (AWS Lambda + Express)</DocSubSection>
      <DocCallout type="tip">
        <strong>Analogy: A Restaurant.</strong>
        <br />
        The <strong>Frontend</strong> is the menu and the waiter (what you see).
        The <strong>Backend</strong> is the kitchen (where the work happens).
        The <strong>Database</strong> is the pantry (where ingredients are
        stored). You don't go into the kitchen to cook; you ask the waiter (API)
        to bring you food.
      </DocCallout>
      <DocList>
        <DocListItem>
          <strong>Runtime:</strong> Node.js 22 (Container Image) with Prisma v7.
        </DocListItem>
        <DocListItem>
          <strong>Endpoints:</strong>
          <DocList>
            <DocListItem>
              <DocCode>POST /api/v1/register</DocCode> – Submit registration.
            </DocListItem>
            <DocListItem>
              <DocCode>GET /api/v1/health</DocCode> – Health check.
            </DocListItem>
            <DocListItem>
              <DocCode>GET /api/v1/admin/users</DocCode> – Admin management.
            </DocListItem>
            <DocListItem>
              <DocCode>POST /api/v1/attendance/scan</DocCode> – Event
              attendance.
            </DocListItem>
          </DocList>
        </DocListItem>
      </DocList>

      <DocSubSection id="database">Database (Neon PostgreSQL)</DocSubSection>
      <DocList>
        <DocListItem>
          <strong>Schema:</strong>
          <DocList>
            <DocListItem>
              <DocCode>User</DocCode> model (participants) with fields:
              fullName, email, phone, RegNo, year, branch, gender, handles,
              transactionId, screenshotUrl, paymentStatus, timestamps.
            </DocListItem>
            <DocListItem>
              <DocCode>Admin</DocCode> model for dashboard access.
            </DocListItem>
            <DocListItem>
              <DocCode>AttendanceLog</DocCode> for event day tracking.
            </DocListItem>
          </DocList>
        </DocListItem>
        <DocListItem>
          Unique constraints on email, RegNo, transactionId.
        </DocListItem>
      </DocList>

      <DocSubSection id="external-services">External Services</DocSubSection>
      <DocList>
        <DocListItem>
          <strong>Cloudinary:</strong> Media storage for payment screenshots.
        </DocListItem>
        <DocListItem>
          <strong>SMTP (Gmail/SendGrid):</strong> Send emails (verification, QR
          code, results).
        </DocListItem>
        <DocListItem>
          <strong>HackerRank:</strong> Problem hosting, judging, leaderboard.
        </DocListItem>
      </DocList>

      <DocSubSection id="infrastructure">Infrastructure (IaC)</DocSubSection>
      <DocList>
        <DocListItem>
          <strong>Terraform:</strong> Provisions Lambda, API Gateway, IAM roles,
          Secrets Manager.
        </DocListItem>
        <DocListItem>
          <strong>GitHub Actions:</strong> CI/CD pipeline (build, test, deploy
          to AWS).
        </DocListItem>
        <DocListItem>
          <strong>Cloudflare Pages:</strong> Hosts frontend; rewrites SPA routes
          to index.html.
        </DocListItem>
      </DocList>

      <DocSection id="data-flow">Data Flow</DocSection>

      <DocSubSection id="reg-flow">Registration Flow</DocSubSection>
      <DocList type="ol">
        <DocListItem>User fills multi-step form on frontend.</DocListItem>
        <DocListItem>
          Frontend sends POST to <DocCode>/api/v1/register</DocCode> with all
          details.
        </DocListItem>
        <DocListItem>
          Lambda:
          <DocList>
            <DocListItem>
              Validates input (email, regNo uniqueness).
            </DocListItem>
            <DocListItem>Uploads screenshot to Cloudinary.</DocListItem>
            <DocListItem>Creates DB record with status = PENDING.</DocListItem>
            <DocListItem>
              Generates QR code (encodes regNo + timestamp).
            </DocListItem>
            <DocListItem>Sends confirmation email with QR code.</DocListItem>
          </DocList>
        </DocListItem>
        <DocListItem>
          Admin verifies payment screenshot → updates status to VERIFIED.
        </DocListItem>
        <DocListItem>User receives final confirmation email.</DocListItem>
      </DocList>

      <DocSubSection id="contest-flow">Contest Flow</DocSubSection>
      <DocList type="ol">
        <DocListItem>Contest goes live on HackerRank at 1:30 PM.</DocListItem>
        <DocListItem>Participants log in via registration details.</DocListItem>
        <DocListItem>Submit solutions → judged on HackerRank.</DocListItem>
        <DocListItem>
          After contest:
          <DocList>
            <DocListItem>Export results CSV from HackerRank.</DocListItem>
            <DocListItem>Upload to website (admin dashboard).</DocListItem>
            <DocListItem>Show live leaderboard.</DocListItem>
          </DocList>
        </DocListItem>
      </DocList>

      <DocSection id="choices">Why These Choices?</DocSection>
      <DocTable>
        <thead>
          <tr>
            <DocTh>Component</DocTh>
            <DocTh>Why Chosen</DocTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DocTd>Vite + React</DocTd>
            <DocTd>Fast builds, modern DX, SPA-friendly</DocTd>
          </tr>
          <tr>
            <DocTd>Cloudflare Pages</DocTd>
            <DocTd>Free tier, excellent SPA support, CDN included</DocTd>
          </tr>
          <tr>
            <DocTd>AWS Lambda</DocTd>
            <DocTd>Serverless, scales to 0, OIDC auth available</DocTd>
          </tr>
          <tr>
            <DocTd>Neon PostgreSQL</DocTd>
            <DocTd>Serverless Postgres, easy migrations, affordable</DocTd>
          </tr>
          <tr>
            <DocTd>Terraform</DocTd>
            <DocTd>IaC, version control, reproducible infra</DocTd>
          </tr>
          <tr>
            <DocTd>GitHub Actions</DocTd>
            <DocTd>OIDC (no long-lived keys), tight GitHub integration</DocTd>
          </tr>
        </tbody>
      </DocTable>

      <DocSection id="scaling">Scaling Considerations</DocSection>
      <DocParagraph>Current setup handles:</DocParagraph>
      <DocList>
        <DocListItem>
          <strong>~500 registrations</strong> with no issue.
        </DocListItem>
        <DocListItem>
          <strong>~100 concurrent API calls</strong> (no rate limiting needed).
        </DocListItem>
        <DocListItem>
          <strong>Lambda cold starts</strong> &lt; 500ms (usually cached).
        </DocListItem>
      </DocList>

      <DocParagraph>Future optimizations:</DocParagraph>
      <DocList>
        <DocListItem>RDS Proxy if connections exceed DB limits.</DocListItem>
        <DocListItem>
          CloudFront in front of API Gateway for caching.
        </DocListItem>
        <DocListItem>
          SQS for async email sending (if latency becomes an issue).
        </DocListItem>
      </DocList>

      <DocParagraph>
        <em className="text-sm opacity-70">Last updated: Jan 2026</em>
      </DocParagraph>
    </div>
  );
}
