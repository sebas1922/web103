# Festival Pulse - Frontend Implementation

## 🎉 Overview

A festival event management web application with an interactive stage selection interface and real-time event status tracking. Built with React, TypeScript, and a stunning neon-themed UI with frosted glass components.

## 🏗️ Backend Routes (Updated)

### Stages Routes (`/api/stages`)
- `GET /api/stages` - Get all stages
- `GET /api/stages/:id` - Get a specific stage by ID
- `GET /api/stages/:id/events` - Get all events for a specific stage

### Events Routes (`/api/events`)
- `GET /api/events` - Get all events (used for homepage ticker)
- `GET /api/events/:id` - Get a specific event by ID

## 📁 Frontend Structure

```
client/src/
├── components/
│   ├── EventCard.tsx          # Event card with status-based styling
│   └── EventCard.css
├── pages/
│   ├── HomePage.tsx           # Interactive stage map & events ticker
│   ├── HomePage.css
│   ├── StageDetailPage.tsx    # Stage events with dropdown navigation
│   └── StageDetailPage.css
├── services/
│   ├── api.ts                 # Base API client
│   ├── stagesService.ts       # Stages API calls
│   └── eventsService.ts       # Events API calls
├── types/
│   └── index.ts               # TypeScript interfaces
├── utils/
│   └── eventStatus.ts         # Event status logic & sorting
├── App.tsx                    # Router setup
├── App.css
├── main.tsx
└── index.css                  # Global theme & styles
```

## 🎨 Features Implemented

### ✅ Core Features
- [x] React-based frontend with TypeScript
- [x] PostgreSQL database via backend API
- [x] Festival title and branding
- [x] Visual stage selection interface (grid of clickable stage cards)
- [x] Each stage has detail page with unique URL (`/stages/:id`)
- [x] Events filtered by selected stage
- [x] Frosted glass components with neon theme

### ✅ Stretch Features
- [x] Events ticker showing upcoming/current events on homepage
- [x] Time-based event status (upcoming, happening now, past)
- [x] Different formatting for event status:
  - **Upcoming**: Cyan border, countdown timer
  - **Now**: Green border with pulsing glow animation
  - **Past**: Red border, reduced opacity, grayscale
- [x] Hover interactions to reveal event details (time, genre)
- [x] Client-side sorting (current/upcoming first, then past)

## 🎯 Event Status Logic

Events are categorized based on current time:

```typescript
- Past: start_time < now - 1 hour
- Now: start_time within ±1 hour of current time
- Upcoming: start_time > now + 1 hour
```

### Sorting Order
1. Happening Now (green, pulsing)
2. Upcoming (cyan, sorted by soonest first)
3. Past (red, sorted by most recent first)

## 🎨 Design Theme

### Festival Neon Theme
- **Primary Colors**: Purple (#a855f7), Pink (#ec4899), Cyan (#06b6d4)
- **Status Colors**: 
  - Upcoming: Cyan (#06b6d4)
  - Now: Green (#10b981)
  - Past: Red (#ef4444)
- **Background**: Dark gradient with fixed festival image
- **Components**: Frosted glass effect with backdrop blur
- **Typography**: Inter font family with neon glow effects

### Visual Effects
- Gradient text with glow animation
- Pulsing animations for live events
- Hover scale transforms
- Smooth transitions and cubic-bezier easing
- Custom scrollbar styling

## 🚀 Running the Application

### Prerequisites
- Backend server running on `http://localhost:3000`
- Node.js and npm installed

### Start the Frontend
```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` (Vite default)

### Environment Configuration
The API base URL defaults to `http://localhost:3000`. To override:

```bash
# client/.env (optional)
VITE_API_BASE_URL=http://localhost:3000
```

## 📱 User Flow

1. **Homepage** (`/`)
   - See festival title "🎵 Festival Pulse"
   - View upcoming events ticker at top
   - Browse 4 interactive stage cards
   - Click any stage to view events

2. **Stage Detail** (`/stages/:id`)
   - Background blurred with stage image
   - Dropdown to switch between stages
   - Event cards sorted by status
   - Hover over cards to see time/genre details

## 🎭 Component Details

### HomePage
- Fetches all stages and events on mount
- Filters top 8 upcoming/current events for ticker
- Grid layout for stage cards with hover effects
- Fixed background with festival image

### StageDetailPage
- Fetches stage info and events by stage ID
- Stage selector dropdown in header
- Frosted glass overlay effect
- Sorted event grid with status-based styling

### EventCard
- Displays artist name, genre, time
- Status badge (LIVE NOW / Upcoming / Completed)
- Hover to reveal additional info
- Color-coded borders and effects
- Countdown timer for upcoming events

## 🔧 Technical Highlights

- **React Router v6** for client-side routing
- **TypeScript** for type safety
- **RESTful API** integration
- **CSS Variables** for theming
- **Backdrop Blur** for frosted glass
- **CSS Grid & Flexbox** for responsive layouts
- **CSS Animations** for smooth interactions
- **Type-only imports** for proper TypeScript module syntax

## 📊 API Response Shapes

### Stage
```typescript
{
  id: number;
  name: string;
  description: string;
  image_url: string;
}
```

### Event
```typescript
{
  id: number;
  artist_name: string;
  start_time: string; // "YYYY-MM-DD HH:mm:ss"
  genre: string;
  image_url: string;
  stage_id: number;
}
```

## 🎯 Key Files to Review

1. **`src/pages/HomePage.tsx`** - Main landing page with stage map
2. **`src/pages/StageDetailPage.tsx`** - Stage events view
3. **`src/components/EventCard.tsx`** - Event card with status logic
4. **`src/utils/eventStatus.ts`** - Event status & sorting logic
5. **`src/index.css`** - Global neon theme variables
6. **`src/services/stagesService.ts`** - Stage API calls

## 🐛 Testing Notes

- Ensure backend is seeded with data before testing
- Check that event timestamps span past, present, and future for full effect
- Test stage dropdown navigation
- Verify hover interactions on event cards
- Check that "LIVE NOW" events pulse with green glow

## 📝 Future Enhancements (Optional)

- Search/filter events by artist or genre
- Add event details modal
- Mobile responsive design
- Real-time countdown updates (setInterval)
- Add favorite/bookmark events
- Calendar view for events
- Share event links

---

**Built with ❤️ for Festival Pulse**

