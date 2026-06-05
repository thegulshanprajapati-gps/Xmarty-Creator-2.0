# Xmarty Creator 2.0

A modern, high-performance web application built with **Next.js 15**, **React 19**, and **Genkit (Gemini AI)**.

---

## 🚀 Features & Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Frontend Library**: React 19
- **Styling**: Tailwind CSS & Framer Motion for premium, modern animations
- **Database**: MongoDB (Atlas) for storage
- **AI Integrations**: Genkit equipped with Google Gemini 2.5 Flash for personalized flows and assistants
- **Media Management**: Cloudinary Integration for optimized asset hosting

---

## 🛠️ Environment Configuration

The application requires environment variables to connect to MongoDB, Gemini AI, and Cloudinary. Copy the variables from `.env.example` to `.env` or `.env.local`:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://...

# Gemini API Configuration
GEMINI_API_KEY=AIzaSy...

# Cloudinary Setup
CLOUDINARY_URL=cloudinary://...
NEXT_PUBLIC_CLOUDINARY_GALLERY_URL=https://res.cloudinary.com/...

# Environment Setup
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_MAIN_SITE_URL=http://localhost:3000
```

---

## 💻 Available Scripts

In the project directory, you can run the following commands:

### Development Mode
Starts the development server with Next.js Turbopack enabled:
```bash
npm run dev
```
Open [http://localhost:9002](http://localhost:9002) in your browser to view the application.

### Production Build
Performs database connectivity and schema validation checks first, then builds the application for production:
```bash
npm run build
```

### Start Production Server
Starts the built application in production mode:
```bash
npm start
```

### AI Developer UI (Genkit)
Launches the Genkit Developer UI to trace, test, and develop AI flows:
```bash
npm run genkit:dev
```

### TypeScript Validation
Checks for TypeScript compilation errors:
```bash
npm run typecheck
```

---

## 📂 Project Structure

```
├── scripts/              # Build-time database and asset validation scripts
├── src/
│   ├── ai/               # Genkit initialization, models, and AI flows
│   ├── app/              # Next.js App Router (pages and API endpoints)
│   ├── components/       # Custom React UI components (Radix + Shadcn-style)
│   ├── hooks/            # Reusable React hooks
│   └── lib/              # Database clients (MongoDB/Supabase) and helpers
```
