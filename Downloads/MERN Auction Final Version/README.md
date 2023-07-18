# Auction Website

A full stack auction website created using the MERN Stack

## Table of contents

- [Quick Start](#quick-start)
- [Technologies](#technologies)
- [Tests](#tests)

## Quick Start

### Install dependencies

- Install server dependencies

```bash
npm install
```

- Install client dependencies

```bash
cd client
npm install
```

### Setting up Proccess Environment Variables

- Make a new file with the name .env in the root folder. It should contain values for these 3 variables: `PORT`,`MONGO_URI`,`JWT_SECRET`.
- If you want to enable image uploading create a Cloudinary account and enter your Cloundinary API key, Cloud Name and API Secret into the variables `API_KEY`,`CLOUD_NAME`,`API_SECRET`.

### Run both Express & React from root

```bash
npm run dev
```

## Technologies

Project is created with:

- JavaScript, React, Redux, MongoDB, Node.js, Express, HTML, Sass, Jest, Socket.IO

## Tests

To run the automated testing suite

```bash
npm run test
```
