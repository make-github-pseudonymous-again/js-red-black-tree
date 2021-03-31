import assert from 'assert';
import BLACK from '../color/BLACK.js';
import RED from '../color/RED.js';
import Node from '../types/Node.js';

import replace_node from './replace_node.js';
import delete_case1 from './delete_case1.js';

import prune from './prune.js';

/**
 * Delete a node <code>n</code> that has no non-leaf child.
 *
 * Precondition:
 *   - n has no non-leaf child.
 *   - n is not the root
 *
 * @param {Node} n - The node to delete.
 */
const delete_no_child = (n) => {
	assert(n instanceof Node);
	assert(n.parent !== null);
	assert(n.left === null);
	assert(n.right === null);

	if (n._color === RED) {
		prune(n);
		return;
	}

	assert(n._color === BLACK);

	// Mock leaf since there is no left child
	// We use key = n.key to avoid mixing types, but this property is never
	// accessed.
	const leaf = new Node(BLACK, n.key);

	// Replace n with the mocked leaf
	replace_node(n, leaf);

	// If n is black, deleting it reduces the black-height of every path going
	// through it by 1. The leaf is black, so there are more things to fix.
	delete_case1(leaf);

	// Delete mocked leaf
	prune(leaf);
};

export default delete_no_child;
