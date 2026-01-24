import { 
  DocTitle, 
  DocSection, 
  DocSubSection,
  DocParagraph, 
  DocList, 
  DocListItem, 
  DocCode,
  DocCallout,
  DocPre
} from '../../components/ui/DocComponents';

export default function DocTerraform() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <DocTitle>Terraform Infrastructure</DocTitle>
      
      <DocParagraph>
        We use <strong>Terraform</strong> (IaC) to manage our AWS infrastructure. The state is stored remotely in an S3 bucket with DynamoDB locking.
      </DocParagraph>

      <div className="my-8 border-t border-border" />

      <DocSection id="structure">Directory Structure</DocSection>
      <DocPre>
{`server/terraform/
├── main.tf           # Provider config & common locals
├── variables.tf      # Input variable definitions
├── outputs.tf        # Output values (API URL, etc.)
├── lambda.tf         # Lambda function & IAM roles
├── api_gateway.tf    # HTTP API Gateway configuration
├── storage.tf        # ECR Repository & S3 buckets (if any)
└── secrets.tf        # Secrets Manager resources`}
      </DocPre>

      <DocSection id="resources">Managed Resources</DocSection>

      <DocSubSection id="lambda">AWS Lambda</DocSubSection>
      <DocList>
        <DocListItem><strong>Function Name:</strong> <DocCode>iconcoderz-api</DocCode></DocListItem>
        <DocListItem><strong>Runtime:</strong> Container Image (Docker).</DocListItem>
        <DocListItem><strong>Memory:</strong> 512 MB.</DocListItem>
        <DocListItem><strong>Timeout:</strong> 10 seconds.</DocListItem>
      </DocList>

      <DocSubSection id="api-gateway">API Gateway (HTTP API)</DocSubSection>
      <DocList>
        <DocListItem><strong>Type:</strong> HTTP API (v2) - Cheaper and faster than REST API.</DocListItem>
        <DocListItem><strong>CORS:</strong> Configured to allow <DocCode>https://srkrcodingclub.in</DocCode> and <DocCode>localhost</DocCode>.</DocListItem>
        <DocListItem><strong>Routes:</strong> <DocCode>$default</DocCode> route proxies everything to Lambda.</DocListItem>
      </DocList>

      <DocSubSection id="iam">IAM Roles & Policies</DocSubSection>
      <DocList>
        <DocListItem><strong>Lambda Execution Role:</strong>
           <DocList>
              <DocListItem><DocCode>AWSLambdaBasicExecutionRole</DocCode> (CloudWatch Logs).</DocListItem>
              <DocListItem><DocCode>secretsmanager:GetSecretValue</DocCode> (Access to DB/SMTP creds).</DocListItem>
           </DocList>
        </DocListItem>
      </DocList>

      <DocSection id="commands">Common Commands</DocSection>
      <DocCallout type="warning">
        Only run these if you are the designated DevOps lead. State corruption can break the production API.
      </DocCallout>

      <DocSubSection id="init">Initialize</DocSubSection>
      <DocParagraph>Downloads providers and initializes the backend.</DocParagraph>
      <DocPre>terraform init</DocPre>

      <DocSubSection id="plan">Plan</DocSubSection>
      <DocParagraph>Preview changes before applying.</DocParagraph>
      <DocPre>terraform plan -out=tfplan</DocPre>

      <DocSubSection id="apply">Apply</DocSubSection>
      <DocParagraph>Executes the changes.</DocParagraph>
      <DocPre>terraform apply tfplan</DocPre>

      <DocSection id="state-management">State Management</DocSection>
      <DocParagraph>
        The <DocCode>terraform.tfstate</DocCode> file is <strong>NOT</strong> stored in git. It lives in the S3 bucket <DocCode>srkr-tf-state</DocCode>.
      </DocParagraph>
      
      <DocParagraph>
        <em className="text-sm opacity-70">Last updated: Jan 2026</em>
      </DocParagraph>
    </div>
  );
}
