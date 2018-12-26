FROM google/cloud-sdk:alpine
RUN apk --update add openjdk7-jre

RUN gcloud components install beta pubsub-emulator && \
    gcloud components update

EXPOSE 8085

ADD entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]
