'use strict';
const { Node, Edge, Graph, style } = require('..');

const nodeA = new Node('A', 'a');
const nodeB = new Node('B', 'b');

const edge = new Edge(nodeA, nodeB);

Object.keys(style.edge).map(key => {
    edge.setAttribute(key, style.edge[key]);
});

const graph = new Graph({});

Object.keys(style.graph).map(key => {
    graph.setAttribute(key, style.graph[key]);
});

graph.addNode(nodeA);
graph.addNode(nodeB);
graph.link(edge);

console.log(graph.toString());