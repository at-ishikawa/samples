package main

import (
	"fmt"
	"net"

	pb "github.com/at-ishikawa/samples/grpc/helloworld/protos"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

const (
	grpcPort = ":50051"
)

type Server struct{}

func (s *Server) SayHello(context context.Context, in *pb.HelloRequest) (*pb.HelloResponse, error) {
	return &pb.HelloResponse{Message: "Hello " + in.Name}, nil
}

func main() {
	listen, err := net.Listen("tcp", grpcPort)
	if err != nil {
		fmt.Printf("failed to listen: %v\n", err)
		return
	}

	grpcServer := grpc.NewServer()
	pb.RegisterHelloWorldServer(grpcServer, &Server{})
	reflection.Register(grpcServer)
	grpcServer.Serve(listen)
}
