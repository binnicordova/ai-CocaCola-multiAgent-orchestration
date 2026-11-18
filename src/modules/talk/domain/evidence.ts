/** Percentages of the image, so a highlight survives any rendered size. */
export interface Highlight {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export interface Evidence {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  /** `*word*` marks an emphasised phrase. */
  readonly caption: string;
  readonly highlight?: Highlight;
}

export type EvidenceKey =
  | "fa4889RootCause"
  | "fa5379Chart"
  | "teamsMcpChat"
  | "teamsAgentMessage"
  | "noSkills"
  | "playbook20"
  | "delegationChat";
