import { Widget } from '../types/widget';

export function selectWidgetForPage(widgets: Widget[], urlParam?: string): Widget | null {
  if (urlParam) {
    const forcedWidget = widgets.find(widget => widget.id === urlParam);
    if (forcedWidget) return forcedWidget;
  }

  const randomNumber = Math.random() * 100;
  let cumulativePercentage = 0;

  for (const widget of widgets) {
    cumulativePercentage += widget.showToPercentage;
    if (randomNumber < cumulativePercentage) {
      return widget;
    }
  }

  return widgets.length > 0 ? widgets[widgets.length - 1] : null;
}