# RENO EXPO Books

A React, Node, Express, Postgres app, with Sequelize for an ORM and JWT auth, and Ant Design for styles. A demo of [Reno Expo](https://github.com/jacksonbates/reno-expo) used to complete the [freeCodeCamp Personal Library Project](https://www.freecodecamp.org/learn/information-security-and-quality-assurance/information-security-and-quality-assurance-projects/personal-library)

## Introduction

This project was built on top of the Reno Expo Starter kit. If you are unfamiliar with it, read the [README.md](https://github.com/JacksonBates/reno-expo/blob/master/README.md) at the Reno Expo repo.

The rest of this document assumes familiarity with Reno Expo and will only detail the modifications made to that starter kit.

After the modifications section, most of this document mirrors the README.md from Reno Expo. Relevant portions are repeated for your convenience, but can be ignored if you already know how to spin up and deploy Reno Expo - the process is the same.

## Modifications

### Implements Ant Design

The main difference you can see immediately is the use of the Ant Design component library for React for styling.

Some new Layout components have been included to provide styled routes. `layouts/AppLayout.js` is available on public and private client routes and provides the Ant Design `<Sider>`, `<Content>`, and `<Footer>` components. `layouts/SansMenuLayout.js` is available for pages such as Login and Register, or anything else that requires neither authentication or the side menu.

Login and Registration now use the `<Form>` and associated components provided by Ant Design, so the implementation is slightly different to the minimally style vanilla HTML versions. Console logging has been replaced or augmented with Ant Design's `message` method to provide simple feedback toasts.

### Makes some Database modifications with migrations

This project extends the original Reno Expo with 4 databse migrations:

1. create book
2. create book comment
3. adds userId to books
4. adds fk userId to books

The naming of these migrations should make it clear what is happening, but it's worth reviewing these files to examine how the database is being altered.

In tandem with this, the `user.js` model has been modified with the hasMany association:

```
User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Book, {
      onDelete: "cascade",
      foreignKey: "userId",
    });
  };
```

That is, a User can have many books associated with it, linked via the foreign key 'userId' on the books table. When the User is deleted, this action 'cascades', meaning all associated books will be deleted also.

You can see similar models for `book.js` and `bookComment.js`, which define similar assocatitions.

The bookController contains the methods referenced by the endpoints in `router/router.js`. These show examples for getting, posting and deleting books on both public and private routes.

## Usage

### Requirements

I run this with the following:

Node 8.16.x

npm 6.14.x

Postgres 10.x

Note:
You also need to configure your database user on your system and put the correct
details in your .env before running the db:create command

Since this relies on a range of existing technologies, if you run into issues,
look at their documentation.

- [Postgres](https://www.postgresql.org/docs/10)

- [Sequelize](https://sequelize.org/v5/)

- [Express](https://expressjs.com/en/4x/api.html)

- [Ant Design](https://ant.design/docs/react/introduce)

### Quick start (The same as the original Reno Expo)

TL;DR: just the commands

```sh
# terminal one
git clone git@github.com:JacksonBates/reno-expo.git
cd reno-expo
cp .env.example .env
npm i
npx sequelize-cli db:create # see note above. You must have a valid user in your .env file
npx sequelize-cli db:migrate
npm start
# terminal two (from previous directory)
cd client
npm i
npm start
```

Once the project has been initialised, you may find it more useful to use the `npm run dev` command from the root folder, which will spin up the server and client concurrently.

### Check that it works

In your browser of choice, visit localhost:3000 and you should see a very basic
'Home' page and some links to an Admin and Login page.

Admin should be locked until you log in.

Login will require you to create a user account first.
Click 'I don't have an account' and make one via the registration form.
You can now log in and test your access to the Admin page.

If all is working, you can begin to develop your app.

Note: there is no client side validation or visual feedback for errors - errors
live in the dev console. This was left unimplemented so that you can use whatever
CSS framework you want to plug in without having to unpick any decisions I'd
made on your behalf.

## Deployment

This can be deployed to Heroku reasonably quickly.

1. [Sign up](https://api.heroku.com/signup/devcenter) for a Heroku account.

2. Install the [Heroku Toolbelt](https://toolbelt.heroku.com/).

3. Run the following command on command line: `heroku login`

4. Create a new heroku app from the command line. _Note app-name is optional, Heroku will auto generate a weird one for you otherwise_
   : `heroku create [app-name]`

5. Spawn a database on Heroku from the command line. _Note the hobby-dev tier is free_: `heroku addons:add heroku-postgresql:hobby-dev`

You should see some output like:

```
Creating heroku-postgresql:hobby-dev on ⬢ renoexpo... free
Database has been created and is available
 ! This database is empty. If upgrading, you can transfer
 ! data from another database with pg:copy
Created postgresql-opaque-15460 as DATABASE_URL
```

If your database url has been saved as something other than DATABASE_URL, such as HEROKU_POSTGRESQL_BRONZE_URL, you should change the `use_env_variable` value for production environments accordingly in the `config/config.js`.

6. Set a new config variable to store the JWT_SECRET, either via the Heroku dashboard for your app or the toolbelt command. See the [config variables docs](https://devcenter.heroku.com/articles/config-vars) for this.

7. Add the git remote for Heroku from the command line: `heroku git:remote -a [application-name]`

8. Deploy to Heroku by pushing to the remote: `git push heroku master`

9. You should now be able to see your deployed app. An easy way to launch it is: `heroku open`

### Migrating the database on Heroku

Before your newly deployed Reno Expo app will work fully via Heroku, you need to migrate the database to create the initial user table. You will need to run the migrations whenever you add new migrations.

1. Connect to your Heroku app's bash terminal" `heroku run bash`

2. Use the npx sequelize-cli command to migrate the database: `npx sequelize-cli db:migrate`

You should see output similar to this:

```
npx: installed 80 in 13.163s

Sequelize CLI [Node: 12.18.0, CLI: 5.5.1, ORM: 5.21.12]

Loaded configuration file "config/config.js".
Using environment "production".
== 20200606113054-create-user: migrating =======
== 20200606113054-create-user: migrated (0.074s)

```

Now the app should be functional enough to allow you to register a user and login as that user.
