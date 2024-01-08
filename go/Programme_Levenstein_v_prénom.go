package main

import (
	"fmt"
	"time"

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

	var mots = []string{
		"Alexandre", "Thomas", "Antoine", "Nicolas", "Pierre",
		"Paul", "François", "Louis", "Charles", "Jean",
		"Jacques", "Guillaume", "Lucas", "Mathieu", "Gabriel",
		"Raphaël", "Vincent", "Maxime", "Hugo", "Arthur",
		"Félix", "Étienne", "Nathan", "Samuel", "Olivier",
		"Léo", "Théo", "Matthias", "Benjamin", "Adrien",
		"Édouard", "Tristan", "Xavier", "Simon", "Damien",
		"Axel", "Cédric", "Baptiste", "Alexis", "Rémi",
		"Sébastien", "Maurice", "Pascal", "René", "André",
		"Georges", "Albert", "Roger", "Maurice", "Claude",
		"Marie", "Emma", "Léa", "Chloé", "Manon",
		"Camille", "Sarah", "Zoé", "Anaïs", "Julie",
		"Laura", "Clara", "Alice", "Eva", "Inès",
		"Charlotte", "Lola", "Louna", "Mathilde", "Louise",
		"Éléonore", "Lucie", "Margaux", "Romane", "Jade",
		"Ambre", "Léna", "Maëlle", "Céline", "Sophie",
		"Isabelle", "Nathalie", "Emilie", "Christine", "Valérie",
		"Catherine", "Danielle", "Nicole", "Monique", "Isabella",
		"Anna", "Maria", "Giovanna", "Rosa", "Angela",
		"Francesca", "Elena", "Luisa", "Gina", "Rita",
		"Léonie",
	}
	for i := 0; i < len(mots); i++ {
		lev_dist(mot_client, mots[i])
		time.Sleep(10 * time.Millisecond)
	}
}
