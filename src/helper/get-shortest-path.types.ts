export interface NodeI {
  id: string;
}

export interface LinkI {
  source: string;
  target: string;
  weight: number;
}

export interface RouteI {
  path: string[];
  weight: number;
  addNode: (node: string) => void;
  addWeight: (weight: number) => void;
}

export interface DirectedGraphI {
  nodes: NodeI[];
  links: LinkI[];
  routes: RouteI[];
  addNode: (id: string) => void;
  addLink: (source: string, target: string, weight: number) => void;
  shortestPath: (
    source: string,
    target: string,
  ) => RouteI[] | { path: string[]; weight: number } | null | void;
}
