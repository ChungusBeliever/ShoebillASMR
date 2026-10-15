import type { ComponentType } from "react";

export interface GameDefinition {
  /** Used in the URL: /games/<slug> */
  slug: string;
  title: string;
  Component: ComponentType;
}
