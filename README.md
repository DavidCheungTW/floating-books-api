## Project title

Floating Books API

### User Stories

### RESTful web API design

| Resource | POST | GET | PATCH | DELETE |
| -------- | ---- | --- | ----- | ------ |

## Project setup

### Environment setup

### API setup

- pre-requirement:

  [docker desktop](https://docs.docker.com/desktop/install/mac-install/)

  [postman](https://www.postman.com/downloads/)

  [pgAdmin](https://www.pgadmin.org/download/)

- Start docker container:

```
docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres
```

- Clone backend repo:

```
git clone https://github.com/DavidCheungTW/floating-books-api.git
```

- Move into the directory and install:

```
cd floating-books-api
npm install
```

- Create .env files:

```
PGPASSWORD=password
PGDATABASE=floating_books_api_dev
PGUSER=postgres
PGHOST=localhost
PGPORT=5432
PORT=3000
```

- To start and run on port 3000:

```
npm start
```

## Tests

### Test by node

### Test by Postman

- Test http://localhost:3000

```
{
    "result": "Welcome to Floating Books API!"
}
```

- Post request http://localhost:3000/genres with req body

```
{
 "genre": "genre001"
}
```

Response 201 and

```
{
    "id": 1,
    "genre": "genre001",
    "updatedAt": "2023-05-02T16:20:23.114Z",
    "createdAt": "2023-05-02T16:20:23.114Z"
}
```

## Credits

### Recommended Reading List

### Special help from

## License
