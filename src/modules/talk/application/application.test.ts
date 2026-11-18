import { describe, expect, it } from "vitest";
import { daysBetween, growthFactor, percentOf, phasesOf, runRate } from "./impact";
import { currentSceneIndex, moveSceneIndex } from "./scene-navigation";
import { scrambleText } from "./scramble-text";
import { splitEmphasis } from "./split-emphasis";

describe("scrambleText", () => {
  const noise = () => 0;

  it("returns the original text when finished", () => {
    expect(scrambleText("Who is in charge?", 1, noise)).toBe("Who is in charge?");
  });

  it("keeps spaces and length while scrambling", () => {
    const result = scrambleText("ab cd", 0, noise);
    expect(result).toHaveLength(5);
    expect(result[2]).toBe(" ");
    expect(result).not.toBe("ab cd");
  });

  it("reveals the leading share of the letters", () => {
    expect(scrambleText("abcd", 0.5, noise).startsWith("ab")).toBe(true);
  });
});

describe("scene navigation", () => {
  it("picks the last scene above the reading line", () => {
    expect(currentSceneIndex([0, 800, 1600], 900)).toBe(1);
    expect(currentSceneIndex([0, 800, 1600], 0)).toBe(0);
  });

  it("never leaves the deck", () => {
    expect(moveSceneIndex(0, -1, 15)).toBe(0);
    expect(moveSceneIndex(14, 1, 15)).toBe(14);
    expect(moveSceneIndex(3, 1, 15)).toBe(4);
  });
});

describe("splitEmphasis", () => {
  it("marks the starred phrases", () => {
    expect(splitEmphasis("a *b* c")).toEqual([
      { text: "a ", emphasis: false },
      { text: "b", emphasis: true },
      { text: " c", emphasis: false },
    ]);
  });
});

describe("impact maths", () => {
  const events = [
    { date: "Aug 11", label: "a" },
    { date: "Aug 17", label: "b" },
    { date: "Oct 27", label: "c" },
    { date: "Oct 30", label: "d" },
  ];

  it("counts days across months", () => {
    expect(daysBetween("Aug 17", "Oct 27")).toBe(71);
  });

  it("derives growth, rate and share", () => {
    expect(growthFactor(17, 112)).toBe(6.6);
    expect(runRate(2268, 17)).toBe(133.4);
    expect(percentOf(107, 199)).toBe(54);
  });

  it("splits the timeline at the long quiet stretch", () => {
    const phases = phasesOf(events);
    expect(phases).toHaveLength(2);
    expect(phases[1]?.quietDaysBefore).toBe(71);
    expect(phases[1]?.spanDays).toBe(3);
  });
});
