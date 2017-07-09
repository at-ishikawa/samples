package main

import (
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"os"

	pb "github.com/at-ishikawa/proto-samples/tutorial/build/go"
	"github.com/golang/protobuf/proto"
)

func getPerson() *pb.Person {
	person := &pb.Person{
		Id:    100,
		Name:  "name",
		Email: "example@example.com",
		Phones: []*pb.Person_PhoneNumber{
			&pb.Person_PhoneNumber{
				Number: "222-1111",
				Type:   pb.Person_MOBILE,
			},
			&pb.Person_PhoneNumber{
				Number: "999-8888",
				Type:   pb.Person_HOME,
			},
		},
	}
	return person
}

func readFile(filename string) (*pb.AddressBook, error) {
	in, error := ioutil.ReadFile(filename)
	book := &pb.AddressBook{}
	error = proto.Unmarshal(in, book)
	return book, error
}

func writeFile(filename string, book *pb.AddressBook) error {
	out, error := proto.Marshal(book)
	if error != nil {
		return error
	}
	if error := ioutil.WriteFile(filename, out, 0644); error != nil {
		return error
	}
	return nil
}

// See
// https://github.com/google/protobuf/blob/master/examples/list_people.go
func outPerson(w io.Writer, p *pb.Person) {
	fmt.Fprintln(w, "Person ID:", p.Id)
	fmt.Fprintln(w, "  Name:", p.Name)
	if p.Email != "" {
		fmt.Fprintln(w, "  E-mail address:", p.Email)
	}

	for _, pn := range p.Phones {
		switch pn.Type {
		case pb.Person_MOBILE:
			fmt.Fprint(w, "  Mobile phone #: ")
		case pb.Person_HOME:
			fmt.Fprint(w, "  Home phone #: ")
		case pb.Person_WORK:
			fmt.Fprint(w, "  Work phone #: ")
		}
		fmt.Fprintln(w, pn.Number)
	}
}

func outPeople(w io.Writer, book *pb.AddressBook) {
	for _, p := range book.People {
		outPerson(w, p)
	}
}

func main() {
	filename := "sample.txt"
	book, error := readFile(filename)
	if error != nil {
		log.Fatalln("Failed to parse address book:", error)
	}

	person := getPerson()
	book.People = append(book.People, person)

	if error = writeFile(filename, book); error != nil {
		log.Fatalln("Failed to write address book:", error)
	}

	outPeople(os.Stdout, book)
}
