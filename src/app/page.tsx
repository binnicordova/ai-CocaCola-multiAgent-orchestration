import { getTalk } from "@/modules/talk/composition";
import { Deck } from "@/modules/talk/presentation/deck/deck";
import { sceneComponents } from "@/modules/talk/presentation/scenes";
import { SourcesFooter } from "@/modules/talk/presentation/sources-footer";

export default function Page() {
  const talk = getTalk.execute();

  return (
    <>
      <Deck scenes={talk.scenes}>
        {talk.scenes.map((scene) => {
          const SceneView = sceneComponents[scene.id];
          return <SceneView key={scene.id} talk={talk} scene={scene} />;
        })}
      </Deck>
      <SourcesFooter sources={talk.sources} />
    </>
  );
}
