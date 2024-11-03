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
- pip (v22.3.1)
- Apache Maven (v3.9.9)
- Java jdk-23

### Frontend Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Pitou911/SDE2024.git
   ```
2. Navigate to the project directory:
   ```bash
   cd YOUR_DIRECTORY/frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
### AI_model Installation
1. After Cloning the repository:
2. Navigate to the ai_model directory:
   ```bash
   cd YOUR_DIRECTORY/ai_model
   ```
3. Install required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
### Running the Application

To start the application in development mode:

```bash
cd YOUR_DIRECTORY/frontend
```
```bash
npm start
# or
yarn start
```

To start the AI model server in development mode:

```bash
cd YOUR_DIRECTORY/ai_model
```
```bash
pip install -r requirements.txt
python app.py
```

```bash
cd YOUR_DIRECTORY/carenest
```
To start the backend server in development mode:
```bash
mvn spring-boot:run
```
