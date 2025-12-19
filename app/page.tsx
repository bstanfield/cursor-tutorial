"use client";

import { useState } from "react";
import {
  RotateCcw,
  Loader2,
  Check,
  Circle,
  Trash2,
  Sun,
  Moon,
} from "lucide-react";

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  hint?: string;
}

const initialItems: ChecklistItem[] = [
  {
    id: "1",
    text: "Change the background color of this page",
    completed: false,
    hint: 'Try: "Make the background a soft blue"',
  },
  {
    id: "2",
    text: "Add a new item to this checklist",
    completed: false,
    hint: 'Try: "Add a checklist item about learning keyboard shortcuts"',
  },
  {
    id: "3",
    text: "Change the checkbox style",
    completed: false,
    hint: 'Try: "Make the checkboxes square instead of round"',
  },
  {
    id: "4",
    text: "Add a fun animation when checking an item",
    completed: false,
    hint: 'Try: "Add a confetti effect when I complete a task"',
  },
  {
    id: "5",
    text: "Customize the header text",
    completed: false,
    hint: 'Try: "Change the title to My Learning Journey"',
  },
];

export default function Home() {
  const [items, setItems] = useState<ChecklistItem[]>(initialItems);
  const [isResetting, setIsResetting] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const completedCount = items.filter((item) => item.completed).length;
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

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
        alert(
          "✅ Sandbox reset successfully! All changes discarded and pulled latest from main."
        );
        window.location.reload();
      } else {
        alert(`❌ Failed to reset sandbox: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      alert(
        "❌ Failed to reset sandbox. Please check your connection and try again."
      );
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-dark-bg" : "bg-cursor-cream"
      }`}
    >
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          darkMode
            ? "bg-dark-card/90 backdrop-blur-xl border-b border-dark-border"
            : "glass"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/cursor-logo.png"
              alt="Cursor"
              className={`h-6 ${darkMode ? "invert" : ""}`}
            />
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                darkMode
                  ? "bg-dark-accent/20 text-dark-accent"
                  : "bg-cursor-olive/10 text-cursor-olive"
              }`}
            >
              Sandbox
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-all ${
                darkMode
                  ? "text-yellow-400 hover:bg-dark-hover"
                  : "text-cursor-muted hover:text-cursor-charcoal hover:bg-cursor-beige/50"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={handleReset}
              disabled={isResetting}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all disabled:opacity-50 ${
                darkMode
                  ? "text-dark-muted hover:text-dark-text hover:bg-dark-hover"
                  : "text-cursor-muted hover:text-cursor-charcoal hover:bg-cursor-beige/50"
              }`}
            >
              {isResetting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RotateCcw className="w-4 h-4" />
              )}
              Reset sandbox
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-28 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1
              className={`font-serif text-4xl md:text-5xl mb-4 ${
                darkMode ? "text-dark-text" : "text-cursor-charcoal"
              }`}
            >
              Your <span className="italic">Sandbox</span>
            </h1>
            <p
              className={`max-w-lg mx-auto mb-6 ${
                darkMode ? "text-dark-muted" : "text-cursor-muted"
              }`}
            >
              This entire page is yours to modify. Change the colors, add
              features, break things, rebuild them—just describe what you want
              to the Agent.
            </p>
            <p
              className={`font-medium ${
                darkMode ? "text-dark-accent" : "text-cursor-olive"
              }`}
            >
              Press{" "}
              <kbd
                className={`kbd mx-1 ${
                  darkMode
                    ? "bg-dark-card border-dark-border text-dark-text shadow-none"
                    : ""
                }`}
              >
                ⌘+L
              </kbd>{" "}
              to start
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-sm ${
                  darkMode ? "text-dark-muted" : "text-cursor-muted"
                }`}
              >
                Progress
              </span>
              <span
                className={`text-sm font-medium ${
                  darkMode ? "text-dark-accent" : "text-cursor-olive"
                }`}
              >
                {completedCount} of {items.length} complete
              </span>
            </div>
            <div
              className={`h-3 rounded-full overflow-hidden ${
                darkMode ? "bg-dark-card" : "bg-cursor-beige"
              }`}
            >
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${
                  darkMode ? "bg-dark-accent" : "bg-cursor-olive"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Checklist */}
          <div
            className={`rounded-2xl p-6 mb-6 transition-colors duration-300 ${
              darkMode ? "bg-dark-card border border-dark-border" : "glass"
            }`}
          >
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className={`group flex items-start gap-3 p-4 rounded-xl transition-all ${
                    item.completed
                      ? darkMode
                        ? "bg-dark-accent/10"
                        : "bg-cursor-olive/5"
                      : darkMode
                      ? "bg-dark-bg hover:bg-dark-hover"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      item.completed
                        ? darkMode
                          ? "bg-dark-accent border-dark-accent text-white"
                          : "bg-cursor-olive border-cursor-olive text-white"
                        : darkMode
                        ? "border-dark-border hover:border-dark-accent"
                        : "border-cursor-beige hover:border-cursor-olive"
                    }`}
                  >
                    {item.completed ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4 opacity-0 group-hover:opacity-30" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-medium transition-all ${
                        item.completed
                          ? darkMode
                            ? "text-dark-muted line-through"
                            : "text-cursor-muted line-through"
                          : darkMode
                          ? "text-dark-text"
                          : "text-cursor-charcoal"
                      }`}
                    >
                      {item.text}
                    </p>
                    {item.hint && !item.completed && (
                      <p
                        className={`text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                          darkMode ? "text-dark-muted" : "text-cursor-muted"
                        }`}
                      >
                        💡 {item.hint}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className={`flex-shrink-0 p-1 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all ${
                      darkMode ? "text-dark-muted" : "text-cursor-muted"
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Completion Message */}
          {progress === 100 && items.length > 0 && (
            <div
              className={`mt-8 text-center p-8 rounded-2xl ${
                darkMode ? "bg-dark-card border border-dark-border" : "glass"
              }`}
            >
              <div className="text-4xl mb-4">🎉</div>
              <h2
                className={`font-serif text-2xl mb-2 ${
                  darkMode ? "text-dark-text" : "text-cursor-charcoal"
                }`}
              >
                Amazing work!
              </h2>
              <p className={darkMode ? "text-dark-muted" : "text-cursor-muted"}>
                You've completed all the challenges. Now try adding your own or
                ask the Agent to add new features to this app!
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
