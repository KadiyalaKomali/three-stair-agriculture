# EcoTriFarm Backend

This directory contains the FastAPI backend implementation for the EcoTriFarm smart farm management system.

## Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── config.py            # Configuration settings
│   ├── database.py          # Database connection and setup
│   ├── models/              # SQLAlchemy models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── fish.py
│   │   ├── poultry.py
│   │   ├── solar.py
│   │   └── inventory.py
│   ├── schemas/             # Pydantic schemas
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── fish.py
│   │   ├── poultry.py
│   │   ├── solar.py
│   │   └── inventory.py
│   ├── api/                 # API routes
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── fish.py
│   │   ├── poultry.py
│   │   ├── solar.py
│   │   └── inventory.py
│   ├── core/                # Core functionality
│   │   ├── __init__.py
│   │   ├── auth.py          # JWT authentication
│   │   └── security.py      # Security utilities
│   └── utils/               # Utility functions
│       ├── __init__.py
│       └── helpers.py
├── requirements.txt         # Python dependencies
├── .env.example            # Environment variables template
└── run.py                  # Application runner
```

## Setup Instructions

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Run database migrations:
```bash
python -c "from app.database import create_tables; create_tables()"
```

5. Start the server:
```bash
python run.py
```

The API will be available at `http://localhost:8000`
API documentation will be available at `http://localhost:8000/docs`

## Environment Variables

Create a `.env` file with the following variables:

```
DATABASE_URL=postgresql://username:password@localhost:5432/ecotrifarm
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## API Endpoints

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