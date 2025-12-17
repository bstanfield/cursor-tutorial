"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, ReactNode } from "react";
import {
  Zap,
  Pencil,
  Terminal,
  Paperclip,
  BookOpen,
  Cloud,
  Layers,
  GitBranch,
  MessageSquare,
  Palette,
  FileEdit,
  LayoutGrid,
  Sparkles,
  Smartphone,
  Puzzle,
  Target,
  Search,
  ClipboardList,
  HelpCircle,
  Building2,
  BarChart3,
  BookText,
  Lightbulb,
  FileText,
  Code2,
  Compass,
  Pin,
  RefreshCw,
  X,
  Check,
  RotateCcw,
  Loader2,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const fadeInOut = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const developerTips: {
  id: number;
  title: string;
  shortcut: string;
  description: string;
  icon: ReactNode;
}[] = [
  {
    id: 1,
    title: "Tab Autocomplete",
    shortcut: "Tab",
    description:
      "Accept AI-powered code suggestions as you type. Cursor predicts what you want to write next based on context.",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "Inline Edit",
    shortcut: "⌘ + K",
    description:
      "Select code and press this shortcut to edit it inline. Perfect for quick refactors, adding types, or fixing bugs.",
    icon: <Pencil className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "Terminal Integration",
    shortcut: "⌘ + `",
    description:
      "AI can run commands, install packages, and help debug terminal errors automatically.",
    icon: <Terminal className="w-6 h-6" />,
  },
  {
    id: 4,
    title: "Context with @",
    shortcut: "@file, @folder, @codebase",
    description:
      "Reference specific files or your entire codebase in chat for more accurate code suggestions.",
    icon: <Paperclip className="w-6 h-6" />,
  },
  {
    id: 5,
    title: "Docs Reference",
    shortcut: "@docs",
    description:
      "Reference framework documentation directly in prompts. Add custom docs for your tech stack.",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: 6,
    title: "Background Agents",
    shortcut: "Remote Agent",
    description:
      "Run complex coding tasks in the cloud while you continue working. Great for large refactors or migrations.",
    icon: <Cloud className="w-6 h-6" />,
  },
  {
    id: 7,
    title: "Multi-File Composer",
    shortcut: "⌘ + I",
    description:
      "Open Composer for changes spanning multiple files. Create features, refactor modules, or scaffold entire projects.",
    icon: <Layers className="w-6 h-6" />,
  },
  {
    id: 8,
    title: "Git Integration",
    shortcut: "Agent Mode",
    description:
      "Let the Agent handle git operations—commits, branches, and even pull request descriptions.",
    icon: <GitBranch className="w-6 h-6" />,
  },
];

const creatorTips: typeof developerTips = [
  {
    id: 1,
    title: "Agent Chat",
    shortcut: "⌘ + L",
    description:
      "Just describe what you want in plain English. The Agent will make the changes across your project.",
    icon: <MessageSquare className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "Visual Edits",
    shortcut: "Describe in Chat",
    description:
      '"Make the header blue" or "Add more padding to the cards"—the Agent understands design intent.',
    icon: <Palette className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "Content Updates",
    shortcut: "Ask the Agent",
    description:
      "Update text, images, and copy across your site. Just tell the Agent what to change.",
    icon: <FileEdit className="w-6 h-6" />,
  },
  {
    id: 4,
    title: "Layout Changes",
    shortcut: "Composer Mode",
    description:
      '"Move the sidebar to the right" or "Make this a 3-column grid"—restructure layouts naturally.',
    icon: <LayoutGrid className="w-6 h-6" />,
  },
  {
    id: 5,
    title: "Add Animations",
    shortcut: "Describe the Motion",
    description:
      '"Add a fade-in effect" or "Make buttons bounce on hover"—bring your designs to life.',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: 6,
    title: "Responsive Design",
    shortcut: "Ask for Mobile",
    description:
      '"Make this work on mobile" and the Agent will add responsive breakpoints and adjustments.',
    icon: <Smartphone className="w-6 h-6" />,
  },
  {
    id: 7,
    title: "Component Creation",
    shortcut: "Describe What You Need",
    description:
      '"Add a testimonials section" or "Create a pricing table"—build new UI from descriptions.',
    icon: <Puzzle className="w-6 h-6" />,
  },
  {
    id: 8,
    title: "Style Consistency",
    shortcut: "@file for Context",
    description:
      "Reference existing components so new additions match your design system automatically.",
    icon: <Target className="w-6 h-6" />,
  },
];

const strategistTips: typeof developerTips = [
  {
    id: 1,
    title: "Ask Mode",
    shortcut: "Select in Chat",
    description:
      "Get answers about your codebase without making changes. Perfect for understanding architecture and making decisions.",
    icon: <Search className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "Plan Mode",
    shortcut: "Select in Chat",
    description:
      "Have AI create a detailed implementation plan before any code is written. Review and approve the approach first.",
    icon: <ClipboardList className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "Codebase Q&A",
    shortcut: "@codebase",
    description:
      '"How does authentication work?" or "What APIs do we expose?"—get instant answers about any part of the project.',
    icon: <HelpCircle className="w-6 h-6" />,
  },
  {
    id: 4,
    title: "Architecture Review",
    shortcut: "Ask Mode",
    description:
      '"What are the dependencies between these modules?" Understand system design without digging through code.',
    icon: <Building2 className="w-6 h-6" />,
  },
  {
    id: 5,
    title: "Impact Analysis",
    shortcut: "Plan Mode",
    description:
      '"What would change if we add this feature?" Get a comprehensive view of affected files and components.',
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    id: 6,
    title: "Documentation Generation",
    shortcut: "Agent Mode",
    description:
      "Generate READMEs, API docs, or architecture diagrams from your existing code automatically.",
    icon: <BookText className="w-6 h-6" />,
  },
  {
    id: 7,
    title: "Code Explanation",
    shortcut: "Ask Mode",
    description:
      "Get plain-English explanations of complex code. Great for onboarding or reviewing unfamiliar areas.",
    icon: <Lightbulb className="w-6 h-6" />,
  },
  {
    id: 8,
    title: "Technical Specs",
    shortcut: "Plan Mode",
    description:
      "Turn feature requests into technical specifications. Share plans with your team before implementation.",
    icon: <FileText className="w-6 h-6" />,
  },
];

const developerTutorials = [
  {
    step: 1,
    title: "Getting Started as a Developer",
    content:
      "After downloading Cursor, you can import your VS Code settings and extensions. Cursor is built on VS Code, so everything feels familiar.",
    tips: [
      "Import settings from VS Code on first launch",
      "Your existing extensions will work",
      "Same keyboard shortcuts you know",
    ],
  },
  {
    step: 2,
    title: "Your First AI Chat",
    content:
      "Press ⌘+L to open the AI chat. Ask anything about your code or programming in general. The AI has context of your current file.",
    tips: [
      'Ask "What does this function do?"',
      "Request code explanations",
      "Get help with errors",
    ],
  },
  {
    step: 3,
    title: "Inline Editing Magic",
    content:
      "Select some code and press ⌘+K. Describe what changes you want, and watch the AI transform your code instantly.",
    tips: [
      '"Add error handling"',
      '"Convert to TypeScript"',
      '"Make this more readable"',
    ],
  },
  {
    step: 4,
    title: "Multi-File with Composer",
    content:
      "Press ⌘+I to open Composer. This is perfect for larger tasks that span multiple files, like adding a new feature or refactoring.",
    tips: [
      "Create entire components",
      "Add features across files",
      "Refactor project structure",
    ],
  },
];

const creatorTutorials = [
  {
    step: 1,
    title: "Getting Started as a Creator",
    content:
      "Download Cursor and open this page. No coding experience needed—just describe what you want in plain English, and Cursor will make it happen.",
    tips: [
      "No need to know programming languages",
      "Just describe your vision",
      "Cursor handles all the technical details",
    ],
  },
  {
    step: 2,
    title: "Your First Request",
    content:
      "Press ⌘+L to open the AI chat. Tell Cursor what you want to change—colors, layouts, text, images, or new sections.",
    tips: [
      '"Make the header blue"',
      '"Add more spacing between cards"',
      '"Change the font to something modern"',
    ],
  },
  {
    step: 3,
    title: "Visual Editing",
    content:
      "Select any element on the page and press ⌘+K. Describe how you want it to look, and watch it transform instantly.",
    tips: [
      '"Make this button bigger"',
      '"Add a shadow effect"',
      '"Change the background color"',
    ],
  },
  {
    step: 4,
    title: "Building Features",
    content:
      "Press ⌘+I to open Composer for bigger changes. Describe entire features or sections you want to add, and Cursor will build them.",
    tips: [
      '"Add a testimonials section"',
      '"Create a pricing table"',
      '"Build a contact form"',
    ],
  },
];

const strategistTutorials = [
  {
    step: 1,
    title: "Getting Started as a Strategist",
    content:
      "Download Cursor and open any project. You don't need to write code—use Cursor to explore, understand, and plan before making decisions.",
    tips: [
      "Perfect for non-technical team members",
      "Understand codebases without coding",
      "Make informed architectural decisions",
    ],
  },
  {
    step: 2,
    title: "Ask Questions",
    content:
      "Press ⌘+L to open the AI chat. Ask questions about how the codebase works, what features exist, or how different parts connect.",
    tips: [
      '"How does authentication work here?"',
      '"What APIs does this project expose?"',
      '"How are these components connected?"',
    ],
  },
  {
    step: 3,
    title: "Explore the Codebase",
    content:
      "Use @codebase in chat to get answers about the entire project. Understand architecture, dependencies, and design patterns without reading code.",
    tips: [
      '"What are the main modules?"',
      '"How do these services interact?"',
      '"What technologies are used?"',
    ],
  },
  {
    step: 4,
    title: "Plan Before Building",
    content:
      "Select 'Plan Mode' in chat to have Cursor create detailed implementation plans. Review and approve approaches before any code is written.",
    tips: [
      "Get step-by-step implementation plans",
      "Understand impact before changes",
      "Share plans with your team",
    ],
  },
];

interface BlogPost {
  title: string;
  url: string;
  date: string;
  excerpt?: string;
}

export default function Home() {
  const [audienceMode, setAudienceMode] = useState<
    "developer" | "creator" | "strategist"
  >("developer");
  const [showNotification, setShowNotification] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isToggleSticky, setIsToggleSticky] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);

  const currentTips =
    audienceMode === "developer"
      ? developerTips
      : audienceMode === "creator"
      ? creatorTips
      : strategistTips;

  const currentTutorials =
    audienceMode === "developer"
      ? developerTutorials
      : audienceMode === "creator"
      ? creatorTutorials
      : strategistTutorials;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Fetch blog posts
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        if (data.posts) {
          setBlogPosts(data.posts);
        }
      })
      .catch((error) => {
        console.error("Error fetching blog posts:", error);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (toggleRef.current) {
        const rect = toggleRef.current.getBoundingClientRect();
        // When toggle scrolls past the nav bar (which is ~64px tall)
        setIsToggleSticky(rect.top < 64);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleReset = async () => {
    if (isResetting) return;

    const confirmed = window.confirm(
      "⚠️ DESTRUCTIVE ACTION ⚠️\n\n" +
      "This will PERMANENTLY discard ALL local changes and reset to the latest code from main branch.\n\n" +
      "This cannot be undone. Are you absolutely sure?"
    );

    if (!confirmed) return;

    setIsResetting(true);
    try {
      const response = await fetch("/api/reset", { method: "POST" });
      const data = await response.json();
      
      if (response.ok) {
        alert("✅ Sandbox reset successfully! All changes discarded and pulled latest from main.");
        window.location.reload();
      } else {
        alert(`❌ Failed to reset sandbox: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      alert("❌ Failed to reset sandbox. Please check your connection and try again.");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <main className="min-h-screen bg-cursor-cream">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Cursor Logo */}
            <img src="/cursor-logo.png" alt="Cursor" className="h-6" />
            <span className="text-xs bg-cursor-olive/10 text-cursor-olive px-2 py-1 rounded-full font-medium">
              Sandbox
            </span>
          </div>
          <button
            onClick={handleReset}
            disabled={isResetting}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-cursor-muted hover:text-cursor-charcoal hover:bg-cursor-beige/50 rounded-full transition-all disabled:opacity-50"
          >
            {isResetting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RotateCcw className="w-4 h-4" />
            )}
            Reset sandbox
          </button>
        </div>
        
        {/* Sticky Toggle - appears when scrolled past */}
        <AnimatePresence>
          {isToggleSticky && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="border-t border-cursor-beige/50 bg-cursor-cream/95 backdrop-blur-sm"
            >
              <div className="max-w-6xl mx-auto px-6 py-1.5 flex items-center justify-center gap-3">
                <p className="text-cursor-muted text-xs whitespace-nowrap">Tips for</p>
                <div className="inline-flex items-center bg-white rounded-full p-0.5 shadow-sm border border-cursor-beige">
                  <button
                    onClick={() => setAudienceMode("developer")}
                    className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      audienceMode === "developer"
                        ? "bg-cursor-olive text-white shadow-md"
                        : "text-cursor-muted hover:text-cursor-charcoal"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5" />
                      Developers
                    </span>
                  </button>
                  <button
                    onClick={() => setAudienceMode("creator")}
                    className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      audienceMode === "creator"
                        ? "bg-cursor-olive text-white shadow-md"
                        : "text-cursor-muted hover:text-cursor-charcoal"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5" />
                      Creators
                    </span>
                  </button>
                  <button
                    onClick={() => setAudienceMode("strategist")}
                    className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      audienceMode === "strategist"
                        ? "bg-cursor-olive text-white shadow-md"
                        : "text-cursor-muted hover:text-cursor-charcoal"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" />
                      Strategists
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Tips Section - Main Content */}
      <section
        id="tips"
        className="pt-28 pb-24 px-6 bg-cursor-beige/30 min-h-screen"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-cursor-olive/10 text-cursor-olive px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cursor-olive opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cursor-olive"></span>
              </span>
              Interactive Sandbox
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-cursor-charcoal mb-4">
              Welcome to <span className="italic">Cursor Sandbox</span>
            </h1>
            <div className="min-h-[60px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={audienceMode}
                  variants={fadeInOut}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-cursor-muted max-w-2xl mx-auto text-lg"
                >
                  {audienceMode === "developer"
                    ? "A safe space to experiment with Cursor's AI-powered coding features. Try shortcuts, autocomplete, and agents without fear of breaking anything."
                    : audienceMode === "creator"
                    ? "Use natural language to design, style, and build—no coding knowledge required."
                    : "Explore, plan, and understand your codebase before making decisions."}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="text-cursor-olive font-medium max-w-2xl mx-auto text-lg mt-4">
              This entire page is yours to customize—just ask the Agent!
            </p>
          </motion.div>

          {/* Audience Toggle */}
          <div 
            ref={toggleRef}
            className={`flex items-center justify-center gap-4 mb-12 transition-opacity duration-300 ${
              isToggleSticky ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <p className="text-cursor-muted text-sm whitespace-nowrap">Tips for</p>
            <div className="inline-flex items-center bg-white rounded-full p-1 shadow-sm border border-cursor-beige">
              <button
                onClick={() => setAudienceMode("developer")}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  audienceMode === "developer"
                    ? "bg-cursor-olive text-white shadow-md"
                    : "text-cursor-muted hover:text-cursor-charcoal"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  Developers
                </span>
              </button>
              <button
                onClick={() => setAudienceMode("creator")}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  audienceMode === "creator"
                    ? "bg-cursor-olive text-white shadow-md"
                    : "text-cursor-muted hover:text-cursor-charcoal"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Creators
                </span>
              </button>
              <button
                onClick={() => setAudienceMode("strategist")}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  audienceMode === "strategist"
                    ? "bg-cursor-olive text-white shadow-md"
                    : "text-cursor-muted hover:text-cursor-charcoal"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  Strategists
                </span>
              </button>
            </div>
          </div>

          {/* Tips Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={audienceMode}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={staggerContainer}
            >
              {currentTips.map((tip) => (
                <motion.div
                  key={tip.id}
                  variants={fadeInUp}
                  className="glass rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 group"
                >
                  <div className="text-cursor-olive mb-4">{tip.icon}</div>
                  <h3 className="font-semibold text-lg text-cursor-charcoal mb-2 group-hover:text-cursor-olive transition-colors">
                    {tip.title}
                  </h3>
                  <div className="mb-3">
                    <span className="kbd text-xs">{tip.shortcut}</span>
                  </div>
                  <p className="text-sm text-cursor-muted leading-relaxed">
                    {tip.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Tutorial Section */}
      <section id="tutorial" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-cursor-muted text-sm uppercase tracking-widest mb-4">
              Step by Step
            </p>
            <div className="min-h-[80px] flex items-center justify-center mb-4">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={audienceMode}
                  variants={fadeInOut}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="font-serif text-4xl md:text-5xl text-cursor-charcoal"
                >
                  Getting Started
                </motion.h2>
              </AnimatePresence>
            </div>
            <p className="text-cursor-muted max-w-xl mx-auto">
              Follow these steps to go from beginner to productive in just a few
              minutes.
            </p>
          </motion.div>

          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={audienceMode}
                variants={fadeInOut}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
              {currentTutorials.map((tutorial, index) => (
                <motion.div
                  key={`${audienceMode}-${tutorial.step}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6"
                >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-cursor-olive text-white flex items-center justify-center font-serif text-xl">
                    {tutorial.step}
                  </div>
                </div>
                <div className="flex-1 glass rounded-2xl p-6">
                  <h3 className="font-semibold text-xl text-cursor-charcoal mb-3 flex items-center gap-2">
                    {tutorial.step === 1 && tutorial.title.includes("Getting Started") ? (
                      <>
                        Getting Started as a{" "}
                        {audienceMode === "developer" ? (
                          <>
                            <Code2 className="w-5 h-5" />
                            Developer
                          </>
                        ) : audienceMode === "creator" ? (
                          <>
                            <Palette className="w-5 h-5" />
                            Creator
                          </>
                        ) : (
                          <>
                            <Compass className="w-5 h-5" />
                            Strategist
                          </>
                        )}
                      </>
                    ) : (
                      tutorial.title
                    )}
                  </h3>
                  <p className="text-cursor-muted mb-4">{tutorial.content}</p>
                  <ul className="space-y-2">
                    {tutorial.tips.map((tip, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-cursor-charcoal"
                      >
                        <Check className="w-4 h-4 text-cursor-olive" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Shortcuts Reference */}
      <section
        id="shortcuts"
        className="py-24 px-6 bg-cursor-charcoal text-white"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-cursor-warm/60 text-sm uppercase tracking-widest mb-4">
              Quick Reference
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
              Keyboard <span className="italic">Shortcuts</span>
            </h2>
            <p className="text-cursor-warm/60 max-w-xl mx-auto">
              Print this out or keep it handy. These shortcuts will become
              second nature.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 rounded-2xl overflow-hidden border border-white/10"
          >
            <div className="grid md:grid-cols-2">
              {[
                { keys: "⌘ + L", action: "Open AI Chat" },
                { keys: "⌘ + K", action: "Inline Edit" },
                { keys: "⌘ + I", action: "Open Composer" },
                { keys: "Tab", action: "Accept Suggestion" },
                { keys: "⌘ + Shift + L", action: "Add Selection to Chat" },
                { keys: "⌘ + `", action: "Toggle Terminal" },
                { keys: "⌘ + B", action: "Toggle Sidebar" },
                { keys: "⌘ + P", action: "Quick Open File" },
              ].map((shortcut, index) => (
                <div
                  key={shortcut.keys}
                  className={`flex items-center justify-between p-5 ${
                    index % 2 === 0 ? "border-r border-white/10" : ""
                  } ${index < 6 ? "border-b border-white/10" : ""}`}
                >
                  <span className="text-white/80">{shortcut.action}</span>
                  <kbd className="bg-white/10 text-white px-3 py-1.5 rounded-lg text-sm font-mono">
                    {shortcut.keys}
                  </kbd>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-cursor-warm/40 text-sm mt-8"
          >
            On Windows/Linux, replace ⌘ with Ctrl
          </motion.p>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-cursor-muted text-sm uppercase tracking-widest mb-4">
              Loved by Developers
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-cursor-charcoal mb-4">
              What People Are <span className="italic">Saying</span>
            </h2>
          </motion.div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {[
              {
                quote: "Cursor has completely transformed how I code. The AI suggestions are spot-on and save me hours every day.",
                author: "Sarah Chen",
                role: "Senior Engineer at Stripe",
              },
              {
                quote: "I can build features in minutes that used to take hours. Cursor understands context better than any tool I've used.",
                author: "Marcus Johnson",
                role: "Full-stack Developer",
              },
              {
                quote: "As a designer, Cursor lets me bring my ideas to life without needing to learn complex programming. It's magical.",
                author: "Emma Rodriguez",
                role: "Product Designer",
              },
              {
                quote: "Cursor helps me understand codebases I've never seen before. It's like having a senior engineer explain everything.",
                author: "David Kim",
                role: "Engineering Manager",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <p className="text-cursor-charcoal mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-cursor-charcoal">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-cursor-muted">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Blog Posts */}
          {blogPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-8">
                <p className="text-cursor-muted text-sm uppercase tracking-widest mb-4">
                  Latest Updates
                </p>
                <h3 className="font-serif text-3xl md:text-4xl text-cursor-charcoal mb-4">
                  From the <span className="italic">Cursor</span> Blog
                </h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {blogPosts.slice(0, 3).map((post, index) => (
                  <motion.a
                    key={post.title}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 block"
                  >
                    <p className="text-xs text-cursor-muted mb-2">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h4 className="font-semibold text-lg text-cursor-charcoal mb-2 hover:text-cursor-olive transition-colors">
                      {post.title}
                    </h4>
                    {post.excerpt && (
                      <p className="text-sm text-cursor-muted line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-cursor-beige/50 border-t border-cursor-beige">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/cursor-logo.png" alt="Cursor" className="h-6" />
          </div>
          <p className="text-sm text-cursor-muted">
            A sandbox for learning. Edit anything by prompting the Agent.
          </p>
          <div className="flex gap-4">
            <a
              href="https://cursor.com"
              className="text-cursor-muted hover:text-cursor-charcoal transition-colors text-sm"
            >
              cursor.com
            </a>
            <a
              href="https://docs.cursor.com"
              className="text-cursor-muted hover:text-cursor-charcoal transition-colors text-sm"
            >
              Docs
            </a>
          </div>
        </div>
      </footer>

      {/* Notification Popup */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm"
          >
            <div className="glass rounded-2xl p-5 shadow-2xl border border-cursor-olive/20">
              <button
                onClick={() => setShowNotification(false)}
                className="absolute top-3 right-3 text-cursor-muted hover:text-cursor-charcoal transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cursor-olive/10 flex items-center justify-center text-cursor-olive">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="pr-4">
                  <p className="font-medium text-cursor-charcoal mb-1">
                    This is your sandbox!
                  </p>
                  <p className="text-sm text-cursor-muted leading-relaxed">
                    Try editing this page—ask the Agent to change colors, add
                    sections, or anything else!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
