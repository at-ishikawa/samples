package main

import "fmt"

func main() {
	var a [2]string
	a[0] = "Hello"
	a[1] = "World"
	fmt.Println(a[0], a[1])
	fmt.Println(a)

	primes := []int{2, 3, 5, 7, 11, 13}
	fmt.Println(primes)
	b := primes[1:4]

	// primes are changed
	b[0] = 1
	fmt.Println(primes)

	s := []struct {
		i int
		b bool
	}{
		{2, true},
		{3, false},
	}
	fmt.Println(s)
}
