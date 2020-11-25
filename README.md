# Fartak Interview Project

<details>
<summary>Tasks</summary>

## Fartakel Test App Definition
    - Landing page, shows posts with a 24 posts pagination, must assign a random picture to each post
    - View Post, upon selecting a post, the contents of post will be shown with options to delete and edit
        - In this page each post can have a random count of comments between (0-5)
    - Edit Post, upon selecting user can edit the post
    - Each post should have its author's user name below it
        - After clicking author's name, user will be redirected to a page with authors info and all the posts that this user has created will be shown here
    - Posts that are Edited should be saved as history (browser storage)
    - Posts that are deleted should be added to delete history (saved locally as json)


### API Routes For Data
    post resource: {
        id, title, body, userId
    }
    posts : https://jsonplaceholder.typicode.com/posts 
    single post : https://jsonplaceholder.typicode.com/posts/<postId>
    update post PUT/PATCH : https://jsonplaceholder.typicode.com/posts/<postId>
    delete post : https://jsonplaceholder.typicode.com/posts/<postId>
    posts of each user : https://jsonplaceholder.typicode.com/posts?userId=<postUserId>
    comments for each post : https://jsonplaceholder.typicode.com/posts/<postId>/comments
    users(authors) info : https://jsonplaceholder.typicode.com/users/<userId>


### Notes
    It is better to log the data and responses to console for each transction.
    For each user's avatar it is better to have an image or the user initials as its avatar
</details>

<br/>

## Install the dependencies
```bash
npm install
```

### Start the app in development mode
```bash
quasar dev
```

### Build the app for production
```bash
quasar build
```