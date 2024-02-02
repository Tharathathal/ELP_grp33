import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export async function getMot() {
  const rl = readline.createInterface({ input, output });

  const answer = await rl.question("Quel mot voulez-vous jouer ?  ");

  rl.close();
  return answer;
}

export async function getAction() {
  const rl = readline.createInterface({ input, output });

  const answer = await rl.question("Quel action voulez vous effectuer ? [1: jouer, 2: je passe, 3: jarnac]  ");

  rl.close();
  return answer;
}

export async function getStolenWord() {
  const rl = readline.createInterface({ input, output });

  const answer = await rl.question("Quelle ligne voulez-vous récupérer ? [0->7]  ");

  rl.close();
  return answer;
}

export async function getStolenLetters() {
  const rl = readline.createInterface({ input, output });

  const answer = await rl.question("Quelle.s lettre.s voulez-vous récupérer ? [ex:aze]  ");

  rl.close();
  return answer;
}