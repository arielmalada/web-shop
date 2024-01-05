'use strict';

const webshopBackend = require('..');
const assert = require('assert').strict;

assert.strictEqual(webshopBackend(), 'Hello from webshopBackend');
console.info('webshopBackend tests passed');
