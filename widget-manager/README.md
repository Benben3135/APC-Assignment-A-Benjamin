Widget Manager
🚀 Project Overview
Widget Manager is a comprehensive web application for creating, managing, and configuring widgets across different pages with advanced configuration capabilities.
✨ Key Features
Widget Management

Create new widgets
Edit existing widgets
Delete widgets
View widgets across different pages

Advanced Configuration

Page-specific widget management
A/B Testing Support

Assign visibility percentage to widgets
Ensure total widget percentage ≤ 100%



🛠 Technology Stack

Next.js 14
TypeScript
Tailwind CSS
React Hooks
Lucide React Icons

📦 Prerequisites

Node.js (v18 or later)
npm or yarn
Flask backend server

🔧 Installation

Clone the repository

bashCopygit clone <repository-url>
cd widget-manager

Install dependencies

bashCopynpm install
# or
yarn install

Set up environment variables


Create a .env file
Add your API endpoint:

CopyNEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:5000
🚀 Running the Application
Development mode:
bashCopynpm run dev
# or
yarn dev
Open http://localhost:3000 in your browser
🧩 Widget Structure
typescriptCopyinterface Widget {
  id?: string;
  page_name: string;
  header: string;
  text: string;
  thumbnail?: string;
  price?: string;
  showToPercentage: number;
}
🌈 Core Components
WidgetForm

Create and edit widgets
Percentage validation
Error handling

WidgetList

Display widgets by page
CRUD operations
Responsive layout