# Team Name : The Jedi Triforce

# Project Documentation

- [Documentation Link](https://haripoorna.github.io/GVSU-CIS641-project-documentation/)
# Project Setup & Run Instructions

## Prerequisites
- [Node.js](https://nodejs.org/en/download/) installed. Ignore if already installed.
- [Visual Studio Code (VS Code)](https://code.visualstudio.com/download/) installed.

## Frontend & Admin Panel Setup

1. Open the project folder in VS Code.
2. Open the Integrated Terminal (Right-click on the Sidebar > Select “Open In Integrated Terminal”).
3. Type `npm install` and press Enter. Wait for the installation to be completed (requires an internet connection).
4. After installation, you will see a 'node_modules' folder in the Sidebar.
5. Type `npm start` in the terminal.
6. Your project will start in your default web browser.


## Backend Setup

1. Open the project folder in VS Code.
2. Open the Integrated Terminal (Right-click on the Sidebar > Select “Open In Integrated Terminal”).
3. Type `npm install` and press Enter. Wait for the installation to be completed (requires an internet connection).
4. Wait for the installation to be completed (requires an internet connection). 
5. Set up MongoDB as specified in your project's instructions.
6. Set up MongoDB:
   - Open [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Sign up on the website.
   - Create a new project.
   - In the Database section, build a new database.
   - Choose M0, your region, and create the database. 
   - Set up a username and password, and create a user.
   - Add IP 0.0.0.0 and click on Add Entry.
   - Click on Finish & Close.
   - Click on Connect.
   - Select the Compass option.
   - Copy the connection string.
   - Paste it in `index.js`, line33 replacing process.env.MONGO_URI which is created in previous steps. (URL looks like mongodb+srv://username:password@cluster.mongodb.net/database).
   
7. To run the project, use `node .\index.js` in the Integrated Terminal. 
8. To run the backend, type the following command in the terminal and press Enter `node index.js`
9. The backend server will start and be ready to handle requests.

## Team Members

- Member 1 : [Hari Poorna Kumar Kalahasti](https://github.com/haripoorna/CIS641-HW2-Kalahasti)
- Member 2 : [Megha Hole](https://github.com/Meghahole/CIS641-HW2-hole)
- Member 3 : [Mary Deepika Basani](https://github.com/deepikabasani/CIS641-HW2-Basani/blob/main/README.md)
- Member 4 : [Pavani Seshadri](https://github.com/Seshadrp/641-HW2-seshadri)
