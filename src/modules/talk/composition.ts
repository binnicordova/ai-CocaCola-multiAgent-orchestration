import { GetTalk } from "./application/get-talk";
import { StaticTalkRepository } from "./infrastructure/static-talk-repository";

/** Composition root: wires the use case to its adapter. */
export const getTalk = new GetTalk(new StaticTalkRepository());
