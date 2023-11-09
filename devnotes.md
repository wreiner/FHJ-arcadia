# dev notes

## containers

- psql

```
docker run --rm --name arcadia_postgres -p 5432:5432 -v `pwd`/pgdata:/var/lib/postgresql/data -e POSTGRES_USER=arcadia -e POSTGRES_DB=arcadia -e POSTGRES_PASSWORD=arcadia -d postgres:15.4
```

- 
