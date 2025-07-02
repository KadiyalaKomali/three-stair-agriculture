# Database Setup Guide for EcoTriFarm

## Quick Database Change Instructions

### 1. SQLite (Easiest - No Installation Required)
Perfect for development and small deployments.

**Steps:**
1. Update your `.env` file:
   ```env
   DATABASE_URL=sqlite:///./ecotrifarm.db
   ```
2. No additional packages needed!
3. Run: `python -c "from app.database import create_tables; create_tables()"`

### 2. MySQL/MariaDB
Popular open-source database.

**Steps:**
1. Install MySQL/MariaDB on your system
2. Create database: `CREATE DATABASE ecotrifarm;`
3. Install Python driver: `pip install pymysql`
4. Update your `.env` file:
   ```env
   DATABASE_URL=mysql+pymysql://username:password@localhost:3306/ecotrifarm
   ```
5. Run: `python -c "from app.database import create_tables; create_tables()"`

### 3. SQL Server
Microsoft's enterprise database.

**Steps:**
1. Install SQL Server
2. Install ODBC Driver 17 for SQL Server
3. Install Python driver: `pip install pyodbc`
4. Update your `.env` file:
   ```env
   DATABASE_URL=mssql+pyodbc://username:password@server/ecotrifarm?driver=ODBC+Driver+17+for+SQL+Server
   ```
5. Run: `python -c "from app.database import create_tables; create_tables()"`

### 4. Cloud Databases

#### AWS RDS
```env
DATABASE_URL=postgresql://username:password@your-rds-endpoint.amazonaws.com:5432/ecotrifarm
```

#### Google Cloud SQL
```env
DATABASE_URL=mysql+pymysql://username:password@your-cloud-sql-ip:3306/ecotrifarm
```

#### Azure SQL Database
```env
DATABASE_URL=mssql+pyodbc://username:password@your-server.database.windows.net/ecotrifarm?driver=ODBC+Driver+17+for+SQL+Server
```

## Migration Steps

1. **Backup existing data** (if any)
2. **Update .env file** with new DATABASE_URL
3. **Install required driver** (see requirements_database_options.txt)
4. **Create new database** on your chosen system
5. **Run table creation**: `python -c "from app.database import create_tables; create_tables()"`
6. **Test connection**: `python run.py`

## Recommended Choices

- **Development**: SQLite (no setup required)
- **Small Production**: PostgreSQL or MySQL
- **Enterprise**: SQL Server or Oracle
- **Cloud**: AWS RDS, Google Cloud SQL, or Azure SQL

## Need Help?

The application will work with any of these databases without code changes - just update the DATABASE_URL in your .env file!