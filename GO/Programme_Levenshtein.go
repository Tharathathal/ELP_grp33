package main

import (
	"fmt"
	"net"
	"strconv"
	"time"

	"github.com/arbovm/levenshtein"
)

func lev_dist(mot_client, mot string, rep_global chan string) {
	//Calcule la distance de Levenshtein grâce à la library
	dist := strconv.Itoa(levenshtein.Distance(mot_client, mot))
	rep := "- " + mot + " est de " + dist + "\n"
	fmt.Printf(rep)
	rep_global <- rep
}

func handleClient(conn net.Conn, prénoms []string) {
	defer conn.Close()
	fmt.Println("Connexion établie.")

	//Communication avec le serveur
	buffer := make([]byte, 1024)
	n, err := conn.Read(buffer)
	if err != nil {
		fmt.Println("Erreur de lecture:", err)
		return
	}

	//Traitement des données du client et retour des informations

	mot_client := string(buffer[:n])
	réponse := "La distance de Levenshtein entre votre prénom et :\n"
	fmt.Printf("La distance de Levenshtein entre %v et :\n", mot_client)

	//Comparaison à chaque prénom de la liste avec des goroutines
	for i := 0; i < len(prénoms); i++ {
		rep_global := make(chan string, 1)
		go lev_dist(mot_client, prénoms[i], rep_global)
		rep := <-rep_global
		réponse += rep
		time.Sleep(10 * time.Millisecond)
	}

	conn.Write([]byte(réponse))
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

		//Chaque client géré dans une goroutine
		go handleClient(conn, prénoms)

	}
}
