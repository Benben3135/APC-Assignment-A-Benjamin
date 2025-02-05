# Dynamic Website Simulation

## 🌐 Project Overview

A dynamic website simulation application that demonstrates advanced A/B testing and widget management across multiple pages.

## ✨ Key Features

### A/B Testing Functionality
- Dynamic widget loading for multiple pages
- Percentage-based widget visibility
- Random widget selection based on configuration
- URL parameter-based experience forcing

### Pages
- Homepage
- Cards Page
- Wedding Page

## 🛠 Technology Stack

- Next.js 14
- TypeScript
- React Hooks
- Tailwind CSS
- Framer Motion (optional, for animations)

## 🔧 Prerequisites

- Node.js (v18+)
- npm or yarn
- Flask backend server running

## 📦 Installation

1. Clone the repository
```bash
git clone <repository-url>
cd website-simulation
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
- Create a `.env` file
- Add your API endpoint:
```
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:5000
```

## 🚀 Running the Application

Development mode:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎲 A/B Testing Logic

### Widget Selection Process
1. Fetch widgets for the current page
2. Generate a random number between 0-100
3. Select widget based on `showToPercentage`

### Forced Experience
Add a URL parameter to force a specific widget:
```
http://localhost:3000/?experience=widget_id
http://localhost:3000/cards?experience=widget_id
```

## 🏗 Core Components

### `DynamicPage`
- Fetches page-specific widgets
- Implements A/B testing logic
- Renders selected widget

### `WebsiteLayout`
- Provides consistent navigation
- Responsive design
- Shared layout across pages