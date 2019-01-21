'use strict';

const { addslashes } = require('./utils');
const Attribute = require('./attribute');

class Node {
    constructor(name, label) {
        this.name = name;
        this.label = label;

        this.attributes = {};
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

        let name = addslashes(this.name);
        return `
    "${name}" [
        ${attributes}
    ]
        `;
    }
}

module.exports = Node;