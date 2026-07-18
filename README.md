# de' LORA Parung Panjang - Landing Page

A premium, modern landing page built for the **de' LORA Parung Panjang** residential community by BSA Land. This project showcases upcoming neighborhood events and a community gallery, crafted with a highly refined, "Scandinavian soft minimal" design aesthetic.

## 📋 Features

- **Mobile-First Responsive Design**: Flawlessly adapts to mobile devices, tablets, and desktop screens with dynamic typography and fluid swipeable event cards.
- **Scandinavian Soft UI**: Employs a premium earthy color palette (Deep Forest Green, Warm Bronze, Off-White), ultra-diffuse haptic shadows, and crisp 1px double-bezel borders.
- **Custom Traditional CSS**: Zero CSS frameworks. Built entirely with robust, modular Vanilla CSS using native CSS variables for theme management.
- **Component-Driven Architecture**: Clean React component tree adhering to SOLID principles (DRY, KISS, SRP, YAGNI).
- **Data-Driven**: Easily update events and gallery content by modifying static JSON files.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or navigate to the project:
```bash
cd de-lora-landing-page
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will open automatically at `http://localhost:3000` or the port specified in your terminal.

## 🛠️ Project Structure

```
de-lora-landing-page/
├── public/
│   ├── images/          # Event and gallery images
│   └── videos/          # Community videos
├── src/
│   ├── components/      # React components (Header, Hero, Events, Gallery, etc.)
│   ├── constants/       # Centralized constant exports (Navigation, Icons)
│   ├── css/             # Modular CSS files for components and global tokens
│   ├── data/            # Static JSON data driving the UI
│   │   └── events.json  
│   ├── utils/           # Utility functions (date formatting, etc.)
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## 📝 Updating Content

### Add/Edit Events
Edit `src/data/events.json`:
```json
{
  "events": [
    {
      "id": 1,
      "title": "Community Yoga",
      "date": "2026-08-15",
      "time": "08:00 AM",
      "location": "Family Park",
      "description": "Start your morning right.",
      "image": "event.jpg"
    }
  ]
}
```

## 🎨 Styling & Customization

This project strictly uses **Traditional CSS** instead of Tailwind. 
All global design tokens (colors, transition curves, spacing, and shadows) are defined as CSS variables in `src/css/index.css`. 

To adjust the core color palette, edit the `:root` variables in `src/css/index.css`:
```css
:root {
  --color-primary: #1e3f20; /* Deep Forest Green */
  --color-accent: #B8860B;  /* Warm Bronze */
  --color-canvas: #FBFBFA;  /* Off-white background */
}
```
Component-specific styles are located within their respective `.css` files inside the `src/css/` directory.

## 🏗️ Build for Production

```bash
npm run build
```

This creates a `dist/` folder ready for deployment.

## 📤 Deployment

Deploy the `dist/` folder to any static hosting provider (Vercel, Netlify, GitHub Pages).

---
**Last Updated**: 2026-07-18
