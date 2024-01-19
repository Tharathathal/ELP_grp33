Projet Golang
-- Distance de Levenshtein --

Les clients peuvent établir des connexions TCP avec le serveur. Le client va pouvoir envoyer un prénom (ou un mot quelconque) au serveur, qui lui renvoie la distance à chaque prénom d'une liste pré-définie.

Chaque client est traité grâce à des goroutines. La distance de Levenshtein à chaque prénom de la liste est aussi calculée grâce à des goroutines.
