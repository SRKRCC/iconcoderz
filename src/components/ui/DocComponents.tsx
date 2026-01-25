import type { ReactNode } from "react";

export function DocTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
      {children}
    </h1>
  );
}

export function DocSection({
  children,
  id,
}: {
  children: ReactNode;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className="text-2xl font-heading font-bold mt-10 mb-4 text-foreground border-b border-border pb-2 scroll-m-20"
    >
      {children}
    </h2>
  );
}

export function DocSubSection({
  children,
  id,
}: {
  children: ReactNode;
  id?: string;
}) {
  return (
    <h3
      id={id}
      className="text-xl font-heading font-semibold mt-8 mb-3 text-foreground scroll-m-20"
    >
      {children}
    </h3>
  );
}

export function DocParagraph({ children }: { children: ReactNode }) {
  return (
    <p className="text-base leading-7 text-muted-foreground mb-4">{children}</p>
  );
}

export function DocList({
  children,
  type = "ul",
}: {
  children: ReactNode;
  type?: "ul" | "ol";
}) {
  const Tag = type;
  return (
    <Tag
      className={`my-4 ml-6 space-y-2 text-muted-foreground ${type === "ul" ? "list-disc" : "list-decimal"}`}
    >
      {children}
    </Tag>
  );
}

export function DocListItem({ children }: { children: ReactNode }) {
  return <li className="pl-1">{children}</li>;
}

export function DocLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      className="text-primary font-medium hover:underline underline-offset-4 decoration-primary/50 hover:decoration-primary"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

export function DocCode({ children }: { children: ReactNode }) {
  return (
    <code className="relative rounded bg-primary/10 px-[0.3rem] py-[0.1rem] font-mono text-sm font-semibold text-primary">
      {children}
    </code>
  );
}

export function DocPre({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 rounded-lg border border-border bg-muted p-4 overflow-x-auto">
      <pre className="font-mono text-sm text-foreground">{children}</pre>
    </div>
  );
}

export function DocTable({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 w-full overflow-y-auto rounded-lg border border-border">
      <table className="w-full">{children}</table>
    </div>
  );
}

export function DocTh({ children }: { children: ReactNode }) {
  return (
    <th className="border-b border-border bg-muted px-4 py-2 text-left font-bold text-foreground">
      {children}
    </th>
  );
}

export function DocTd({ children }: { children: ReactNode }) {
  return (
    <td className="border-b border-border p-4 align-middle text-muted-foreground">
      {children}
    </td>
  );
}

export function DocCallout({
  children,
  type = "info",
}: {
  children: ReactNode;
  type?: "info" | "warning" | "tip";
}) {
  const styles = {
    info: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200",
    warning:
      "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200",
    tip: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200",
  };

  return (
    <div className={`my-6 rounded-lg border p-4 ${styles[type]}`}>
      <div className="text-sm [&>p]:last:mb-0">{children}</div>
    </div>
  );
}
