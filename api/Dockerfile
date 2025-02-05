FROM node:22-alpine

# ENV WORKDIR_LOCATION /home/node/app


# RUN mkdir -p WORKDIR_LOCATION 

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn cache clean --force

RUN yarn install

COPY . .

EXPOSE 3000

ENV CI=true
CMD ["yarn","start"]