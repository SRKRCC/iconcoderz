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
        We use <strong>GitHub Actions</strong> for continuous integration and deployment.
      </DocParagraph>

      <DocSubSection id="frontend-pipeline">Frontend Pipeline</DocSubSection>
      <DocList>
        <DocListItem><strong>Trigger:</strong> Push to <DocCode>main</DocCode> (client folder changes).</DocListItem>
        <DocListItem><strong>File:</strong> <DocCode>client/.github/workflows/deploy.yml</DocCode></DocListItem>
        <DocListItem><strong>Steps:</strong>
          <DocList type="ol">
             <DocListItem>Checkout code.</DocListItem>
             <DocListItem>Install dependencies (<DocCode>npm install</DocCode>).</DocListItem>
             <DocListItem>Build (<DocCode>npm run build</DocCode>).</DocListItem>
             <DocListItem>Deploy to Cloudflare Pages (via wrangler action).</DocListItem>
          </DocList>
        </DocListItem>
      </DocList>

      <DocSubSection id="backend-pipeline">Backend Pipeline</DocSubSection>
      <DocList>
        <DocListItem><strong>Trigger:</strong> Push to <DocCode>main</DocCode> (server folder changes).</DocListItem>
        <DocListItem><strong>File:</strong> <DocCode>server/.github/workflows/deploy-prod.yml</DocCode></DocListItem>
        <DocListItem><strong>Steps:</strong>
          <DocList type="ol">
             <DocListItem>Configure AWS Credentials (OIDC).</DocListItem>
             <DocListItem>Login to Amazon ECR.</DocListItem>
             <DocListItem>Build Docker image for Lambda.</DocListItem>
             <DocListItem>Push image to ECR.</DocListItem>
             <DocListItem>Update Lambda function code to use new image.</DocListItem>
          </DocList>
        </DocListItem>
      </DocList>

      <DocSection id="terraform-setup">Terraform Setup (Infrastructure)</DocSection>
      <DocParagraph>
        The <DocCode>server/terraform</DocCode> directory contains the IaC definitions.
      </DocParagraph>

      <DocSubSection id="managed-resources">Managed Resources</DocSubSection>
      <DocList>
         <DocListItem><strong>AWS Lambda:</strong> The backend API function.</DocListItem>
         <DocListItem><strong>API Gateway (HTTP API):</strong> Routes requests to Lambda.</DocListItem>
         <DocListItem><strong>ECR Repository:</strong> Stores docker images.</DocListItem>
         <DocListItem><strong>Secrets Manager:</strong> Stores <DocCode>DATABASE_URL</DocCode>, <DocCode>SMTP_PASS</DocCode>, etc.</DocListItem>
         <DocListItem><strong>IAM Roles:</strong> Permissions for Lambda to access Secrets/CloudWatch.</DocListItem>
      </DocList>

      <DocSubSection id="manual-commands">Manual Commands</DocSubSection>
      <div className="my-6 rounded-lg border border-border bg-muted p-4 overflow-x-auto font-mono text-sm">
        <div className="text-muted-foreground"># Initialize Terraform</div>
        <div className="text-foreground">terraform init</div>
        <br/>
        <div className="text-muted-foreground"># Plan changes</div>
        <div className="text-foreground">terraform plan</div>
        <br/>
        <div className="text-muted-foreground"># Apply changes (Be careful!)</div>
        <div className="text-foreground">terraform apply</div>
      </div>

      <DocSection id="secrets-management">Secrets Management</DocSection>
      <DocParagraph>
        Secrets (Database URL, API Keys) are injected into the Lambda function at runtime via <strong>AWS Secrets Manager</strong>.
      </DocParagraph>
      <DocList>
         <DocListItem><strong>Secret Name:</strong> <DocCode>iconcoderz/prod/env</DocCode></DocListItem>
         <DocListItem><strong>Key Format:</strong> JSON key-value pairs.</DocListItem>
      </DocList>
      
      <DocParagraph>To update secrets:</DocParagraph>
      <DocList type="ol">
         <DocListItem>Go to AWS Console → Secrets Manager.</DocListItem>
         <DocListItem>Select the secret.</DocListItem>
         <DocListItem>Click "Retrieve secret value" → "Edit".</DocListItem>
         <DocListItem>Add/Update JSON keys.</DocListItem>
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
            <DocTd>GitHub Action fails on "AWS Credentials"</DocTd>
            <DocTd>Check GitHub Repository Secrets (AWS_ROLE_ARN) and OIDC trust policy in IAM.</DocTd>
          </tr>
          <tr>
            <DocTd>Cloudflare build fails</DocTd>
            <DocTd>Check <DocCode>npm run build</DocCode> locally. Ensure node version matches (v20+).</DocTd>
          </tr>
          <tr>
            <DocTd>Lambda shows "Internal Server Error"</DocTd>
            <DocTd>Check CloudWatch Logs. Likely a DB connection issue or missing secret.</DocTd>
          </tr>
        </tbody>
      </DocTable>

      <DocParagraph>
        <em className="text-sm opacity-70">Last updated: Jan 2026</em>
      </DocParagraph>
    </div>
  );
}
