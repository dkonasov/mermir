import { readFile } from 'fs/promises';
import mermaid from 'mermaid';

/**
 * 
 * @param {string} url 
 */
export async function parseFile(url) {
    const fileContents = await readFile(url, 'utf-8');
    await mermaid.parse(fileContents);
    const headerEndIndex = /\n|(\r\n)/.exec(fileContents)?.index ?? 0;

    return Promise.resolve(fileContents.slice(headerEndIndex + 1));
}