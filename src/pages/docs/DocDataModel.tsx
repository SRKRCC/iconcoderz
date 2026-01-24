import { 
  DocTitle, 
  DocSection, 
  DocParagraph, 
  DocList, 
  DocListItem, 
  DocTable,
  DocTh, 
  DocTd,
  DocCode,
  DocCallout
} from '../../components/ui/DocComponents';

export default function DocDataModel() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <DocTitle>Data Model & APIs</DocTitle>
      
      <DocParagraph>
        This document outlines the database schema (Prisma) and the available API endpoints.
      </DocParagraph>

      <div className="my-8 border-t border-border" />

      <DocSection id="database-schema">Database Schema</DocSection>
      <DocParagraph>
        We use <strong>Prisma ORM</strong> with PostgreSQL. The schema is defined in <DocCode>server/prisma/schema.prisma</DocCode>.
      </DocParagraph>

      <h3 className="text-xl font-heading font-semibold mt-8 mb-4">User Model (Participants)</h3>
      <DocTable>
        <thead>
          <tr>
            <DocTh>Field</DocTh>
            <DocTh>Type</DocTh>
            <DocTh>Notes</DocTh>
          </tr>
        </thead>
        <tbody>
          <tr><DocTd>id</DocTd><DocTd><DocCode>String (CUID)</DocCode></DocTd><DocTd>Primary Key</DocTd></tr>
          <tr><DocTd>email</DocTd><DocTd><DocCode>String</DocCode></DocTd><DocTd>Unique</DocTd></tr>
          <tr><DocTd>fullName</DocTd><DocTd><DocCode>String</DocCode></DocTd><DocTd>Full name of the Participant</DocTd></tr>
          <tr><DocTd>regNo</DocTd><DocTd><DocCode>String</DocCode></DocTd><DocTd>Unique (College Roll)</DocTd></tr>
          <tr><DocTd>phone</DocTd><DocTd><DocCode>String</DocCode></DocTd><DocTd>Phone Number of the Participant</DocTd></tr>
          <tr><DocTd>gender</DocTd><DocTd><DocCode>Enum</DocCode></DocTd><DocTd>MALE, FEMALE, PREFER_NOT_TO_SAY</DocTd></tr>
          <tr><DocTd>year</DocTd><DocTd><DocCode>Enum</DocCode></DocTd><DocTd>FIRST_YEAR, SECOND_YEAR, THIRD_YEAR, FOURTH_YEAR</DocTd></tr>
          <tr><DocTd>branch</DocTd><DocTd><DocCode>Enum</DocCode></DocTd><DocTd>CSE, IT, ECE, EEE, MECH, CIVIL, AIDS, AIML, CSBS</DocTd></tr>
          <tr><DocTd>section</DocTd><DocTd><DocCode>String?</DocCode></DocTd><DocTd>Optional</DocTd></tr>
          <tr><DocTd>hackerrankHandle</DocTd><DocTd><DocCode>String</DocCode></DocTd><DocTd>For leaderboard tracking</DocTd></tr>
          <tr><DocTd>transactionId</DocTd><DocTd><DocCode>String</DocCode></DocTd><DocTd>Unique payment ref</DocTd></tr>
          <tr><DocTd>screenshotUrl</DocTd><DocTd><DocCode>String</DocCode></DocTd><DocTd>Cloudinary URL</DocTd></tr>
          <tr><DocTd>paymentStatus</DocTd><DocTd><DocCode>Enum</DocCode></DocTd><DocTd>PENDING, VERIFIED, REJECTED</DocTd></tr>
          <tr><DocTd>createdAt</DocTd><DocTd><DocCode>DateTime</DocCode></DocTd><DocTd>Auto-generated</DocTd></tr>
        </tbody>
      </DocTable>

      <h3 className="text-xl font-heading font-semibold mt-8 mb-4">Admin Model</h3>
      <DocTable>
        <thead>
          <tr>
            <DocTh>Field</DocTh>
            <DocTh>Type</DocTh>
            <DocTh>Notes</DocTh>
          </tr>
        </thead>
        <tbody>
          <tr><DocTd>id</DocTd><DocTd><DocCode>String (CUID)</DocCode></DocTd><DocTd>Primary Key</DocTd></tr>
          <tr><DocTd>username</DocTd><DocTd><DocCode>String</DocCode></DocTd><DocTd>Unique</DocTd></tr>
          <tr><DocTd>passwordHash</DocTd><DocTd><DocCode>String</DocCode></DocTd><DocTd>Bcrypt hash</DocTd></tr>
          <tr><DocTd>role</DocTd><DocTd><DocCode>String</DocCode></DocTd><DocTd>Default: "SUPERADMIN"</DocTd></tr>
        </tbody>
      </DocTable>
      
      <DocSection id="api-endpoints">API Endpoints</DocSection>
      <DocParagraph>Base URL: <DocCode>/api/v1</DocCode></DocParagraph>

      <h3 className="text-xl font-heading font-semibold mt-8 mb-4">Public</h3>
      <DocList>
        <DocListItem>
           <strong>POST /register</strong>
           <br/><span className="text-sm opacity-80">Submit registration details + payment info.</span>
        </DocListItem>
        <DocListItem>
           <strong>GET /health</strong>
           <br/><span className="text-sm opacity-80">Check system status (DB connection, etc).</span>
        </DocListItem>
      </DocList>

      <h3 className="text-xl font-heading font-semibold mt-8 mb-4">Admin (Protected)</h3>
      <DocCallout type="warning">Requires <DocCode>Authorization: Bearer &lt;token&gt;</DocCode> header.</DocCallout>
      
      <DocList>
        <DocListItem>
           <strong>POST /admin/login</strong>
           <br/><span className="text-sm opacity-80">Login to get JWT access token.</span>
        </DocListItem>
        <DocListItem>
           <strong>GET /admin/registrations</strong>
           <br/><span className="text-sm opacity-80">List all registrations with filtering/pagination.</span>
        </DocListItem>
        <DocListItem>
           <strong>GET /admin/stats</strong>
           <br/><span className="text-sm opacity-80">Get aggregate statistics (total count, payment breakdown).</span>
        </DocListItem>
        <DocListItem>
           <strong>PATCH /admin/registrations/:id/status</strong>
           <br/><span className="text-sm opacity-80">Update payment status (VERIFIED/REJECTED). Triggers email.</span>
        </DocListItem>
      </DocList>

      <DocParagraph>
        <em className="text-sm opacity-70">Last updated: Jan 2026</em>
      </DocParagraph>
    </div>
  );
}
