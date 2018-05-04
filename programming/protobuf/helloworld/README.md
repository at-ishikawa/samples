# How to use
## Generate php file from proto files
```
$ protoc --php_out=php protos/main.proto
```

## Encode data
```
$ protoc --encode Html protos/main.proto < proto.text > binary.data
```

## Decode binary
```
$ protoc --decode Html protos/main.proto < binary.data
```

