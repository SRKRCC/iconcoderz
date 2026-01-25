import { 
  DocTitle, 
  DocSection, 
  DocParagraph, 
  DocList, 
  DocListItem, 
  DocTable,
  DocTh, 
  DocTd,
  DocCode
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
          <tr><DocTd>registrationCode</DocTd><DocTd><DocCode>String</DocCode></DocTd><DocTd>Unique (IC2K26-XXXXXX)</DocTd></tr>
          <tr><DocTd>registrationNumber</DocTd><DocTd><DocCode>String</DocCode></DocTd><DocTd>Unique (10-digit college ID)</DocTd></tr>
          <tr><DocTd>email</DocTd><DocTd><DocCode>String</DocCode></DocTd><DocTd>Unique</DocTd></tr>
          <tr><DocTd>fullName</DocTd><DocTd><DocCode>String</DocCode></DocTd><DocTd>Participant Name</DocTd></tr>
          <tr><DocTd>phone</DocTd><DocTd><DocCode>String</DocCode></DocTd><DocTd>Unique</DocTd></tr>
          <tr><DocTd>gender</DocTd><DocTd><DocCode>Enum</DocCode></DocTd><DocTd>MALE, FEMALE, OTHER, PREFER_NOT_TO_SAY</DocTd></tr>
          <tr><DocTd>yearOfStudy</DocTd><DocTd><DocCode>Enum</DocCode></DocTd><DocTd>FIRST_YEAR to FOURTH_YEAR</DocTd></tr>
          <tr><DocTd>branch</DocTd><DocTd><DocCode>Enum</DocCode></DocTd><DocTd>CSE, CSBS, IT, ECE, EEE, etc.</DocTd></tr>
          <tr><DocTd>handles</DocTd><DocTd><DocCode>String?</DocCode></DocTd><DocTd>CodeChef, LeetCode, Codeforces (Separate fields)</DocTd></tr>
          <tr><DocTd>transactionId</DocTd><DocTd><DocCode>String</DocCode></DocTd><DocTd>Unique payment ref</DocTd></tr>
          <tr><DocTd>screenshotUrl</DocTd><DocTd><DocCode>String</DocCode></DocTd><DocTd>Cloudinary URL</DocTd></tr>
          <tr><DocTd>paymentStatus</DocTd><DocTd><DocCode>Enum</DocCode></DocTd><DocTd>PENDING, VERIFIED, REJECTED</DocTd></tr>
          <tr><DocTd>attended</DocTd><DocTd><DocCode>Boolean</DocCode></DocTd><DocTd>Default: false</DocTd></tr>
          <tr><DocTd>searchVector</DocTd><DocTd><DocCode>tsvector</DocCode></DocTd><DocTd>For full-text search</DocTd></tr>
        </tbody>
      </DocTable>

      <h3 className="text-xl font-heading font-semibold mt-8 mb-4">Admin Model</h3>
      <DocTable>
        <thead>
          <tr>
            <DocTh>Field</DocTh>
            <DocTh>Type</DocTh>
          </tr>
        </thead>
        <tbody>
          <tr><DocTd>id</DocTd><DocTd><DocCode>String</DocCode></DocTd></tr>
          <tr><DocTd>email</DocTd><DocTd><DocCode>String</DocCode></DocTd></tr>
          <tr><DocTd>name</DocTd><DocTd><DocCode>String</DocCode></DocTd></tr>
          <tr><DocTd>password</DocTd><DocTd><DocCode>String (Hash)</DocCode></DocTd></tr>
        </tbody>
      </DocTable>

      <h3 className="text-xl font-heading font-semibold mt-8 mb-4">AttendanceLog Model</h3>
      <DocTable>
        <thead>
          <tr>
            <DocTh>Field</DocTh>
            <DocTh>Notes</DocTh>
          </tr>
        </thead>
        <tbody>
          <tr><DocTd>registrationId</DocTd><DocTd>Link to User</DocTd></tr>
          <tr><DocTd>adminId</DocTd><DocTd>Who scanned it</DocTd></tr>
          <tr><DocTd>scannedAt</DocTd><DocTd>Timestamp</DocTd></tr>
        </tbody>
      </DocTable>
      
      <DocSection id="api-endpoints">API Endpoints</DocSection>
      <DocParagraph>Base URL: <DocCode>/api/v1</DocCode></DocParagraph>

      <h3 className="text-xl font-heading font-semibold mt-8 mb-4">Public</h3>
      <DocList>
        <DocListItem><strong>POST /register</strong> - Register new user.</DocListItem>
        <DocListItem><strong>GET /health</strong> - Health check.</DocListItem>
        <DocListItem><strong>GET /admin/login</strong> - Admin login (POST).</DocListItem>
      </DocList>

      <h3 className="text-xl font-heading font-semibold mt-8 mb-4">Admin (Protected)</h3>
      <DocList>
        <DocListItem><strong>GET /admin/users</strong> - List all users.</DocListItem>
        <DocListItem><strong>GET /admin/users/:id</strong> - Get single user details.</DocListItem>
        <DocListItem><strong>PATCH /admin/users/:id/payment-status</strong> - Verify/Reject payment.</DocListItem>
        <DocListItem><strong>GET /admin/dashboard/stats</strong> - Aggregate stats.</DocListItem>
      </DocList>

      <h3 className="text-xl font-heading font-semibold mt-8 mb-4">Attendance (Protected)</h3>
      <DocList>
        <DocListItem><strong>POST /attendance/scan</strong> - Scan QR code.</DocListItem>
        <DocListItem><strong>POST /attendance/manual</strong> - Manual entry.</DocListItem>
        <DocListItem><strong>GET /attendance/stats</strong> - Attendance stats.</DocListItem>
        <DocListItem><strong>GET /attendance/recent</strong> - Recent logs.</DocListItem>
        <DocListItem><strong>GET /attendance/list</strong> - Full list.</DocListItem>
      </DocList>

      <DocParagraph>
        <em className="text-sm opacity-70">Last updated: Jan 2026</em>
      </DocParagraph>
    </div>
  );
}
