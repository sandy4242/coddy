# Codyy - Typing Streak Tracker 🔥

A productivity extension for VS Code that tracks and visualizes your typing streaks with animated indicators to keep you motivated while coding!

![Codyy Extension Demo](https://via.placeholder.com/800x400/1e1e1e/ffffff?text=Typing+Streak+Demo)

## ✨ Features

- **Real-time Typing Streak Tracking**: Counts characters as you type and maintains your streak
- **Animated Status Bar Indicator**: Beautiful emoji indicators that evolve as your streak grows
- **Progressive Streak Levels**: Different emojis and animations for different achievement levels:
  - 🔥 **Fire Starter** (10+ characters)
  - 🚀 **Rocket Mode** (25+ characters)  
  - ⚡ **Lightning Fast** (50+ characters)
  - 💫 **Super Nova** (100+ characters)
  - ✨ **Stellar Coder** (200+ characters)
- **Smart Reset Logic**: Automatically resets after 3 seconds of inactivity
- **Pulsing Animation**: Active streaks pulse to show they're live
- **Celebration Messages**: Get congratulated for impressive streaks
- **Customizable Settings**: Adjust streak thresholds and behavior

## 🚀 Installation

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Codyy"
4. Click Install

## 📖 Usage

Once installed, Codyy automatically starts tracking your typing:

1. **Start Coding**: Open any file and begin typing
2. **Watch Your Streak**: The status bar shows your current streak with animated indicators
3. **Keep the Momentum**: Continue typing to build higher streaks
4. **Take Breaks**: Streaks reset after 3 seconds of inactivity

### Commands

- `Toggle Typing Streak`: Enable/disable the streak tracker
  - Access via Command Palette (Ctrl+Shift+P)

## ⚙️ Configuration

Customize Codyy through VS Code settings:

{
"typingStreak.enabled": true,
"typingStreak.streakThreshold": 5,
"typingStreak.resetDelay": 3000
}

### Settings Options

| Setting | Description | Default |
|---------|-------------|---------|
| `typingStreak.enabled` | Enable/disable the extension | `true` |
| `typingStreak.streakThreshold` | Characters per second to maintain streak | `5` |
| `typingStreak.resetDelay` | Milliseconds before streak resets | `3000` |

## 🎯 Streak Levels

| Level | Threshold | Emoji | Description |
|-------|-----------|--------|-------------|
| Fire Starter | 10+ chars | 🔥 | You're warming up! |
| Rocket Mode | 25+ chars | 🚀 | Taking off! |
| Lightning Fast | 50+ chars | ⚡ | Super speed! |
| Super Nova | 100+ chars | 💫 | Incredible momentum! |
| Stellar Coder | 200+ chars | ✨ | Coding legend! |

## 🛠️ Development

Want to contribute? Great!

Clone the repository
git clone <https://github.com/sandy4242/coddy#>

Install dependencies
npm install

Run the extension
npm run watch

Press F5 to launch Extension Development Host

## 📝 Release Notes

### 0.0.1

- Initial release
- Real-time typing streak tracking
- Animated status bar indicators
- Progressive streak levels
- Customizable settings
- Auto-reset functionality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to the VS Code extension API for making this possible
- Inspired by productivity tools and gamification concepts
- Built with TypeScript and lots of ☕

---
**Enjoy coding with Codyy!** 🎉

*Keep your streak alive and code with passion!*

---
<!-- 
## 📊 Stats

![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/sandeep-sarkar.ai-codyy)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/sandeep-sarkar.ai-codyy)
![Installs](https://img.shields.io/visual-studio-marketplace/i/sandeep-sarkar.ai-codyy)
![Rating](https://img.shields.io/visual-studio-marketplace/r/sandeep-sarkar.ai-codyy)

 -->
