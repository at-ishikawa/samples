# Getting Started
## Install packages
```
$ dep ensure
```

## Generate files from protocol buffers
```
$ protoc --go_out=plugins=grpc:. protos/helloworld.proto
```

## Run a program
### Start a server
```
$ go run server/main.go
```

### gRPC client using grpc cli
1. Check gRPC interfaces for the server
```
$ grpc_cli ls localhost:50051 -l
filename: grpc_reflection_v1alpha/reflection.proto
package: grpc.reflection.v1alpha;
service ServerReflection {
  rpc ServerReflectionInfo(stream grpc.reflection.v1alpha.ServerReflectionRequest) returns (stream grpc.reflection.v1alpha.ServerReflectionResponse) {}
}

filename: protos/helloworld.proto
package: protos;
service HelloWorld {
  rpc SayHello(protos.HelloRequest) returns (protos.HelloResponse) {}
}
```
1. Call a gRPC method
```
$ grpc_cli call localhost:50051 SayHello 'name: "john"'
connecting to localhost:50051
message: "Hello john"

Rpc succeeded with OK status
```

## Reference
- Go support for Protocol Buffers: https://github.com/golang/protobuf
- The examples of gRPC for Go: https://github.com/grpc/grpc-go/blob/master/examples/README.md
