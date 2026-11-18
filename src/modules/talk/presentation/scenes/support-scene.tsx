import { percentOf } from "../../application/impact";
import { Question } from "../ui/question";
import { Reveal } from "../ui/reveal";
import { Scene } from "../ui/scene";
import { Stage, Takeaway } from "../ui/slide";
import { BarChart } from "../visuals/bar-chart";
import { Steps } from "../visuals/steps";
import { Chip } from "../visuals/tiles";
import type { SceneProps } from "./scene-props";

export function SupportScene({ talk, scene }: SceneProps) {
  const { ticketsSeller, ticketsZones, ticketsInvestigate } = talk.metrics;
  const total = ticketsSeller.value + ticketsZones.value + ticketsInvestigate.value;

  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Stage className="flex-col gap-[4vh]">
        <Steps
          items={[
            { icon: "💬", title: "Chat" },
            { icon: "🎫", title: "One ticket" },
            { icon: "🔎", title: "Triage", hint: "with a playbook", hot: true },
          ]}
        />
        <BarChart
          labelWidth="14rem"
          items={[
            {
              label: "Create / update seller",
              value: ticketsSeller.value,
              display: "~38",
              share: percentOf(ticketsSeller.value, total),
              hot: true,
            },
            {
              label: "Zones & routes",
              value: ticketsZones.value,
              display: "~27",
              share: percentOf(ticketsZones.value, total),
            },
            {
              label: "Investigate failure",
              value: ticketsInvestigate.value,
              display: "~18",
              share: percentOf(ticketsInvestigate.value, total),
            },
          ]}
        />
        <Reveal step={3}>
          <Chip hot>⏱ Checked every few minutes</Chip>
        </Reveal>
      </Stage>
      <Takeaway>The inbox became *a queue of tickets*.</Takeaway>
    </Scene>
  );
}
