# Aiviora: AI-Powered Preventive Health Risk Engine 🩺✨

Aiviora is a high-performance, production-ready preventive healthcare platform designed to empower users with AI-driven health insights, risk assessments, and specialized wellness tracking. Built with a "Stripe-level" premium aesthetic, it combines cutting-edge machine learning logic with a fluid, glassmorphism-inspired user interface.

![Aiviora Dashboard Preview](https://img.shields.io/badge/Aesthetics-Premium-blueviolet?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production--Ready-success?style=for-the-badge)

---

## 🚀 Key Features

### 1. AI Health Risk Assessment 🧠
- Comprehensive 5-layer risk scoring engine.
- Predictive analysis for chronic conditions (Diabetes, Heart Disease, Hypertension).
- Personalized health recommendations based on metabolic and lifestyle markers.

### 2. Interactive AI Healthcare Assistant 🤖
- 24/7 intelligent chat interface for health queries.
- Context-aware responses with support for chat history.
- Real-time interaction with smooth, animated message streams.

### 3. Women's Health & Wellness Suite 🌸
- Advanced menstrual cycle tracking and prediction.
- Hormonal health insights and symptom logging.
- Specialized wellness tips tailored to various phases of the cycle.

### 4. Visual Health Analytics 📊
- Dynamic charts and graphs tracking health trends over time.
- Historical data visualization for risk scores and vital metrics.
- PDF/Report generation for clinical consultations.

### 5. Premium User Experience 💎
- **Glassmorphism UI**: Modern, translucent design system.
- **Micro-animations**: Powered by Framer Motion for a "living" interface.
- **Dark Mode Optimized**: Sleek navy/cyan gradient themes.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS (Custom Design System)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State/Routing**: React Router DOM & Hooks

### Backend
- **Environment**: Node.js
- **Server**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security**: JWT Authentication & Bcrypt.js password hashing
- **File Handling**: Multer for report uploads

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/adi12345-ji/AIviora.git
   cd aiviora-healthtech
   ```

2. **Install All Dependencies**
   The project uses a root script to install dependencies for both frontend and backend simultaneously.
   ```bash
   npm run install:all
   ```

3. **Environment Configuration**
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   AI_MOCK_DELAY=1500
   ```

---

## 🚀 Running the Application

To start both the frontend and backend in development mode with a single command:

```bash
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

---

## 🏗 Project Structure

```text
├── backend/            # Express server, MongoDB models, & Controllers
│   ├── config/         # Database & environment config
│   ├── controllers/    # Business logic for routes
│   ├── models/         # Mongoose schemas
│   └── routes/         # API endpoints (Auth, Chat, Health, etc.)
├── frontend/           # React + Vite application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Main application views
│   │   └── utils/      # API services & helpers
├── package.json        # Root workspace configuration
└── README.md           # This file
```

---

## 🛡 Security
- **Authentication**: Stateless JWT-based authentication.
- **Hashing**: Multi-round Bcrypt password hashing.
- **CORS**: Configured for secure cross-origin requests.

## 📄 License
This project is licensed under the ISC License.

---

Built with ❤️ for a healthier future.
