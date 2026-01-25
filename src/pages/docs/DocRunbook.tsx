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
  DocCallout,
} from "../../components/ui/DocComponents";

export default function DocRunbook() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <DocTitle>Event Runbook – Iconcoderz-2k26</DocTitle>

      <DocParagraph>
        Detailed operational guide for organizing and running the contest on Feb
        23, 2026.
      </DocParagraph>

      <div className="my-8 border-t border-border" />

      <DocSection id="timeline">Timeline & Responsibilities</DocSection>

      <DocSubSection id="pre-event">Pre-Event (T-7 to T-1 Days)</DocSubSection>
      <DocTable>
        <thead>
          <tr>
            <DocTh>Date</DocTh>
            <DocTh>Task</DocTh>
            <DocTh>Owner</DocTh>
            <DocTh>Status</DocTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DocTd>Feb 16</DocTd>
            <DocTd>Finalize problem set on HackerRank</DocTd>
            <DocTd>Content Lead</DocTd>
            <DocTd>⬜</DocTd>
          </tr>
          <tr>
            <DocTd>Feb 18</DocTd>
            <DocTd>Send reminder email to all registered participants</DocTd>
            <DocTd>Comms</DocTd>
            <DocTd>⬜</DocTd>
          </tr>
          <tr>
            <DocTd>Feb 20</DocTd>
            <DocTd>
              Test website, APIs, email system, and HackerRank contest
            </DocTd>
            <DocTd>Tech Lead</DocTd>
            <DocTd>⬜</DocTd>
          </tr>
          <tr>
            <DocTd>Feb 21</DocTd>
            <DocTd>Prepare support team & checklists</DocTd>
            <DocTd>Event Lead</DocTd>
            <DocTd>⬜</DocTd>
          </tr>
          <tr>
            <DocTd>Feb 22</DocTd>
            <DocTd>Final check of all systems, close registration</DocTd>
            <DocTd>Tech Lead</DocTd>
            <DocTd>⬜</DocTd>
          </tr>
        </tbody>
      </DocTable>

      <DocSubSection id="contest-day">Contest Day (Feb 23)</DocSubSection>

      <h4 className="font-bold mt-4 mb-2">Morning (Before 1:30 PM)</h4>
      <DocList>
        <DocListItem>
          <strong>T-1 hour (12:30 PM)</strong>
          <DocList>
            <DocListItem>
              Ensure HackerRank contest is live and submissions are working.
            </DocListItem>
            <DocListItem>Verify leaderboard backend is running.</DocListItem>
            <DocListItem>Test a sample submission end-to-end.</DocListItem>
            <DocListItem>Support team online and ready.</DocListItem>
          </DocList>
        </DocListItem>
        <DocListItem>
          <strong>T-30 min (1:00 PM)</strong>
          <DocList>
            <DocListItem>
              Send final "contest starting soon" announcement via email and
              WhatsApp.
            </DocListItem>
            <DocListItem>Post on Instagram.</DocListItem>
          </DocList>
        </DocListItem>
      </DocList>

      <h4 className="font-bold mt-4 mb-2">Contest Start (1:30 PM)</h4>
      <DocList>
        <DocListItem>Event Lead starts the contest on HackerRank.</DocListItem>
        <DocListItem>Announce via all channels: "Contest is LIVE!"</DocListItem>
        <DocListItem>
          Monitor:
          <DocList>
            <DocListItem>Submission queue (no bottlenecks).</DocListItem>
            <DocListItem>Server logs for errors.</DocListItem>
            <DocListItem>Support chat for common issues.</DocListItem>
          </DocList>
        </DocListItem>
      </DocList>

      <h4 className="font-bold mt-4 mb-2">
        During Contest (1:30 PM – 5:30 PM)
      </h4>
      <DocList>
        <DocListItem>
          <strong>Every 30 minutes:</strong>
          <DocList>
            <DocListItem>Spot-check leaderboard.</DocListItem>
            <DocListItem>Verify submissions are being judged.</DocListItem>
          </DocList>
        </DocListItem>
        <DocListItem>
          <strong>On-demand:</strong>
          <DocList>
            <DocListItem>
              Answer participant questions via WhatsApp/email.
            </DocListItem>
            <DocListItem>Resolve payment/registration issues.</DocListItem>
          </DocList>
        </DocListItem>
      </DocList>

      <h4 className="font-bold mt-4 mb-2">Contest End (5:30 PM)</h4>
      <DocList>
        <DocListItem>
          Event Lead ends contest on HackerRank (freeze submissions).
        </DocListItem>
        <DocListItem>
          Announce: "Contest ended. Results coming soon."
        </DocListItem>
        <DocListItem>Begin exporting results.</DocListItem>
      </DocList>

      <DocSubSection id="post-contest">
        Post-Contest (24–48 Hours)
      </DocSubSection>
      <DocTable>
        <thead>
          <tr>
            <DocTh>Task</DocTh>
            <DocTh>Owner</DocTh>
            <DocTh>Timeline</DocTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DocTd>Export results from HackerRank (CSV)</DocTd>
            <DocTd>Tech Lead</DocTd>
            <DocTd>Within 2 hours</DocTd>
          </tr>
          <tr>
            <DocTd>Verify rankings & top 10</DocTd>
            <DocTd>Content Lead</DocTd>
            <DocTd>Within 4 hours</DocTd>
          </tr>
          <tr>
            <DocTd>Upload leaderboard to website</DocTd>
            <DocTd>Tech Lead</DocTd>
            <DocTd>Feb 24 AM</DocTd>
          </tr>
          <tr>
            <DocTd>Announce winners & send certificates</DocTd>
            <DocTd>Comms</DocTd>
            <DocTd>Feb 24 PM</DocTd>
          </tr>
          <tr>
            <DocTd>Thank-you emails to all participants</DocTd>
            <DocTd>Comms</DocTd>
            <DocTd>Feb 25</DocTd>
          </tr>
        </tbody>
      </DocTable>

      <DocSection id="support-checklist">On-Desk Support Checklist</DocSection>
      <DocCallout type="tip">
        <strong>Support team has:</strong>
        <DocList>
          <DocListItem>
            ✅ List of all registered participants (name, email, regNo).
          </DocListItem>
          <DocListItem>✅ FAQ document (pre-written answers).</DocListItem>
          <DocListItem>
            ✅ Contact numbers for tech lead & event lead.
          </DocListItem>
          <DocListItem>✅ Screenshot of HackerRank contest page.</DocListItem>
        </DocList>
      </DocCallout>

      <DocSubSection id="common-issues">
        Common issues & quick fixes
      </DocSubSection>
      <DocTable>
        <thead>
          <tr>
            <DocTh>Issue</DocTh>
            <DocTh>Solution</DocTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DocTd>"I can't log into the contest"</DocTd>
            <DocTd>
              Verify email matches registration; check HackerRank account
              creation
            </DocTd>
          </tr>
          <tr>
            <DocTd>"I registered but don't see contest link"</DocTd>
            <DocTd>Resend email with contest URL</DocTd>
          </tr>
          <tr>
            <DocTd>"Payment was rejected"</DocTd>
            <DocTd>Contact tech lead; check Cloudinary/payment logs</DocTd>
          </tr>
          <tr>
            <DocTd>"I submitted but it shows Queued"</DocTd>
            <DocTd>Normal; judging takes a few seconds. Wait 1–2 min.</DocTd>
          </tr>
          <tr>
            <DocTd>"My solution is wrong but output looks correct"</DocTd>
            <DocTd>
              Likely trailing space or newline issue. Re-check sample output
              format
            </DocTd>
          </tr>
        </tbody>
      </DocTable>

      <DocSection id="communication">Communication Channels</DocSection>
      <DocList>
        <DocListItem>
          <strong>WhatsApp:</strong> Announcements & participant Q&A.
        </DocListItem>
        <DocListItem>
          <strong>Email:</strong> Formal notifications (start, end, results).
        </DocListItem>
        <DocListItem>
          <strong>Instagram:</strong> Real-time updates & highlights.
        </DocListItem>
        <DocListItem>
          <strong>Website:</strong> Leaderboard, results, certificates.
        </DocListItem>
      </DocList>

      <DocSection id="escalation">Escalation</DocSection>
      <DocParagraph>If an issue cannot be resolved by support:</DocParagraph>
      <DocList type="ol">
        <DocListItem>
          Contact <strong>Tech Lead</strong> (code/platform issues).
        </DocListItem>
        <DocListItem>
          Contact <strong>Event Lead</strong> (policy/rule clarifications).
        </DocListItem>
        <DocListItem>
          Contact <strong>Faculty Advisor</strong> (disputes, severe issues).
        </DocListItem>
      </DocList>

      <DocSection id="debrief">Post-Event Debrief</DocSection>
      <DocParagraph>
        After results are announced, schedule a team meeting to discuss:
      </DocParagraph>
      <DocList>
        <DocListItem>✅ What went well?</DocListItem>
        <DocListItem>⚠️ Pain points?</DocListItem>
        <DocListItem>💡 Ideas for next year?</DocListItem>
      </DocList>

      <DocParagraph>
        <em className="text-sm opacity-70">Last updated: Jan 2026</em>
      </DocParagraph>
    </div>
  );
}
