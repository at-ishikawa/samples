# emulator
```
cd emulator
docker build -t gcp:pubsub .
docker run -d -p 8085:8085 gcp:pubsub
```

```
docker build -t gcp:functions .
docker run -v
```

## Reference
- GCloud docker image: https://hub.docker.com/r/google/cloud-sdk/
- PubSub emulator: https://cloud.google.com/pubsub/docs/emulator
- Cloud Functions emulator: https://cloud.google.com/functions/docs/emulator
