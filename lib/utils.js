'use strict';
const fs = require('fs-extra');
const execa = require('execa');
const { join, basename, extname } = require('path');

function addslashes(string) {
    return string.replace(/\\/g, '\\\\').
    replace(/\u0008/g, '\\b').
    replace(/\t/g, '\\t').
    replace(/\n/g, '\\n').
    replace(/\f/g, '\\f').
    replace(/\r/g, '\\r').
    replace(/'/g, '\\\'').
    replace(/"/g, '\\"');
}

module.exports.addslashes = addslashes;

async function exportGraph(graph, filepath) {
    const contents = graph.toString();
    //TODO: This will break outise unix :)
    const tmp = await fs.mkdtemp('/tmp/graph');
    const name = basename(filepath);
    const format = extname(filepath).replace('.', '');
    const filename = join(tmp, `${name}.dot`);

    await fs.writeFile(filename, contents);

    return exportMedia(filename, filepath, format).then(_ => {
        return { filepath, filename };
    });
}

module.exports.exportGraph = exportGraph;

/**
 * NOTE: We can use css with the SVG format
 * Use the class attribute in nodes or edges. 
 * Use the stylesheet attribute in the graph 
 * (or pass -Gstylesheet=whatever.css in the CLI.
 * @see https://ralsina.gitlab.io/boxes-book/styles/forest.css
 * ```css
 * svg {
 *  width: 100%;
 * }
 * ellipse { 
 *  fill: white;
 * }
 * .HEAD ellipse{
 *  fill: lightyellow;
 * }
 * .cluster polygon {
 *   fill: lightblue;
 * }
 * 
 * text {
 *    font-family: 'Titillium Web', sans-serif;
 * }
 * ```
 * @param {String} input Path to dot file
 * @param {String} output Path for output
 * @param {String} format One of the valid formats
 */
function exportMedia(input, output, format = 'png') {
    const formats = ['dot', 'xdot', 'ps', 'pdf', 'svg', 'fig', 'png', 'gif', 'jpg', 'jpeg', 'json', 'imap', 'cmapx'];
    if (!formats.includes(format)) {
        return Promise.reject(new Error(`Unrecognized format, it should be one of "${formats}"`));
    }

    return execa('dot', [`-T${format}`, input, '-o', output]);
}

module.exports.exportMedia = exportMedia;