/* https://github.com/sfrenot/javascript/blob/master/projet2/Readme.md */

//verifMot(inputMot, (error, result) => {

//verifMot(inputMot)
//.then((result) =>{})
//.catch((error) =>{});

//result = await verifMot(inputMot);

import fs from 'fs';

import * as gestion from '../JS/gestion_main_plateau.js';
import * as verif from '../JS/fonctions_verif.js';
import * as rl from '../JS/readline.js';
//const gestion = require('./gestion_main_plateau.mjs');
//var fs = require("fs");
const file = "./partie_jarnac.txt";

const handleError = (err) => {
    if (err) {  
      return console.error(err);
    }
    console.log("Data written.")
    fs.readFile(file,handleReadError);
  };

const handleReadError = (err,data) => {
    if (err) {  
        return console.error(err);
    }
    console.log("Data read :\n"+ data)
};

const lettersAndCounts = [
    { letter: 'a', count: 14 },
    { letter: 'b', count: 4 },
    { letter: 'c', count: 7 },
    { letter: 'd', count: 5 },
    { letter: 'e', count: 19 },
    { letter: 'f', count: 2 },
    { letter: 'g', count: 4 },
    { letter: 'h', count: 2 },
    { letter: 'i', count: 11 },
    { letter: 'j', count: 1 },
    { letter: 'k', count: 1 },
    { letter: 'l', count: 6 },
    { letter: 'm', count: 5 },
    { letter: 'n', count: 9 },
    { letter: 'o', count: 8 },
    { letter: 'p', count: 4 },
    { letter: 'q', count: 1 },
    { letter: 'r', count: 10 },
    { letter: 's', count: 7 },
    { letter: 't', count: 9 },
    { letter: 'u', count: 8 },
    { letter: 'v', count: 2 },
    { letter: 'w', count: 1 },
    { letter: 'x', count: 1 },
    { letter: 'y', count: 1 },
    { letter: 'z', count: 2 }
   ];
   
var sac = lettersAndCounts.flatMap(({ letter, count }) => Array.from({ length: count }, () => letter));
var plateauJ1 = Array.from({ length: 8 }, () => Array(9).fill("   "));
var plateauJ2 = Array.from({ length: 8 }, () => Array(9).fill("   "));
var mainJ1 = Array(6).fill(null);
var mainJ2 = Array(6).fill(null);

/* const data = "Lettres piochées par le joueur 1 : " + mainJ1.join(" ; ") + "\nPlateau :\n" + plateauJ1.join("\n");
fs.writeFile(file, data, handleError); */

async function nvMot(joueur, main, plateau){
    const inputMot = await rl.getMot();
    
    if (verif.verifLettres(inputMot, main) == true){
        verif.verifMot(inputMot)
            .then((result) =>{
                console.log(result);
                plateau = gestion.ajoutPlateau(inputMot, plateau);
                main = gestion.enleveMain(inputMot,main);
                const data = "Lettres piochées par le joueur 1 : "+ main.join(" ; ") +"\nPlateau J1 :\n"+ plateau.join("\n")+"\n";
                fs.writeFile(file, data, handleError);
            })
            .catch((error) =>{console.log(error)});
    }else{
        console.log(verif.verifLettres(inputMot, main));
    }     
    
    return main, plateau
}

var mainTest = ["m","o","t",,,];    
gestion.pioche_début(sac,mainTest);
var continueTour = true;


while (continueTour){    
    const data = "Lettres piochées par le joueur 1 : "+ mainTest.join(" ; ") +"\nPlateau J1 :\n"+ plateauJ1.join("\n")+"\n";
    fs.writeFile(file, data, handleError);

    var action = await rl.getAction();
    if (action == "3"){
        break;
    }
    if (action == "1"){
        mainTest, plateauJ1 = await nvMot(1, mainTest, plateauJ1);
    }
    if (action == "2"){
        mainTest, plateauJ1 = await ajoutMot(1, mainTest, plateauJ1);
    }
}
/* const data = "Lettres piochées par le joueur 1 : "+ mainTest.join(" ; ") +"\nPlateau J1 :\n"+ plateauJ1.join("\n")+"\n";
fs.writeFile(file, data, handleError); */

/* fs.appendFile(file,mainJ2.join(" ; "),handleError); */
