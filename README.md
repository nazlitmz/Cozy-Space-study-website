CozySpace 🌙

Your Personal Productivity Haven

A beautiful, indie-style productivity workspace that combines focus management, note-taking, task tracking, and ambient soundscapes into one cozy digital sanctuary.
<img width="1843" height="920" alt="image" src="https://github.com/user-attachments/assets/86eba71f-2084-42e7-b7bc-9390bd976477" />
<img width="1792" height="921" alt="image" src="https://github.com/user-attachments/assets/9fd8b542-f7ef-433d-9359-4b80b2b7abf3" />
<img width="1847" height="916" alt="image" src="https://github.com/user-attachments/assets/b3416de1-82f8-459d-addd-77bd6c0757f9" />
<img width="552" height="211" alt="image" src="https://github.com/user-attachments/assets/aa10e7bd-993f-4d99-a9e9-a2ecc8405af1" />
<img width="1842" height="918" alt="image" src="https://github.com/user-attachments/assets/c388e1bb-1fdb-4f44-9c76-04b4cdbb3a75" />
<img width="1862" height="920" alt="image" src="https://github.com/user-attachments/assets/bd93136e-22ad-42bb-a9c0-a51ec81a72a6" />
<img width="1853" height="924" alt="image" src="https://github.com/user-attachments/assets/fe0668d8-c0b1-45ab-860f-b04609d4c1eb" />
<img width="1855" height="925" alt="image" src="https://github.com/user-attachments/assets/fb8b1e10-1a28-47ed-ac87-5dabb285f561" />
<img width="1855" height="913" alt="image" src="https://github.com/user-attachments/assets/23dfbc4c-1685-450e-bd46-706797ebf25a" />
<img width="1863" height="916" alt="image" src="https://github.com/user-attachments/assets/143d3f8d-9b18-4434-9c7a-c5ad5095acdc" />
<img width="1859" height="926" alt="image" src="https://github.com/user-attachments/assets/645ce6f1-aa5c-42d7-ac0d-84994e4016f9" />
✨ Features
🎯 Core Functionality

Focus Timer (Pomodoro) - Deep work sessions with customizable durations, break intervals, and session tracking
Smart To-Do Lists - Beautiful task management with completion tracking and statistics
Rich Notes Editor - Markdown-style formatting with auto-save and word count
Interactive Calendar - Event planning with color coding and daily view
Ambient Soundscapes - 6 curated ambient sounds (rain, forest, waves, fireplace, café, wind)
Quick Links Dashboard - One-click access to your favorite websites with automatic icon detection

🎨 Design & Theming

4 Beautiful Themes:

☀️ Light & Cozy (default warm theme)
☕ Coffee Shop (dark, warm brown tones)
🌿 Cottagecore (soft, natural greens)
🌲 Forest Night (deep blues and teals)


Modern UI/UX:

Smooth animations and transitions
Responsive design (desktop, tablet, mobile)
Glass-morphism effects
Gradient accents
Micro-interactions



📊 Productivity Tracking

Daily focus sessions counter
Tasks completed tracker
Current streak monitoring
Total focus time accumulation
Visual progress indicators

👤 User Management

Simple authentication system
Customizable avatars (8 emoji options)
Profile settings (name, bio, timezone)
Data export/import (JSON format)
Complete profile reset option

🚀 Getting Started
Prerequisites

A modern web browser (Chrome, Firefox, Safari, Edge)
No server or dependencies required!

Installation

Clone the repository

bash   git clone https://github.com/yourusername/cozyspace.git
   cd cozyspace

Open in browser

bash   # Simply open index.html in your browser
   # Or use a local server:
   python -m http.server 8000
   # Then visit http://localhost:8000
```

3. **Start being productive!**
   - Use demo credentials: `demo@cozyspace.com` / `demo123`
   - Or create your own account

## 📁 Project Structure
```
cozyspace/
│
├── index.html          # Main HTML structure
├── style.css           # Complete styling and themes
├── app.js              # Application logic and functionality
└── README.md           # Documentation
🎮 Usage Guide
First Time Setup

