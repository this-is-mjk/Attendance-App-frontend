sorry but react code is a bit messy, and not comment out properly, i didn't had much left before the deadline

### IITK Attendence App

React-based web application for managing student attendance. It includes features for logging in, marking attendance, adding students, and retrieving attendance records, all features using a face-recognition by python with flask backend

Refer Demo:- https://drive.google.com/file/d/1dHEqofvBiVSwp0DsM_fATmrwoBwefYhS/view?usp=sharing for how to use

frontend:-https://github.com/this-is-mjk/Attendance-App.git

backend:- https://github.com/this-is-mjk/Attendance-app-backend.git

refer the README in the backend for better understanding the backend implementation

### Scope of improvement

1. increase the readablity
2. organise the files and fucntions in a better way.
3. understand the concepts of useEffect, hooks, ects in deep, currently i face a bit issue in this topic
4. Reduce copy pasting, increase typing you myself even when i just following the tutorial online, or only online resource.

### Endpoints

POST /login - Login using roll number and webcam image.
POST /mark-attendence - Mark attendance using roll number and webcam image.
POST /add-student - Add a new student using roll number and webcam image.
POST /get-attendence - Get attendance data for a specific roll number.
GET /mark-absent-all - Mark all other students as absent for the day.

### Dependencies

1. React
2. Axios
3. Material-UI
4. js-cookie <!--  not as such as the JWT token is not working properly -->

## Components

1. Home.js
   main component, handles the application's logic and renders the appropriate UI elements based on the user's state (logged in, admin, etc.).

2. alert.js
   Displays alert messages to the user based on the response recieved form server.

3. attendenceTable.js
   Renders a table with attendance data recieved

4. camera.js
   Handles the webcam functionality for showing the webcam image on the page

5. inputID.js
   Input field component for entering the roll number.

6. request.js
   Contains functions for sending HTTP requests to the backend server with fixed parameters

7. createFormData.js
   function to create FormData object from the roll number and webcam image, to send in the request

8. requestCameraPermission.js
   Requests camera access permissions if the browser do not provide the permission

9. infoToggle.js
   toggling additional information on the UI, just for looks and info 😀

10. loadScreen.js
    Loading screen component displayed during data fetching.

### Backend Integration

http://localh.st:5000 for CORS issue solution, clone the backend repo and run the code

npm start for this repo
python app.py for backend,

ensure to insatll all the requirements.
