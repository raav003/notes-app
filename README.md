# Notes App Project

## Overview
This is a full-stack Notes App built using **Node.js** for the backend and **Angular** for the frontend. Users can create, view, update, and delete notes. The project demonstrates RESTful API integration with a modern frontend framework.

---

## Features
- Add, edit, and delete notes
- Responsive UI using Angular
- REST API built with Node.js and Express
- Data stored MongoDB
- Modular and scalable project structure

---

## Prerequisites
- Node.js v18+  
- npm v9+  
- Angular CLI v16+  

---

## Backend Setup

1. Navigate to the backend folder:
cd backend

2. Install dependencies:
npm install

3. Start the server:
nodemon server.js

4. The API will run at:
http://localhost:4000


## Frontend Setup

1. Navigate to the frontend folder:
cd frontend


2. Install dependencies:
npm install


3. Run the Angular app:
ng serve


4. Open your browser and go to:
http://localhost:4200

## API Endpoints

GET /notes – Get all notes

POST /notes – Add a new note

PUT /notes/:id – Update a note by ID

DELETE /notes/:id – Delete a note by ID

## Technologies Used

Backend: Node.js, Express, Mongodb

Frontend: Angular, HttpClientModule

Others: Git for version control
