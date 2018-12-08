# Review Questions

## What is Node.js?
    A javascript library used for to run the JS on the server side, instead of the client side
## What is Express?
    A javascript library used to create APIs
## Mention two parts of Express that you learned about this week.
    We learned how to use some of the express methods like .use and .listen.  and also how to use express.Router, and connect it to the index.js file
## What is Middleware?
    express is a pretty bare bones library, and middleware like morgan, helmet, or our own custom middleware, adds functionality to our APIs.
## What is a Resource?
    A type of data in the in the database.  Like Users, posts, comments, etc.  Each resource will need its own CRUD operations to access them.
## What can the API return to help clients know if a request was successful?
    status codes, and what the developer might expect it to return.  i.e. If you make a POST request, the developer would probably expect to receive what was Posted back.
## How can we partition our application into sub-applications?
    Using express.Router, we can divide up our CRUD operations into seperate files, to keep things organized and modular. 
## What is express.json() and why do we need it?
    express.json is a built in middleware, that parses the req.body into json format, so the data is in the correct format for us to use.