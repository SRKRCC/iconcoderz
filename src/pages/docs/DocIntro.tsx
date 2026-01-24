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
      
      <DocSection id="quick-links">Quick Links</DocSection>
      <DocList>
        <DocListItem><Link to="/docs/runbook" className="text-primary hover:underline">Event Runbook</Link> – Timeline and checklist for contest day</DocListItem>
        <DocListItem><Link to="/docs/architecture" className="text-primary hover:underline">System Architecture</Link> – High-level tech overview</DocListItem>
        <DocListItem><Link to="/docs/deployment" className="text-primary hover:underline">Deployment Guide</Link> – How to set up and deploy</DocListItem>
        <DocListItem><Link to="/docs/data-model" className="text-primary hover:underline">Data Model & APIs</Link> – Database schema and backend endpoints</DocListItem>
        <DocListItem><Link to="/docs/problem-setting" className="text-primary hover:underline">Problem Setting & Judging</Link> – How to create and run contests</DocListItem>
        <DocListItem><Link to="/docs/support" className="text-primary hover:underline">Support SOP</Link> – Common issues and solutions</DocListItem>
        <DocListItem><Link to="/docs/roadmap" className="text-primary hover:underline">Retrospective & Roadmap</Link> – Post-event analysis and future plans</DocListItem>
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
        <DocListItem>Review the <strong>Deployment Guide</strong> to see how everything is set up.</DocListItem>
        <DocListItem>Check the <strong>Support SOP</strong> for common issues.</DocListItem>
        <DocListItem>On contest day, follow the <strong>Event Runbook</strong>.</DocListItem>
      </DocList>

      <DocParagraph>
        <em className="text-sm opacity-70">Last updated: Jan 2026</em>
      </DocParagraph>
    </div>
  );
}
