import BackendCICDFlow from "../../components/flows/BackendCICDFlow";
import FrontendCICDFlow from "../../components/flows/FrontendCICDFlow";
import {
  DocTitle,
  DocSection,
  DocSubSection,
  DocParagraph,
  DocList,
  DocListItem,
  DocCode,
  DocCallout,
} from "../../components/ui/DocComponents";

export default function DocCICD() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <DocTitle>CI/CD Automation</DocTitle>

      <DocParagraph>
        We use <strong>GitHub Actions</strong> to automatically test, build, and
        deploy our code. This ensures that no broken code reaches production.
      </DocParagraph>

      <div className="my-8 border-t border-border" />

      <DocSection id="analogy">The Robot Assembly Line</DocSection>
      <DocCallout type="tip">
        <strong>Analogy: The Factory.</strong>
        <br />
        Think of our code as a car being built in a factory.
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>
            <strong>Developer:</strong> You are the designer. You sketch the car
            and send the blueprints (Push Code).
          </li>
          <li>
            <strong>CI (Continuous Integration):</strong> These are the{" "}
            <strong>Quality Inspectors</strong>. They check if the doors fit, if
            the engine starts, and if the paint is correct (Tests/Linting). If
            they find a flaw, they stop the line immediately.
          </li>
          <li>
            <strong>CD (Continuous Deployment):</strong> This is the{" "}
            <strong>Packaging Machine & Delivery Truck</strong>. Once the
            inspectors approve, the car is boxed up (Docker/Assets) and driven
            to the dealership (AWS/Cloudflare) automatically.
          </li>
        </ul>
      </DocCallout>

      <DocSection id="pipelines">Our Pipelines</DocSection>

      <DocParagraph>
        Since we have two separate repositories, we have two independent
        assembly lines.
      </DocParagraph>

      <DocSubSection id="frontend-pipeline">
        1. Frontend Pipeline (Client)
      </DocSubSection>
      <div className="my-4">
        <FrontendCICDFlow />
      </div>
      <DocList>
        <DocListItem>
          <strong>Trigger:</strong> Push to <DocCode>main</DocCode>.
        </DocListItem>
        <DocListItem>
          <strong>Robots involved:</strong>
          <DocList>
            <DocListItem>
              <strong>Install Robot:</strong> Downloads all tools (
              <DocCode>pnpm install</DocCode>).
            </DocListItem>
            <DocListItem>
              <strong>Builder Robot:</strong> Compresses the React code into
              static assets (<DocCode>pnpm run build</DocCode>).
            </DocListItem>
            <DocListItem>
              <strong>Delivery Robot:</strong> Uploads files to{" "}
              <strong>Cloudflare Pages</strong>.
            </DocListItem>
          </DocList>
        </DocListItem>
      </DocList>

      <DocSubSection id="backend-pipeline">
        2. Backend Pipeline (Server)
      </DocSubSection>
      <div className="my-4">
        <BackendCICDFlow />
      </div>
      <DocParagraph>
        The backend pipeline is more complex because it manages state (Database)
        and infrastructure (AWS). It runs in 4 distinct stages:
      </DocParagraph>

      <div className="space-y-6 mt-4">
        <div className="border border-border rounded-lg p-4 bg-card">
          <h4 className="font-bold text-lg mb-2">
            Step 1: The Gatekeeper (Tests & Version)
          </h4>
          <DocList>
            <DocListItem>
              <strong>Get Version:</strong> Reads `package.json` to determine
              the Docker tag (e.g., `1.0.1`).
            </DocListItem>
            <DocListItem>
              <strong>Run Tests:</strong> Executes `vitest` and `tsc`. If these
              fail, the entire pipeline stops. No broken code ever leaves this
              stage.
            </DocListItem>
          </DocList>
        </div>

        <div className="border border-border rounded-lg p-4 bg-card">
          <h4 className="font-bold text-lg mb-2">
            Step 2: The Architect (Infrastructure)
          </h4>
          <DocList>
            <DocListItem>
              <strong>Terraform Init:</strong> Connects to the AWS S3 backend to
              read the current state of our infrastructure.
            </DocListItem>
            <DocListItem>
              <strong>Terraform Apply (Layer 1):</strong> Specifically checks if
              the <strong>ECR Repository</strong> exists. We need this first to
              have a place to store our "Lunchbox" (Docker Image).
            </DocListItem>
          </DocList>
        </div>

        <div className="border border-border rounded-lg p-4 bg-card">
          <h4 className="font-bold text-lg mb-2">
            Step 3: The Chef (Build & Push)
          </h4>
          <DocList>
            <DocListItem>
              <strong>Docker Build:</strong> Compiles the Node.js code into a
              lightweight Linux image.
            </DocListItem>
            <DocListItem>
              <strong>Push to ECR:</strong> Uploads the image to AWS Elastic
              Container Registry. We disable `provenance` attestations because
              AWS Lambda doesn't support them yet.
            </DocListItem>
          </DocList>
        </div>

        <div className="border border-border rounded-lg p-4 bg-card">
          <h4 className="font-bold text-lg mb-2">
            Step 4: The Mover (Deploy & Migrate)
          </h4>
          <DocList type="ol">
            <DocListItem>
              <strong>Migration Robot:</strong> Runs `pnpm migrate:deploy`{" "}
              <em>inside the CI runner</em>. This connects to the Production DB
              and applies any schema changes (like expanding a table){" "}
              <strong>before</strong> the new code runs.
            </DocListItem>
            <DocListItem>
              <strong>Lambda Update:</strong> Terraform runs again to tell AWS
              Lambda:{" "}
              <em>"Stop using Image v1.0.0. Start using Image v1.0.1"</em>.
            </DocListItem>
            <DocListItem>
              <strong>Waiter:</strong> The pipeline pauses and watches AWS ("Are
              you done yet?"). It waits until the Update is "Successful".
            </DocListItem>
            <DocListItem>
              <strong>Health Check:</strong> Finally, it curls `/api/v1/health`.
              If it gets a 200 OK, the deployment is a success.
            </DocListItem>
          </DocList>
        </div>
      </div>

      <DocSection id="benefits">Why do we do this?</DocSection>
      <DocList>
        <DocListItem>
          <strong>No Human Error:</strong> Robots don't forget steps.
        </DocListItem>
        <DocListItem>
          <strong>Speed:</strong> Browsers and Servers are updated in minutes.
        </DocListItem>
        <DocListItem>
          <strong>Safety:</strong> "Inspectors" catch bugs before they reach
          users.
        </DocListItem>
      </DocList>

      <DocParagraph>
        <em className="text-sm opacity-70">Last updated: Jan 2026</em>
      </DocParagraph>
    </div>
  );
}
