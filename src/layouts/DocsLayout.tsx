import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function DocsLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isSidebarOpen) setIsSidebarOpen(false);
  }, [location.pathname]);

  const docLinks = [
    { title: "Introduction", slug: "" },
    { title: "Event Runbook", slug: "runbook" },
    { title: "System Architecture", slug: "architecture" },
    { title: "Terraform Setup", slug: "terraform" },
    { title: "Deployment Guide", slug: "deployment" },
    { title: "Data Model & APIs", slug: "data-model" },
    { title: "Problem Setting", slug: "problem-setting" },
    { title: "Support SOP", slug: "support" },
    { title: "Retrospective & Roadmap", slug: "roadmap" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <Navbar />
      <div className="flex flex-1 relative">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-primary text-primary-foreground rounded-full shadow-lg"
          aria-label="Toggle Docs Menu"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar */}
        <aside 
          className={`
            fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-card border-r border-border overflow-y-auto
            transition-transform duration-300 ease-in-out z-40
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold mb-6 text-foreground">
              <BookOpen className="text-primary" size={24} />
              <span>Documentation</span>
            </h2>
            
            <nav className="space-y-1">
              {docLinks.map((doc) => (
                <NavLink
                  key={doc.slug}
                  to={doc.slug === '' ? '/docs' : `/docs/${doc.slug}`}
                  end={doc.slug === ''}
                  className={({ isActive }) => `
                    flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                >
                  <ChevronRight size={14} className="opacity-50" />
                  {doc.title}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 lg:px-8 lg:py-12 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
