# 🧪 Testing Guide - Festival Pulse

## Pre-Testing Setup

### 1. Ensure Database is Seeded

```bash
cd server
npm run seed
```

You should see output like:
```
Connected to database
Creating Stages
Created Stage Pyramid Stage
Created Stage Odyssey Tent
...
Seeding completed successfully!
```

### 2. Start Both Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

Should show:
```
Server is running on http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

Should show:
```
VITE v7.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

## 🧪 Manual Testing Checklist

### Homepage Tests (`/`)

#### Visual Elements
- [ ] Page loads without errors
- [ ] Title "🎵 Festival Pulse" displays with gradient neon effect
- [ ] Subtitle "Experience the rhythm of live music" visible
- [ ] Background image is visible but blurred
- [ ] Dark gradient overlay on background

#### Events Ticker
- [ ] "⚡ Happening Soon" section displays
- [ ] At least 1-8 upcoming events show in ticker
- [ ] Each event shows artist name and countdown
- [ ] Events have colored left borders (cyan or green)
- [ ] Ticker is horizontally scrollable
- [ ] Hover effect on ticker events works (lift up slightly)

#### Stage Grid
- [ ] "Select a Stage" title displays
- [ ] Exactly 4 stage cards show in grid
- [ ] Each stage has:
  - [ ] Background image visible
  - [ ] Stage name (Pyramid Stage, Odyssey Tent, etc.)
  - [ ] Stage description text
  - [ ] Frosted glass effect on card
  
#### Interactions
- [ ] Hover over stage card:
  - [ ] Card lifts up (translateY)
  - [ ] Border changes to pink
  - [ ] Glow effect appears
  - [ ] Background image zooms slightly
  - [ ] Overlay darkens
- [ ] Click any stage card:
  - [ ] Navigates to `/stages/:id` URL
  - [ ] No console errors

### Stage Detail Page Tests (`/stages/:id`)

#### Navigation
- [ ] URL updates correctly (e.g., `/stages/1`)
- [ ] Page loads without errors
- [ ] Background shows stage-specific image (blurred)

#### Header Section
- [ ] "← Back" button visible on left
- [ ] Click "Back" button returns to homepage
- [ ] Stage dropdown visible on right
- [ ] Dropdown shows all 4 stages
- [ ] Current stage is selected in dropdown
- [ ] Selecting different stage:
  - [ ] URL updates
  - [ ] Page content updates
  - [ ] No page reload (client-side routing)

#### Stage Info Banner
- [ ] Stage name displays in large gradient text
- [ ] Stage description displays below name
- [ ] Frosted glass effect on banner

#### Events Section
- [ ] "Event Lineup" title displays
- [ ] Events load and display
- [ ] Events are in grid layout
- [ ] No events message shows if stage has no events

### Event Card Tests

#### Visual Structure
- [ ] Each event card has:
  - [ ] Artist image as background
  - [ ] Artist name prominently displayed
  - [ ] Status badge in top-right corner
  - [ ] Frosted glass effect
  - [ ] Color-coded border

#### Status Indicators
Test with events at different times:

**Upcoming Events (> 1 hour away):**
- [ ] Cyan colored border
- [ ] Badge says "⏰ Upcoming"
- [ ] Cyan badge styling
- [ ] Countdown shows time remaining (e.g., "2d 5h")

**Live Events (within ±1 hour):**
- [ ] Green colored border
- [ ] Badge says "🔴 LIVE NOW"
- [ ] Green badge styling
- [ ] Pulsing glow animation
- [ ] Countdown shows "Happening Now!"

**Past Events (> 1 hour ago):**
- [ ] Red colored border
- [ ] Badge says "✓ Completed"
- [ ] Red badge styling
- [ ] Card has reduced opacity
- [ ] Image has grayscale filter
- [ ] No countdown timer

#### Sorting
- [ ] Events appear in correct order:
  1. Live events first (green)
  2. Upcoming events next (cyan, soonest first)
  3. Past events last (red, most recent first)

