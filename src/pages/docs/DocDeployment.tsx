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
  DocCallout
} from '../../components/ui/DocComponents';

export default function DocDeployment() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <DocTitle>Deployment Guide</DocTitle>
      
      <DocParagraph>
        This guide explains how the application is deployed using GitHub Actions, Terraform, and AWS/Cloudflare.
      </DocParagraph>

      <DocCallout type="info">
        <strong>Note:</strong> All deployments are automated via CI/CD. Manual Terraform commands are typically only needed for initial setup or state recovery.
      </DocCallout>
      
      <div className="my-8 border-t border-border" />

      <DocSection id="prerequisites">Prerequisites</DocSection>
      <DocList>
        <DocListItem>AWS CLI configured with Admin credentials.</DocListItem>
        <DocListItem>Terraform v1.5+ installed.</DocListItem>
        <DocListItem>Docker running (for building Lambda layers locally if needed).</DocListItem>
        <DocListItem>Cloudflare API Token.</DocListItem>
        <DocListItem>GitHub Repository Admin access (for secrets).</DocListItem>
      </DocList>

      <DocSection id="ci-cd-pipeline">CI/CD Pipeline</DocSection>
      <DocParagraph>
        We use <strong>GitHub Actions</strong> for automation. For a detailed explanation of the "Robot Assembly Line" and our build/test/deploy flows, please see the <strong className="text-primary hover:underline"><a href="/docs/cicd">CI/CD Automation Guide</a></strong>.
      </DocParagraph>

      <DocSection id="terraform-setup">Terraform Setup (Infrastructure)</DocSection>
      <DocParagraph>
        The <DocCode>server/terraform</DocCode> directory contains the IaC definitions.
      </DocParagraph>

      <DocSubSection id="managed-resources">Managed Resources</DocSubSection>
      <DocList>
         <DocListItem><strong>AWS Lambda:</strong> The backend API function (<DocCode>iconcoderz-prod</DocCode>).</DocListItem>
         <DocListItem><strong>API Gateway (HTTP API):</strong> Routes requests to Lambda.</DocListItem>
         <DocListItem><strong>ECR Repository:</strong> Stores docker images.</DocListItem>
         <DocListItem><strong>Secrets Manager:</strong> Stores <DocCode>DATABASE_URL</DocCode>, <DocCode>SMTP_PASS</DocCode>, etc.</DocListItem>
         <DocListItem><strong>IAM Roles:</strong> Permissions for Lambda to access Secrets/CloudWatch.</DocListItem>
      </DocList>

      <DocSubSection id="manual-commands">Manual Commands</DocSubSection>
      <div className="my-6 rounded-lg border border-border bg-muted p-4 overflow-x-auto font-mono text-sm">
        <div className="text-muted-foreground"># Initialize Terraform</div>
        <div className="text-foreground">terraform init -reconfigure</div>
        <br/>
        <div className="text-muted-foreground"># Plan changes</div>
        <div className="text-foreground">terraform plan</div>
        <br/>
        <div className="text-muted-foreground"># Apply changes</div>
        <div className="text-foreground">terraform apply -auto-approve</div>
      </div>

      <DocSection id="secrets-management">Secrets Management</DocSection>
      <DocCallout type="tip">
        <strong>Analogy: The Bank Vault.</strong><br/>
        You don't carry your life savings in your pocket (code). You keep them in a vault (Secrets Manager). When you need money, you go to the bank, authenticate yourself, and take only what you need.
      </DocCallout>
      <DocParagraph>
        Secrets are injected via <strong>AWS Secrets Manager</strong>. The application config fetches them at runtime (in production).
      </DocParagraph>
      <DocList>
         <DocListItem><strong>DB URL:</strong> <DocCode>iconcoderz/prod/db-url</DocCode></DocListItem>
         <DocListItem><strong>External Services:</strong>
            <DocList>
               <DocListItem><DocCode>iconcoderz/prod/cloudinary-api</DocCode></DocListItem>
               <DocListItem><DocCode>iconcoderz/prod/smtp-credentials</DocCode></DocListItem>
            </DocList>
         </DocListItem>
          <DocListItem><strong>App Config:</strong>
            <DocList>
               <DocListItem><DocCode>iconcoderz/prod/jwt-config</DocCode></DocListItem>
               <DocListItem><DocCode>iconcoderz/prod/client-config</DocCode></DocListItem>
               <DocListItem><DocCode>iconcoderz/prod/qr-config</DocCode></DocListItem>
            </DocList>
         </DocListItem>
      </DocList>
      
      <DocSubSection id="docker-images">Docker Images & ECR</DocSubSection>
      <DocCallout type="tip">
        <strong>Analogy: The Lunchbox.</strong><br/>
        A Docker image is like a packed lunchbox. It has the food (code), the fork (runtime), and the napkin (dependencies). You can take this lunchbox to school (AWS), the park (Localhost), or work (Test Server), and your lunch is exactly the same everywhere.
      </DocCallout>
      
      <DocParagraph>To update secrets:</DocParagraph>
      <DocList type="ol">
         <DocListItem>Go to AWS Console → Secrets Manager.</DocListItem>
         <DocListItem>Select the secret path.</DocListItem>
         <DocListItem>Click "Retrieve secret value" → "Edit".</DocListItem>
         <DocListItem>Update JSON keys.</DocListItem>
      </DocList>

      <DocSection id="troubleshooting">Troubleshooting Deployment</DocSection>
      <DocTable>
        <thead>
          <tr>
            <DocTh>Error</DocTh>
            <DocTh>Fix</DocTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DocTd>Lambda Image Format Error</DocTd>
            <DocTd>Ensure <DocCode>provenance: false</DocCode> is in Docker build step (Lambda doesn't support OCI manifests).</DocTd>
          </tr>
          <tr>
            <DocTd>Health Check Failed</DocTd>
            <DocTd>Check if <DocCode>DATABASE_URL</DocCode> secret is correct. Check CloudWatch logs for startup errors.</DocTd>
          </tr>
          <tr>
            <DocTd>Terraform Output Mismatch</DocTd>
            <DocTd>Verify output names in <DocCode>main.tf</DocCode> match what workflow expects (e.g. <DocCode>api_url</DocCode>).</DocTd>
          </tr>
        </tbody>
      </DocTable>

      <DocParagraph>
        <em className="text-sm opacity-70">Last updated: Jan 2026</em>
      </DocParagraph>
    </div>
  );
}
