import {
  DocTitle,
  DocSection,
  DocSubSection,
  DocParagraph,
  DocList,
  DocListItem,
  DocCode,
  DocPre,
  DocCallout,
  DocTable,
  DocTh,
  DocTd,
} from "../../components/ui/DocComponents";

export default function DocTesting() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <DocTitle>Testing & Makefile Guide</DocTitle>

      <DocParagraph>
        This guide covers how to run tests, understand the CI pipeline
        integration, and use the Makefile for development efficiency.
      </DocParagraph>

      <div className="my-8 border-t border-border" />

      <DocSection id="testing">Testing Strategy</DocSection>
      <DocParagraph>
        We use <strong>Vitest</strong> for backend testing. It provides a fast,
        Jest-compatible testing environment.
      </DocParagraph>

      <DocSubSection id="unit-tests">Unit Tests</DocSubSection>
      <DocList>
        <DocListItem>
          <strong>Location:</strong> <DocCode>server/tests/unit</DocCode>
        </DocListItem>
        <DocListItem>
          <strong>Purpose:</strong> Test individual functions and services in
          isolation.
        </DocListItem>
        <DocListItem>
          <strong>Tooling:</strong> Uses <DocCode>vitest-mock-extended</DocCode>{" "}
          to mock Prisma calls.
        </DocListItem>
      </DocList>

      <DocSubSection id="integration-tests">Integration Tests</DocSubSection>
      <DocList>
        <DocListItem>
          <strong>Location:</strong> <DocCode>server/tests/integration</DocCode>
        </DocListItem>
        <DocListItem>
          <strong>Purpose:</strong> Test API endpoints and database
          interactions.
        </DocListItem>
        <DocListItem>
          <strong>Note:</strong> These run against a test database (Dockerized
          Postgres recommended).
        </DocListItem>
      </DocList>

      <DocSubSection id="running-tests">Running Tests</DocSubSection>
      <DocPre>
        {`# Run all tests
pnpm test

# Run in watch mode (for development)
pnpm test:watch`}
      </DocPre>

      <DocSection id="ci-integration">CI Integration</DocSection>
      <DocParagraph>
        Tests are automatically run in the GitHub Actions pipeline (
        <DocCode>deploy-prod.yml</DocCode>) before any code is deployed.
      </DocParagraph>
      <DocCallout type="info">
        <strong>Fail Fast:</strong> If any test fails, the deployment is
        cancelled immediately. This prevents broken code from reaching
        production.
      </DocCallout>

      <DocSection id="makefile">Makefile Reference</DocSection>
      <DocParagraph>
        The <DocCode>Makefile</DocCode> in the server directory provides
        shortcuts for common development and DevOps tasks.
      </DocParagraph>

      <DocTable>
        <thead>
          <tr>
            <DocTh>Command</DocTh>
            <DocTh>Description</DocTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DocTd>
              <DocCode>make install</DocCode>
            </DocTd>
            <DocTd>Installs all dependencies (pnpm install)</DocTd>
          </tr>
          <tr>
            <DocTd>
              <DocCode>make dev</DocCode>
            </DocTd>
            <DocTd>Starts the development server (tsx watch)</DocTd>
          </tr>
          <tr>
            <DocTd>
              <DocCode>make build</DocCode>
            </DocTd>
            <DocTd>Builds the TypeScript project to /dist</DocTd>
          </tr>
          <tr>
            <DocTd>
              <DocCode>make prisma-generate</DocCode>
            </DocTd>
            <DocTd>
              Regenerates the Prisma Client (run after schema changes)
            </DocTd>
          </tr>
          <tr>
            <DocTd>
              <DocCode>make prisma-push</DocCode>
            </DocTd>
            <DocTd>Pushes schema changes to the DB (dev only)</DocTd>
          </tr>
          <tr>
            <DocTd>
              <DocCode>make tf-init</DocCode>
            </DocTd>
            <DocTd>Initializes Terraform in the prod environment</DocTd>
          </tr>
          <tr>
            <DocTd>
              <DocCode>make tf-plan</DocCode>
            </DocTd>
            <DocTd>Runs terraform plan for production</DocTd>
          </tr>
          <tr>
            <DocTd>
              <DocCode>make tf-apply</DocCode>
            </DocTd>
            <DocTd>Applies terraform changes (Use with caution!)</DocTd>
          </tr>
        </tbody>
      </DocTable>

      <DocParagraph>
        <em className="text-sm opacity-70">Last updated: Jan 2026</em>
      </DocParagraph>
    </div>
  );
}
