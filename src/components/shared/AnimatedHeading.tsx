"use client";

import { useEffect, useState } from "react";

const CHAR_DELAY = 30; // ms between each character's transition-delay

export function AnimatedHeading({
  lines,
  initialDelay = 200,
  start = true,
  className = "",
  style,
  accentPeriods = true,
}: {
  lines: string[];
  initialDelay?: number;
  start?: boolean;
  className?: string;
  style?: React.CSSProperties;
  accentPeriods?: boolean; // color any "." characters with an accent class
}) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!start) return;
    const timer = setTimeout(() => setStarted(true), initialDelay);
    return () => clearTimeout(timer);
  }, [start, initialDelay]);

  return (
    <h1 className={className} style={style}>
      {lines.map((line, lineIndex) => {
        // Splitting straight into per-character spans (no word grouping) let
        // the browser treat every character as its own independently
        // breakable inline-block, so long headlines could wrap mid-word on
        // narrow screens ("Fro" / "m"). Splitting on spaces first and giving
        // each word its own `white-space: nowrap` wrapper keeps every word
        // atomic while the line still wraps normally between words.
        const words = line.split(" ");
        let charIndex = 0;
        return (
          <span key={lineIndex} className="block">
            {words.map((word, wordIndex) => {
              const isLastWord = wordIndex === words.length - 1;
              const wordSpan = (
                <span
                  key={wordIndex}
                  className="inline-block"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {word.split("").map((char, i) => {
                    const delay =
                      lineIndex * line.length * CHAR_DELAY +
                      charIndex * CHAR_DELAY;
                    charIndex++;
                    const isAccent = accentPeriods && char === ".";
                    return (
                      <span
                        key={i}
                        className={`inline-block transition-all ${isAccent ? "text-brand-red" : ""}`}
                        style={{
                          opacity: started ? 1 : 0,
                          transform: started
                            ? "translateX(0)"
                            : "translateX(-18px)",
                          transitionDuration: "500ms",
                          transitionDelay: `${delay}ms`,
                        }}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              );
              if (isLastWord) return wordSpan;
              charIndex++; // account for the space character's own delay slot
              return (
                <span key={`${wordIndex}-wrap`}>
                  {wordSpan}
                  {" "}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}
