FROM node:22.7.0-slim

RUN apt-get update && apt-get install -y ca-certificates

ARG CLI_VERSION

WORKDIR /usr/src/app

RUN npm install --global @graphql-hive/cli@${CLI_VERSION}

LABEL org.opencontainers.image.title=$IMAGE_TITLE
LABEL org.opencontainers.image.version=$RELEASE
LABEL org.opencontainers.image.description=$IMAGE_DESCRIPTION
LABEL org.opencontainers.image.authors="The Guild"
LABEL org.opencontainers.image.vendor="Kamil Kisiela"
LABEL org.opencontainers.image.url="https://github.com/kamilkisiela/graphql-hive"
LABEL org.opencontainers.image.source="https://github.com/kamilkisiela/graphql-hive"

ENV ENVIRONMENT production
ENV RELEASE $RELEASE
RUN hive --version

ENTRYPOINT ["hive"]
