"use client"

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Widget } from '../types/widget';
import { widgetApi } from '../lib/api';
import { selectWidgetForPage } from '../utils/widget-selector';
import WebsiteLayout from './WebsiteLayout';

interface DynamicPageProps {
  pageName: string;
}

export default function DynamicPage({ pageName }: DynamicPageProps) {
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchPageWidgets() {
      try {
        const widgets = await widgetApi.getWidgets(pageName);
        const experienceParam = searchParams.get('experience');
        
        const widget = selectWidgetForPage(widgets, experienceParam || undefined);
        setSelectedWidget(widget);
      } catch (error) {
        console.error('Error fetching widgets:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPageWidgets();
  }, [pageName, searchParams]);

  if (loading) {
    return (
      <WebsiteLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-600"></div>
        </div>
      </WebsiteLayout>
    );
  }

  if (!selectedWidget) {
    return (
      <WebsiteLayout>
        <div className="text-center text-gray-600">No widgets available for this page.</div>
      </WebsiteLayout>
    );
  }

  return (
    <WebsiteLayout>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-primary-600">{selectedWidget.header}</h1>
        {selectedWidget.thumbnail && (
          <img 
            src={selectedWidget.thumbnail} 
            alt={selectedWidget.header} 
            className="w-full h-64 object-cover rounded-md mb-4"
          />
        )}
        <p className="text-gray-700">{selectedWidget.text}</p>
        {selectedWidget.price && (
          <div className="mt-4 text-lg font-semibold text-green-600">
            Price: {selectedWidget.price}
          </div>
        )}
      </div>
    </WebsiteLayout>
  );
}