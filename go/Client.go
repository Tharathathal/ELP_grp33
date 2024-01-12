package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
)

func main() {

	// connect to server
	conn, err := net.Dial("tcp", "localhost:8080")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer conn.Close()

	for {
		// what to send?
		reader := bufio.NewReader(os.Stdin)
		fmt.Print("Donnez-nous votre prénom pour tester votre compatibilité: ")
		text, _ := reader.ReadString('\n')
		fmt.Printf("Votre prénom est: ", text)
		// send to server
		fmt.Fprintf(conn, text+"\n")
		// wait for reply
		message, _ := bufio.NewReader(conn).ReadString('\n')
		fmt.Print("Message from server: " + message)
	}
}
