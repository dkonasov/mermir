/**
 * 
 * @param {Array<import("./types/node").MermirNode>} tree 
 */
export function makeTasksQueue(tree) {
    let childQueue = tree;
    let parentQueue = [];
    const result = [];

    while(childQueue.length > 0) {
        result.push(childQueue.map((val) => val.value));
        parentQueue = childQueue;
        childQueue = [];
        const childSet = new Set();

        parentQueue.forEach((node) => {
            if (node.children) {
                node.children.forEach((child) => {
                    if (!childSet.has(child.value)) {
                        childQueue.push(child);
                        childSet.add(child.value);
                    }
                })
            }
        });
    }

    return result;
}