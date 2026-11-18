import type { Talk } from "../domain/talk";
import type { TalkRepository } from "../domain/talk-repository";

/** Use case: load the talk to present. */
export class GetTalk {
  constructor(private readonly repository: TalkRepository) {}

  execute(): Talk {
    return this.repository.get();
  }
}
