/* https://github.com/sfrenot/javascript/blob/master/projet2/Readme.md */

//verifMot(inputMot, (error, result) => {

//verifMot(inputMot)
//.then((result) =>{})
//.catch((error) =>{});

//result = await verifMot(inputMot);
    


var fs = require("fs");
const file = "./JS/partie_jarnac.txt";

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
                    verifMot(inputMot)
                        .then((result) =>{
                            console.log(result);
                            plateau = ajoutPlateau(inputMot, plateau);
                            main = enleveMain(inputMot,main);
                            const data = "Lettres piochées par le joueur 1 : "+ main.join(" ; ") +"\nPlateau J1 :\n"+ plateau.join("\n")+"\n";
                            fs.writeFile(file, data, handleError);
                        })
                        .catch((error) =>{console.log(error)});
                }else{
                    console.log(verifLettres(inputMot, main));
                }
                continueTour = false;
            }
        }           
    }
    /* const data = "Lettres piochées par le joueur 1 : "+ main.join(" ; ") +"\nPlateau J1 :\n"+ plateau.join("\n")+"\n";
    fs.writeFile(file, data, handleError); */
    /* const data = "Lettres piochées par le joueur 1 : "+ mainJ1.join(" ; ") +"\nPlateau J1 :\n"+ plateauJ1.join("\n") +"\nLettres piochées par le joueur 2 : "+ mainJ2.join(" ; ") +"\nPlateau J2:\n"+ plateauJ2.join("\n") +"\n";
    fs.writeFile(file, data, handleError); */ 

    return main, plateau
}

function ajoutPlateau(mot,plateau){
    for (i=0 ; i<plateau.length ; i++){
        if (plateau[i][0] == "   "){
            for (j=0 ; j<mot.length ; j++){
                plateau[i][j] = " "+mot[j]+" ";
            }
            i = plateau.length
        }
    }
    return plateau
}

function enleveMain(mot, main){
    for (lettre of mot){
        for (index in main){
            if (main[index]==lettre){
                main[index] = null;
                break;
            }
        }
    }
    return main
}

function verifMot(mot){
    return new Promise((resolve, reject) => {
        if (mot.length<3){
            reject("Erreur : mot trop court.");
        }
        const dico = './JS/dico.txt';
        fs.readFile(dico, 'utf8', (err, data) => {
            if (err) {return console.error(err);}     
            if (data.includes(mot)) {
                resolve("Mot Valide.");    
            } else {    
                reject("Erreur : mot non trouvé dans le dictionnaire.");    
            }
        });
    })
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


var mainTest = ["m","o","t",,,];
mainTest, plateauJ1 = tour(1, mainTest, plateauJ1, "joue");
/* const data = "Lettres piochées par le joueur 1 : "+ mainTest.join(" ; ") +"\nPlateau J1 :\n"+ plateauJ1.join("\n")+"\n";
fs.writeFile(file, data, handleError); */

/* fs.appendFile(file,mainJ2.join(" ; "),handleError); */