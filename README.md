# Houmti-MERN

# **A social media web app, for local communities.**

<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->

## Endpoints

- [Authentication](#authentication)
  1. [Signup](#1-signup)
     - [Signup](#i-example-request-signup)
  1. [Login](#2-login)
     - [Login](#i-example-request-login)
  1. [Logout](#3-logout)
     - [Logout](#i-example-request-logout)
  1. [Update Password](#4-update-password)
     - [Update Password](#i-example-request-update-password)
  1. [Forgot Password](#5-forgot-password)
     - [Forgot Password](#i-example-request-forgot-password)
     - [Forgot Password (bad request)](#ii-example-request-forgot-password-bad-request)
  1. [Reset Password](#6-reset-password)
     - [Reset Password](#i-example-request-reset-password)
- [Users](#users)
  1. [Admin](#1-admin)
  1. [User](#2-user)
- [Posts](#posts)
  1. [Update Post](#1-update-post)
     - [Update Post](#i-example-request-update-post)
     - [Add Image To Post](#ii-example-request-add-image-to-post)
  1. [Delete Post](#2-delete-post)
  1. [Get All Posts](#3-get-all-posts)
  1. [Create Post](#4-create-post)
     - [Create Post](#i-example-request-create-post)
     - [Create Image Post](#ii-example-request-create-image-post)
     - [Create Event](#iii-example-request-create-event)
     - [Create Poll](#iv-example-request-create-poll)
     - [Create Service](#v-example-request-create-service)
  1. [Get Post](#5-get-post)
- [Cities](#cities)
  1. [Admin](#1-admin-1)
  1. [Get All Cities](#2-get-all-cities)
- [Neighborhoods](#neighborhoods)
  1. [Admin](#1-admin-2)
  1. [Get All Neighborhoods](#2-get-all-neighborhoods)
- [Feedbacks](#feedbacks)
  1. [Get All Feedback](#1-get-all-feedback)
  1. [Create Feedback](#2-create-feedback)
     - [Like Post](#i-example-request-like-post)
     - [Comment On Post](#ii-example-request-comment-on-post)
     - [Participate on an event](#iii-example-request-participate-on-an-event)
     - [Demand Service](#iv-example-request-demand-service)
     - [Vote on a poll](#v-example-request-vote-on-a-poll)
  1. [Update Feedback](#3-update-feedback)
     - [Update Vote Option](#i-example-request-update-vote-option)
     - [Update Comment](#ii-example-request-update-comment)
  1. [Delete Feedback](#4-delete-feedback)
- [Notifications](#notifications)
  1. [Get My Notifications](#1-get-my-notifications)

---

## Authentication

Authentication routes

### 1. Signup

New users can signup (create a new account) using this route, every field is **required** except neighborhood.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/users/signup
```

**_Body:_**

```js
{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john-doe@gmail.com",
    "password": "my-new-password",
    "city": "62db957ed9e33a9e750ccbd0",
    "neighborhood": "62dea51813f192da9c9612a6"
}
```

**_More example Requests/Responses:_**

#### I. Example Request: Signup

**_Headers:_**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json |             |

**_Body:_**

```js
{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john-doe@gmail.com",
    "password": "my-new-password",
    "city": "62db957ed9e33a9e750ccbd0",
    "neighborhood": "62dea51813f192da9c9612a6"
}
```

#### I. Example Response: Signup

```js
{
    "status": "success",
    "data": {
        "message": "logged in successfully",
        "user": {
            "firstname": "John",
            "lastname": "Doe",
            "email": "john-doe@gmail.com",
            "avatar": "avatar-default.jpg",
            "city": "62db957ed9e33a9e750ccbd0",
            "neighborhood": "62dea51813f192da9c9612a6",
            "_id": "62e2cb7935efc037d4c34847",
            "__v": 0
        }
    }
}
```

**_Status Code:_** 201

<br>

### 2. Login

Users that already have an account can login using this route. Both fields are **required**.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/users/login
```

**_Body:_**

```js
{
    "email": "john-doe@gmail.com",
    "password": "my-new-password"
}
```

**_More example Requests/Responses:_**

#### I. Example Request: Login

**_Body:_**

```js
{
    "email": "john-doe@gmail.com",
    "password": "my-new-password"
}
```

#### I. Example Response: Login

```js
{
    "status": "success",
    "data": {
        "message": "logged in successfully",
        "user": {
            "_id": "62e2cb7935efc037d4c34847",
            "firstname": "John",
            "lastname": "Doe",
            "email": "john-doe@gmail.com",
            "avatar": "avatar-default.jpg",
            "city": "62db957ed9e33a9e750ccbd0",
            "neighborhood": "62dea51813f192da9c9612a6",
            "__v": 0
        }
    }
}
```

**_Status Code:_** 200

<br>

### 3. Logout

Users use this route to logout, this will delete the JWT http cookie.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/users/logout
```

**_More example Requests/Responses:_**

#### I. Example Request: Logout

**_Body: None_**

#### I. Example Response: Logout

```js
{
    "status": "success",
    "data": {
        "message": "logged out successfully"
    }
}
```

**_Status Code:_** 200

<br>

### 4. Update Password

Users can use this route to update their password. Both fields are **required**.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/users/my-profile/updatePassword
```

**_Body:_**

```js
{
    "password": "my-new-password",
    "newPassword": "my-another-new-password"
}
```

**_More example Requests/Responses:_**

#### I. Example Request: Update Password

**_Body:_**

```js
{
    "password": "my-new-password",
    "newPassword": "my-another-new-password"
}
```

#### I. Example Response: Update Password

```js
{
    "status": "success",
    "data": {
        "message": "logged in successfully",
        "user": {
            "_id": "62e2cb7935efc037d4c34847",
            "firstname": "John",
            "lastname": "Doe",
            "email": "john-doe@gmail.com",
            "avatar": "avatar-default.jpg",
            "city": "62db957ed9e33a9e750ccbd0",
            "neighborhood": "62dea51813f192da9c9612a6",
            "__v": 0,
            "passwordChangedAt": "2022-07-28T18:05:06.831Z"
        }
    }
}
```

**_Status Code:_** 200

<br>

### 5. Forgot Password

Users can use this route if they forgot their password, a reset token will be sent to their email.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/users/forgotPassword
```

**_Body:_**

```js
{
    "email": "lyeskellouche@gmail.com"
}
```

**_More example Requests/Responses:_**

#### I. Example Request: Forgot Password

**_Body:_**

```js
{
    "email": "john-doe@gmail.com"
}
```

#### I. Example Response: Forgot Password

```js
{
    "status": "success",
    "data": {
        "message": "Email sent successfully"
    }
}
```

**_Status Code:_** 200

<br>

#### II. Example Request: Forgot Password (bad request)

**_Body:_**

```js
{
    "email": "not-an-account@gmail.com"
}
```

#### II. Example Response: Forgot Password (bad request)

```js
{
    "status": "error",
    "error": {
        "name": "AppError",
        "statusCode": 400,
        "isOperational": true,
        "message": "Email provided does not match with any account"
    },
    "name": "AppError",
    "message": "Email provided does not match with any account",
    "isOperational": true
}
```

**_Status Code:_** 400

<br>

### 6. Reset Password

Users use this route to reset their password. They must provide the toke.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/users/resetPassword/:reset-token
```

**_URL variables:_**

| Key         | Value | Description                                       |
| ----------- | ----- | ------------------------------------------------- |
| reset-token |       | The password reset token sent to the user's email |

**_Body:_**

```js
{
    "email": "john-doe@gmail.com",
    "newPassword": "my-reset-password"
}
```

**_More example Requests/Responses:_**

#### I. Example Request: Reset Password

**_Query:_**

| Key         | Value | Description                                       |
| ----------- | ----- | ------------------------------------------------- |
| reset-token |       | The password reset token sent to the user's email |

**_Body:_**

```js
{
    "email": "john-doe@gmail.com",
    "newPassword": "my-reset-password"
}
```

#### I. Example Response: Reset Password

```js
{
    "status": "success",
    "data": {
        "message": "logged in successfully",
        "user": {
            "_id": "62e2cb7935efc037d4c34847",
            "firstname": "John",
            "lastname": "Doe",
            "email": "john-doe@gmail.com",
            "avatar": "avatar-default.jpg",
            "city": "62db957ed9e33a9e750ccbd0",
            "neighborhood": "62dea51813f192da9c9612a6",
            "__v": 0,
            "passwordChangedAt": "2022-07-28T18:10:56.061Z"
        }
    }
}
```

**_Status Code:_** 200

<br>

## Users

Users routes.

### 1. Admin

**_Endpoint:_**

```bash
Method:
Type:
URL:
```

### 2. User

**_Endpoint:_**

```bash
Method:
Type:
URL:
```

## Posts

**Posts routes.**

### 1. Update Post

- Update a post info. the post must be created by the current user, otherwise it's a bad request error.
- Use this route also to upload post image.
- Must specify the post id.

**_Endpoint:_**

```bash
Method: PATCH
Type: RAW
URL: {{URL}}/api/v1/posts/:post-id
```

**_URL variables:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| post-id |       |             |

**_Body:_**

```js
{
    "title": "Changed Title",
    "content": "Changed Content"
}
```

**_More example Requests/Responses:_**

#### I. Example Request: Update Post

**_Query:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| post-id |       |             |

**_Body:_**

```js
{
    "title": "Changed Title",
    "content": "Changed Content"
}
```

#### I. Example Response: Update Post

```js
{
    "status": "success",
    "data": {
        "_id": "62e2e0e7a036a35e26d86b23",
        "title": "Changed Title",
        "content": "Changed Content",
        "postType": "post",
        "creator": "62e2da68b2617f714d3383b2",
        "city": "62db957ed9e33a9e750ccbd0",
        "neighborhood": "62dea51813f192da9c9612a6",
        "withImage": true,
        "pollOptions": [],
        "createdAt": "2022-07-28T19:17:59.249Z",
        "updatedAt": "2022-07-28T19:30:35.652Z",
        "__v": 0,
        "image": "image-62e2da68b2617f714d3383b2-1659036522084.jpeg"
    }
}
```

**_Status Code:_** 200

<br>

#### II. Example Request: Add Image To Post

**_Query:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| post-id |       |             |

**_Body:_**

| Key   | Value | Description |
| ----- | ----- | ----------- |
| image |       |             |

#### II. Example Response: Add Image To Post

```js
{
    "status": "success",
    "data": {
        "_id": "62e2e0e7a036a35e26d86b23",
        "title": "Post",
        "content": "look at this image !",
        "postType": "post",
        "creator": "62e2da68b2617f714d3383b2",
        "city": "62db957ed9e33a9e750ccbd0",
        "neighborhood": "62dea51813f192da9c9612a6",
        "withImage": true,
        "pollOptions": [],
        "createdAt": "2022-07-28T19:17:59.249Z",
        "updatedAt": "2022-07-28T19:28:42.101Z",
        "__v": 0,
        "image": "image-62e2da68b2617f714d3383b2-1659036522084.jpeg"
    }
}
```

**_Status Code:_** 200

<br>

### 2. Delete Post

Dekete a post. the post must be created by the current user, otherwise it's a bad request error.

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{URL}}/api/v1/posts/:post-id
```

**_URL variables:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| post-id |       |             |

### 3. Get All Posts

- Current user: get all city or neighborhood posts.
- Admin: get all posts.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/posts
```

### 4. Create Post

User this route to create a post, different types of posts are possible :

- Normal post.
- Normal post + image.
- Event.
- Poll.
- Service.

For every type of posts, you must specify the **postType**.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/posts
```

**_Body:_**

```js
{
    "title": "Post",
    "content": "hello world",
    "postType": "post"
}
```

**_More example Requests/Responses:_**

#### I. Example Request: Create Post

**_Body:_**

```js
{
    "title": "Post",
    "content": "hello world",
    "postType": "post"
}
```

#### I. Example Response: Create Post

```js
{
    "status": "success",
    "data": {
        "title": "Post",
        "content": "hello world",
        "postType": "post",
        "creator": "62e2da68b2617f714d3383b2",
        "city": "62db957ed9e33a9e750ccbd0",
        "neighborhood": "62dea51813f192da9c9612a6",
        "likesCount": 0,
        "commentsCount": 0,
        "withImage": false,
        "pollOptions": [],
        "_id": "62e2f932f4eceed8ffe56218",
        "createdAt": "2022-07-28T21:01:38.422Z",
        "updatedAt": "2022-07-28T21:01:38.422Z",
        "__v": 0
    }
}
```

**_Status Code:_** 201

<br>

#### II. Example Request: Create Image Post

**_Body:_**

```js
{
    "title": "Post",
    "content": "look at this image !",
    "postType": "post",
    "withImage": true
}
```

#### II. Example Response: Create Image Post

```js
{
    "status": "success",
    "data": {
        "title": "Post",
        "content": "look at this image !",
        "postType": "post",
        "creator": "62e2da68b2617f714d3383b2",
        "city": "62db957ed9e33a9e750ccbd0",
        "neighborhood": "62dea51813f192da9c9612a6",
        "likesCount": 0,
        "commentsCount": 0,
        "withImage": true,
        "pollOptions": [],
        "_id": "62e2f95ef4eceed8ffe5621b",
        "createdAt": "2022-07-28T21:02:22.071Z",
        "updatedAt": "2022-07-28T21:02:22.071Z",
        "__v": 0
    }
}
```

**_Status Code:_** 201

<br>

#### III. Example Request: Create Event

**_Body:_**

```js
{
    "title": "Event",
    "content": "Let's meet !",
    "postType": "event",
    "eventAddress": "Area 51",
    "eventDate": "",
    "eventHour": "2PM"
}
```

#### III. Example Response: Create Event

```js
{
    "status": "success",
    "data": {
        "title": "Event",
        "content": "Let's meet !",
        "postType": "event",
        "creator": "62e2da68b2617f714d3383b2",
        "city": "62db957ed9e33a9e750ccbd0",
        "neighborhood": "62dea51813f192da9c9612a6",
        "likesCount": 0,
        "commentsCount": 0,
        "withImage": false,
        "eventAddress": "Area 51",
        "eventDate": "2022-07-28T21:02:47.103Z",
        "eventHour": "2PM",
        "participationsCount": 0,
        "pollOptions": [],
        "_id": "62e2f977f4eceed8ffe5621e",
        "createdAt": "2022-07-28T21:02:47.139Z",
        "updatedAt": "2022-07-28T21:02:47.139Z",
        "__v": 0
    }
}
```

**_Status Code:_** 201

<br>

#### IV. Example Request: Create Poll

**_Body:_**

```js
{
    "title": "Poll",
    "content": "Please vote...",
    "postType": "poll",
    "pollOptions": ["opt1",  "opt2", "opt3"]
}
```

#### IV. Example Response: Create Poll

```js
{
    "status": "success",
    "data": {
        "title": "Poll",
        "content": "Please vote...",
        "postType": "poll",
        "creator": "62e2da68b2617f714d3383b2",
        "city": "62db957ed9e33a9e750ccbd0",
        "neighborhood": "62dea51813f192da9c9612a6",
        "likesCount": 0,
        "commentsCount": 0,
        "withImage": false,
        "pollOptions": [
            {
                "option": "opt1",
                "votesCount": 0,
                "_id": "62e2f8d8f4eceed8ffe56210"
            },
            {
                "option": "opt2",
                "votesCount": 0,
                "_id": "62e2f8d8f4eceed8ffe56211"
            },
            {
                "option": "opt3",
                "votesCount": 0,
                "_id": "62e2f8d8f4eceed8ffe56212"
            }
        ],
        "_id": "62e2f8d8f4eceed8ffe5620f",
        "createdAt": "2022-07-28T21:00:08.775Z",
        "updatedAt": "2022-07-28T21:00:08.775Z",
        "__v": 0
    }
}
```

**_Status Code:_** 201

<br>

#### V. Example Request: Create Service

**_Body:_**

```js
{
    "title": "Service",
    "content": "I'm offering this service...",
    "postType": "service",
    "servicePhoneNumber": "0770000000"
}
```

#### V. Example Response: Create Service

```js
{
    "status": "success",
    "data": {
        "title": "Service",
        "content": "I'm offering this service...",
        "postType": "service",
        "creator": "62e2da68b2617f714d3383b2",
        "city": "62db957ed9e33a9e750ccbd0",
        "neighborhood": "62dea51813f192da9c9612a6",
        "likesCount": 0,
        "commentsCount": 0,
        "withImage": false,
        "servicePhoneNumber": "0770000000",
        "demandsCount": 0,
        "pollOptions": [],
        "_id": "62e2f8fef4eceed8ffe56215",
        "createdAt": "2022-07-28T21:00:46.408Z",
        "updatedAt": "2022-07-28T21:00:46.408Z",
        "__v": 0
    }
}
```

**_Status Code:_** 201

<br>

### 5. Get Post

Get a post. Must sepecify a post id.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/posts/:post-id
```

**_URL variables:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| post-id |       |             |

## Cities

Cities routes.

### 1. Admin

**_Endpoint:_**

```bash
Method:
Type:
URL:
```

### 2. Get All Cities

This route is accessible by users and admin.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/cities
```

**_Query params:_**

| Key            | Value              | Description |
| -------------- | ------------------ | ----------- |
| cityName       | <city_name>        |             |
| zipCode        | <zip_code>         |             |
| countryName    | <country_name>     |             |
| countryISOCode | <country_ISO_code> |             |
| countryCode    | "<country_code>    |             |
| page           | 1                  |             |
| limit          | 10                 |             |
| fields         | cityName,zipCode   |             |
| sort           | cityName           |             |

## Neighborhoods

Neiborhoods routes.

### 1. Admin

**_Endpoint:_**

```bash
Method:
Type:
URL:
```

### 2. Get All Neighborhoods

This route is accessible by users and admin.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/neighborhoods
```

**_Query params:_**

| Key              | Value               | Description |
| ---------------- | ------------------- | ----------- |
| neighborhoodName | <neighborhood_name> |             |
| page             | 1                   |             |
| limit            | 10                  |             |
| sort             | neighborhoodName    |             |
| fields           | neighborhoodName    |             |

## Feedbacks

Feedback routes.

### 1. Get All Feedback

Get all feedback of a post. Must specify post id.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/posts/:post-id/feedbacks
```

**_Query params:_**

| Key            | Value             | Description |
| -------------- | ----------------- | ----------- |
| user           | <user_id>         |             |
| post           | <post_id>         |             |
| feedbackType   | <feedback_type>   |             |
| commentContent | <comment_content> |             |
| votedOption    | <option>          |             |
| page           | 1                 |             |
| limit          | 10                |             |
| fields         |                   |             |
| sort           |                   |             |

**_URL variables:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| post-id |       |             |

### 2. Create Feedback

Create a feedback on a post, must specify the **post-id**, **feedbackType**, and **all required fields** as shown in the examples.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/posts/:post-id/feedbacks/
```

**_URL variables:_**

| Key     | Value                    | Description |
| ------- | ------------------------ | ----------- |
| post-id | 62e2fce0d183dce2bf26e5ed |             |

**_Body:_**

```js
{
    "feedbackType": "Comment",
    "commentContent": "My Comment"
}
```

**_More example Requests/Responses:_**

#### I. Example Request: Like Post

**_Query:_**

| Key     | Value                    | Description |
| ------- | ------------------------ | ----------- |
| post-id | 62e2fce0d183dce2bf26e5ed |             |

**_Body:_**

```js
{
    "feedbackType": "Like"
}
```

#### I. Example Response: Like Post

```js
{
    "status": "success",
    "data": {
        "user": "62e2da68b2617f714d3383b2",
        "post": "62e2fce0d183dce2bf26e5ed",
        "feedbackType": "Like",
        "_id": "62e2fd1ad183dce2bf26e5fb",
        "createdAt": "2022-07-28T21:18:18.343Z",
        "updatedAt": "2022-07-28T21:18:18.343Z",
        "__v": 0
    }
}
```

**_Status Code:_** 201

<br>

#### II. Example Request: Comment On Post

**_Query:_**

| Key     | Value                    | Description |
| ------- | ------------------------ | ----------- |
| post-id | 62e2fce0d183dce2bf26e5ed |             |

**_Body:_**

```js
{
    "feedbackType": "Comment",
    "commentContent": "My Comment"
}
```

#### II. Example Response: Comment On Post

```js
{
    "status": "success",
    "data": {
        "user": "62e2da68b2617f714d3383b2",
        "post": "62e2fce0d183dce2bf26e5ed",
        "feedbackType": "Comment",
        "commentContent": "My Comment",
        "_id": "62e2fd40d183dce2bf26e600",
        "createdAt": "2022-07-28T21:18:56.915Z",
        "updatedAt": "2022-07-28T21:18:56.915Z",
        "__v": 0
    }
}
```

**_Status Code:_** 201

<br>

#### III. Example Request: Participate on an event

**_Query:_**

| Key     | Value                    | Description |
| ------- | ------------------------ | ----------- |
| post-id | 62e2fb68d183dce2bf26e5e4 |             |

**_Body:_**

```js
{
    "feedbackType": "Participate"
}
```

#### III. Example Response: Participate on an event

```js
{
    "status": "success",
    "data": {
        "user": "62e2da68b2617f714d3383b2",
        "post": "62e2fb68d183dce2bf26e5e4",
        "feedbackType": "Participate",
        "_id": "62e2fb74d183dce2bf26e5e9",
        "createdAt": "2022-07-28T21:11:16.586Z",
        "updatedAt": "2022-07-28T21:11:16.586Z",
        "__v": 0
    }
}
```

**_Status Code:_** 201

<br>

#### IV. Example Request: Demand Service

**_Query:_**

| Key     | Value                    | Description |
| ------- | ------------------------ | ----------- |
| post-id | 62e2df97a036a35e26d86b1d |             |

**_Body:_**

```js
{
    "feedbackType": "Demand"
}
```

#### IV. Example Response: Demand Service

```js
{
    "status": "success",
    "data": {
        "user": "62e2da68b2617f714d3383b2",
        "post": "62e2df97a036a35e26d86b1d",
        "feedbackType": "Demand",
        "_id": "62e2e886a036a35e26d86b3d",
        "createdAt": "2022-07-28T19:50:30.610Z",
        "updatedAt": "2022-07-28T19:50:30.610Z",
        "__v": 0
    }
}
```

**_Status Code:_** 201

<br>

#### V. Example Request: Vote on a poll

**_Query:_**

| Key     | Value                    | Description |
| ------- | ------------------------ | ----------- |
| post-id | 62e2df6ca036a35e26d86b17 |             |

**_Body:_**

```js
{
    "feedbackType": "Vote",
    "voteOption": "opt1"
}
```

#### V. Example Response: Vote on a poll

```js
{
    "status": "success",
    "data": {
        "user": "62e2da68b2617f714d3383b2",
        "post": "62e2df6ca036a35e26d86b17",
        "feedbackType": "Vote",
        "votedOption": "opt1",
        "_id": "62e2e815a036a35e26d86b37",
        "createdAt": "2022-07-28T19:48:37.456Z",
        "updatedAt": "2022-07-28T19:48:37.456Z",
        "__v": 0
    }
}
```

**_Status Code:_** 201

<br>

### 3. Update Feedback

Update feedback, must specify the post id and the feedback id. The feedback must be created by the current user, otherwise it's a bad request.

**_Endpoint:_**

```bash
Method: PATCH
Type: RAW
URL: {{URL}}/api/v1/posts/:post-id/feedbacks/:feedback-id
```

**_URL variables:_**

| Key         | Value | Description |
| ----------- | ----- | ----------- |
| post-id     |       |             |
| feedback-id |       |             |

**_Body:_**

```js
{
    "commentContent": "Hello updated comment !"
}
```

**_More example Requests/Responses:_**

#### I. Example Request: Update Vote Option

**_Query:_**

| Key         | Value                    | Description |
| ----------- | ------------------------ | ----------- |
| post-id     | 62e2fce0d183dce2bf26e5ed |             |
| feedback-id | 62e2fcf5d183dce2bf26e5f5 |             |

**_Body:_**

```js
{
    "voteOption": "opt2"
}
```

#### I. Example Response: Update Vote Option

```js
{
    "status": "success",
    "data": {
        "_id": "62e2fcf5d183dce2bf26e5f5",
        "user": "62e2da68b2617f714d3383b2",
        "post": "62e2fce0d183dce2bf26e5ed",
        "feedbackType": "Vote",
        "votedOption": "opt2",
        "createdAt": "2022-07-28T21:17:41.164Z",
        "updatedAt": "2022-07-28T21:22:55.734Z",
        "__v": 0
    }
}
```

**_Status Code:_** 201

<br>

#### II. Example Request: Update Comment

**_Query:_**

| Key         | Value                    | Description |
| ----------- | ------------------------ | ----------- |
| post-id     | 62e2fce0d183dce2bf26e5ed |             |
| feedback-id | 62e2fd40d183dce2bf26e600 |             |

**_Body:_**

```js
{
    "commentContent": "Hello updated comment !"
}
```

#### II. Example Response: Update Comment

```js
{
    "status": "success",
    "data": {
        "_id": "62e2fd40d183dce2bf26e600",
        "user": "62e2da68b2617f714d3383b2",
        "post": "62e2fce0d183dce2bf26e5ed",
        "feedbackType": "Comment",
        "commentContent": "Hello updated comment !",
        "createdAt": "2022-07-28T21:18:56.915Z",
        "updatedAt": "2022-07-28T21:24:07.834Z",
        "__v": 0
    }
}
```

**_Status Code:_** 201

<br>

### 4. Delete Feedback

Delete a feedback, must provide the post id and the feedback id. The feedback must be created by the current user (unless it's an admin who is deleting).

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{URL}}/api/v1/posts/:post-id/feedbacks/:feedback-id
```

**_URL variables:_**

| Key         | Value | Description |
| ----------- | ----- | ----------- |
| post-id     |       |             |
| feedback-id |       |             |

## Notifications

Notifications routes.

### 1. Get My Notifications

Notifications are created and managed automatically. This route is to get the current user notifications.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/users/notifications
```

---

[Back to top](#houmti-mern)
