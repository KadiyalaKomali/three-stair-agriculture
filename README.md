# EcoTriFarm - Smart Farm Management Dashboard

A comprehensive smart farm management system for sustainable aquaculture, poultry, and solar energy monitoring.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- PostgreSQL database

### Frontend Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Start the development server:**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate
```

3. **Install Python dependencies:**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit the `.env` file with your database credentials:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/ecotrifarm
SECRET_KEY=your-very-secret-key-here-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

5. **Create database tables:**
```bash
python -c "from app.database import create_tables; create_tables()"
```

6. **Start the backend server:**
```bash
python run.py
```

The backend API will be available at `http://localhost:8000`
API documentation will be available at `http://localhost:8000/docs`

## 🔐 Demo Login Credentials

- **Email:** admin@ecotrifarm.com
- **Password:** admin123

## 📱 Features

- **Dashboard:** Real-time monitoring of fish, poultry, and solar systems
- **Fish Management:** Track fish batches, growth, and health status
- **Poultry Management:** Monitor hens and egg production
- **Solar Monitoring:** Track power generation and consumption
- **Inventory:** Manage feed and equipment stock levels
- **Reports:** Generate comprehensive analytics and exports
- **Settings:** User profile and system configuration

## 🛠 Development

### Frontend Development
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

### Backend Development
```bash
python run.py   # Start FastAPI server with auto-reload
```

## 📊 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token

### Fish Management
- `GET /fish/` - Get all fish batches
- `POST /fish/` - Create new fish batch
- `PUT /fish/{id}` - Update fish batch
- `DELETE /fish/{id}` - Delete fish batch

### Poultry Management
- `GET /poultry/` - Get all poultry batches
- `POST /poultry/` - Create new poultry batch
- `PUT /poultry/{id}` - Update poultry batch
- `DELETE /poultry/{id}` - Delete poultry batch

### Solar Monitoring
- `GET /solar/` - Get solar data
- `POST /solar/` - Add solar reading
- `PUT /solar/{id}` - Update solar reading
- `DELETE /solar/{id}` - Delete solar reading

### Inventory Management
- `GET /inventory/` - Get all inventory items
- `POST /inventory/` - Add new inventory item
- `PUT /inventory/{id}` - Update inventory item
- `DELETE /inventory/{id}` - Delete inventory item

## 🏗 Project Structure

```
ecotrifarm/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Application pages
│   ├── context/           # React context providers
│   ├── services/          # API services and mock data
│   └── types/             # TypeScript type definitions
├── backend/               # FastAPI backend
│   ├── app/              # Application code
│   │   ├── api/          # API routes
│   │   ├── models/       # Database models
│   │   ├── schemas/      # Pydantic schemas
│   │   └── core/         # Core functionality
│   └── requirements.txt  # Python dependencies
└── README.md             # This file
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/ecotrifarm

# JWT Configuration
SECRET_KEY=your-very-secret-key-here-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS Configuration
CORS_ORIGINS=["http://localhost:3000", "http://localhost:5173"]

# Environment
ENVIRONMENT=development
```

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy the dist/ folder to your hosting provider
```

### Backend Deployment
```bash
# Install dependencies
pip install -r requirements.txt

# Set production environment variables
export DATABASE_URL=your_production_database_url
export SECRET_KEY=your_production_secret_key

# Run with production WSGI server
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 📝 License

This project is licensed under the MIT License.