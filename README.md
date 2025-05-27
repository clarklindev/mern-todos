# MERN todos

# Backend: Node.js + Express + Mongoose (for MongoDB)

- to use es-module syntax: package.json

```json
{
  //...
  "type": "module"
}
```

- use nodemon as a dev dependency to continuously watch the server

---

# Frontend: React (using Vite)

### initiate project

- create a typescript vite project
- `npm create vite@latest . -- --template react-ts`

### when using fetch() instead of axios

```js
const res = await fetch(API_URL);
const data = await res.json();
setTodos(data);
```

---

# Database: MongoDB (local or MongoDB Atlas)

### mongodb

- create cluster
- network access -> allow access from anywhere
- connect to cluster using driver -> mongoose (v7 or later)
- create database user/password -> role (read/write to any db) -> SAVE

### mongoose configure

- get MOGO_URI from mongodb (login and get database details)

- configure mongoose MONGO_URI via .env
