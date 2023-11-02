FROM node:14-buster

RUN apt-get update \
  && apt-get install -y curl vim wget \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* \
  && curl -L https://toolbelt.treasuredata.com/sh/install-debian-buster-td-agent4.sh | sh \
  && mkdir -p /var/apps/

EXPOSE 3333
