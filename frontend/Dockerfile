FROM node:22-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn cache clean --force
RUN yarn install

COPY . .

RUN yarn run build:final_3
# CMD ["yarn","build:final_3"]

FROM nginx:alpine as production-stage

COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

# EXPOSE 8080

# CMD ["yarn","build:final_3"]