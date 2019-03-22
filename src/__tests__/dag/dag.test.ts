import {DagNode} from "../../datasctructures/DagNode";
import DAG from "../../datasctructures/DAG";

interface DAGType<T> {
    rootNodes: Array<DagNode<T>>;
}

test("Create DAG", () => {
    const dag = new DAG();

    expect(dag).toEqual( { rootNodes: [] } )
});

test("push root node", () => {
    const dag = new DAG(),
        node = dag.pushNode('test');

    expect(dag).toEqual({ rootNodes: [node] })
});

test("simple tree", () => {
    const dag = new DAG(),
        rootNode = dag.pushNode('root node'),
        firstNode = dag.pushNode('first child', [rootNode]),
        secondNode = dag.pushNode('second child', [firstNode]);

    expect(dag).toEqual({
        rootNodes: [
            {
                value: 'root node',
                nodes: [{
                        value: 'first child',
                        nodes: [{
                            value: 'second child',
                            nodes: []
                        }]
                    }]
            }
        ]
    } as DAGType<string>)
});

test("for each node", () => {
    const dag = new DAG(),
        rootNode = dag.pushNode('root node'),
        firstNode = dag.pushNode('first child', [rootNode]),
        secondNode = dag.pushNode('second child', [firstNode]);

    const mockFn = jest.fn(node => {});

    dag.forEachNode(rootNode, mockFn);

    expect(mockFn.mock.calls.length).toBe(3);
    expect(mockFn.mock.calls[0][0]).toEqual(rootNode);
    expect(mockFn.mock.calls[1][0]).toEqual(firstNode);
    expect(mockFn.mock.calls[2][0]).toEqual(secondNode);
});



