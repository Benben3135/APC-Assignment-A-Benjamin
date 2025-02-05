# Widget Manager

## 🚀 Project Overview

Widget Manager is a comprehensive web application for creating, managing, and configuring widgets across different pages with advanced configuration capabilities.

## ✨ Key Features

### Widget Management
- Create new widgets
- Edit existing widgets
- Delete widgets
- View widgets across different pages

### Advanced Configuration
- Page-specific widget management
- A/B Testing Support
  - Assign visibility percentage to widgets
  - Ensure total widget percentage ≤ 100%

## 🛠 Technology Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- React Hooks
- Lucide React Icons

## 📦 Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Flask backend server

## 🔧 Installation

1. Clone the repository
```bash
git clone <repository-url>
cd widget-manager
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

## 🧩 Widget Structure

```typescript
interface Widget {
  id?: string;
  page_name: string;
  header: string;
  text: string;
  thumbnail?: string;
  price?: string;
  showToPercentage: number;
}
```

## 🌈 Core Components

### WidgetForm
- Create and edit widgets
- Percentage validation
- Error handling

### WidgetList
- Display widgets by page
- CRUD operations
- Responsive layout