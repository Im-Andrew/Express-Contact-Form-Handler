# Express Form handler

This was a basic form handler I wrote to recieve contact requests on my portfolio page. It uses
express along with multer and mysql to recieve and store the information.

# How to test

## Setup:
1. create a folder to put project in
2. Inside that folder, run the clone command `git clone https://github.com/Im-Andrew/Express-Contact-Form-Handler.git .`
3. Get npm dependencies, from root run `npm install`

## Development:

1. Make sure your private folder is setup. See the `README.MD` inside of `_private`
2. Make sure you have your local MYSQL server running.
    i. I will be posting a small help document on setting up a local mysql server in the future via a blog.
3. To test use the script `npm run start` 
    i. This will run an html localhost server on port 3000
    ii. Any changes done to the `index.js` will restart the server
4. You may access a form served by express, if this is defined as a local server, via http://localhost:3000
5. You may also check to see if you have development mode turned on by checking the url extesion `.../serve/response`
    i. It will successfully respond with '-development mode-' if active.

## Testing Production:
1. Run the command `npm run start:build`
2. The code requires a production environment variable called `SERVER`, this is configured in our `.env-cmdrc` file.
    i. This defaults to `false` if you're just _testing_ production, but you may change that.
3. When testing this locally it is also accessible through the same URL.

# Notes on cors
This uses cors when testing so that I do not need to connect my static 
site with express. It was a design decision to keep them decoupled since
I wanted to design my site before working on the backend part.

So you will notice some libraries related to development for these purposes. Cors
is a library that allows me to test my sites form submission without it being on the
same localhost port. So I could have it served via webpack instead of through express.