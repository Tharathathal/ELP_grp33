import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export async function getInput() {
  const rl = readline.createInterface({ input, output });

  const answer = await rl.question("Quel mot voulez-vous jouer ? ");

  rl.close();
}
