import { Link } from 'react-router-dom';
import { 
  DocTitle, 
  DocSection, 
  DocParagraph, 
  DocList, 
  DocListItem, 
  DocLink, 
  DocTable,
  DocTh, 
  DocTd
} from '../../components/ui/DocComponents';

export default function DocIntro() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <DocTitle>Iconcoderz-2k26 Wiki</DocTitle>
      
      <DocParagraph>
        Welcome to the internal documentation for <strong>Iconcoderz-2k26</strong>, a competitive programming event by SRKR Coding Club.
      </DocParagraph>
      
      <DocParagraph>
        This Wiki contains operational guides, technical architecture, deployment procedures, and institutional knowledge for organizing and maintaining the event.
      </DocParagraph>
      
      <DocList>
        <DocListItem><Link to="/docs/architecture" className="text-primary hover:underline">System Architecture</Link> – High-level tech overview.</DocListItem>
        <DocListItem><Link to="/docs/data-model" className="text-primary hover:underline">Data Model & APIs</Link> – Database schema and backend endpoints.</DocListItem>
        <DocListItem><Link to="/docs/terraform" className="text-primary hover:underline">Terraform Setup</Link> – Infrastructure as Code.</DocListItem>
        <DocListItem><Link to="/docs/deployment" className="text-primary hover:underline">Deployment Guide</Link> – Manual operations & troubleshooting.</DocListItem>
        <DocListItem><Link to="/docs/custom-domain" className="text-primary hover:underline">Custom Domain</Link> – ACM & Cloudflare setup.</DocListItem>
        <DocListItem><Link to="/docs/cicd" className="text-primary hover:underline">CI/CD Pipeline</Link> – How our "Assembly Line" works.</DocListItem>
        <DocListItem><Link to="/docs/getting-started" className="text-primary hover:underline">Getting Started</Link> – <strong>Start here!</strong> Local setup guide.</DocListItem>
        <DocListItem><Link to="/docs/testing" className="text-primary hover:underline">Testing & Makefile</Link> – How to run tests and commands.</DocListItem>
        <DocListItem><Link to="/docs/runbook" className="text-primary hover:underline">Event Runbook</Link> – Timeline and checklist for contest day.</DocListItem>
      </DocList>

      <div className="my-8 border-t border-border" />

      <DocSection id="key-info">Key Info at a Glance</DocSection>
      
      <DocTable>
        <thead>
          <tr>
            <DocTh>Item</DocTh>
            <DocTh>Value</DocTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DocTd><strong>Event Date</strong></DocTd>
            <DocTd>Feb 23, 2026, 1:30 PM IST</DocTd>
          </tr>
          <tr>
            <DocTd><strong>Eligibility</strong></DocTd>
            <DocTd>SRKR 1st, 2nd, 3rd and 4th year students</DocTd>
          </tr>
          <tr>
            <DocTd><strong>Participation</strong></DocTd>
            <DocTd>Individual only</DocTd>
          </tr>
          <tr>
            <DocTd><strong>Registration Fee</strong></DocTd>
            <DocTd>₹100</DocTd>
          </tr>
          <tr>
            <DocTd><strong>Platform</strong></DocTd>
            <DocTd>HackerRank (with custom registration & leaderboard on website)</DocTd>
          </tr>
          <tr>
            <DocTd><strong>Website</strong></DocTd>
            <DocTd><DocLink href="https://srkrcodingclub.in">https://srkrcodingclub.in</DocLink></DocTd>
          </tr>
          <tr>
            <DocTd><strong>Email</strong></DocTd>
            <DocTd>srkrcodingclub@gmail.com</DocTd>
          </tr>
        </tbody>
      </DocTable>

      <div className="my-8 border-t border-border" />

      <DocSection id="for-new-team-members">For New Team Members</DocSection>
      <DocList type="ol">
        <DocListItem>Read the <strong>System Architecture</strong> page to understand the stack.</DocListItem>
        <DocListItem>Check out <strong>Data Model</strong> and <strong>CI/CD Pipeline</strong>.</DocListItem>
        <DocListItem><strong>Then:</strong> Read the <Link to="/docs/getting-started" className="text-primary hover:underline">Getting Started</Link> guide to set up your laptop.</DocListItem>
        <DocListItem>Review the <strong>Support SOP</strong> for common issues.</DocListItem>
        <DocListItem>On contest day, follow the <strong>Event Runbook</strong>.</DocListItem>
      </DocList>

      <DocParagraph>
        <em className="text-sm opacity-70">Last updated: Jan 2026</em>
      </DocParagraph>
    </div>
  );
}
