import type { Talk } from "./talk";

/** Port: where the talk content comes from. */
export interface TalkRepository {
  get(): Talk;
}
