import { DirectedGraphI, LinkI, NodeI, RouteI } from './get-shortest-path.types';

class Node implements NodeI {
  public id: string;

  constructor(id: string) {
    this.id = id;
  }
}

class Link implements LinkI {
  public source: string;
  public target: string;
  public weight: number;

  constructor(source: string, target: string, weight: number) {
    this.source = source;
    this.target = target;
    this.weight = weight;
  }
}

class Route implements RouteI {
  public path: string[];
  public weight: number;

  constructor(path: string[], weight: number) {
    this.path = path;
    this.weight = weight;
  }

  addNode(node: string) {
    this.path.push(node);
  }

  addWeight(weight: number) {
    this.weight += weight;
  }
}

export default class DirectedGraph implements DirectedGraphI {
  public nodes: NodeI[] = [];
  public links: LinkI[] = [];
  public routes: RouteI[] = [];

  addNode(id: string) {
    const node: NodeI = new Node(id);
    this.nodes.push(node);
  }

  addLink(source: string, target: string, weight: number) {
    const link: LinkI = new Link(source, target, weight);
    this.links.push(link);
  }

  shortestPath(source: string, target: string) {
    this.routes = [];
    // Return null if source or target is not found
    if (
      !this.nodes.find((node: NodeI) => node.id === source) ||
      !this.nodes.find((node: NodeI) => node.id === target)
    ) {
      return null;
    }

    // Return, if source and target are the same
    if (source === target) {
      return { path: [source], weight: 0 };
    }

    // visitedNodes is a set of nodes that have been visited to avoid cycles, if any
    const visitedNodes = new Set();

    // queue is a list of nodes to be visited in the future (BFS)
    const queue: string[] = [source];

    // links is the set of  current route being explored
    let exploredLinks: LinkI[];

    // loop until queue is empty,
    while (queue.length > 0) {
      // get the first node in the queue and remove it from the queue
      const currentNode = queue.shift();

      // add the current node to the visited nodes set to avoid cycles
      visitedNodes.add(currentNode);

      // get all the links that can be reached from source(indirectly) and currentNode(directly)
      exploredLinks = this.links.filter((link: LinkI) => link.source === currentNode);

      // add all the links that can be reached from currentNode to the queue
      for (const link of exploredLinks) {
        // if the target of the link is not in the visited nodes set, add it to the queue
        if (!visitedNodes.has(link.target)) {
          queue.push(link.target);
        }
        // if the source of the link is same as source, then add New Route to the routes array
        if (link.source === source) {
          const route: RouteI = new Route([link.source, link.target], link.weight);
          this.routes.push(route);
        } else {
          // if the source of the link is not same as source, then add the link to the current route by adding the target of link to path of appropriate route
          const oldRoute = this.routes.find(
            (route) => route.path[route.path.length - 1] === link.source,
          );

          if (oldRoute) {
            // add the target of link to the path of the old route
            const newRoute: RouteI = new Route(
              [...oldRoute.path, link.target],
              oldRoute.weight + link.weight,
            );

            if (!this.routes.find((route) => route.path.join('') === newRoute.path.join(''))) {
              this.routes.push(newRoute);
            }
          }
        }
      }
    }
    return this.routes;
  }
}
