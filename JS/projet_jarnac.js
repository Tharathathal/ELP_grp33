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

const handleError = (err) => {
    if (err) {  
      return console.error(err);
    }
    //console.log("Data written.")
    fs.readFile(file,handleReadError);
  };

const handleReadError = (err,data) => {
    if (err) {  
        return console.error(err);
    }
    //console.log("Data read :\n"+ data)
};

const file = "./partie_jarnac.txt";
fs.writeFile(file, "Nouvelle partie\n\n", handleError);

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
var mainJ1 = Array(5).fill(null);
var mainJ2 = Array(5).fill(null);
var volees = [];



var mainTest = ["m","o","t","s",];
var plateauTest = [
    [ ' m ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ' ],
    [ ' m ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ' ],
    [ ' m ', ' m ', ' m ', '   ', '   ', '   ', '   ', '   ', '   ' ],
    [ ' m ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ' ],
    [ ' m ', ' m ', '   ', '   ', '   ', '   ', '   ', '   ', '   ' ],
    [ ' m ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ' ],
    [ ' m ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ' ],
    [ ' m ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ' ],
    [ ' m ', ' m ', '   ', '   ', '   ', '   ', '   ', '   ', '   ' ]
  ]

mainTest = await gestion.pioche_début(sac,mainTest);
mainJ1 = await gestion.pioche_début(sac,mainJ1);
mainJ2 = await gestion.pioche_début(sac,mainJ2);
var continueTour = true;
var continuePartie = true;

while (continuePartie){
    var jarnac = await rl.Jarnac();
    if (jarnac == "1"){
        volees, plateauJ1 = await Jarnac(1, mainJ2, plateauJ2, volees, plateauJ1);
    }
    await tour(1,mainJ1,plateauJ1);
    if (verif.verifFin(plateauJ1) == true){
        break;
    }
    
    jarnac = await rl.Jarnac();
    if (jarnac == "1"){
        volees, plateauJ2 = await Jarnac(2, mainJ1, plateauJ1, volees, plateauJ2);
    }
    await tour(2,mainJ2,plateauJ2);
    if (verif.verifFin(plateauJ2) == true){
        break;
    }
}

console.log("Partie finie !")
var pointsJ1 = await gestion.comptePoints(plateauJ1);
var pointsJ2 = await gestion.comptePoints(plateauJ2);
if (pointsJ1>pointsJ2){console.log("Joueur 1 a gagné.")}
if (pointsJ1<pointsJ2){console.log("Joueur 2 a gagné.")}
if (pointsJ1==pointsJ2){console.log("Egalité !")}



async function tour (joueur,main,plateau){
    while (continueTour){        
        main = await gestion.pioche_tour(sac,main);
        const data = "Lettres piochées par le joueur "+ joueur +" : "+ main.join(" ; ") +"\nPlateau J"+ joueur +" :\n"+ plateau.join("\n")+"\n";
        fs.appendFile(file, data, handleError);
        console.log(data)


        var action = await rl.getAction();
        if (action == "3"){
            break;
        }
        if (action == "1"){
            main, plateau = await nvMot(1, main, plateau);
        }
        if (action == "2"){
            var ligne = await rl.getLigne();
            plateau, main = await gestion.retourMain(plateau,Number(ligne),main);
            main, plateau = await nvMot(joueur, main, plateau);
        }
        
    }
}

async function nvMot(joueur, main, plateau){
    var inputMot = await rl.getMot();
    
    if (verif.verifLettres(inputMot, main) == true){
        verif.verifMot(inputMot)
            .then(async (result) =>{
                console.log(result);
                plateau = await gestion.ajoutPlateau(inputMot, plateau);
                main = await gestion.enleveMain(inputMot,main);
                const data = "Lettres piochées par le joueur "+ joueur +" : "+ main.join(" ; ") +"\nPlateau J"+ joueur +" :\n"+ plateau.join("\n")+"\n";
                fs.appendFile(file, data, handleError);
                console.log(data)
            })
            .catch((error) =>{console.log(error)});
    }else{
        console.log(verif.verifLettres(inputMot, main));
    }     
    
    return main, plateau;
}


async function Jarnac(joueur, otherMain, otherPlateau,volees,plateau){
    var ligne = await rl.getStolenWord();
    if (ligne !=8){
        otherPlateau, volees = await gestion.retourMain(otherPlateau,Number(ligne),volees);
    }
    var lettres = await rl.getStolenLetters();
    volees = await gestion.ajouteMain(lettres,volees);
    var motVolees = ""
    for (var lettre of volees){
        motVolees += lettre;
    }
    otherMain = gestion.enleveMain(motVolees,otherMain);
    volees, plateau = await nvMot(joueur,volees,plateau);
    return volees, plateau;
}
/* const data = "Lettres piochées par le joueur 1 : "+ mainTest.join(" ; ") +"\nPlateau J1 :\n"+ plateauJ1.join("\n")+"\n";
fs.writeFile(file, data, handleError); */

/* fs.appendFile(file,mainJ2.join(" ; "),handleError); */
