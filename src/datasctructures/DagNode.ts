export class DagNode<T> {

    public readonly value : T;

    public readonly nodes : Array<DagNode<T>>;

    constructor(value: T, nodes: Array<DagNode<T>> = []) {
        this.value = value;
        this.nodes = nodes;
    }
}