from mongo

# Core
RUN apt-get update --fix-missing && apt-get upgrade -y
RUN apt-get install -y wget curl build-essential patch git-core openssl libssl-dev unzip ca-certificates

# Redis
RUN apt-get install -y python-software-properties
RUN add-apt-repository -y ppa:rwky/redis
RUN apt-get install -y redis-server

# NodeJS
RUN curl http://nodejs.org/dist/v0.10.22/node-v0.10.22-linux-x64.tar.gz | tar xzvf - --strip-components=1 -C "/usr"
RUN apt-get clean && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/*

# Twitgundem
ADD . /code
# RUN git clone https://github.com/aladagemre/twitgundem.git /code
RUN cd /code; npm install
ENV PORT 3000
EXPOSE 3000

WORKDIR /code
ENTRYPOINT ["./run.sh"]