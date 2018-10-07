# Install pants
```
curl -L -O https://pantsbuild.github.io/setup/pants && chmod +x pants && touch pants.ini
./pants -V
```

# Development
## Run a script without build
```
./pants run.py command:command-bin
```

## Build a binary and run it
```
./pants binary command:command-bin
./dist/command-bin.pex
```
