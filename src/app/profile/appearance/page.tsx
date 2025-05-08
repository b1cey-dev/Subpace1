'use client';

import { useUser } from "@clerk/nextjs";
import { useState } from "react";

interface Theme {
  name: string;
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

const themes: Theme[] = [
  {
    name: 'Default',
    primary: '#6B46C1',
    secondary: '#805AD5',
    background: '#FFFFFF',
    text: '#1A202C'
  },
  {
    name: 'Dark',
    primary: '#9F7AEA',
    secondary: '#B794F4',
    background: '#1A202C',
    text: '#F7FAFC'
  },
  {
    name: 'Ocean',
    primary: '#3182CE',
    secondary: '#4299E1',
    background: '#FFFFFF',
    text: '#2D3748'
  },
  {
    name: 'Forest',
    primary: '#38A169',
    secondary: '#48BB78',
    background: '#FFFFFF',
    text: '#2D3748'
  }
];

export default function AppearanceSettings() {
  const { user, isLoaded } = useUser();
  const [selectedTheme, setSelectedTheme] = useState('Default');
  const [fontSize, setFontSize] = useState('medium');
  const [lineHeight, setLineHeight] = useState('normal');
  const [animations, setAnimations] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const currentTheme = themes.find(t => t.name === selectedTheme) || themes[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Appearance Settings</h1>
        <p className="text-gray-600">Customize how the application looks and feels</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-8">
        {/* Theme Selection */}
        <div>
          <h3 className="text-lg font-medium mb-4">Theme</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {themes.map((theme) => (
              <button
                key={theme.name}
                className={`p-4 rounded-lg border-2 ${
                  selectedTheme === theme.name
                    ? 'border-purple-500'
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedTheme(theme.name)}
                style={{
                  backgroundColor: theme.background,
                  color: theme.text
                }}
              >
                <div className="h-4 w-4 rounded-full mb-2" style={{ backgroundColor: theme.primary }} />
                <div className="text-sm font-medium">{theme.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Typography Settings */}
        <div>
          <h3 className="text-lg font-medium mb-4">Typography</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font Size
              </label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="xlarge">Extra Large</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Line Height
              </label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                value={lineHeight}
                onChange={(e) => setLineHeight(e.target.value)}
              >
                <option value="tight">Tight</option>
                <option value="normal">Normal</option>
                <option value="relaxed">Relaxed</option>
                <option value="loose">Loose</option>
              </select>
            </div>
          </div>
        </div>

        {/* Accessibility Settings */}
        <div>
          <h3 className="text-lg font-medium mb-4">Accessibility</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Enable Animations</h4>
                <p className="text-sm text-gray-500">Show smooth transitions and animations</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={animations}
                  onChange={(e) => setAnimations(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Reduced Motion</h4>
                <p className="text-sm text-gray-500">Minimize motion and animations</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={reducedMotion}
                  onChange={(e) => setReducedMotion(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">High Contrast</h4>
                <p className="text-sm text-gray-500">Increase contrast for better readability</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div>
          <h3 className="text-lg font-medium mb-4">Preview</h3>
          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: currentTheme.background,
              color: currentTheme.text,
              fontSize: fontSize === 'small' ? '0.875rem' :
                       fontSize === 'medium' ? '1rem' :
                       fontSize === 'large' ? '1.125rem' : '1.25rem',
              lineHeight: lineHeight === 'tight' ? '1.25' :
                         lineHeight === 'normal' ? '1.5' :
                         lineHeight === 'relaxed' ? '1.75' : '2'
            }}
          >
            <h4 className="text-xl font-bold mb-2" style={{ color: currentTheme.primary }}>
              Sample Heading
            </h4>
            <p className="mb-4">
              This is a sample text to preview your selected settings. The text will appear
              in your chosen font size and line height, with the selected theme colors.
            </p>
            <button
              className="px-4 py-2 rounded-md text-white"
              style={{ backgroundColor: currentTheme.primary }}
            >
              Sample Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 