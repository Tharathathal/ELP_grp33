# Projet Golang -- Distance de Levenshtein

## Lancement du programme
Tout d'abord, il faut installer le package permettant de calculer la distance de Levenshtein : `go get github.com/arbovm/levenshtein`.
Pour lancer le serveur, il faut exécuter dans un terminal la commande suivante : `go run .\Programme_Levenshtein.go`.
Un ou plusieurs utilisateur.s peuvent ensuite se connecter avec : `go run .\Client.go`.

## Déroulement du programme
Le client va pouvoir entrer dans le terminal un prénom, qui sera comparé à une banque de donnée contenant des prénoms. Le serveur renvoie la distance de Levenshtein, calculée à l'aide d'un package ([github.com/arbovm/levenshtein](https://github.com/arbovm/levenshtein)), pour chaque donnée. Chaque client est géré dans une go routine et chaque calcul de la distance de Levenshtein se fait aussi avec des go routines.