Login/Register: Create your account or use the demo credentials
Profile Setup: Choose your avatar, add a bio, and set your timezone
Theme Selection: Pick your favorite theme from the header dropdown

Using Features
Focus Timer

Set your focus duration (15-60 minutes)
Set break duration (3-15 minutes)
Enable ambient sounds during focus
Start/pause/reset as needed
Track your daily sessions and streaks

To-Do Lists

Click "Add Task" to create new tasks
Check boxes to mark tasks complete
Hover to see delete option
View incomplete task count in sidebar

Notes

Type freely with auto-save
Use Ctrl+B for bold formatting
Use Ctrl+I for italic formatting
Export notes as .txt files
Real-time word count tracking

Calendar

Navigate months with arrow buttons
Click "Add Event" for new events
Color-code your events
View today's events in sidebar
Event dots show busy days

Ambient Sounds

Select from 6 ambient soundscapes
Adjust volume with slider
Play/pause controls
Auto-stop when timer pauses

Quick Links

Add your favorite websites
Automatic icon detection for popular sites
One-click access in new tabs
Organize your digital workspace

🎨 Customization
Adding New Themes
Edit the CSS custom properties in style.css:
css.theme-yourtheme {
  --bg-primary: #yourcolor;
  --bg-secondary: #yourcolor;
  --text-primary: #yourcolor;
  --accent-primary: #yourcolor;
  /* Add more variables... */
}
Modifying Timer Defaults
In app.js, find the timerState initialization:
javascriptthis.timerState = {
  timeLeft: 25 * 60, // Change default duration
  settings: {
    focusDuration: 25, // Change default focus
    breakDuration: 5,  // Change default break
  }
};
Adding New Ambient Sounds
Update the soundUrls object in app.js:
javascriptconst soundUrls = {
  newsound: "https://yourcdn.com/sound.mp3",
  // Add your sound URL
};
```

## 🔧 Technical Details

### Built With

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **Vanilla JavaScript** - No frameworks or dependencies
- **Web Audio API** - Ambient sound playback
- **LocalStorage** - Data persistence (in-memory for demo)

### Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Performance

- Lightweight (~100KB total)
- No external dependencies
- Optimized animations
- Efficient DOM manipulation
- Memory-safe data storage

## 📱 Responsive Design

CozySpace works beautifully on all screen sizes:

- **Desktop** (1200px+): Full sidebar and two-column layouts
- **Tablet** (768px-1199px): Adapted layouts with collapsible sidebar
- **Mobile** (< 768px): Single column, hamburger menu, touch-optimized

## 🔐 Privacy & Data

- All data stored locally (in browser memory for demo)
- No external tracking or analytics
- No server-side processing
- Export your data anytime
- Complete control over your information

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ideas for Contributions

- 🌍 More theme options
- 🎵 Additional ambient sounds
- 📊 Enhanced statistics and charts
- 🔔 Browser notification improvements
- 🌐 Internationalization (i18n)
- ♿ Accessibility enhancements

## 📝 License

This project is licensed under the MIT License - see below for details:
```
MIT License

Copyright (c) 2024 CozySpace

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
🙏 Acknowledgments

Ambient sounds provided by Freesound.org
Icons represented by emoji characters
Font: Inter by Rasmus Andersson
Inspired by cozy productivity apps and cottagecore aesthetics

📮 Contact & Support

Issues: GitHub Issues
Discussions: GitHub Discussions
Email: nazlitemiz45@gmail.com

🗺️ Roadmap

 Cloud sync support
 Mobile native apps (iOS/Android)
 Team collaboration features
 Plugin/extension system
 Advanced analytics dashboard
 Integration with calendar services
 Pomodoro technique variations
 Custom ambient sound uploads


<div align="center">
Made with 💙 and ☕ by the Nazliiiii
Website • Demo • Documentation
⭐ Star us on GitHub if you find this helpful!
</div>
