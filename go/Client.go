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
		text, err := reader.ReadString('\n')
		if err != nil {
			fmt.Println("Error:", err)
			return
		}
		fmt.Printf("Votre prénom est: %v", text)

		// send to server
		fmt.Fprintf(conn, text+"\n")

		// wait for reply
		buffer := make([]byte, 2048)
		n, err := conn.Read(buffer)
		if err != nil {
			fmt.Println("Erreur de lecture:", err)
			return
		}

		message := string(buffer[:n])
		fmt.Println("-- Message from server: --\n " + message)
	}
}
