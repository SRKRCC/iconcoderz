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

export default function DocGettingStarted() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <DocTitle>Getting Started</DocTitle>
      
      <DocParagraph>
        Welcome to the team! Follow this guide to set up your local development environment and start contributing.
      </DocParagraph>

      <div className="my-8 border-t border-border" />

      <DocSection id="prerequisites">1. Prerequisites</DocSection>
      <DocList>
        <DocListItem><strong>Node.js 22+:</strong> Required for backend and frontend.</DocListItem>
        <DocListItem><strong>pnpm:</strong> Our package manager. (<DocCode>npm install -g pnpm</DocCode>)</DocListItem>
        <DocListItem><strong>Git:</strong> For version control.</DocListItem>
      </DocList>

      <DocSection id="installation">2. Installation</DocSection>
      <DocSubSection id="clone">Clone the Repositories</DocSubSection>
      <DocParagraph>
        The Client and Server are completely separate repositories. You will need to clone both.
      </DocParagraph>
      <DocPre>
{`# 1. Clone the Server
git clone https://github.com/SRKRCC/iconcoderz-backend.git
cd iconcoderz-backend

# 2. Clone the Client (In a separate terminal/folder)
git clone https://github.com/SRKRCC/iconcoderz.git
cd iconcoderz-frontend`}
      </DocPre>

      <DocSubSection id="env">Environment Setup</DocSubSection>
      <DocParagraph>
        We do <strong>not</strong> commit secrets to Git. You need to create a <DocCode>.env</DocCode> file based on the example.
      </DocParagraph>
      <DocPre>
{`# In the server repository
cp .env.example .env`}
      </DocPre>
      <DocCallout type="warning">
        <strong>Database Connection:</strong> You need a valid PostgreSQL connection string for <DocCode>DATABASE_URL</DocCode>.
        <br/>
        <ul>
          <li><strong>Option A (Recommended):</strong> Create a free project on <strong>Neon</strong> or <strong>Supabase</strong> and get the connection string.</li>
          <li><strong>Option B:</strong> Install PostgreSQL locally and use valid credentials.</li>
        </ul>
      </DocCallout>

      <DocSubSection id="dependencies">Install Dependencies</DocSubSection>
      <DocParagraph>
        We use a <DocCode>Makefile</DocCode> to make life easier.
      </DocParagraph>
      <DocPre>
{`# In Server Repo
make install

# In Client Repo
pnpm install`}
      </DocPre>

      <DocSection id="running-locally">3. Running Locally</DocSection>
      
      <DocSubSection id="database">Sync the Database</DocSubSection>
      <DocParagraph>
        Once your <DocCode>.env</DocCode> in the <strong>Server</strong> repo has the correct <DocCode>DATABASE_URL</DocCode>, push the schema:
      </DocParagraph>
      <DocPre>
{`# In Server Repo
make prisma-push`}
      </DocPre>

      <DocSubSection id="start-server">Start the Server</DocSubSection>
      <DocPre>
{`# In Server Repo
make dev`}
      </DocPre>
      <DocParagraph>Server will start at <DocCode>http://localhost:3000</DocCode>.</DocParagraph>

      <DocSubSection id="start-client">Start the Frontend</DocSubSection>
      <DocPre>
{`# In Client Repo
pnpm run dev`}
      </DocPre>
      <DocParagraph>Frontend will start at <DocCode>http://localhost:5173</DocCode>.</DocParagraph>

      <DocSection id="workflow">4. Development Workflow</DocSection>
      <DocCallout type="tip">
        <strong>Database Changes:</strong><br/>
        When developing locally, use <DocCode>make prisma-push</DocCode> to update your DB schema quickly. Only run <DocCode>pnpm prisma migrate dev</DocCode> when you are ready to commit a migration.
      </DocCallout>

      <DocParagraph>
        <em className="text-sm opacity-70">Last updated: Jan 2026</em>
      </DocParagraph>
    </div>
  );
}
