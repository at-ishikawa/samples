# Running
`docker-compose run protobuf src/proto/*.proto`

# Message format
## Tag
- each field in the message definition has a unique numbered tag.
  - should not be changed once your message type is in use
  - range 1 through 15 => 1 byte to encode
    - very frequently occuring message
    - For future, leave some room for frequently occurring elements
  - 16 through 2047 => 2 bytes

## Fields
- `pack` encoding for repeated fields
- To prevent to use deleted fields, use `reserved` for tags or names

### Enumerations
- The first constant must be 0, for default value and compatibility with proto2
- option `allow_alias` can permit the same value for enum, like
```
enum EnumAllowingAlias {
  option allow_alias = true;
  UNKNOWN = 0;
  STARTED = 1;
  RUNNING = 1;
}
```

### Update Fields
- Don't change the numeric tags for any existing fields.

## More
- For protocols, see https://developers.google.com/protocol-buffers/docs/proto3
- For samples for proto, https://github.com/google/protobuf/tree/master/examples

# How to parse by Go

## Read from input stream
  - Use `Unmarshal` function for proto package. For example,
```
func readFile(filename string) (*pb.AddressBook, error) {
	in, error := ioutil.ReadFile(filename)
	book := &pb.AddressBook{}
	error = proto.Unmarshal(in, book)
	return book, error
}
```

## Write to output stream
  - Use `marshal` function to get output stream. For instance,
```
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
```
