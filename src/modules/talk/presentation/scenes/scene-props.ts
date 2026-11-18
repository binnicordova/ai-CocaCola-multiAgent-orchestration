import type { Scene } from "../../domain/scene";
import type { Talk } from "../../domain/talk";

export interface SceneProps {
  readonly talk: Talk;
  readonly scene: Scene;
}
