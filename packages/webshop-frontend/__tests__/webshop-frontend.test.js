'use strict';

const webshopFrontend = require('..');
const assert = require('assert').strict;

assert.strictEqual(webshopFrontend(), 'Hello from webshopFrontend');
console.info('webshopFrontend tests passed');
