"use client";

import { useTypingAnimation } from "@/app/hooks/useTypingAnimation";

const welcomeTitle = "Welcome to Cursor!";
const introParagraph =
  "I'm the Cursor Guide Agent — your personal assistant for getting started and making the most of this AI-powered coding environment.";
const secondParagraph =
  "I'm thrilled you're here! To help me tailor your experience and point you toward the features that'll be most useful for you, I'd love to learn a bit about your background.";

export function WelcomeMessage() {
  const { displayedText: titleText, isComplete: titleComplete } =
    useTypingAnimation(welcomeTitle, 30, 300);

  const { displayedText: introText, isComplete: introComplete } =
    useTypingAnimation(introParagraph, 15, titleComplete ? 0 : 99999);

  const { displayedText: secondText } = useTypingAnimation(
    secondParagraph,
    15,
    introComplete ? 0 : 99999
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-dark-text">
        <span className="mr-2">👋</span>
        {titleText}
        {!titleComplete && <span className="animate-pulse">|</span>}
      </h2>

      {titleComplete && (
        <div className="space-y-4 text-dark-text leading-relaxed">
          <p>
            {introText.split("Cursor Guide Agent").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="font-semibold">Cursor Guide Agent</span>
                )}
              </span>
            ))}
            {!introComplete && <span className="animate-pulse">|</span>}
          </p>

          {introComplete && (
            <p>
              {secondText}
              {secondText.length < secondParagraph.length && (
                <span className="animate-pulse">|</span>
              )}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
