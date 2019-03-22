/** DIRECTED ACYCLIC GRAPH */
import { DagNode} from "./DagNode";

export default class DAG<T> {

    private readonly rootNodes: DagNode<T>[];

    constructor(rootNodes: DagNode<T>[] = []) {
        this.rootNodes = rootNodes;
    }

    pushNode(value: T, parentNodes: DagNode<T>[] = [], childNodes: DagNode<T>[] = []): DagNode<T> {
        const node = new DagNode(value, childNodes);

        if (parentNodes.length == 0) {
            this.rootNodes.push(node);
        } else {
            parentNodes.forEach(parentNode => parentNode.nodes.push(node));
        }

        return node;
    }

    forEachNode(node: DagNode<T>, fn: (node: DagNode<T>) => any) {
        fn(node);

        node.nodes.forEach(subNode => this.forEachNode(subNode, fn));
    }
}