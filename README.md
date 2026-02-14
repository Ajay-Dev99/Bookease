# Bookease Appointment Booking System

Bookease is a comprehensive full-stack application designed to streamline the appointment booking process. It connects service providers with customers, allowing for seamless service management, scheduling, and booking.

## 🚀 Features

- **User Authentication**: Secure login and registration for both Service Providers and Customers (Seekers).
- **Service Provider Dashboard**:
  - Create, update, and manage services.
  - Set working hours and slot durations.
  - **Holiday Management**: Block specific dates (e.g., holidays, vacations) to prevent bookings.
  - Upload service images.
- **Customer Experience**:
  - Browse available service providers.
  - View service details and availability.
  - Interactive Calendar to select dates and times.
  - Book appointments with real-time slot validation.
- **Booking Management**: View and manage upcoming and past appointments.

## 🛠️ Technology Stack

### Frontend (`client`)
- **Framework**: React (via Vite)
- **Styling**: Tailwind CSS, Ant Design
- **State Management**: Redux Toolkit, React Query (@tanstack/react-query)
- **Routing**: React Router DOM
- **HTTP Client**: Axios

### Backend (`server`)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary
- **Security**: BCrypt, CORS

## 📂 Project Structure

```
Bookease/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components (Provider, User, Auth)
│   │   ├── services/       # API integration
│   │   └── ...
│   └── ...
├── server/                 # Backend Node.js API
│   ├── src/
│   │   ├── modules/        # Feature-based modules (Auth, Services, Bookings)
│   │   ├── config/         # DB and environment config
│   │   └── ...
│   └── ...
└── README.md
```

## ⚙️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **MongoDB** (Local instance or Atlas URI)
- **Cloudinary Account** (for image upload functionality)

### 1. Clone the Repository

```bash
git clone https://github.com/Ajay-Dev99/Bookease.git
cd Bookease
```

### 2. Backend Setup (`server`)

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` directory and add your configuration:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/bookease
    JWT_SECRET=your_super_secret_jwt_key
    CORS_ORIGIN=http://localhost:5173

    # Cloudinary Configuration
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```
    The server should be running at `http://localhost:5000`.

### 3. Frontend Setup (`client`)

1.  Open a new terminal and navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `client` directory. **This is important as the default port might differ.**
    ```env
    VITE_API_URL=http://localhost:5000/api/v1
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
    The application should be running at `http://localhost:5173`.

## 🧪 Usage

1.  **Register a Provider**: Go to `/signup/provider` to create a provider account.
2.  **Create Service**: Log in as a provider and add a new service with schedule and images.
3.  **Register a Customer**: Open an incognito window or log out, then go to `/signup/seeker` (or customer path) to create a user account.
4.  **Book Service**: Browse providers, select a service, pick a date/time, and confirm booking.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.
