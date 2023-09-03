FROM denoland/deno:latest as base

EXPOSE 3000

WORKDIR /deno

USER deno

COPY . ./

RUN deno cache main.ts

CMD ["task", "dev"]