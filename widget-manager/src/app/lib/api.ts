import { Widget } from '../types/widget';

export const widgetApi = {
  async getWidgets(pageName: string) {
    const response = await fetch(`/api/widgets?path=widget/${pageName}`);
    if (!response.ok) throw new Error('Failed to fetch widgets');
    return response.json();
  },

  async getAllWidgets() {
    const response = await fetch('/api/widgets?path=widgets');
    if (!response.ok) throw new Error('Failed to fetch all widgets');
    return response.json();
  },

  async createWidget(widget: Widget) {
    const response = await fetch('/api/widgets?path=widget', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(widget)
    });
    if (!response.ok) throw new Error('Failed to create widget');
    return response.json();
  },

  async updateWidget(pageName: string, widgetId: string, updatedWidget: Partial<Widget>) {
    const response = await fetch(`/api/widgets?path=widget/${pageName}/${widgetId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedWidget)
    });
    if (!response.ok) throw new Error('Failed to update widget');
    return response.json();
  },

  async deleteWidget(pageName: string, widgetId: string) {
    const response = await fetch(`/api/widgets?path=widget/${pageName}/${widgetId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete widget');
    return response.json();
  }
};