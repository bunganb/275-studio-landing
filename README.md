# 275 Studio Website

A modern, responsive website for 275 Studio - Web Game Platform Pioneers. Built with HTML, Tailwind CSS, and vanilla JavaScript.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dynamic Content**: Game cards and team members loaded from JSON data
- **Game Detail Pages**: Individual pages for each game with detailed information
- **Smooth Navigation**: Smooth scrolling and intuitive user experience
- **Modern Styling**: Clean, professional design with custom color scheme

## Project Structure

\`\`\`
275-studio-website/
├── index.html          # Main landing page
├── game-detail.html    # Game detail page template
├── script.js           # JavaScript functionality
├── data.json          # Content data (games, team, etc.)
└── README.md          # This file
\`\`\`

## Getting Started

1. **Download the project files**
2. **Open `index.html` in your web browser**
3. **That's it!** The website is ready to use.

## Customization

### Adding New Games

Edit the `data.json` file and add new game objects to the `games` array:

\`\`\`json
{
  "id": "new-game",
  "title": "New Game Title",
  "category": "Genre",
  "description": "Game description",
  "color": "bg-studio-orange",
  "featured": false
}
\`\`\`

### Adding Team Members

Add new team members to the `team` array in `data.json`:

\`\`\`json
{
  "name": "New Member",
  "role": "Position",
  "initials": "NM",
  "bio": "Member biography",
  "color": "bg-studio-blue"
}
\`\`\`

### Styling

The website uses Tailwind CSS with custom colors:
- `studio-blue`: #1e3a5f (primary dark blue)
- `studio-orange`: #f59e0b (accent orange)
- `studio-cream`: #fef7ed (background cream)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Technologies Used

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework
- **Vanilla JavaScript**: Dynamic content loading
- **JSON**: Data storage and management

## License

© 2024 275 Studio. All rights reserved.
