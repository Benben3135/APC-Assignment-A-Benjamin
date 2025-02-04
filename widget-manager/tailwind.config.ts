import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',   // Very light blue
          100: '#d6e4ff',  // Light blue
          200: '#a6c1ff',  // Soft blue
          300: '#7ba5ff',  // Moderate blue
          400: '#4d84ff',  // Bright blue
          500: '#2563eb',  // Deep blue
          600: '#1d4ed8',  // Darker blue
          700: '#1e40af',  // Navy blue
          800: '#1e3a8a',  // Dark navy
          900: '#1e3a8a'   // Deepest blue
        },
        gray: {
          50: '#f9fafb',   // Almost white
          100: '#f3f4f6',  // Light gray
          200: '#e5e7eb',  // Soft gray
          300: '#d1d5db',  // Medium gray
          400: '#9ca3af',  // Muted gray
          500: '#6b7280',  // Slate gray
          600: '#4b5563',  // Dark slate
          700: '#374151',  // Darker slate
          800: '#1f2937',  // Very dark slate
          900: '#111827'   // Nearly black
        }
      },
      boxShadow: {
        'subtle': '0 2px 4px rgba(0, 0, 0, 0.06)',
        'medium': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'strong': '0 10px 15px rgba(0, 0, 0, 0.15)'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem'
      }
    },
  },
  plugins: [],
}