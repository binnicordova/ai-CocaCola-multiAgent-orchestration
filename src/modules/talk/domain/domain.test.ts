import { describe, expect, it } from "vitest";
import { StaticTalkRepository } from "../infrastructure/static-talk-repository";
import { formatMetric } from "./metric";
import { createTalk, InvalidTalkError } from "./talk";

describe("formatMetric", () => {
  it("groups thousands", () => {
    expect(formatMetric({ value: 3595 })).toBe("3,595");
  });

  it("keeps decimals, prefix and suffix", () => {
    expect(formatMetric({ value: 90.2, decimals: 1, suffix: "%" })).toBe("90.2%");
    expect(formatMetric({ value: 38, prefix: "~" })).toBe("~38");
  });
});

describe("Talk", () => {
  const talk = new StaticTalkRepository().get();

  it("opens every scene with a question, except the closing statement", () => {
    const questions = talk.scenes.filter((scene) => scene.question.endsWith("?"));
    expect(questions).toHaveLength(talk.scenes.length - 1);
  });

  it("rejects duplicated scene ids", () => {
    const [first] = talk.scenes;
    if (!first) throw new Error("fixture has no scenes");
    expect(() => createTalk({ ...talk, scenes: [first, first] })).toThrow(InvalidTalkError);
  });

  it("rejects a talk without scenes", () => {
    expect(() => createTalk({ ...talk, scenes: [] })).toThrow(InvalidTalkError);
  });
});
