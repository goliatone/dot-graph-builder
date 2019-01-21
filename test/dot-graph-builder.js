'use strict';

const test = require('tape');
const sinon = require('sinon');

const Graph = require('..').Graph;

test('Module should be bootstraped OK', (t) => {
    t.ok(new Graph());
    t.end();
});