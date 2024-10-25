# CareNest

CareNest is a React-based web application that uses AI to predict possible diseases based on the symptoms provided by the user. It also allows students to register, log in, and track their symptom history, with precautionary advice based on the diagnosis.

## Features

- **AI-Powered Symptom Diagnosis**: Users can input symptoms and receive potential disease predictions.
- **Student Registration & Login**: Students can sign up using their student card ID, email, first name, last name, and password. Log in is possible via email or student card ID with a password.
- **Symptom Tracking**: The app records cases including the symptoms, disease, date of input, and precautionary advice.
- **User-Friendly Interface**: Built with React, the app offers a smooth and intuitive user experience.

## Technologies Used

- **Frontend**: React
- **AI Model**: Custom AI model for predicting diseases based on symptoms
- **Authentication**: Email and student card ID-based login system
- **State Management**: React Hooks and Context API

## Getting Started

### Prerequisites

- Node.js (v13 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Pitou911/carenest.git
   ```
2. Navigate to the project directory:
   ```bash
   cd YOUR_DIRECTORY
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

To start the application in development mode:

```bash
npm start
# or
yarn start
```

To start the AI model server in development mode:
```bash
pyton app.py
```

To start the backend server in development mode:
```bash
mvn spring-boot:run
```
