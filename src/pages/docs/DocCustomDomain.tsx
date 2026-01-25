import CustomDomainFlow from "../../components/flows/CustomDomainFlow";
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

export default function DocCustomDomain() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <DocTitle>Custom Domain Setup (ACM + Cloudflare)</DocTitle>

      <DocParagraph>
        This guide documents how we secured our API with a custom domain (
        <DocCode>api.iconcoderz.srkrcodingclub.in</DocCode>) using AWS
        Certificate Manager (ACM) and Cloudflare.
      </DocParagraph>

      <div className="my-8 border-t border-border" />

      <DocSection id="concept">The Concept</DocSection>
      <DocCallout type="tip">
        <strong>Analogy: The ID Card & The Address Book.</strong>
        <br />
        <ul>
          <li>
            <strong>Certificate (ACM):</strong> This is like your drivers
            license. It proves you are who you say you are (Secure/HTTPS).
          </li>
          <li>
            <strong>DNS (Cloudflare):</strong> This is the phone book. It tells
            people where "iconcoderz" lives (IP Address).
          </li>
        </ul>
        For the API to work securely, we need to show our ID card (Cert) to the
        API Gateway, and update the address book (DNS) to point to it.
      </DocCallout>

      <div className="my-8">
        <CustomDomainFlow />
      </div>

      <DocSection id="process">Setup Process</DocSection>

      <DocSubSection id="step-1">
        1. Request Certificate (AWS ACM)
      </DocSubSection>
      <DocCallout type="tip">
        <strong>Analogy: Filling the Application Form.</strong>
        <br />
        You are asking the government (AWS) for an ID card. You have to tell
        them your name (domain) and where you live (Region).
      </DocCallout>
      <DocParagraph>Go to AWS Console → Certificate Manager.</DocParagraph>
      <DocList type="ol">
        <DocListItem>
          <strong>Region:</strong> Ensure you are in{" "}
          <DocCode>ap-south-1</DocCode> (Mumbai). The cert must match the API
          Gateway region.
        </DocListItem>
        <DocListItem>
          Click <strong>Request a certificate</strong> → Request a public
          certificate.
        </DocListItem>
        <DocListItem>
          <strong>Domain names:</strong>{" "}
          <DocCode>api.iconcoderz.srkrcodingclub.in</DocCode> (or{" "}
          <DocCode>*.iconcoderz...</DocCode>).
        </DocListItem>
        <DocListItem>
          <strong>Validation method:</strong> DNS validation.
        </DocListItem>
        <DocListItem>
          Click <strong>Request and you'll see a CNAME record.</strong>
        </DocListItem>
      </DocList>

      <DocSubSection id="step-2">
        2. Validate Ownership (Cloudflare)
      </DocSubSection>
      <DocCallout type="tip">
        <strong>Analogy: The OTP Verification.</strong>
        <br />
        AWS needs to know you actually own the domain. They give you a secret
        code (CNAME) to put on your door (DNS). If they can see the code on your
        door, they mail you the ID card.
      </DocCallout>
      <DocParagraph>
        AWS will give you CNAME records to prove you own the domain.
      </DocParagraph>
      <DocPre>
        {`Name: _x.api.iconcoderz.srkrcodingclub.in
Value: _y.acm-validations.aws.`}
      </DocPre>
      <DocList type="ol">
        <DocListItem>Go to Cloudflare Dashboard → DNS.</DocListItem>
        <DocListItem>Add the CNAME record provided by AWS.</DocListItem>
        <DocListItem>
          <strong>Critical:</strong> Turn <strong>Proxy Status OFF</strong>{" "}
          (Grey Cloud) for validation. AWS cannot see the record if it is
          proxied.
        </DocListItem>
        <DocListItem>
          Now head back to aws, and wait for ACM status to change to{" "}
          <DocCode>Issued</DocCode> (takes around 5 minutes).
        </DocListItem>
      </DocList>

      <DocSubSection id="step-3">
        3. Configure API Gateway (After Cert Issued)
      </DocSubSection>
      <DocCallout type="tip">
        <strong>Analogy: Installing the Lock.</strong>
        <br />
        Now that you have the ID card (Cert), you need to install a special lock
        (Custom Domain) on your house (API Gateway) that recognizes this ID.
      </DocCallout>
      <DocList type="ol">
        <DocListItem>
          Go to API Gateway → <strong>Custom domain names</strong>.
        </DocListItem>
        <DocListItem>
          Click <strong>Create</strong>.
        </DocListItem>
        <DocListItem>
          Enter domain: <DocCode>api.iconcoderz.srkrcodingclub.in</DocCode>.
        </DocListItem>
        <DocListItem>
          <strong>ACM Certificate:</strong> Select the one you just created.
        </DocListItem>
        <DocListItem>
          Click <strong>Create domain name</strong>.
        </DocListItem>
        <DocListItem>
          Wait for status to change to <DocCode>Active</DocCode>. And you'll see
          the <DocCode>API Gateway domain</DocCode>, this we use in step 5.
        </DocListItem>
      </DocList>

      <DocSubSection id="step-4">4. API Mapping</DocSubSection>
      <DocCallout type="tip">
        <strong>Analogy: The Receptionist.</strong>
        <br />
        The lock is installed, but it doesn't know which room to leverage. You
        tell the receptionist: "When someone uses this ID card, send them to the
        Production Room ($default stage)."
      </DocCallout>
      <DocParagraph>
        Now link the custom domain to your specific API (Backend).
      </DocParagraph>
      <DocList type="ol">
        <DocListItem>Select the custom domain you just made.</DocListItem>
        <DocListItem>
          Go to <strong>API mappings</strong> → Configure API mappings.
        </DocListItem>
        <DocListItem>
          <strong>API:</strong> Select <DocCode>iconcoderz-prod</DocCode>.
        </DocListItem>
        <DocListItem>
          <strong>Stage:</strong> <DocCode>$default</DocCode>.
        </DocListItem>
        <DocListItem>Save.</DocListItem>
      </DocList>

      <DocSubSection id="step-5">5. Final DNS Pointing</DocSubSection>
      <DocCallout type="tip">
        <strong>Analogy: Updating Your Contact Info.</strong>
        <br />
        Finally, you tell your friends (Users): "Don't use the old address. Use
        this new fancy address (<DocCode>api.iconcoderz...</DocCode>), which
        forwards to my secure house."
      </DocCallout>
      <DocParagraph>
        AWS will generate a "API Gateway domain name" ending in{" "}
        <DocCode>.cloudfront.net</DocCode> or{" "}
        <DocCode>.execute-api.ap-south-1.amazonaws.com</DocCode>.
      </DocParagraph>
      <DocList type="ol">
        <DocListItem>Copy this AWS-generate URL.</DocListItem>
        <DocListItem>Go back to Cloudflare DNS.</DocListItem>
        <DocListItem>
          Create a CNAME record for <DocCode>api.iconcoderz</DocCode> pointing
          to that AWS URL (<DocCode>API Gateway domain</DocCode>).
        </DocListItem>
        <DocListItem>
          <strong>Proxy Status:</strong> You can typically turn this{" "}
          <strong>ON</strong> (Orange Cloud) for DDoS protection, but ensure SSL
          is set to "Full".
        </DocListItem>
      </DocList>

      <DocSubSection id="step-6">6. Verification</DocSubSection>
      <DocParagraph>
        Now verify your new custom domain whether it's working or not.
      </DocParagraph>
      <DocList type="ol">
        <DocListItem>
          Go to your→ <strong>Custom domain name health endpoint</strong>.
        </DocListItem>
        <DocListItem>
          <strong>Health endpoint</strong> should return{" "}
          <DocCode>200 OK</DocCode>.
        </DocListItem>
        <DocListItem>
          Done, that's how we create custom domains in aws
        </DocListItem>
      </DocList>

      <DocSubSection id="general-flow">
        General Workflow (Cheatsheet)
      </DocSubSection>
      <DocCallout type="info">
        <strong>Applying this to any project:</strong>
        <DocList type="ol">
          <DocListItem>
            <strong>Request:</strong> Ask AWS ACM for a certificate for your
            domain (e.g., <DocCode>api.domain.com</DocCode> or{" "}
            <DocCode>api.subdomain.domain.com</DocCode>).
          </DocListItem>
          <DocListItem>
            <strong>Validate:</strong> Prove ownership by adding the ACM
            provided CNAME record to your DNS (Cloudflare/GoDaddy/Route53).
          </DocListItem>
          <DocListItem>
            <strong>Attach:</strong> Go to your AWS Resource (API Gateway/Load
            Balancer) → Add Custom Domain → Select Issued Certificate.
          </DocListItem>
          <DocListItem>
            <strong>Map:</strong> Point the Custom Domain to your specific
            service/stage. (API Domain Mapping or Association) (
            <DocCode>Important</DocCode>)
          </DocListItem>
          <DocListItem>
            <strong>Route:</strong> Update your DNS to point{" "}
            <DocCode>api</DocCode> or <DocCode>api.subdomain</DocCode> to the
            AWS Resource URL.
          </DocListItem>
        </DocList>
      </DocCallout>

      <DocParagraph>
        <em className="text-sm opacity-70">Last updated: Jan 2026</em>
      </DocParagraph>
    </div>
  );
}
