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

export default function DocProblemSetting() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <DocTitle>Problem Setting & Judging</DocTitle>
      
      <DocParagraph>
        Guide for creating problems, test cases, and managing the contest on HackerRank.
      </DocParagraph>

      <div className="my-8 border-t border-border" />

      <DocSection id="problem-guidelines">Problem Guidelines</DocSection>
      <DocCallout type="warning">
        <strong>Confidentiality:</strong> Do not share problem statements outside the content team before the contest.
      </DocCallout>
      
      <DocSubSection id="difficulty-distribution">Difficulty Distribution</DocSubSection>
      <DocTable>
        <thead>
          <tr>
            <DocTh>Level</DocTh>
            <DocTh>Count</DocTh>
            <DocTh>Topics</DocTh>
            <DocTh>Points</DocTh>
          </tr>
        </thead>
        <tbody>
          <tr><DocTd>Easy</DocTd><DocTd>2</DocTd><DocTd>Loops, Arrays, Strings</DocTd><DocTd>100</DocTd></tr>
          <tr><DocTd>Medium</DocTd><DocTd>2</DocTd><DocTd>HashMaps, Sorting, Recursion</DocTd><DocTd>200</DocTd></tr>
          <tr><DocTd>Hard</DocTd><DocTd>1</DocTd><DocTd>DP, Graphs, Trees</DocTd><DocTd>500</DocTd></tr>
        </tbody>
      </DocTable>

      <DocSection id="creating-problems">Creating Problems on HackerRank</DocSection>
      <DocList type="ol">
         <DocListItem>Go to <strong>Administration &gt; Manage Contests &gt; Iconcoderz-2k26 &gt; Challenges</strong>.</DocListItem>
         <DocListItem>Click <strong>Create Challenge</strong>.</DocListItem>
         <DocListItem><strong>Name:</strong> Unique, catchy title.</DocListItem>
         <DocListItem><strong>Description:</strong> 
            <DocList>
               <DocListItem>Background story (optional but nice).</DocListItem>
               <DocListItem>Input Format (Valid constraints!).</DocListItem>
               <DocListItem>Output Format.</DocListItem>
               <DocListItem>Sample Input/Output (Explain the case).</DocListItem>
            </DocList>
         </DocListItem>
         <DocListItem><strong>Constraints:</strong> Be precise (e.g., <DocCode>1 &lt;= N &lt;= 10^5</DocCode>). This determines the time complexity required.</DocListItem>
      </DocList>

      <DocSection id="test-cases">Test Cases</DocSection>
      <DocParagraph>
        Robust test cases are critical. A problem with weak test cases ruins the competitive integrity.
      </DocParagraph>
      <DocList>
         <DocListItem><strong>Sample Cases:</strong> 2-3 public cases shown to user.</DocListItem>
         <DocListItem><strong>Edge Cases:</strong> Min/Max values, empty inputs, negative numbers.</DocListItem>
         <DocListItem><strong>Load Testing:</strong> Max constraints to verify time limit (e.g., arrays of size 10^5).</DocListItem>
         <DocListItem><strong>Corner Cases:</strong> 0, 1, specific logic breakers.</DocListItem>
      </DocList>
      
      <DocCallout type="tip">
         Use a script to generate large test files. Do not type 10,000 numbers manually.
      </DocCallout>

      <DocSection id="judging">Judging & Scoring</DocSection>
      <DocList>
         <DocListItem><strong>Platform:</strong> HackerRank (Automated).</DocListItem>
         <DocListItem><strong>Scoring:</strong> Binary (Pass/Fail) or Partial?</DocListItem>
         <DocListItem><strong>Partial Scoring:</strong> Enable if the problem is Hard. Give points for passing easy sub-tasks.</DocListItem>
         <DocListItem><strong>Penalty:</strong> Standard ACM style (time + penalty per wrong submission).</DocListItem>
      </DocList>

      <DocSection id="plagiarism">Plagiarism Detection</DocSection>
      <DocParagraph>
        HackerRank has a built-in MOSS-like tool.
      </DocParagraph>
      <DocList type="ol">
         <DocListItem>After contest ends, go to <strong>Statistics &gt; Plagiarism</strong>.</DocListItem>
         <DocListItem>Set threshold (usually &gt;80% similarity).</DocListItem>
         <DocListItem>Review flagged pairs manually.</DocListItem>
         <DocListItem><strong>Action:</strong> Disqualify both participants if copying is confirmed.</DocListItem>
      </DocList>

      <DocParagraph>
        <em className="text-sm opacity-70">Last updated: Jan 2026</em>
      </DocParagraph>
    </div>
  );
}
