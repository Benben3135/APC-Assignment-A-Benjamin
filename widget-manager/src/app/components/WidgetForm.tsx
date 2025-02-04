import React, { useState } from 'react';
import { Widget } from '../types/widget';
import { widgetApi } from '../lib/api';
import { SaveIcon } from 'lucide-react';

interface WidgetFormProps {
  initialWidget?: Widget;
  onSuccess: () => void;
}

export default function WidgetForm({ initialWidget, onSuccess }: WidgetFormProps) {
  const [widget, setWidget] = useState<Widget>(initialWidget || {
    page_name: '',
    header: '',
    text: '',
    thumbnail: '',
    price: '',
    showToPercentage: 0,
    id: `widget-${Date.now()}`
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const allWidgets = await widgetApi.getAllWidgets();
      const pageWidgets = allWidgets[widget.page_name] || [];
      
      // Remove the current widget if we're editing
      const filteredWidgets = initialWidget 
        ? pageWidgets.filter((w: Widget) => w.id !== initialWidget.id) 
        : pageWidgets;

      // Calculate total percentage
      const totalPercentage = [...filteredWidgets, widget]
        .reduce((total, w: Widget) => total + w.showToPercentage, 0);
      
      // Validate percentage
      if (totalPercentage > 100) {
        setError(`Total widget percentage for page "${widget.page_name}" cannot exceed 100%. Current total: ${totalPercentage}%`);
        return;
      }

      // Save the widget
      if (initialWidget && initialWidget.id) {
        await widgetApi.updateWidget(widget.page_name, initialWidget.id, widget);
      } else {
        await widgetApi.createWidget(widget);
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving widget:', error);
      setError('Failed to save widget. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setWidget(prev => ({
      ...prev,
      [name]: name === 'showToPercentage' ? Number(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="page_name" className="block text-sm font-medium text-gray-700 mb-2">
            Page Name
          </label>
          <input
            type="text"
            id="page_name"
            name="page_name"
            value={widget.page_name}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md 
              focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>

        <div>
          <label htmlFor="header" className="block text-sm font-medium text-gray-700 mb-2">
            Header
          </label>
          <input
            type="text"
            id="header"
            name="header"
            value={widget.header}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md 
              focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>

        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
            Text
          </label>
          <textarea
            id="text"
            name="text"
            value={widget.text}
            onChange={handleChange}
            rows={4}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md 
              focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>

        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">
            Thumbnail URL (Optional)
          </label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            value={widget.thumbnail || ''}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md 
              focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Price (Optional)
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={widget.price || ''}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md 
              focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label htmlFor="showToPercentage" className="block text-sm font-medium text-gray-700 mb-2">
            Show To Percentage (0-100)
          </label>
          <input
            type="number"
            id="showToPercentage"
            name="showToPercentage"
            value={widget.showToPercentage}
            onChange={handleChange}
            min="0"
            max="100"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md 
              focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>
      </div>

      <div className="pt-4">
        <button 
          type="submit" 
          className="w-full flex justify-center items-center bg-primary-600 text-white 
            py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
        >
          <SaveIcon className="mr-2 h-5 w-5" />
          {initialWidget ? 'Update Widget' : 'Create Widget'}
        </button>
      </div>
    </form>
  );
}