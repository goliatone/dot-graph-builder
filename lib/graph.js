'use strict';
//https://www.graphviz.org/doc/info/attrs.html
// http://www.tonyballantyne.com/graphs.html
const extend = require('gextend');
const Attribute = require('./attribute');

const defaults = {
    name: 'G',
    /**
     * Valid values are:
     * digraph
     * graph 
     * subgraph
     */
    type: 'digraph',
    /**
     * If the graph is strict then
     * multiple edges are not allowed between 
     * the same pairs of nodes
     */
    strict: false,
    attributes: {},
    graphs: {},
    nodes: {},
    edges: {},
    path: ''
};

class Graph {
    constructor(config) {
        config = extend({}, defaults, config);
        this.init(config);
    }

    init(config) {
        extend(this, config);
    }

    addGraph(graph) {
        graph.type = 'subgraph';
        this.graphs[graph.name] = graph;
    }

    setAttribute(key, value) {
        this.attributes[key] = new Attribute(key, value);
    }

    addNode(node) {
        this.nodes[node.name] = node;
    }

    findNode(name) {
        if (!name) return null;
        if (this.nodes[name]) {
            return this.nodes[name];
        }

        for (let graph of this.graphs) {
            let node = this.graphs[graph].findNode(name);
            if (node) return node;
        }

        return null;
    }

    /**
     * Add an edge adding two links.
     * @param {Edge} edge Edge
     */
    link(edge) {
        this.edges[edge.name] = edge;
    }

    mergeAttributes() {
        let elements = [];

        const graphs = Object.values(this.graphs).map(g => g.toString());
        const attributes = Object.values(this.attributes).map(a => a.toString());
        const edges = Object.values(this.edges).map(e => e.toString());
        const nodes = Object.values(this.nodes).map(n => n.toString());

        elements = elements.concat(graphs);
        elements = elements.concat(attributes);
        elements = elements.concat(edges);
        elements = elements.concat(nodes);

        return elements.join('\n');
    }

    set directional(v) {
        this.type = v ? 'digraph' : 'graph';
    }
    get directional() {
        return this.type === 'digraph';
    }

    toString() {
        const strict = this.strict ? 'strict ' : '';
        const attributes = this.mergeAttributes();
        return `
${strict}${this.type} "${this.name}" {
    ${attributes}
}
        `;
    }
}

module.exports = Graph;