package main

import "fmt"

func min(a,b,c  int)int{
	if a<=b && a<=c {
		return a
	}
	elif b<=a && b<=c {
		return b
	}
	return c
}

func main() {
	fmt.Println("Hello")
}
