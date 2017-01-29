FROM node
WORKDIR /home
COPY ./ /home
RUN npm build
RUN node ./js/cli.js