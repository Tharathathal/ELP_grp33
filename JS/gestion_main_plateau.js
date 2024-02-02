function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

export function pioche_début(sac,main){
    for (var i=0 ; i<6 ; i++){
        if (main[i] == null){
            var lettre = sac.splice(getRandomInt(sac.length),1);
            main[i] = lettre
        }
    }
    return main;
}

export function add_main(mot, main){
    for (var i=0 ; i<mot.length ; i++){
        main.push(mot[i]);
    }
    return main;
}


export function ajoutPlateau(mot,plateau){
    for (var i=0 ; i<plateau.length ; i++){
        if (plateau[i][0] == "   "){
            for (var j=0 ; j<mot.length ; j++){
                plateau[i][j] = " "+mot[j]+" ";
            }
            i = plateau.length
        }
    }
    return plateau
}

export function retourMain(plateau,ligne,main){
    for (var i=0 ; i<plateau[ligne].length ; i++){
        if (plateau[ligne][i] != "   "){
            main.push(plateau[ligne][i].trim());
        }
    }
    return plateau ; main

    
}

export function enleveMain(mot, main){
    for (var lettre of mot){
        for (var index in main){
            if (main[index]==lettre){
                main[index] = null;
                break;
            }
        }
    }
    return main
}
