"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, ReactNode } from "react";
import {
  Palette,
  Type,
  LayoutGrid,
  Sparkles,
  AtSign,
  MessageSquare,
  Target,
  RefreshCw,
  X,
  Check,
  RotateCcw,
  Loader2,
  Undo2,
  ClipboardList,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

// Unified Agent tips - mix of hands-on prompts and general patterns
const agentTips: {
  id: number;
  title: string;
  prompt: string;
  description: string;
  icon: ReactNode;
  tryIt?: boolean;
}[] = [
  {
    id: 1,
    title: "Change the Colors",
    prompt: '"Make the background dark" or "Use a blue theme"',
    description:
      "Try it now! Ask the Agent to change this page's color scheme. Describe the mood or specific colors you want.",
    icon: <Palette className="w-6 h-6" />,
    tryIt: true,
  },
  {
    id: 2,
    title: "Edit the Content",
    prompt: '"Change the heading to say Welcome to My Sandbox"',
    description:
      "Update any text on this page. The Agent can modify headings, descriptions, button labels—anything you see.",
    icon: <Type className="w-6 h-6" />,
    tryIt: true,
  },
  {
    id: 3,
    title: "Modify the Layout",
    prompt: '"Make the tips grid 2 columns" or "Add more spacing"',
    description:
      "Restructure how elements are arranged. Change grid layouts, spacing, alignment, or completely reorganize sections.",
    icon: <LayoutGrid className="w-6 h-6" />,
    tryIt: true,
  },
  {
    id: 4,
    title: "Add New Sections",
    prompt: '"Add a FAQ section" or "Create a contact form"',
    description:
      "Ask the Agent to build entirely new components. It can create sections, forms, cards, or any UI element you describe.",
    icon: <Sparkles className="w-6 h-6" />,
    tryIt: true,
  },
  {
    id: 5,
    title: "Use @ for Context",
    prompt: "@page.tsx @globals.css",
    description:
      "Reference specific files to give the Agent more context. Type @ in the chat to see available files, folders, or docs.",
    icon: <AtSign className="w-6 h-6" />,
  },
  {
    id: 6,
    title: "Be Specific",
    prompt: '"Add a red border to the cards" vs "make it look better"',
    description:
      "The more specific your request, the better the result. Describe exactly what you want—colors, sizes, positions.",
    icon: <Target className="w-6 h-6" />,
  },
  {
    id: 7,
    title: "Iterate & Refine",
    prompt: '"Actually, make it darker" or "A bit more padding"',
    description:
      "Don't try to get everything perfect in one prompt. Make a change, see the result, then ask for adjustments.",
    icon: <RefreshCw className="w-6 h-6" />,
  },
  {
    id: 8,
    title: "Review Changes",
    prompt: "Check the diff before accepting",
    description:
      "Always review what the Agent modified. You can accept, reject, or ask for different changes before saving.",
    icon: <Check className="w-6 h-6" />,
  },
];

const tutorials = [
  {
    step: 1,
    title: "Open the Agent",
    content:
      "Press ⌘+L (or Ctrl+L on Windows) to open the Agent panel. This is where you'll have conversations with the AI about your code.",
    tips: [
      "The Agent panel opens on the right side",
      "Your current file is automatically included as context",
      "You can resize the panel by dragging the edge",
    ],
  },
  {
    step: 2,
    title: "Describe What You Want",
    content:
      "Type a natural language description of the change you want. Be specific about what you're trying to achieve.",
    tips: [
      '"Change the background color to dark blue"',
      '"Add a new section with three feature cards"',
      '"Make the header sticky when scrolling"',
    ],
  },
  {
    step: 3,
    title: "Review the Changes",
    content:
      "The Agent will show you exactly what it plans to change. Review the diff to make sure it matches your intent.",
    tips: [
      "Green lines are additions, red lines are removals",
      "Click on files to see what changed",
      "You can still edit the code manually if needed",
    ],
  },
  {
    step: 4,
    title: "Accept or Iterate",
    content:
      "If you're happy, accept the changes. If not, ask for adjustments—the Agent remembers the conversation context.",
    tips: [
      '"Actually, make it a lighter shade"',
      '"Can you also add a hover effect?"',
      "Use the Reset button above to start fresh anytime",
    ],
  },
];

export default function Home() {
  const [showNotification, setShowNotification] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleReset = async () => {
    if (isResetting) return;

    const confirmed = window.confirm(
      "Reset sandbox to default? This will revert all changes you've made to the page."
    );

    if (!confirmed) return;

    setIsResetting(true);
    try {
      const response = await fetch("/api/reset", { method: "POST" });
      if (response.ok) {
        window.location.reload();
      } else {
        alert("Failed to reset sandbox. Please try again.");
      }
    } catch (error) {
      alert("Failed to reset sandbox. Please try again.");
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
              Playground
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
            <h1 className="font-serif text-4xl md:text-6xl text-cursor-charcoal mb-4">
              Learn <span className="italic">Cursor Agent</span> by Using It
            </h1>
            <p className="text-cursor-muted max-w-2xl mx-auto text-lg">
              This page is your playground. Use the tips below to practice
              talking to the Agent—try editing colors, layouts, content, or
              anything else you can imagine.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6 text-cursor-muted">
              <span>Press</span>
              <kbd className="px-2.5 py-1 bg-gray-400/40 text-cursor-charcoal text-sm font-mono rounded-md">
                ⌘L
              </kbd>
              <span>or type in the Agent chat to the left</span>
            </div>
          </motion.div>

          {/* Tips Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {agentTips.map((tip) => (
              <motion.div
                key={tip.id}
                variants={fadeInUp}
                className={`glass rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 group ${
                  tip.tryIt ? "ring-2 ring-cursor-olive/20" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-cursor-olive">{tip.icon}</div>
                  {tip.tryIt && (
                    <span className="text-xs bg-cursor-olive/10 text-cursor-olive px-2 py-1 rounded-full font-medium">
                      Try it!
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-lg text-cursor-charcoal mb-2 group-hover:text-cursor-olive transition-colors">
                  {tip.title}
                </h3>
                <div className="mb-3">
                  <code className="text-xs bg-cursor-charcoal/5 text-cursor-charcoal/80 px-2 py-1 rounded font-mono">
                    {tip.prompt}
                  </code>
                </div>
                <p className="text-sm text-cursor-muted leading-relaxed">
                  {tip.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
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
            <h2 className="font-serif text-4xl md:text-5xl text-cursor-charcoal mb-4">
              Getting <span className="italic">Started</span> Guide
            </h2>
            <p className="text-cursor-muted max-w-xl mx-auto">
              Follow these steps to go from beginner to productive in just a few
              minutes.
            </p>
          </motion.div>

          <div className="space-y-8">
            {tutorials.map((tutorial, index) => (
              <motion.div
                key={tutorial.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-cursor-olive text-white flex items-center justify-center font-serif text-xl">
                    {tutorial.step}
                  </div>
                </div>
                <div className="flex-1 glass rounded-2xl p-6">
                  <h3 className="font-semibold text-xl text-cursor-charcoal mb-3">
                    {tutorial.title}
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
          </div>
        </div>
      </section>

      {/* Shortcuts Reference */}
      <section
        id="shortcuts"
        className="py-24 px-6 bg-cursor-charcoal text-white"
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-cursor-warm/60 text-sm uppercase tracking-widest mb-4">
              Essential Shortcuts
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
              Agent <span className="italic">Shortcuts</span>
            </h2>
            <p className="text-cursor-warm/60 max-w-xl mx-auto">
              The only shortcuts you need to know to start using the Agent
              effectively.
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
                { keys: "⌘ + L", action: "Open Agent Panel", primary: true },
                { keys: "⌘ + I", action: "Open Composer", primary: true },
                { keys: "⌘ + Z", action: "Undo Changes", primary: false },
                { keys: "⌘ + Enter", action: "Send Message", primary: false },
              ].map((shortcut, index) => (
                <div
                  key={shortcut.keys}
                  className={`flex items-center justify-between p-5 ${
                    index % 2 === 0 ? "border-r border-white/10" : ""
                  } ${index < 2 ? "border-b border-white/10" : ""}`}
                >
                  <span
                    className={
                      shortcut.primary ? "text-white" : "text-white/60"
                    }
                  >
                    {shortcut.action}
                  </span>
                  <kbd
                    className={`px-3 py-1.5 rounded-lg text-sm font-mono ${
                      shortcut.primary
                        ? "bg-cursor-olive text-white"
                        : "bg-white/10 text-white"
                    }`}
                  >
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

      {/* Pro Tips Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-cursor-muted text-sm uppercase tracking-widest mb-4">
              Level Up
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-cursor-charcoal mb-4">
              <span className="italic">Agent</span> Pro Tips
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Undo with ⌘+Z",
                description:
                  "Made a mistake? Just undo like normal. The Agent's changes are just regular edits—you have full control.",
                icon: <Undo2 className="w-8 h-8" />,
              },
              {
                title: "Use Plan Mode",
                description:
                  "For complex changes, ask the Agent to plan first. It will outline the approach before making any edits.",
                icon: <ClipboardList className="w-8 h-8" />,
              },
              {
                title: "Chain Requests",
                description:
                  'Build on previous changes. Say "now make it responsive" or "add a hover effect to that" in the same conversation.',
                icon: <RefreshCw className="w-8 h-8" />,
              },
            ].map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-cursor-olive/10 to-cursor-olive/5 rounded-2xl p-8 border border-cursor-olive/20"
              >
                <div className="text-cursor-olive mb-4">{tip.icon}</div>
                <h3 className="font-semibold text-xl text-cursor-charcoal mb-3">
                  {tip.title}
                </h3>
                <p className="text-cursor-muted">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-cursor-beige/50 border-t border-cursor-beige">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/cursor-logo.png" alt="Cursor" className="h-5" />
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
