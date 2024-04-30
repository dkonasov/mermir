import { exec } from "child_process";
import { promisify } from "util";

const promisifiedExec = promisify(exec);

/**
 *
 * @param {Array<Array<string>>} queue
 */
export async function runQueue(queue) {
  for (const step of queue) {
    if (step.length === 1) {
      const { stdout } = await promisifiedExec(`npm run ${step[0]}`);
      console.log(stdout);
    } else {
      await Promise.all(
        step.map((task) =>
          promisifiedExec(`npm run ${task}`).then(({ stdout }) =>
            console.log(stdout),
          ),
        ),
      );
    }
  }
}
