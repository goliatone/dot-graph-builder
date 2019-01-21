'use strict';

const { addslashes } = require('./utils');

class Attribute {
    constructor(key, value = '') {
        this.key = key;
        this.value = value.toString();
    }

    toString() {
        let { key, value } = this;

        if (key === 'url') {
            key = 'URL';
        }

        if (this.containsSpecialCharacters()) {
            value = `"${this.encodeSpecials()}"`;
        } else if (!this.isValueInHtml()) {
            value = `"${addslashes(value)}"`;
        }

        return `${key}=${value}`;
    }

    isValueInHtml() {
        return this.value[0] === '<';
    }

    containsSpecialCharacters() {
        return !!this.value.match(/\\/);
    }

    /**
     * Encode special characters so the escape sequences aren't removed
     *
     * @see http://www.graphviz.org/doc/info/attrs.html#k:escString
     */
    encodeSpecials() {
        const value = this.value;
        const regex = /(\'|"|\\x00|\\\\(?![\\\\NGETHLnlr]))/g;
        return value.replace(regex, '\\\\$0');
    }
}

module.exports = Attribute;