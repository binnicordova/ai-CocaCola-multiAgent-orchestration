export type AgentKind = "agent" | "human";

export interface Agent {
  readonly id: string;
  readonly name: string;
  /** Short label for diagrams. */
  readonly short: string;
  /** The verb of the handoff: Plan, Build, Review… */
  readonly role: string;
  /** Character face (public path) that gives the role a personality. */
  readonly avatar: string;
  readonly duty: string;
  readonly kind: AgentKind;
  /** Accent colour used on the relay card. */
  readonly color: string;
}
