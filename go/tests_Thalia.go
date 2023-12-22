package main

import "fmt"

// Fonction revoyant le minimum entre 3 valeurs
func min(a, b, c int) int {
	if a <= b && a <= c {
		return a
	}
	if b <= a && b <= c {
		return b
	}
	return c
}

// Fonction permettant de déterminer la distance de Levenshtein
func dist_Levenshtein(chaine1, chaine2 string) int {
	// déclaration des variables
	var i, j, cout int
	len1 := len(chaine1)
	len2 := len(chaine2)

	// création d'une matrice de taille len1+1 x len2+
	D := make([][]int, len1+1)
	for i = range D {
		D[i] = make([]int, len2+1)
	}

	// initialisation de 1e ligne et 1e colonne
	for i = 0; i <= len1; i++ {
		D[i][0] = i
	}
	for j = 0; j <= len2; j++ {
		D[0][j] = j
	}

	for i = 1; i <= len1; i++ {
		for j = 1; j <= len2; j++ {
			if chaine1[i] == chaine2[j] {
				cout = 0
			} else {
				cout = 1
			}
			D[i][j] = min(D[i-1][j]+1, D[i][j-1]+1, D[i-1][j-1]+cout)
		}
	}

	return D[len1][len2]
}

func main() {
	mot1 := "niche"
	mot2 := "chiens"

	distance := dist_Levenshtein(mot1, mot2)

	fmt.Println(distance)
}
