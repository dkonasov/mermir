#!/usr/bin/env node

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { resolve } from "path";

import { parseFile } from "../file-parser.js";
import { buildTree } from "../tree-builder.js";
import { makeTasksQueue } from "../make-tasks-queue.js";
import { runQueue } from "../run-queue.js";

yargs(hideBin(process.argv))
  .command(
    "run",
    "run the flow",
    () => {},
    async (argv) => {
      const configContents = await parseFile(resolve(argv.workflow ?? "./mermir.mermaid"));
      const tasksTree = buildTree(configContents);
      const tasksQueue = makeTasksQueue(tasksTree);

      runQueue(tasksQueue);
    },
  )
  .option('workflow', {
    alias: 'w',
    description: 'path to custom workflow file',
    type: 'string',
  })
  .parse();
