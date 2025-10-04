# 🤝 Contributing to GitHub Cards API

First off, thank you for considering contributing to GitHub Cards API! 🎉 

This project thrives on community contributions and we welcome all kinds of improvements, from new card types and themes to bug fixes and documentation updates.

## 📋 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [🛠️ Development Setup](#️-development-setup)
- [📝 How to Contribute](#-how-to-contribute)
  - [🎨 Adding a New Theme](#-adding-a-new-theme)
  - [🧩 Adding a New Card](#-adding-a-new-card)
  - [🐛 Bug Fixes](#-bug-fixes)
  - [📚 Documentation](#-documentation)
- [🔍 Code Style & Guidelines](#-code-style--guidelines)
- [🧪 Testing](#-testing)
- [📤 Submitting Your Contribution](#-submitting-your-contribution)
- [🔧 Project Structure](#-project-structure)
- [❓ Getting Help](#-getting-help)

## 🚀 Quick Start

1. **Fork** the repository on GitHub
2. **Clone** your fork locally
3. **Set up** the development environment
4. **Create** a new branch for your changes
5. **Make** your changes
6. **Test** your changes locally
7. **Submit** a pull request

## 🛠️ Development Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git**
- **Cloudflare account** (for deployment testing - optional)

### Local Development

1. **Clone your fork:**
   ```bash
   git clone https://github.com/akanshSirohi/Github-Cards-API.git
   cd Github-Cards-API
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   npm start
   ```

4. **Access the application:**
   - API: `http://localhost:8787`
   - Interactive UI: `http://localhost:8787/app`

### Environment Variables

The project uses Cloudflare Workers with the following key variables (configured in `wrangler.jsonc`):

- `ENVIRONMENT`: `development` (local) or `production`
- `ASSETS_BASE_URL`: Base URL for static assets
- `BASE_URL`: The base URL of your worker

## 📝 How to Contribute

### 🎨 Adding a New Theme

Themes control the visual appearance of cards. Each theme is an HTML template with CSS styling.

#### Steps:

1. **Open** `src/core/themes.js`

2. **Add your theme** to the `HTML_THEMES` object:
   ```javascript
   'YOUR_THEME_NAME': `
       <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-width: 400px; min-height: 100px; background: your-background; padding: 15px;">
           <div style="display: flex; width: 100%; background: your-card-background; padding: 15px; border-radius: 10px;">
               <span style="font-size: 11px; color: your-text-color;">{{card_content}}</span>
           </div>
       </div>
   `
   ```

3. **Update** `src/help.js` to include your theme in the available themes list

4. **Test** your theme:
   ```bash
   curl "http://localhost:8787/jokes-card?theme=YOUR_THEME_NAME"
   ```

5. **Add examples** to the README.md

#### Theme Guidelines:

- **Use inline CSS** only (Satori requirement)
- **Include** `{{card_content}}` placeholder
- **Ensure readability** across different content lengths
- **Test with various card types** (short/long content)
- **Make it visually distinct** from existing themes
- **Use responsive design principles**

### 🧩 Adding a New Card

Cards provide different types of content (jokes, quotes, facts, etc.).

#### Steps:

1. **Create data file** (if needed) in `public/assets/data/`:
   ```json
   [
       {
           "content": "Your first entry",
           "category": "example"
       },
       {
           "content": "Your second entry", 
           "category": "example"
       }
   ]
   ```

2. **Create card handler** in `src/cards/your-card.js`:
   ```javascript
   import { loadJSONFile } from '../utils/load-json-file';
   import { Languages, generateHTMLCard } from '../core/card-generator';

   export default async function yourCardHandler({ req, env }) {
     try {
       // Load your data
       const data = await loadJSONFile(env, 'your-data.json');
       
       if (!data) {
         return new Response('Data not found', { status: 404 });
       }

       // Pick random entry
       const randomEntry = data[Math.floor(Math.random() * data.length)];
       
       // Parse URL parameters
       const url = new URL(req.url);
       const theme = url.searchParams.get('theme') || 'GALACTIC_DUSK';
       const searchParams = Object.fromEntries(url.searchParams.entries());

       // Generate SVG card
       const svgCard = await generateHTMLCard(
         env, 
         randomEntry.content, 
         searchParams, 
         Languages.ENGLISH, 
         theme
       );

       return new Response(svgCard, {
         headers: { 'Content-Type': 'image/svg+xml' }
       });
     } catch (error) {
       return new Response('Error generating card', { status: 500 });
     }
   }
   ```

3. **Register your card** in `src/index.js`:
   ```javascript
   // Import your card
   import yourCard from './cards/your-card'

   // Add to availableCards object
   const availableCards = {
     // ... existing cards
     '/your-card': yourCard
   }
   ```

4. **Update** `src/help.js` to include your card in the available cards list

5. **Add tests** in `test/` directory

6. **Update documentation** in README.md

#### Card Guidelines:

- **Minimum 50-100 entries** in your dataset
- **Family-friendly content** only
- **No copyrighted material** without permission
- **Consistent data structure**
- **Error handling** for missing data
- **Support for theming**

### 🐛 Bug Fixes

1. **Create an issue** describing the bug (if one doesn't exist)
2. **Reference the issue** in your PR
3. **Include tests** that reproduce the bug
4. **Follow the existing code style**
5. **Test thoroughly** before submitting

### 📚 Documentation

- Update README.md for new features
- Add inline code comments for complex logic
- Update this CONTRIBUTING.md if you change the contribution process
- Include examples in your documentation

## 🔍 Code Style & Guidelines

### General Principles

- **Keep it simple**: Favor readability over cleverness
- **Be consistent**: Follow existing patterns in the codebase
- **Handle errors**: Always include proper error handling
- **Performance matters**: This runs on Cloudflare Workers, optimize for speed

### JavaScript Style

- Use **ES6+ features** (import/export, async/await, etc.)
- Use **const/let** instead of var
- Prefer **arrow functions** for short functions
- Use **descriptive variable names**
- Add **JSDoc comments** for complex functions

### File Organization

```
src/
├── cards/           # Individual card handlers
├── core/           # Core functionality (themes, card generation)
├── middleware/     # Worker middleware
├── utils/          # Utility functions
└── index.js        # Main router
```

### Data Files

- Store in `public/assets/data/`
- Use `.json` format
- Include at least 50-100 entries
- Structure consistently within each file

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Writing Tests

1. **Add tests** for new cards in `test/`
2. **Test different themes** with your card
3. **Test error conditions** (missing data, invalid params)
4. **Test the HTTP responses** (status codes, headers)

Example test:
```javascript
import { describe, it, expect } from 'vitest';
import worker from '../src';

describe('Your Card', () => {
  it('returns SVG content', async () => {
    const request = new Request('http://localhost:8787/your-card');
    const response = await worker.fetch(request, env);
    
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('image/svg+xml');
  });
});
```

### Local Testing

1. **Start the dev server**: `npm run dev`
2. **Test your endpoints**: 
   ```bash
   curl "http://localhost:8787/your-card?theme=neon_horizon"
   ```
3. **Use the interactive UI**: `http://localhost:8787/app`

## 📤 Submitting Your Contribution

### Before You Submit

- [ ] **Test locally** with `npm run dev`
- [ ] **Run tests** with `npm test`
- [ ] **Update documentation** (README.md, help.js)
- [ ] **Follow code style** guidelines
- [ ] **Check for lint errors**

### Pull Request Process

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add: Your descriptive commit message"
   ```

3. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Open a Pull Request** on GitHub with:
   - **Clear title** describing the change
   - **Detailed description** of what you've added/changed
   - **Screenshots** (for visual changes)
   - **Testing instructions**
   - **References to related issues**

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New card
- [ ] New theme  
- [ ] Bug fix
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tested locally with `npm run dev`
- [ ] Added/updated tests
- [ ] All tests pass

## Screenshots (if applicable)
Add screenshots of your new theme/card

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

### 🔧 Project Structure

```
Github-Cards-API/
├── public/                     # Static assets
│   ├── app/                   # Interactive web UI
│   │   ├── index.html         # Main UI with footer stats
│   │   ├── script.js          # UI logic + repo stats fetching
│   │   └── style.css          # Styling including footer
│   └── assets/                # Fonts, data files
│       ├── data/              # JSON data for cards
│       └── fonts/             # Font files
├── src/                       # Source code
│   ├── cards/                 # Card handlers
│   │   ├── repo-stats.js      # Repository statistics API
│   │   └── ...                # Other card handlers
│   ├── core/                  # Core functionality
│   │   ├── card-generator.js  # Main card generation logic
│   │   ├── themes.js          # Theme definitions
│   │   └── satori_renderer.js # SVG rendering
│   ├── middleware/            # Cloudflare Workers middleware
│   ├── utils/                 # Utility functions
│   ├── help.js               # API documentation endpoint
│   └── index.js              # Main router
├── test/                      # Test files
├── wrangler.jsonc            # Cloudflare Worker configuration
├── package.json              # Dependencies and scripts
└── vitest.config.js          # Test configuration
```

### Key Technologies

- **Cloudflare Workers**: Serverless runtime
- **Satori**: HTML to SVG conversion
- **Vitest**: Testing framework
- **Wrangler**: Cloudflare development tool

### 🌟 Recent Features

- **Repository Footer**: The web interface now includes a footer displaying real-time GitHub repository statistics (stars, forks, contributors, last updated)
- **API Endpoint**: `/api/repo-stats` provides repository statistics in JSON format with caching

### Key Technologies

- **Cloudflare Workers**: Serverless runtime
- **Satori**: HTML to SVG conversion
- **Vitest**: Testing framework
- **Wrangler**: Cloudflare development tool

## ❓ Getting Help

### Community & Support

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and general discussion
- **README.md**: For usage examples and API documentation

### Common Issues

1. **"Data not found" errors**: Check that your JSON file is in `public/assets/data/`
2. **Theme not applying**: Ensure theme name matches exactly (case-sensitive)
3. **Local server not starting**: Check Node.js version (requires 18+)
4. **SVG not rendering**: Verify HTML template syntax and Satori compatibility

### Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Satori Documentation](https://github.com/vercel/satori)
- [Vitest Documentation](https://vitest.dev/)

---

## 🌟 Recognition

Contributors are recognized in our README.md file. Your GitHub profile will be featured as a thank you for your contribution!

## 📋 Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms:

- **Be respectful** and inclusive
- **Welcome newcomers** and help them learn
- **Focus on constructive feedback**
- **Respect different viewpoints** and experiences

---

**Happy Contributing! 🚀**

We're excited to see what amazing cards and themes you'll create. Every contribution, no matter how small, makes this project better for everyone.

If you have any questions, don't hesitate to open an issue or start a discussion. We're here to help! 🤝