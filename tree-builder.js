/**
 *
 * @param { string } nodeText
 * @param { Record<string, import('./types/node').MermirNode>} nodeMap
 * @returns { import('./types/node').MermirNode }
 */
function getNodeFromText(nodeText, nodeMap) {
  let node = nodeMap[nodeText];

  if (!node) {
    node = { value: nodeText };
    nodeMap[nodeText] = node;
  }

  return node;
}

/**
 *
 * @param {string} diagram
 * @returns
 */
export function buildTree(diagram) {
  /**
   * @type { Map<import('./types/node').MermirNode, any> }
   */
  const rootNodesMap = new Map();

  /**
   * @type { Record<string, import('./types/node').MermirNode> }
   */
  let nodeMap = {};

  const regex = /\n|(\r\n)/;

  const rows = regex[Symbol.split](diagram);

  rows.forEach((row) => {
    if (!row) {
      return;
    }

    const [parent, child] = row.split("-->");

    const parentNode = getNodeFromText(parent, nodeMap);
    const childNode = getNodeFromText(child, nodeMap);

    if (!parentNode.children) {
      parentNode.children = [];
    }

    parentNode.children.push(childNode);
    rootNodesMap.set(parentNode, true);
    rootNodesMap.delete(childNode);
  });

  return Array.from(rootNodesMap.keys());
}
