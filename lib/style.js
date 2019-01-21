'use strict';

module.exports = {
    useDbSchema: true,
    useColumnTypes: true,
    table: {
        headerBackgroundColor: '#d3d3d3',
        headerFontColor: '#333333',
        rowBackgroundColor: '#ffffff',
        rowFontColor: '#333333',
    },
    graph: {
        style: 'filled',
        bgcolor: '#F7F7F7',
        fontsize: 12,
        labelloc: 't',
        concentrate: true,
        splines: 'polyline',
        overlap: false,
        nodesep: 1,
        rankdir: 'LR',
        pad: 0.5,
        ranksep: 2,
        esep: true,
        fontname: 'Helvetica Neue'
    },
    node: {
        margin: 0,
        shape: 'rectangle',
        fontname: 'Helvetica Neue'
    },
    edge: {
        color: '#003049',
        penwidth: 1.8,
        fontname: 'Helvetica Neue'
    },
    relations: {
        hasOne: {
            dir: 'both',
            color: '#D62828',
            arrowhead: 'tee',
            arrowtail: 'none',
        },
        oneToOne: {
            dir: 'both',
            color: '#D62828',
            arrowhead: 'tee',
            arrowtail: 'tee',
        },
        belongsTo: {
            dir: 'both',
            color: '#F77F00',
            arrowhead: 'tee',
            arrowtail: 'crow',
        },
        hasMany: {
            dir: 'both',
            color: '#FCBF49',
            arrowhead: 'crow',
            arrowtail: 'none',
        },
        manyToMany: {
            dir: 'both',
            color: '#FCBF49',
            arrowhead: 'crow',
            arrowtail: 'crow',
        }
    }
};