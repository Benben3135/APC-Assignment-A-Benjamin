"use client"

import React, { useState, useEffect } from 'react';
import { Widget } from '../types/widget';
import { widgetApi } from '../lib/api';
import WidgetForm from './WidgetForm';
import { PencilIcon, TrashIcon, PlusIcon } from 'lucide-react';

export default function WidgetList() {
  const [widgets, setWidgets] = useState<{[key: string]: Widget[]}>({});
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWidgets();
  }, []);

  const fetchWidgets = async () => {
    try {
      const data = await widgetApi.getAllWidgets();
      setWidgets(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching widgets:', error);
      setError('Failed to fetch widgets. Please try again.');
    }
  };

  const handleDelete = async (pageName: string, widgetId: string) => {
    try {
      await widgetApi.deleteWidget(pageName, widgetId);
      fetchWidgets();
    } catch (error) {
      console.error('Error deleting widget:', error);
      setError('Failed to delete widget. Please try again.');
    }
  };

  const handleEdit = (widget: Widget) => {
    setSelectedWidget(widget);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedWidget(null);
    fetchWidgets();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 shadow-md" role="alert">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Widget Manager</h1>
        <button 
          onClick={() => {
            setSelectedWidget(null);
            setIsFormOpen(true);
          }}
          className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg 
            hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          Create Widget
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl relative w-full max-w-md shadow-2xl">
            <button 
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
            >
              ✕
            </button>
            <WidgetForm 
              initialWidget={selectedWidget || undefined} 
              onSuccess={handleFormSuccess} 
            />
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(widgets).map(([pageName, pageWidgets]) => (
          <div 
            key={pageName} 
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="bg-primary-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 capitalize">{pageName} Widgets</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {pageWidgets && (Array.isArray(pageWidgets) ? pageWidgets : [pageWidgets]).map(widget => (
                <div 
                  key={widget.id} 
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{widget.header}</h3>
                      <p className="text-sm text-gray-600 mb-2">{widget.text}</p>
                      <div className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full inline-block">
                        Show to: {widget.showToPercentage}%
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(widget)}
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-full transition-colors"
                        title="Edit Widget"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(pageName, widget.id!)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors"
                        title="Delete Widget"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}