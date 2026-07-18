# De Lora Landing Page - Development Instructions

This file contains workspace-specific development guidelines and setup instructions.

## ✅ Project Setup Completed

- [x] Project structure scaffolded
- [x] React + Vite configured
- [x] Tailwind CSS integrated
- [x] Components created
- [x] Sample data structure ready

## 📦 Dependencies

Run the following to install all dependencies:
```bash
npm install
```

## 🚀 Development

Start the development server:
```bash
npm run dev
```

The site will automatically open at `http://localhost:3000` with hot reload enabled.

## 📝 Key Files

- `src/App.jsx` - Main application component
- `src/data/events.json` - All events and gallery content
- `src/components/` - All page components
- `tailwind.config.js` - Styling configuration
- `vite.config.js` - Build configuration

## 🔄 Workflow for Updates

1. **Edit Content**: Update `src/data/events.json`
2. **Add Images**: Place files in `public/images/` or `public/videos/`
3. **Test Locally**: Run `npm run dev` and check changes
4. **Build**: Run `npm run build` to create production bundle
5. **Deploy**: Upload the `dist/` folder to hosting provider

## 🎯 Next Steps

1. Add real images to `public/images/` directory
2. Update event data in `src/data/events.json`
3. Customize colors in `tailwind.config.js` if needed
4. Build and deploy when ready

## 📧 Notes

- All content updates are done via JSON files
- Images/videos are stored in the `public/` folder
- No database needed - pure static site
- Redeploy to update changes
