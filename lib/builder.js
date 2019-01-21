'use strict';
const Node = require('./node');
const Edge = require('./edge');
const Graph = require('./graph');
const extend = require('gextend');

const style = require('./style');

class GraphBuilder {

    constructor(options) {
        this.options = extend({}, style, options);
    }

    build(collection, options = {}) {

        this.graph = new Graph();
        const { graph } = this.options;

        Object.keys(graph).map(key => {
            this.graph.setAttribute(key, graph[key]);
        });

        this.addModelsToGraph(collection);

        return this.graph;
    }

    addModelsToGraph(models = []) {
        models.map(model => {
            this.addNodeToGraph(model, model.nodeName, model.label);
        });

        models.map(model => {
            this.addRelationshipToGraph(model);
        });
    }

    /**
     * Add a new node to the graph.
     * 
     * @param {String} className Class name
     * @param {String} nodeName Node name
     * @param {String} label Node label
     */
    addNodeToGraph(model, nodeName, label) {

        let node = new Node(nodeName);
        node.setAttribute('label', this.getModelLabel(model, label));

        Object.keys(this.options.node).map(key => {
            node.setAttribute(key, this.options.node[key]);
        });

        this.graph.addNode(node);
    }

    addRelationshipToGraph(model) {
        const node = this.graph.findNode(model.nodeName);

        //Pseudocode
        for (let relationship of model.relationships) {

            const relatedModelNode = this.graph.findNode(relationship.modelNodeName);

            if (relatedModelNode) {
                const edge = new Edge(node, relatedModelNode);
                edge.setFromPort(relationship.localKey);
                edge.setToPort(relationship.foreignKey);
                edge.setAttribute('label', ' ');
                edge.setAttribute('xlabel', relationship.type + '\n' + relationship.name);

                Object.keys(this.options.edge).map(key => {
                    edge.setAttribute(key, this.options.edge[key]);
                });

                const relstyle = this.options.relations[relationship.type];
                Object.keys(relstyle).map(key => {
                    edge.setAttribute(key, relstyle[key]);
                });

                this.graph.link(edge);
            }
        }
    }

    getModelAttributes(model) {
        return model.attributes;
    }

    getModelLabel(model, label) {
        const {
            headerFontColor,
            headerBackgroundColor,
            rowBackgroundColor,
            rowFontColor
        } = this.options.table;

        let table = '<<table width="100%" height="100%" border="0" margin="0" cellborder="1" cellspacing="0" cellpadding="10">\n';
        table += `<tr width="100%"><td width="100%" bgcolor="${headerBackgroundColor}"><font color="${headerFontColor}">${label}</font></td></tr>\n`;
        //Show properties for table/model?
        if (this.options.useDbSchema) {
            //pseudo code: get model attributes
            let columns = this.getModelAttributes(model);

            for (let columnName in columns) {
                let column = columns[columnName];
                //attribute name, e.g. uuid

                label = columnName;
                if (this.options.useColumnTypes) {
                    label += ` (${column.type})`;
                }
                table += `<tr width="100%"><td port="${columnName}" align="left" width="100%"  bgcolor="${rowBackgroundColor}"><font color="${rowFontColor}" >${label}</font></td></tr>\n`;
            }
        }
        table += '</table>>';

        return table;
    }
}

module.exports = GraphBuilder;