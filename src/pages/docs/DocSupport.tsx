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
} from "../../components/ui/DocComponents";

export default function DocSupport() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <DocTitle>Support SOP</DocTitle>

      <DocParagraph>
        Standard Operating Procedures for handling participant queries and
        issues.
      </DocParagraph>

      <div className="my-8 border-t border-border" />

      <DocSection id="support-channels">Support Channels</DocSection>
      <DocTable>
        <thead>
          <tr>
            <DocTh>Channel</DocTh>
            <DocTh>Primary Use</DocTh>
            <DocTh>Response Time</DocTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DocTd>Help Desk (Physical)</DocTd>
            <DocTd>On-spot login/network issues</DocTd>
            <DocTd>Immediate</DocTd>
          </tr>
          <tr>
            <DocTd>WhatsApp Group</DocTd>
            <DocTd>General announcements, quick Q&A</DocTd>
            <DocTd>5-10 mins</DocTd>
          </tr>
          <tr>
            <DocTd>Email</DocTd>
            <DocTd>Post-contest disputes, certificate errors</DocTd>
            <DocTd>24 hours</DocTd>
          </tr>
        </tbody>
      </DocTable>

      <DocSection id="common-scenarios">Common Scenarios & Scripts</DocSection>

      <DocSubSection id="login-fail">
        Scenario 1: "I cannot login to HackerRank"
      </DocSubSection>
      <DocList>
        <DocListItem>
          <strong>Check 1:</strong> Are they using the email they registered
          with?{" "}
        </DocListItem>
        <DocListItem>
          <strong>Check 2:</strong> Did they create a HackerRank account
          beforehand?
        </DocListItem>
        <DocListItem>
          <strong>Action:</strong> Send them the direct contest URL and ask them
          to login/signup. Add their username manually to the allowed list if
          restricted.
        </DocListItem>
      </DocList>

      <DocSubSection id="code-error">
        Scenario 2: "My code works in local IDE but fails here"
      </DocSubSection>
      <DocList>
        <DocListItem>
          <strong>Explanation:</strong> "HackerRank uses standard input/output
          (STDIN/STDOUT). Make sure you aren't printing debug statements like
          'Enter number:'."
        </DocListItem>
        <DocListItem>
          <strong>Action:</strong> Show them a sample 'Hello World' for the
          standard IO format.
        </DocListItem>
      </DocList>

      <DocSubSection id="network-issue">
        Scenario 3: "Internet disconnected during submission"
      </DocSubSection>
      <DocList>
        <DocListItem>
          <strong>Action:</strong> HackerRank auto-saves (mostly). Ask them to
          refresh once internet is back. If time is lost significantly (&gt;10
          mins), escalate to Event Lead.
        </DocListItem>
      </DocList>

      <DocSection id="dispute-resolution">Dispute Resolution Policy</DocSection>
      <DocList>
        <DocListItem>
          <strong>Zero Tolerance:</strong> Abusive behavior towards volunteers
          results in immediate disqualification.
        </DocListItem>
        <DocListItem>
          <strong>Plagiarism:</strong> If a student claims they didn't copy but
          were flagged, reviewing the timeline of code edits on HackerRank
          usually reveals the truth (paste vs type).
        </DocListItem>
      </DocList>

      <DocParagraph>
        <em className="text-sm opacity-70">Last updated: Jan 2026</em>
      </DocParagraph>
    </div>
  );
}
