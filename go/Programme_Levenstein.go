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

	var mots = []string{
		"lecture", "cinéma", "voyage", "photographie", "art",
		"musique", "danse", "sport", "cuisine", "jardinage",
		"astronomie", "science", "technologie", "informatique", "programmation",
		"histoire", "philosophie", "psychologie", "sociologie", "langues",
		"écriture", "poésie", "théâtre", "jeux de société", "jeux vidéo",
		"nature", "animaux", "environnement", "randonnée", "camping",
		"yoga", "méditation", "spiritualité", "mode", "design",
		"bricolage", "cuisine", "oenologie", "voyage spatial", "archéologie",
		"vélo", "voitures", "aventure", "aviation", "plongée",
		"philanthropie", "volontariat", "éducation", "innovation", "entrepreneuriat",
		"amour", "joie", "tristesse", "colère", "peur",
		"surprise", "enthousiasme", "calme", "espoir", "doute",
		"déception", "excitation", "stress", "réconfort", "courage",
		"fierté", "humilité", "gaieté", "mélancolie", "émotion",
		"sentiment", "affection", "intimité", "complicité", "attirance",
		"répulsion", "frustration", "plaisir", "divertissement", "créativité",
		"imagination", "exploration", "découverte", "apprentissage", "expression",
		"communication", "connexion", "introspection", "interactions", "collaboration",
		"inclusion", "autonomie", "accomplissement", "épanouissement", "bienveillance",
		"altruisme", "solidarité", "gratitude", "tolérance", "acceptation",
		"alcoolisme",
	}
	for i := 0; i < len(mots); i++ {
		lev_dist(mot_client, mots[i])
	}
}
