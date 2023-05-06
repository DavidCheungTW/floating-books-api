# Floating Books API

This is final project of Command Shift Bootcamp Cohort Oct 2022. It can be proved our knowledge learnt in Bootcamp and demostrated abilities to apply junior software engineer career.

### User Stories

This is a sharing in Youtube video. A respondent shared his willing that some valuable books are just kept at home. Maybe any other people want to read them. He wants to setup any channel to let people know these books and gives books to them.

This inspired us to create a 'Floating Books' app to let people to pass forwards their books.

### RESTful web API design

[locatl swagger link](http://localhost:4000/swagger)

[deployed swagger link]()

<img src="screenshots\swagger-screen.png" height="200">

## Project setup

### Environment setup

### API setup

- pre-requirements:

  [docker desktop](https://docs.docker.com/desktop/install/mac-install/)

  [postman](https://www.postman.com/downloads/)

  [pgAdmin](https://www.pgadmin.org/download/)

  [frontend floating-books app](https://github.com/SomiaHussain/floating-books.git)

- Start docker container:

```
docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres
```

- Clone backend repo:

```
git clone https://github.com/DavidCheungTW/floating-books-api.git
```

- Move into the directory and node packages install:

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
PORT=4000
```

- To start and run on port 4000:

```
npm start
```

## Tests

### Test by node

1. use PGDATABASE in .env.test file
2. change directory to floating-books-api
3. run `npm test` to execute the test

### Test by Postman

1. use PGDATABASE in .env file
2. change directory to floating-books-api
3. run `npm start` to start testing

<img src="screenshots\postman-screen.png" height="200">

## Credits

### Recommended Reading List

- [Sequelize](https://sequelize.org/)
- [Sequelize with Express](https://www.codementor.io/@mirko0/how-to-use-sequelize-with-node-and-express-i24l67cuz)
- [Sequelize - Pre-attribute validations](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/)
- [associations in the Sequelize](https://sequelize.org/docs/v6/core-concepts/assocs/)
- [firebase-admin](https://firebase.google.com/docs/auth/admin/verify-id-tokens)
- [nodemailer](https://javascript.plainenglish.io/send-emails-for-your-node-js-application-using-nodemailer-express-b12584d999af)
- [multer](https://www.npmjs.com/package/multer)
- [aws-sdk](https://aws.amazon.com/sdk-for-javascript/)
- [uuidv4](https://www.npmjs.com/package/uuidv4)

### Special thank you to project supporters

- Stu Cowley
- Ahmed Mire

## Author

[David Cheung](https://www.linkedin.com/in/david-cheung-473597199/)

## License
