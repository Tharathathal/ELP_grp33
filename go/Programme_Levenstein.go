package main

import (
	"fmt"
	"net"
	"time"

	"github.com/arbovm/levenshtein"
)

func lev_dist(mot_client, mot string, conn net.Conn) {
	//Calcule la distance de Levenshtein grâce à la library
	réponse := "- " + mot + " est de " + string(rune(levenshtein.Distance(mot_client, mot))) + "\n"
	fmt.Printf(réponse)
	conn.Write([]byte(réponse))
}

func handleClient(conn net.Conn) {
	defer conn.Close()
	fmt.Println("Connexion établie.")

	//Communication avec le serveur
	conn.Write([]byte("Quel prénom voulez-vous comparer ?"))

	buffer := make([]byte, 1024)
	n, err := conn.Read(buffer)
	if err != nil {
		fmt.Println("Erreur de lecture:", err)
		return
	}

	//Traitement des données du client et retour des informations
	var prénoms = []string{
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

	mot_client := string(buffer[:n])
	fmt.Printf("La distance de Levenshtein entre %v et :\n", mot_client)
	conn.Write([]byte("La distance de Levenshtein entre ce prénom et :"))

	//Comparaison à chaque prénom de la liste avec des goroutines
	for i := 0; i < len(prénoms); i++ {
		go lev_dist(mot_client, prénoms[i], conn)
		time.Sleep(10 * time.Millisecond)
	}

	//Incrémente la liste des prénoms
	prénoms = append(prénoms, mot_client)
}

func main() {
	//Attente de connection TCP
	listener, err := net.Listen("tcp", "localhost:8080")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer listener.Close()

	fmt.Println("Serveur en attente de connexion...")

	for {
		//Accepte connexion entrante
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println("Error:", err)
			continue
		}

		//Chaque client géré dans une goroutine
		go handleClient(conn)
	}
}
