###########################################################
#
# Dockerfile for tfk-seneca-log-external
#
###########################################################

# Setting the base to nodejs 4.6.0
FROM mhart/alpine-node:4.6.0

# Maintainer
MAINTAINER Geir Gåsodden

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Extra tools for native dependencies
RUN apk add --no-cache make gcc g++ python

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Env variables
ENV TFK_SENECA_LOG_EXTERNAL_TAG tfk-seneca-log-external
ENV TFK_SENECA_LOG_EXTERNAL_URL https://logexternal.no
ENV TFK_SENECA_LOG_EXTERNAL_HOST localhost
ENV TFK_SENECA_LOG_EXTERNAL_PORT 8000
ENV TFK_SENECA_LOG_EXTERNAL_JWT_KEY Louie Louie, oh no, I got to go
ENV TFK_SENECA_LOG_EXTERNAL_API_URL https://logservice.api.com/api

# Startup
CMD ["node", "service.js", "--seneca-log=type:act"]