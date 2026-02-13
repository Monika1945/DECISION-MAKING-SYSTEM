# Placement Readiness System

A MERN stack application to assess and track student placement readiness.

## Features
- **User Authentication**: Sign up and Login.
- **Dashboard**: View user details and navigate to evaluation.
- **Evaluation**: Input technical, aptitude, and communication scores.
- **Results**: Visual bar graph analysis, readiness status, and recommendations.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Chart.js
- **Backend**: Node.js, Express, MongoDB
- **Database**: MongoDB

## Setup & Run

1.  **Install Dependencies**:
    ```bash
    npm install
    cd server && npm install
    cd ../client && npm install
    ```

2.  **Environment Variables**:
    - Create a `.env` file in `server/` with:
      ```
      PORT=5000
      MONGO_URI=mongodb://localhost:27017/placement_readiness
      JWT_SECRET=your_secret_key
      ```

3.  **Run Application**:
    ```bash
    npm run dev
    ```
    This will start both the backend (port 5000) and frontend (port 5173) concurrently.

4.  **Access**:
    Open [http://localhost:5173](http://localhost:5173) in your browser.
