FROM node
COPY ./ /home
WORKDIR /home/js
RUN npm install
RUN  npm run build
