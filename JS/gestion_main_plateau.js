function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

export async function pioche_début(sac,main){
    for (var i=0 ; i<5 ; i++){
        if (main[i] == null){
            var lettre = sac.splice(getRandomInt(sac.length),1)[0];
            main[i] = lettre
        }
    }
    return main;
}

export async function pioche_tour(sac,main){
    main.push(sac.splice(getRandomInt(sac.length),1)[0]);
    return main;
}

export async function ajoutPlateau(mot,plateau){
    for (var i=0 ; i<plateau.length ; i++){
        if (plateau[i][0] == "   "){
            for (var j=0 ; j<mot.length ; j++){
                plateau[i][j] = " "+mot[j]+" ";
            }
            i = plateau.length
        }
    }
    return plateau;
}

export async function retourMain(plateau,ligne,main){
    for (var i=0 ; i<plateau[ligne].length ; i++){
        if (plateau[ligne][i] != "   "){
            main.push(plateau[ligne][i].trim());
            plateau[ligne][i] = "   ";
        }
    }
    return plateau, main;    
}

export async function enleveMain(mot, main){
    for (var lettre of mot){
        for (var index in main){
            if (main[index]==lettre){
                main.splice(index,1);
                break;
            }
        }
    }
    return main;
}

export async function ajouteMain(mot, main){
    for (var lettre of mot){
        main.push(lettre);
    }
    return main;
}

export async function comptePoints(plateau){
    var points = 0;
    for (var i=0; i<plateau.length; i++){
        var longueur = 0;
        for (var j=0; j<plateau[i].length; j++){
            if (plateau[i][j]!="   ")
                longueur = j+1;
        }
        points += longueur*longueur;
    }

    return points;
}