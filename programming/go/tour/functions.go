package main

import "fmt"

// you can omit the same consecutive parameter types except last one
// func add(x int, y int) int {
func add(x, y int) int {
	return x + y
}

func main() {
	fmt.Println(add(42, 13))
}
