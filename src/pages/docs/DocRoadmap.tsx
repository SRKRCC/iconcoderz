import { 
  DocTitle, 
  DocSection, 
  DocSubSection,
  DocParagraph, 
  DocList, 
  DocListItem
} from '../../components/ui/DocComponents';

import { DocCallout } from '../../components/ui/DocComponents';

export default function DocRoadmap() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <DocTitle>Retrospective & Roadmap</DocTitle>
      
      <DocParagraph>
        Documentation of lessons learned from previous events and the roadmap for Iconcoderz-2k27.
      </DocParagraph>

      <div className="my-8 border-t border-border" />

      <DocSection id="retrospective-2k25">Retrospective: Iconcoderz-2k25</DocSection>
      
      <DocSubSection id="what-went-well">What Went Well</DocSubSection>
      <DocList>
         <DocListItem>✅ <strong>Registration System:</strong> Custom portal handled 400+ users without crashing.</DocListItem>
         <DocListItem>✅ <strong>Marketing:</strong> Class-to-class campaigning resulted in record First Year participation.</DocListItem>
      </DocList>

      <DocSubSection id="challenges">Challenges / Pain Points</DocSubSection>
      <DocList>
         <DocListItem>⚠️ <strong>Wi-Fi Issues:</strong> College Wi-Fi was unstable in Lab 3. (Fix: Get IT dept on standby).</DocListItem>
         <DocListItem>⚠️ <strong>Judging Delay:</strong> HackerRank queue got stuck for 10 mins. (Fix: Split into 2 contests if participants &gt; 500).</DocListItem>
         <DocListItem>⚠️ <strong>Certificate Distribution:</strong> Manual name entry caused typos. (Fix: Automate generation from DB).</DocListItem>
      </DocList>

      <DocSection id="roadmap-2k26">Roadmap for 2k26 (Current)</DocSection>
      <DocList>
         <DocListItem>🚀 <strong>Automated Certificates:</strong> Generate PDFs with QR validation.</DocListItem>
         <DocListItem>🚀 <strong>Real-time Leaderboard:</strong> Project leaderboard on main screen during event.</DocListItem>
         <DocListItem>🚀 <strong>Alumni Problems:</strong> Get 2 problems set by ex-winners working at FAANG.</DocListItem>
      </DocList>

      <DocSection id="wishlist-2k27">Wishlist for 2k27</DocSection>
      <DocCallout type="info">
         <strong>Vision:</strong> Move away from HackerRank to hosted Judge0 instance for full control.
      </DocCallout>
      <DocList>
         <DocListItem>Build internal judging platform (judge0 + react-code-mirror).</DocListItem>
         <DocListItem>Team participation support (groups of 2-3).</DocListItem>
         <DocListItem>Inter-college access.</DocListItem>
      </DocList>

      <DocParagraph>
        <em className="text-sm opacity-70">Last updated: Jan 2026</em>
      </DocParagraph>
    </div>
  );
}
