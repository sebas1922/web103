# 🎵 Festival Pulse

A full-stack music festival event management web application with real-time event tracking and an interactive stage selection interface.

## 🚀 Quick Start

### 1. Start the Backend Server

```bash
cd server
npm install
npm run dev
```

Backend runs on `http://localhost:3000`

### 2. Start the Frontend Client

In a new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### 3. Open Your Browser

Navigate to `http://localhost:5173` to see the Festival Pulse app!

## 📋 Features

### Core Features ✅
- ✅ React frontend with TypeScript
- ✅ PostgreSQL database backend
- ✅ RESTful API with Express
- ✅ Visual stage selection interface
- ✅ Stage detail pages with unique URLs
- ✅ Events filtered by stage

### Stretch Features ✅
- ✅ Upcoming events ticker on homepage
- ✅ Real-time event status (Past / Now / Upcoming)
- ✅ Status-based styling and animations
- ✅ Countdown timers for events
- ✅ Hover interactions for event details
- ✅ Festival neon theme with frosted glass UI

## 🎨 Design Highlights

- **Neon Theme**: Purple, pink, and cyan accents with dark background
- **Frosted Glass**: Backdrop blur effects on all major components
- **Status Colors**: 
  - 🔵 Cyan for upcoming events
  - 🟢 Green (pulsing) for live events
  - 🔴 Red for past events
- **Smooth Animations**: Hover effects, glow animations, transitions
- **Fixed Background**: Festival image with blur effect

## 🛠️ Tech Stack

### Frontend
- React 19
- TypeScript
- React Router v6
- Vite
- CSS3 (Custom properties, Grid, Flexbox)

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- pg (node-postgres)

## 📁 Project Structure

```
festival-pulse/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # EventCard
│   │   ├── pages/       # HomePage, StageDetailPage
│   │   ├── services/    # API layer
│   │   ├── types/       # TypeScript interfaces
│   │   └── utils/       # Event status logic
│   └── package.json
├── server/              # Express backend
│   ├── api/
│   │   ├── events/      # Events routes, controllers, services
│   │   └── stages/      # Stages routes, controllers, services
│   ├── config/          # Database & environment config
│   ├── scripts/seed/    # Database seeding
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Stages
- `GET /api/stages` - Get all stages
- `GET /api/stages/:id` - Get stage by ID
- `GET /api/stages/:id/events` - Get events for a stage

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID

## 🗄️ Database Schema

### Stages Table
```sql
- id: SERIAL PRIMARY KEY
- name: VARCHAR
- description: TEXT
- image_url: VARCHAR
```

### Events Table
```sql
- id: SERIAL PRIMARY KEY
- artist_name: VARCHAR
- start_time: TIMESTAMP
- genre: VARCHAR
- image_url: VARCHAR
- stage_id: INTEGER (FK -> stages.id)
```

## 🎯 User Flow

1. Land on homepage with festival title
2. See upcoming events ticker scrolling at top
3. Browse 4 interactive stage cards
4. Click a stage to view its events
5. See events sorted by status (live → upcoming → past)
6. Hover over event cards to see details
7. Use dropdown to switch between stages

## 📸 Screenshots

(Add your screenshots here after running the app)

## 🔧 Development

### Backend Development
```bash
cd server
npm run dev  # Runs with ts-node-dev (hot reload)
```

### Frontend Development
```bash
cd client
npm run dev  # Runs Vite dev server (hot reload)
```

### Seed Database
```bash
cd server
npm run seed  # Populates database with sample data
```

## 🧪 Testing Checklist

- [ ] Backend server starts on port 3000
- [ ] Frontend client starts on port 5173
- [ ] All 4 stages display on homepage
- [ ] Events ticker shows upcoming events
- [ ] Clicking a stage navigates to detail page
- [ ] Events are sorted correctly (live/upcoming/past)
- [ ] Hover on event cards shows details
- [ ] Stage dropdown works for navigation
- [ ] Color coding matches event status
- [ ] Animations are smooth

## 📚 Additional Documentation

See `FRONTEND_BUILD.md` for detailed frontend implementation notes.

## 🐛 Troubleshooting

**Issue**: Backend won't start
- Check that PostgreSQL is running
- Verify `.env` file has correct database credentials
- Run database migrations/seed scripts

**Issue**: Frontend can't connect to backend
- Ensure backend is running on port 3000
- Check browser console for CORS errors
- Verify API base URL in `client/src/services/api.ts`

**Issue**: No events showing
- Make sure database is seeded
- Check browser Network tab for API responses
- Verify event timestamps (some should be future dates)

## 👨‍💻 Author

Built for WEB103 - Week 3 Project

## 📝 License

MIT
