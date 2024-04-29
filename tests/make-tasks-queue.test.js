import { describe, expect, it } from "vitest";
import { makeTasksQueue } from "../make-tasks-queue";

describe("make tasks queue", () => {
    it("should make queue from tree", () => {
        expect(
            makeTasksQueue([
                {
                    value: 'a',
                    children: [
                        { value: 'b' },
                        { value: 'c' }
                    ]
                }
            ])
        ).toEqual([['a'], ['b', 'c']]);
    });

    it("should validly process tree with two nodes pointing at the same child", () => {
        const commonChild = { value: 'deploy'};

        expect(
            makeTasksQueue(
                [
                    { value: 'build:js', children: [ commonChild ]},
                    { value: 'build:styles', children: [ commonChild ]},
                ]
            )
        ).toEqual([
            ['build:js', 'build:styles'],
            ['deploy']
        ])
    });
});