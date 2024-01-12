Projet Golang
-- Distance de Levenshtein --

Les clients peuvent établir des connexions TCP avec le serveur. Le client va pouvoir envoyer un prénom (ou un mot quelconque) au serveur, qui lui renvoie la distance à chaque prénom d'une liste pré-définie. La liste est ensuite incrémentée du nouveau prénom.

Chaque client est traité grâce à des goroutines. La distance de Levenshtein de chaque prénom de la liste est aussi calculée grâce à des goroutines.
