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
  }
};