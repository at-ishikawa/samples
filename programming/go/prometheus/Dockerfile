FROM golang:1.8-alpine
ADD . /go/src/prometheus
RUN go install prometheus

FROM alpine:latest
COPY --from=0 /go/bin/prometheus .
ENV PORT 8080
CMD ["./prometheus"]
