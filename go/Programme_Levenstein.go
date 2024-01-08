package main

import (
	"fmt"

	"github.com/arbovm/levenshtein"
)

func lev_dist(mot_client, mot string) {
	fmt.Printf("The distance between %v and %v is %v\n",
		mot_client, mot, levenshtein.Distance(mot_client, mot))

}

func main() {
	fmt.Print("Choisissez le mot qui servira de comparatif avec la liste: ")
	var mot_client string
	fmt.Scanf("%s", &mot_client)

	mots := []string{
		"chat", "chien", "maison", "voiture", "arbre",
		"ordinateur", "fenêtre", "porte", "jardin", "fleur",
		"soleil", "lune", "étoile", "montagne", "plage",
		"mer", "rivière", "oiseau", "poisson", "pomme",
		"banane", "orange", "kiwi", "fraise", "raisin",
		"tomate", "salade", "pain", "fromage", "café",
		"thé", "vélo", "train", "avion", "bus",
		"école", "professeur", "élève", "livre", "crayon",
		"piano", "guitare", "musique", "film", "photo",
		"amour", "amitié", "rire", "bonheur",
	}
	for _, mot := range mots {
		go lev_dist(mot_client, mot)
	}

}
