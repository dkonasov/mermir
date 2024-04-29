import { describe, expect, it } from "vitest";
import { resolve } from 'path';
import { parseFile } from "../file-parser";

describe('file parser', () => {
    it('should read file contents', async() => {
        const result = await parseFile(resolve('./test-data/base.mermaid'));

        expect(result).toBe(
`build-->deploy
typings-->deploy
build:styles-->deploy`
        )
    });

    it('should throw valid error if file was not found', async() => {
        await expect(parseFile(resolve('./non/existent/path'))).rejects.toThrow();
    });

    it('should throw valid error if file is invalid', async() => {
        await expect(parseFile(resolve('./test-data/invalid.mermaid'))).rejects.toThrow();
    });
});