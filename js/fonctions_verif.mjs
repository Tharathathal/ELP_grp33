import fs from 'fs';

export function verifMot(mot){
    return new Promise((resolve, reject) => {
        if (mot.length<3){
            reject("Erreur : mot trop court.");
        }
        const dico = './dico.txt';
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

export function verifLettres(mot, main){
    const lettres = mot.split("");
    for (const lettre of lettres){
        if (!main.includes(lettre)){
            return "Erreur : "+ lettre +" n'est pas dans la main."
        };
    };
    return true;
}