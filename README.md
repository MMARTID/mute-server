NOTE: to copy this readme structure simply click on `Raw` on the top right of this gist. There you have the content in the basic [Markdown syntax](https://www.markdownguide.org/basic-syntax/) used in readme files. Then paste it on a README.md file in your repository and fill the information. Always do this directly from VS code, not from github. DON'T ADD THIS NOTE TO YOUR README. Also make sure to remove any notes from this template.

# Project Name

## [See the App!](www.your-deploy-url-here.com)

![App Logo](your-image-logo-path-or-name)

## Description

**NOTE -** Describe your project in one/two lines.

#### [Client Repo here](www.your-github-url-here.com)
#### [Server Repo here](www.your-github-url-here.com)

## Backlog Functionalities

**NOTE -** List here all functionalities you wish to add to your proyect later or that you are currently working on

## Technologies used

**NOTE -** List here all technologies used in the project like HTML, CSS, Javascript, Express, React, axios, React Context etc.

# Server Structure

## Models

User model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  favs: [{type: Schema.Types.ObjectId,ref:'Game'}]
}
```

Game model

```javascript
 {
   title: {type: String, required: true},
   type: {type: String, required: true},
   image: {type: String, required: true},
   apiId {type: Number, required: true},
   status {type: String, enum: ["wishlist", "playing", "finished"]
   creator: {type: Schema.Types.ObjectId,ref:'User'},
 }
```

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                    |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | -------------------------------------------------------------- |
| POST        | `/auth/signup`              | {name, email, password}      | 201            | 400          | Registers the user in the Database                             |
| POST        | `/auth/login`               | {username, password}         | 200            | 400          | Validates credentials, creates and sends Token                 |
| GET         | `/auth/verify`              |                              | 200            | 401          | Verifies the user Token                                        |
| GET         | `/post/                     |                              | 200            | 400          | Show only general posts ,                    
| GET         | `/post/all/:type`           |                              | 200            | 400          | Show post by type when auth,                    
| GET         | `/post/:userId              |                              | 200            | 400          | Show only general posts                    
| POST        | `/post/:userId`             |{author, title, type, content}| 201            | 400          | Creates a new Post Document                                    |
| DELETE      | `/post/:gameId`             |                              | 200            | 401          | Deletes Post                                          |

## Links

### Collaborators

[Developer 1 name](www.github-url.com)

[Developer 2 name](www.github-url.com)

### Project

[Repository Link Client](www.your-github-url-here.com)

[Repository Link Server](www.your-github-url-here.com)

[Deploy Link](www.your-deploy-url-here.com)

### Trello

[Link to your trello board](www.your-trello-url-here.com)

### Slides

[Slides Link](www.your-slides-url-here.com)
