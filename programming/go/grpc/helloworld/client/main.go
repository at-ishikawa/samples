package main

import (
	"fmt"

	pb "github.com/at-ishikawa/samples/grpc/helloworld/protos"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
)

const (
	serverAddr = "127.0.0.1"
	grpcPort   = ":50051"
)

func main() {
	opts := []grpc.DialOption{
		grpc.WithInsecure(),
	}
	conn, err := grpc.Dial(serverAddr+grpcPort, opts...)
	if err != nil {
		fmt.Printf("Failed to dial: %v\n", err)
		return
	}
	defer conn.Close()
	client := pb.NewHelloWorldClient(conn)

	response, err := client.SayHello(context.Background(), &pb.HelloRequest{
		Name: "client name",
	})
	if err != nil {
		fmt.Printf("Failed to say hello: %v\n", err)
		return
	}
	fmt.Printf("response: %v\n", response)
}
