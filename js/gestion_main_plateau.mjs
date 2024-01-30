function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

export function pioche(main){
    for (i=0 ; i<6 ; i++){
        if (main[i] == null){
            lettre = sac.splice(getRandomInt(sac.length),1);
            main[i] = lettre
        }
        console.log(mainJ1[i]);
    }
}

export function ajoutPlateau(mot,plateau){
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

export function enleveMain(mot, main){
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
