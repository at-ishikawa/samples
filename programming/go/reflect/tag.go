package main

import (
	"fmt"
	"reflect"
	"strings"
)

type Struct struct {
	ID    int    `tag:"uuid"`
	Email string `tag:"email,omitempty"`
	NoTag string
}

func main() {
	src := map[string]interface{}{
		"uuid":  1,
		"email": "test@example.com",
	}

	dst := Struct{}
	rt := reflect.TypeOf(dst)
	dstRv := reflect.ValueOf(&dst)
	for i := 0; i < rt.NumField(); i++ {
		f := rt.Field(i)
		tagStr, ok := f.Tag.Lookup("tag")
		if !ok {
			fmt.Printf("%s: no tag", f.Name)
			continue
		}

		tags := strings.Split(tagStr, ",")
		name, _ := tags[0], tags[1:]
		dstRv.Elem().Field(i).Set(reflect.ValueOf(src[name]))
	}
	fmt.Printf("%#v", dstRv)
}
