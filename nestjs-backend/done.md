## First test

```
mkcd nestjs-backend

docker run --rm -it --entrypoint sh -v `pwd`:/work -p 3000:3000 node:lts-alpine3.18

cd /work/
npm i -g @nestjs/cli
nest new arcadia

npm run start
```

## Database

### Postgresql container

```
docker run --rm --name arcadia_postgres -p 5432:5432 -v `pwd`/pgdata:/var/lib/postgresql/data -e POSTGRES_USER=arcadia -e POSTGRES_DB=arcadia -e POSTGRES_PASSWORD=arcadia -d postgres:15.4
```

### NPM things

```
npm i pg typeorm @nestjs/typeorm @nestjs/config
npm install nestjs-admin
```
