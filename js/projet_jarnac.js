/* https://github.com/sfrenot/javascript/blob/master/projet2/Readme.md */

var fs = require("fs");
const file = "partie_jarnac.txt";

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
   
const sac = lettersAndCounts.flatMap(({ letter, count }) => Array.from({ length: count }, () => letter));
const plateauJ1 = Array.from({ length: 8 }, () => Array(9).fill("   "));
const plateauJ2 = Array.from({ length: 8 }, () => Array(9).fill("   "));
const mainJ1 = Array(6).fill(null);
const mainJ2 = Array(6).fill(null);

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function pioche(main){
    for (i=0 ; i<6 ; i++){
        if (main[i] == null){
            lettre = sac.splice(getRandomInt(sac.length),1);
            main[i] = lettre
        }
        console.log(mainJ1[i]);
    }
}

/* const data = "Lettres piochées par le joueur 1 : " + mainJ1.join(" ; ") + "\nPlateau :\n" + plateauJ1.join("\n");
fs.writeFile(file, data, handleError); */

function tour(joueur, main, plateau, action){
    var continueTour = true;
    if (action == "jarnac"){

    }
    else{
        pioche(main);
        while (continueTour){
            const inputMot = "mot";
            if (inputMot == "je passe"){
                break;
            }
            else{
                if (verifLettres(inputMot, main) == true){
                    console.log(verifMot(inputMot, (error, result) => {
                        if (error) {
                            console.error(error);
                        } else {
                            console.log(result);
                            for (i=0 ; i<plateau.length ; i++){
                                if (plateau[i][0] == "   "){
                                    for (j=0 ; j<inputMot.length ; j++){
                                        console.log(inputMot[j]);
                                        plateau[i][j] = inputMot[j];
                                    }
                                    i = plateau.length
                                }
                            }}
                        }));
                }else{
                    console.log(verifLettres(inputMot, main));
                }
                continueTour = false;
            }
        }           
    }
    const data = "Lettres piochées par le joueur 1 : "+ main.join(" ; ") +"\nPlateau J1 :\n"+ plateau.join("\n")+"\n";
    fs.writeFile(file, data, handleError);
    /* const data = "Lettres piochées par le joueur 1 : "+ mainJ1.join(" ; ") +"\nPlateau J1 :\n"+ plateauJ1.join("\n") +"\nLettres piochées par le joueur 2 : "+ mainJ2.join(" ; ") +"\nPlateau J2:\n"+ plateauJ2.join("\n") +"\n";
    fs.writeFile(file, data, handleError); */ 

    return main, plateau
}

function verifMot(mot, callback){
    if (mot.length<3){
        return "Erreur : mot trop court."
    }
    const dico = 'dico.txt';
    fs.readFile(dico, 'utf8', (err, data) => {
        if (err) {return console.error(err);}     
        if (data.includes(mot)) {
            callback(null, "Mot Valide.");    
        } else {    
            callback("Erreur : mot non trouvé dans le dictionnaire.", null);    
        }
    })
    ;
}

function verifLettres(mot, main){
    const lettres = mot.split("");
    for (const lettre of lettres){
        if (!main.includes(lettre)){
            return "Erreur : "+ lettre +" n'est pas dans la main."
        };
    };
    return true;
}


const mainTest = ["m","o","t",,,];
tour(1, mainTest, plateauJ1, "joue");

/* fs.appendFile(file,mainJ2.join(" ; "),handleError); */