import { Widget } from '../types/widget';

export function selectWidgetForPage(widgets: Widget[], urlParam?: string): Widget | null {
  // If URL parameter is provided, try to find specific widget
  if (urlParam) {
    const forcedWidget = widgets.find(widget => widget.id === urlParam);
    if (forcedWidget) return forcedWidget;
  }

  // If no specific widget, use A/B testing logic
  const randomNumber = Math.random() * 100;
  let cumulativePercentage = 0;

  for (const widget of widgets) {
    cumulativePercentage += widget.showToPercentage;
    if (randomNumber < cumulativePercentage) {
      return widget;
    }
  }

  // Fallback to last widget if no selection made
  return widgets.length > 0 ? widgets[widgets.length - 1] : null;
}