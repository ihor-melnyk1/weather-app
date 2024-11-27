# Weather App 🌦️

A simple weather application that fetches data from the **OpenWeatherMap API**. It uses **NestJS** for the backend and **React** for the frontend. The app supports caching on the frontend and saves request history in MongoDB.

---

## 🚀 Getting Started

### **Prerequisites**

Make sure the following tools are installed on your system:
- **Node.js** (version 18 or higher)
- **pnpm** (package manager)
- **MongoDB** (local instance or a cloud-hosted database)

---

### **Steps to Run Locally**

#### 1. Clone the Repository
```bash
git clone https://github.com/ihor-melnyk1/weather-app.git
cd weather-app
```

#### 2. Configure Environment Variables

Create `.env` files in both the `backend` and `frontend` directories with the following content:

##### **File `backend/.env`:**
```env
MONGO_URI=mongodb://localhost:27017/weather-app
OPENWEATHER_API_KEY=your_openweathermap_api_key
PORT=3000
FRONTEND_URL=http://localhost:5173
```

##### **File `frontend/.env`:**
```env
VITE_BACKEND_URL=http://localhost:3000
```

> **Note:** Replace `your_openweathermap_api_key` with your API key from [OpenWeatherMap](https://openweathermap.org/api).

#### 3. Start the Backend

Navigate to the `backend` directory and run:
```bash
cd backend
pnpm install
pnpm start:dev
```

The backend will start on `http://localhost:3000`.

#### 4. Start the Frontend

Navigate to the `frontend` directory and run:
```bash
cd frontend
pnpm install
pnpm dev
```

The frontend will start on `http://localhost:5173`.

---

### **Available Scripts**

#### **Frontend**
- `pnpm dev` — Start the development server.
- `pnpm build` — Build the project for production.
- `pnpm preview` — Preview the production build.

#### **Backend**
- `pnpm start:dev` — Start the development server.
- `pnpm start` — Start the server in production mode.
- `pnpm test` — Run the test suite.

---

### **Project Structure**

```plaintext
weather-app/
├── backend/           # Backend built with NestJS
│   ├── src/           # Source code
│   ├── .env           # Environment configuration
│   ├── package.json   # Backend dependencies
├── frontend/          # Frontend built with React
│   ├── src/           # Source code
│   ├── .env           # Environment configuration
│   ├── package.json   # Frontend dependencies
├── .gitignore         # Ignored files
├── package.json       # Monorepo dependencies
└── README.md          # Documentation
```

---

### **Features**

- Enter a city name and fetch weather data from OpenWeatherMap.
- Save request history in MongoDB.
- View the latest 100 search queries.
- Cache data on the frontend to reduce API requests.
- Responsive design with autocomplete support.

---

### **Technologies Used**

- **Frontend**: React, Vite
- **Backend**: NestJS
- **Database**: MongoDB
- **CSS**: Basic styling with custom CSS

---

### **Troubleshooting**

1. **Backend does not start:**
   - Ensure MongoDB is running at `localhost:27017`.
   - Verify your OpenWeatherMap API key in `.env`.

2. **Frontend cannot fetch data:**
   - Check if the backend is running at `http://localhost:3000`.

---
