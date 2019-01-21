'use strict';

const { addslashes } = require('./utils');
const Attribute = require('./attribute');

class Edge {
    /**
     * Creates a new Edge/link between two nodes.
     * 
     * @param {Node} from Starting node in the edge
     * @param {Node} to Destination node
     */
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.attributes = {};
    }

    get name() {
        return this.from.name + '_' + this.to.name;
    }

    setFromPort(from) {
        this.fromPort = from;
    }

    setToPort(to) {
        this.toPort = to;
    }

    setAttribute(key, value) {
        this.attributes[key] = new Attribute(key, value);
    }

    toString() {
        let attributes = [];

        Object.values(this.attributes).map(attribute => {
            attributes.push(attribute.toString());
        });

        attributes = attributes.join('\n');

        let to = addslashes(this.to.name);
        to += this.toPort ? `:${this.toPort}` : '';

        let from = addslashes(this.from.name);
        from += this.fromPort ? `:${this.fromPort}` : '';

        return `
    ${from} -> ${to} [
        ${attributes}
    ]
        `;
    }
}

module.exports = Edge;