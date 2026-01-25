import {
  DocTitle,
  DocSection,
  DocSubSection,
  DocParagraph,
  DocList,
  DocListItem,
  DocCode,
  DocCallout,
  DocPre,
} from "../../components/ui/DocComponents";

export default function DocTerraform() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <DocTitle>Terraform Infrastructure</DocTitle>

      <DocParagraph>
        We use <strong>Terraform</strong> (IaC) to manage our AWS
        infrastructure. The state is stored remotely in an S3 bucket with
        DynamoDB locking.
      </DocParagraph>

      <div className="my-8 border-t border-border" />

      <DocSection id="concepts">Core Concepts (For Beginners)</DocSection>
      <DocParagraph>
        Understanding the tools we use and why we use them.
      </DocParagraph>

      <DocSubSection id="iac">Infrastructure as Code (IaC)</DocSubSection>
      <DocCallout type="tip">
        <strong>Analogy: Lego Instructions.</strong>
        <br />
        Imagine building a huge Lego castle. If you build it from memory, you
        might forget a tower. But if you have the instruction booklet (IaC), you
        can build the exact same castle every single time without making
        mistakes.
      </DocCallout>
      <DocParagraph>
        Instead of clicking buttons in the AWS Console, we define our
        infrastructure (servers, databases, permissions) in code files (
        <DocCode>*.tf</DocCode>).
      </DocParagraph>
      <DocList>
        <DocListItem>
          <strong>Reproducibility:</strong> We can spin up an identical copy of
          production in minutes.
        </DocListItem>
        <DocListItem>
          <strong>Version Control:</strong> Infrastructure changes are tracked
          in Git, just like app code.
        </DocListItem>
        <DocListItem>
          <strong>Safety:</strong> <DocCode>terraform plan</DocCode> shows
          exactly what will change before it happens, preventing accidental
          deletions.
        </DocListItem>
      </DocList>

      <DocSubSection id="cicd">
        CI/CD (Continuous Integration/Deployment)
      </DocSubSection>
      <DocCallout type="tip">
        <strong>Analogy: Robot Assembly Line.</strong>
        <br />
        Imagine you are making a car. Instead of checking every screw yourself,
        you put the car on a conveyor belt. One robot checks if the engine works
        (CI), and if it's good, another robot paints it and parks it in the
        showroom (CD) automatically.
      </DocCallout>
      <DocParagraph>Automation that runs whenever we push code.</DocParagraph>
      <DocList>
        <DocListItem>
          <strong>CI (Integration):</strong> Runs tests and builds the code to
          catch bugs early. (e.g., <DocCode>pnpm test</DocCode>)
        </DocListItem>
        <DocListItem>
          <strong>CD (Deployment):</strong> Automatically updates the live
          servers. No one has to manually SSH into a server to update it.
        </DocListItem>
      </DocList>

      <DocSubSection id="tag-releases">Tag Releases</DocSubSection>
      <DocCallout type="tip">
        <strong>Analogy: Video Game Save Points.</strong>
        <br />
        Before you fight a boss level, you save the game. If you lose, you can
        reload that save point. A "Tag" (v1.0) is like a save point for our
        code. If v1.1 breaks everything, we can instantly go back to v1.0.
      </DocCallout>
      <DocParagraph>
        We use Git Tags (e.g., <DocCode>v1.1.0</DocCode>) to mark specific
        points in history as "releases".
      </DocParagraph>
      <DocList>
        <DocListItem>
          <strong>Traceability:</strong> We know exactly which version of code
          is running in production.
        </DocListItem>
        <DocListItem>
          <strong>Rollbacks:</strong> If v1.2.0 breaks, we can easily redeploy
          v1.1.0.
        </DocListItem>
        <DocListItem>
          <strong>Changelogs:</strong> Helps generate release notes so we know
          what changed between versions.
        </DocListItem>
      </DocList>

      <div className="my-8 border-t border-border" />

      <DocSection id="structure">Directory Structure</DocSection>
      <DocPre>
        {`server/terraform/
├── environments/
│   └── prod/
│       ├── main.tf       # Entry point (providers, backend)
│       └── variables.tf  # Environment-specific vars
├── modules/
│   ├── lambda-api/       # Lambda + ECR + CloudWatch
│   ├── api_gateway/      # HTTP API Gateway
│   ├── iam/              # Permissions
│   └── secrets/          # Secret placeholders`}
      </DocPre>

      <DocSection id="resources">Managed Resources</DocSection>

      <DocSubSection id="lambda">AWS Lambda</DocSubSection>
      <DocList>
        <DocListItem>
          <strong>Function Name:</strong> <DocCode>iconcoderz-prod</DocCode>
        </DocListItem>
        <DocListItem>
          <strong>Runtime:</strong> Node.js 22 (Docker Image).
        </DocListItem>
        <DocListItem>
          <strong>Memory:</strong> 512 MB.
        </DocListItem>
        <DocListItem>
          <strong>Timeout:</strong> 30 seconds.
        </DocListItem>
      </DocList>

      <DocSubSection id="api-gateway">API Gateway (HTTP API)</DocSubSection>
      <DocList>
        <DocListItem>
          <strong>Type:</strong> HTTP API (v2).
        </DocListItem>
        <DocListItem>
          <strong>CORS:</strong> Restricted to{" "}
          <DocCode>iconcoderz.srkrcodingclub.in</DocCode> (prod).
        </DocListItem>
        <DocListItem>
          <strong>Routes:</strong> <DocCode>$default</DocCode> route proxies
          everything to Lambda.
        </DocListItem>
      </DocList>

      <DocSubSection id="iam">IAM Roles & Policies</DocSubSection>
      <DocList>
        <DocListItem>
          <strong>Lambda Execution Role:</strong>
          <DocList>
            <DocListItem>
              <DocCode>AWSLambdaBasicExecutionRole</DocCode> (CloudWatch Logs).
            </DocListItem>
            <DocListItem>
              <DocCode>secretsmanager:GetSecretValue</DocCode> (Access to Keys).
            </DocListItem>
          </DocList>
        </DocListItem>
      </DocList>

      <DocSection id="commands">Common Commands</DocSection>
      <DocCallout type="warning">
        To be run inside <DocCode>server/terraform/environments/prod</DocCode>.
      </DocCallout>

      <DocSubSection id="init">Initialize</DocSubSection>
      <DocParagraph>
        Downloads providers and initializes the backend.
      </DocParagraph>
      <DocPre>terraform init -reconfigure</DocPre>

      <DocSubSection id="plan">Plan</DocSubSection>
      <DocParagraph>Preview changes before applying.</DocParagraph>
      <DocPre>terraform plan</DocPre>

      <DocSubSection id="apply">Apply</DocSubSection>
      <DocParagraph>Executes the changes.</DocParagraph>
      <DocPre>terraform apply</DocPre>

      <DocSection id="state-management">State Management</DocSection>
      <DocParagraph>
        The <DocCode>terraform.tfstate</DocCode> file is <strong>NOT</strong>{" "}
        stored in git. It is stored remotely in the S3 bucket{" "}
        <DocCode>iconcoderz-terraform-state</DocCode>.
      </DocParagraph>

      <DocParagraph>
        <em className="text-sm opacity-70">Last updated: Jan 2026</em>
      </DocParagraph>
    </div>
  );
}
