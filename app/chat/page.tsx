"use client";

import { Sidebar } from "./components/Sidebar";
import { ChatHeader } from "./components/ChatHeader";
import { WelcomeMessage } from "./components/WelcomeMessage";
import { QuestionsPanel } from "./components/QuestionsPanel";
import { InputBar } from "./components/InputBar";

export default function ChatPage() {
  return (
    <div className="flex h-screen bg-dark-bg">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {/* Background Decoration */}
        <div className="absolute right-20 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
          <CubeDecoration />
        </div>

        {/* Chat Header */}
        <ChatHeader title="Tour guide" />

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Welcome Message with typing animation */}
            <WelcomeMessage />

            {/* Questions Panel */}
            <QuestionsPanel />
          </div>
        </div>

        {/* Input Bar */}
        <InputBar />
      </div>
    </div>
  );
}

// 3D Cube decoration component
function CubeDecoration() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-dark-muted"
    >
      {/* Front face */}
      <path
        d="M100 60 L160 90 L160 150 L100 180 L40 150 L40 90 Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      {/* Top face */}
      <path
        d="M100 60 L160 90 L100 120 L40 90 Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      {/* Center line */}
      <path d="M100 120 L100 180" stroke="currentColor" strokeWidth="1" />
      {/* Inner edges */}
      <path d="M100 20 L100 60" stroke="currentColor" strokeWidth="1" />
      <path d="M100 20 L40 50 L40 90" stroke="currentColor" strokeWidth="1" />
      <path d="M100 20 L160 50 L160 90" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
