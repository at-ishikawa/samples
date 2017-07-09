# Spec
## function
1. Multiple values can be returned

## defer
1. defer works first-in-last-out
2.

## slice
1. `make` is used to have the size of variable.
   `make([]int, size)`
2. To implement like foreach, `for index, element := range slice` can be used

## map
1. Declaration: `m := map[string]int{}`

## method
1. The receiver can be pointer or value.
   All methods should have the either pointer or value for a type.
2. interfaces can be implemented implicitly.
3. A receiver can be nil in a method
4. The empty inteface `interface{}` can be used for unknown type.
5. Type assertion `var.(T)`. See type-switches.go

## Standard interface
1. Stringers to println in fmt.
```
type Stringer interface {
    String() string
}
```

2. Error interface, used such as fmt
```
type error interface {
    Error() string
}
```

## Go routine
1. By `make(chan int, bufferSize int)`, channels can be created.
2. Receive values by `channel <- v`
3. The values can be received by loop `for i := range channel`
4. `close` should be closed by a **sender**
5. `select` is wait on multiple operations. See select.go for more details
   Note that if default case is presented, select does not wait but run in a default
6. `sync.Mutex` and `Lock/Unlock` is used when no communication is required
