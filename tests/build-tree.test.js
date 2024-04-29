import { describe, expect, it } from "vitest";
import { buildTree } from "../tree-builder";

describe('tree builder', () => {
    it('should build valid tree', () => {
        expect(
            buildTree(
`a-->b
a-->c`
            )
        ).toEqual([{ value: 'a', children: [{value: 'b'}, { value: 'c'}]}]);
    });
});