# 🔧 ByteXL Environment Variables Setup

## Required Environment Variables for ByteXL Deployment

### Backend Environment Variables

Set these in your ByteXL backend application dashboard:

```env
# Database Configuration (Your ByteXL Database)
DATABASE_URL=postgresql://user_43pe68w32:p43pe68w32@bytexldb.com:5052/db_43pe68w32

# JWT Security (CHANGE THIS!)
SECRET_KEY=EcoTriFarm-ByteXL-Prod-2024-YourUniqueSecretKey-ChangeThis

# CORS Origins (Update with your actual ByteXL URLs)
CORS_ORIGINS=["https://your-app-name.bytexl.app"]

# Environment
ENVIRONMENT=production
```

### Frontend Environment Variables

Set these in your ByteXL frontend application dashboard:

```env
# API URL (Your ByteXL backend URL)
VITE_API_URL=https://your-backend-app.bytexl.app

# App Configuration
VITE_APP_TITLE=EcoTriFarm Dashboard
VITE_ENVIRONMENT=production
```

## 🚨 CRITICAL: What You MUST Change

### 1. SECRET_KEY
**Current:** `EcoTriFarm-ByteXL-Prod-2024-SecureKey-Change-This-To-Your-Own-Random-String`

**Change to:** A unique, random string (at least 32 characters)

**Generate a secure key:**
```bash
# Option 1: Using Python
python -c "import secrets; print(secrets.token_urlsafe(32))"

# Option 2: Using OpenSSL
openssl rand -base64 32

# Option 3: Manual (example)
EcoTriFarm-MyFarm-2024-$(date +%s)-$(openssl rand -hex 16)
```

### 2. CORS_ORIGINS
**Current:** `["https://your-ecotrifarm-app.bytexl.app"]`

**Change to:** Your actual ByteXL app URLs

**Examples:**
```env
# Single domain
CORS_ORIGINS=["https://ecotrifarm-dashboard.bytexl.app"]

# Multiple domains
CORS_ORIGINS=["https://ecotrifarm-dashboard.bytexl.app", "https://farm.yourdomain.com"]

# Development + Production
CORS_ORIGINS=["https://ecotrifarm-dashboard.bytexl.app", "http://localhost:5173"]
```

## 📱 ByteXL Dashboard Configuration Steps

### Step 1: Backend App Configuration
1. Go to your ByteXL dashboard
2. Navigate to your backend application
3. Go to "Environment Variables" or "Settings"
4. Add these variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `postgresql://user_43pe68w32:p43pe68w32@bytexldb.com:5052/db_43pe68w32` |
| `SECRET_KEY` | `Your-Generated-Secure-Key-Here` |
| `CORS_ORIGINS` | `["https://your-frontend-app.bytexl.app"]` |
| `ENVIRONMENT` | `production` |

### Step 2: Frontend App Configuration
1. Go to your frontend application in ByteXL
2. Add these environment variables:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://your-backend-app.bytexl.app` |
| `VITE_APP_TITLE` | `EcoTriFarm Dashboard` |
| `VITE_ENVIRONMENT` | `production` |

## 🔄 Deployment Workflow

### 1. Prepare Files
```bash
# Build frontend
npm run build

# Test backend locally
cd backend
python run.py
```

### 2. Deploy to ByteXL
```bash
# Upload dist/ folder for frontend
# Upload backend/ folder for backend
# Set environment variables in ByteXL dashboard
```

### 3. Update URLs
After deployment, update CORS_ORIGINS with your actual ByteXL URLs:
```env
CORS_ORIGINS=["https://ecotrifarm-abc123.bytexl.app"]
```

## 🧪 Testing Your Deployment

### Health Checks
1. **Backend Health:** `https://your-backend.bytexl.app/health`
2. **API Docs:** `https://your-backend.bytexl.app/docs`
3. **Frontend:** `https://your-frontend.bytexl.app`

### Test Login
- Email: `admin@ecotrifarm.com`
- Password: `admin123`

## 🚨 Security Checklist

- [ ] SECRET_KEY changed from default
- [ ] CORS_ORIGINS updated with actual URLs
- [ ] Database credentials secured
- [ ] HTTPS enabled (ByteXL default)
- [ ] Default admin password changed (after first login)

## 📞 Need Help?

If you encounter issues:
1. Check ByteXL application logs
2. Verify environment variables are set correctly
3. Test database connection
4. Check CORS configuration
5. Contact ByteXL support

Your EcoTriFarm application is ready for ByteXL deployment! 🚀