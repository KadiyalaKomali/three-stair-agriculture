# 🗄️ ByteXL Database Setup for EcoTriFarm

## Your Database Configuration

Based on your ByteXL database credentials:

```
Host: bytexldb.com
Port: 5052
Database: db_43pe68w32
Username: user_43pe68w32
Password: p43pe68w32
```

## Generated DATABASE_URL

```env
DATABASE_URL=postgresql://user_43pe68w32:p43pe68w32@bytexldb.com:5052/db_43pe68w32
```

## Setup Steps

### 1. Test Database Connection

```bash
# Navigate to backend directory
cd backend

# Test the connection
python -c "
import psycopg2
try:
    conn = psycopg2.connect('postgresql://user_43pe68w32:p43pe68w32@bytexldb.com:5052/db_43pe68w32')
    print('✅ Database connection successful!')
    conn.close()
except Exception as e:
    print(f'❌ Database connection failed: {e}')
"
```

### 2. Create Database Tables

```bash
# Create all tables for EcoTriFarm
python -c "from app.database import create_tables; create_tables()"
```

### 3. Verify Tables Created

```bash
# Check if tables were created successfully
python -c "
from app.database import engine
from sqlalchemy import inspect
inspector = inspect(engine)
tables = inspector.get_table_names()
print('Created tables:', tables)
"
```

### 4. Start Backend Server

```bash
# Start the FastAPI server
python run.py
```

## Environment Files Updated

✅ **backend/.env** - Development configuration
✅ **backend/.env.production** - Production configuration

## Database Schema

The following tables will be created:
- `users` - User authentication and profiles
- `fish` - Fish batch management
- `poultry` - Poultry batch management
- `egg_production` - Daily egg production records
- `solar_data` - Solar power generation data
- `inventory` - Feed and equipment inventory

## Security Notes

🔒 **Important Security Reminders:**

1. **Change the SECRET_KEY** in production:
   ```env
   SECRET_KEY=your-unique-super-secure-key-here
   ```

2. **Update CORS origins** with your actual ByteXL domain:
   ```env
   CORS_ORIGINS=["https://your-actual-app.bytexl.app"]
   ```

3. **Database credentials** are already configured for your ByteXL database

## Troubleshooting

### Connection Issues
```bash
# If you get connection errors, verify:
1. Database host is accessible: bytexldb.com:5052
2. Credentials are correct
3. Database exists: db_43pe68w32
4. User has proper permissions: user_43pe68w32
```

### SSL/TLS Issues
```bash
# If SSL is required, update the DATABASE_URL:
DATABASE_URL=postgresql://user_43pe68w32:p43pe68w32@bytexldb.com:5052/db_43pe68w32?sslmode=require
```

## Next Steps

1. ✅ Database URL configured
2. ⏳ Test connection
3. ⏳ Create tables
4. ⏳ Start backend server
5. ⏳ Deploy to ByteXL platform

Your EcoTriFarm backend is now configured to use your ByteXL PostgreSQL database!