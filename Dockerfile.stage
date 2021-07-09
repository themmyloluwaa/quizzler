FROM node:12-alpine as builder

WORKDIR /quizzler

COPY ./package.json ./

RUN npm i

COPY ./ ./

RUN  npm run build

FROM nginx:stable-alpine

COPY --from=builder ./quizzler/build /usr/share/nginx/html


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]