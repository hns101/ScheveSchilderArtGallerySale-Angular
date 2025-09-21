FROM ubuntu:latest
LABEL authors="HNS10"

ENTRYPOINT ["top", "-b"]
