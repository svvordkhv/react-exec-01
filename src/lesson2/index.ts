import { createInterface } from "readline";

import { Solver } from "./Solver";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (): Promise<null> =>
  new Promise((resolve) => {
    rl.question("> ", (answer: string) => {
      const result = Solver.result(answer);

      if (result) {
        console.log(`Result: ${result}`);
      }

      resolve();
    });
  });

async function app(): Promise<null> {
  while (true) {
    await question();
  }
}

app();
