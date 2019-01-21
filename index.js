/**
 * Export module dot-graph-builder.
 *
 * @type {Function}
 */
module.exports = {
    Graph: require('./lib/graph'),
    Node: require('./lib/node'),
    Edge: require('./lib/edge'),
    Attribute: require('./lib/attribute'),
    GraphBuilder: require('./lib/builder'),
    style: require('./lib/style'),
    utils: require('./lib/utils'),
};