## Course Browse Page — Web Design Assignment

This project replicates a Course Browse page from a Figma concept using semantic HTML, modern CSS, and vanilla JavaScript. It is responsive, accessible, and includes interactive behaviors.

### How to run
- Open `index.html` in your browser. No build step is required.
- Run in live server.

### Features implemented
- Layout and spacing closely aligned to a modern Figma-style browse page
- Search, category filter, sorting (popular/new/price), and empty-state handling
- Quick view modal with keyboard support and Escape to close
- Responsive grid (tested at ~375px and ~1440px)
- Accessible focus outlines and labels

### Enhancements added
- Dark mode toggle with preference saved in `localStorage`
- Favorites: mark/unmark courses, filter to favorites only (also saved)
- Result count and clear filters control
- Micro-animations for hover and focus states
- Course thumbnails for visual richness

### Tech notes
- No frameworks; pure HTML/CSS/JS
- Component-like CSS: variables, small utility classes, and cohesive card styles
- Modular JavaScript with small helper functions and state stored in `localStorage`

### Testing suggestions
- Resize to mobile width (~375px) and desktop (~1440px)
- Try search queries (e.g., "React", "Data")
- Toggle category and sort options
- Toggle Favorites and mark a few courses with ❤
- Switch dark mode on/off and refresh to confirm persistence