#### Hover Interaction
- [ ] Hover over event card:
  - [ ] Card lifts up
  - [ ] Shadow increases
  - [ ] Additional details fade in:
    - [ ] Genre with 🎵 icon
    - [ ] Time with 📅 icon
    - [ ] Countdown/status bar
  - [ ] Details are readable

### Responsive & Browser Tests

#### Different Stages
Test navigation to all 4 stages:
- [ ] `/stages/1` - Pyramid Stage (should have ~8 events)
- [ ] `/stages/2` - Odyssey Tent (should have ~7 events)
- [ ] `/stages/3` - Wanderlust Woods (should have ~8 events)
- [ ] `/stages/4` - The Arena (should have ~8 events)

#### Browser Console
- [ ] No red errors in console
- [ ] API calls successful (check Network tab)
- [ ] All images load (or fallback gracefully)

#### Performance
- [ ] Page loads quickly (< 2 seconds)
- [ ] Smooth animations (no jank)
- [ ] No memory leaks on navigation

## 🔍 API Testing

### Test Backend Endpoints Directly

```bash
# Get all stages
curl http://localhost:3000/api/stages

# Get specific stage
curl http://localhost:3000/api/stages/1

# Get all events
curl http://localhost:3000/api/events

# Get events for stage
curl http://localhost:3000/api/stages/1/events
```

Expected responses:
- All should return JSON
- Status 200
- Proper data structure

## 🎨 Visual Testing

### Theme Elements
- [ ] All text is readable on dark background
- [ ] Purple, pink, cyan colors prominent
- [ ] Neon glow effects visible
- [ ] Frosted glass backdrop blur works
- [ ] Gradient effects smooth

### Animations
- [ ] Title glow animates smoothly
- [ ] Live event cards pulse
- [ ] Hover transforms are smooth
- [ ] Ticker scroll works
- [ ] Loading spinners rotate

## 🐛 Common Issues & Solutions

### Events Not Loading
**Symptoms:** Empty grid, "No events" message
**Check:**
1. Backend running? `curl http://localhost:3000/api/events`
2. Database seeded? Check backend terminal for seed output
3. CORS enabled? Check Network tab in browser
4. Console errors? Look for fetch failures

### Wrong Event Status
**Symptoms:** Past events showing as upcoming
**Check:**
1. Event timestamps in future? Check seed data
2. System time correct? Events based on `new Date()`
3. Timezone issues? Check `eventStatus.ts` logic

### Images Not Loading
**Symptoms:** Broken image backgrounds
**Check:**
1. Image URLs in seed data valid
2. Network blocking images?
3. CSP headers preventing load?
4. Check browser Network tab

### Styling Issues
**Symptoms:** No blur, colors wrong, layout broken
**Check:**
1. CSS files imported correctly?
2. Browser supports backdrop-filter?
3. CSS custom properties loading?
4. Check browser DevTools for CSS errors

## ✅ Final Verification

Before submitting, verify:
- [ ] Both servers running without errors
- [ ] All 4 stages accessible
- [ ] Event status colors correct
- [ ] Hover interactions smooth
- [ ] No console errors
- [ ] Images loading properly
- [ ] Navigation works properly
- [ ] Ticker shows upcoming events
- [ ] Dropdown navigation works
- [ ] Back button works
- [ ] Event sorting correct
- [ ] Status badges accurate

## 📹 Recording GIF

For your README, record a GIF showing:
1. Homepage with ticker and stage cards
2. Hover effect on stage card
3. Click to stage detail page
4. Scroll through events
5. Hover on event card to show details
6. Use dropdown to switch stages
7. Click back to homepage

Recommended tools:
- **Linux:** Peek, SimpleScreenRecorder → convert to GIF
- **Mac:** Gifox, Kap
- **Windows:** ScreenToGif
- **Online:** Recordit, Giphy Capture

---

**Happy Testing! 🎉**

