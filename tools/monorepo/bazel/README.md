# Development
To run a command, using `bazel run`
```
$ bazel run //command:command-bin
```

Or build at first and execute the executable script
```
$ bazel build //command:command-bin
$ ./bazel-bin/command/command-bin
main
```
