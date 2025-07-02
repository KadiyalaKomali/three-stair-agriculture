# 🚀 Complete ByteXL Deployment Guide for EcoTriFarm

## 📋 Pre-Deployment Checklist

### 1. Project Structure Verification
```
ecotrifarm/
├── frontend/              # React application
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── dist/             # Built files (after npm run build)
├── backend/              # FastAPI application
│   ├── app/
│   ├── requirements.txt
│   ├── run.py
│   └── .env
└── deployment/           # Deployment configurations
```

### 2. Environment Setup
- ✅ Node.js v16+ installed
- ✅ Python 3.8+ installed
- ✅ Database configured
- ✅ Environment variables set

## 🔧 Step 1: Prepare Frontend for Production

### Build the React Application
```bash
# In your project root
npm run build
```

This creates a `dist/` folder with optimized production files.

### Frontend Environment Variables
Create `frontend/.env.production`:
```env
VITE_API_URL=https://your-bytexl-backend-url.com
VITE_APP_TITLE=EcoTriFarm Dashboard
```

## 🐍 Step 2: Prepare Backend for Production

### Update Backend Configuration
Create `backend/.env.production`:
```env
# Database Configuration (Use ByteXL's database service)
DATABASE_URL=postgresql://username:password@bytexl-db-host:5432/ecotrifarm

# JWT Configuration
SECRET_KEY=your-super-secure-production-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS Configuration (Add your ByteXL domain)
CORS_ORIGINS=["https://your-bytexl-frontend-url.com"]

# Environment
ENVIRONMENT=production
```

### Production Requirements
Create `backend/requirements-production.txt`:
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
alembic==1.12.1
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
pydantic==2.5.0
pydantic-settings==2.1.0
python-dotenv==1.0.0
gunicorn==21.2.0
```

## 🌐 Step 3: ByteXL Deployment Configuration

### Create Dockerfile for Backend
Create `backend/Dockerfile`:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run the application
CMD ["gunicorn", "app.main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]
```

### Create Dockerfile for Frontend
Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code and build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Create Nginx Configuration
Create `frontend/nginx.conf`:
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # API proxy (optional - if backend is on different service)
        location /api/ {
            proxy_pass http://backend:8000/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Gzip compression
        gzip on;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    }
}
```

### Create Docker Compose for Local Testing
Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/ecotrifarm
      - SECRET_KEY=your-secret-key
      - CORS_ORIGINS=["http://localhost:3000"]
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=ecotrifarm
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

## 📱 Step 4: ByteXL Platform Deployment

### Option A: Using ByteXL Web Interface

1. **Login to ByteXL Dashboard**
   - Go to your ByteXL account
   - Navigate to "Applications" or "Deploy"

2. **Create New Application**
   - Click "New Application"
   - Choose "Full Stack Application"

3. **Upload Frontend**
   - Upload your `dist/` folder
   - Set domain/subdomain
   - Configure environment variables

4. **Deploy Backend**
   - Upload backend folder
   - Set Python runtime
   - Configure database connection
   - Set environment variables

### Option B: Using ByteXL CLI

```bash
# Install ByteXL CLI (if available)
npm install -g @bytexl/cli

# Login
bytexl login

# Deploy frontend
cd frontend
bytexl deploy --type=static --folder=dist

# Deploy backend
cd ../backend
bytexl deploy --type=python --runtime=3.11
```

### Option C: Git Integration

1. **Push to Repository**
   ```bash
   git add .
   git commit -m "Prepare for ByteXL deployment"
   git push origin main
   ```

2. **Connect Repository in ByteXL**
   - Link your GitHub/GitLab repository
   - Set build commands:
     - Frontend: `npm run build`
     - Backend: `pip install -r requirements.txt`

## 🗄️ Step 5: Database Setup on ByteXL

### Option 1: ByteXL Managed Database
1. Create PostgreSQL instance in ByteXL
2. Note connection details
3. Update `DATABASE_URL` in backend environment

### Option 2: External Database
```bash
# Example with Supabase
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres

# Example with PlanetScale
DATABASE_URL=mysql://[username]:[password]@[host]/[database]?sslaccept=strict

# Example with Railway
DATABASE_URL=postgresql://postgres:[password]@[host]:[port]/railway
```

## 🔐 Step 6: Environment Variables Configuration

### Frontend Environment Variables
```env
VITE_API_URL=https://your-backend.bytexl.app
VITE_APP_TITLE=EcoTriFarm Dashboard
VITE_ENVIRONMENT=production
```

### Backend Environment Variables
```env
DATABASE_URL=postgresql://user:pass@host:5432/ecotrifarm
SECRET_KEY=your-super-secure-production-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
CORS_ORIGINS=["https://your-frontend.bytexl.app"]
ENVIRONMENT=production
```

## 🚀 Step 7: Deployment Commands

### Build and Deploy Frontend
```bash
# Build for production
npm run build

# Test locally
npm run preview

# Deploy to ByteXL (method depends on ByteXL's interface)
# Upload dist/ folder or connect via Git
```

### Deploy Backend
```bash
# Install production dependencies
pip install -r requirements.txt

# Test locally
python run.py

# Deploy to ByteXL
# Upload backend folder or use Git integration
```

## 🧪 Step 8: Testing Deployment

### Health Checks
1. **Frontend**: Visit your ByteXL frontend URL
2. **Backend**: Check `https://your-backend.bytexl.app/health`
3. **API Docs**: Visit `https://your-backend.bytexl.app/docs`

### Test Login
- Email: `admin@ecotrifarm.com`
- Password: `admin123`

### Test Features
- ✅ Dashboard loads with data
- ✅ Fish management works
- ✅ Poultry management works
- ✅ Solar monitoring works
- ✅ Inventory management works
- ✅ Reports generate
- ✅ Settings save

## 🔧 Step 9: Post-Deployment Configuration

### SSL/HTTPS Setup
- ByteXL usually provides automatic SSL
- Verify HTTPS is working
- Update CORS origins if needed

### Domain Configuration
```bash
# If using custom domain
# Update DNS records to point to ByteXL
# Configure domain in ByteXL dashboard
```

### Monitoring Setup
- Set up health checks
- Configure error logging
- Set up performance monitoring

## 🚨 Troubleshooting Common Issues

### CORS Errors
```python
# In backend/app/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend.bytexl.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Database Connection Issues
```bash
# Test database connection
python -c "from app.database import create_tables; create_tables()"
```

### Build Failures
```bash
# Clear cache and rebuild
npm cache clean --force
rm -rf node_modules
npm install
npm run build
```

## 📞 Support

If you encounter issues:
1. Check ByteXL documentation
2. Verify environment variables
3. Check application logs
4. Test locally first
5. Contact ByteXL support

## 🎉 Success!

Your EcoTriFarm application should now be live on ByteXL!

- **Frontend**: `https://your-app.bytexl.app`
- **Backend API**: `https://your-api.bytexl.app`
- **Admin Panel**: Login with demo credentials

Remember to:
- Change default passwords
- Set up proper database backups
- Monitor application performance
- Keep dependencies updated