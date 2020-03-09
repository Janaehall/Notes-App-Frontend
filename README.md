# Notes App(Front-End)

Welcome to FlatNote! This is the front-end for the FlatNote application. FlatNote is a simple notes-taking app which lets you save your notes and share them with friends.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

In order to run this application, you must have the following: 
  1. A PostGres server running on port 5434
 
### Set Up

Runs the app in the development mode.<br />
Before you begin the following steps, please clone this repository along with [Notes-App-Backend](https://github.com/Janaehall/Notes-App-Backend)
  1. Navigate to Notes-App-Backend and run the following commands to create the required databases and run the necessary migrations:
  ```
    rails db:create
    rails db:migrate
  ```
  2. Once all of the migrations are complete, enter ```rails s``` to run a rails server on port 3000

  3. Return to the main directory, then navigate to Notes-App-Frontend and run ```npm start```
  4. Open your browser and navigate to http://localhost:3001/login to begin using the application.

