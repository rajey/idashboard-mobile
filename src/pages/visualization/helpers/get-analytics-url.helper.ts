import * as _ from 'lodash';
import { VisualizationDataSelection } from '../models/visualization-data-selection.model';

export function getAnalyticsUrl(dataSelections: VisualizationDataSelection[], isAggregate: boolean, config?: any): string {
  return isAggregate ? getAggregateAnalyticsUrl(dataSelections) : getEventAnalyticsUrl();
}

function flattenDimensions(dataSelections: VisualizationDataSelection[]): string {
  return _.map(dataSelections, (dataSelection: VisualizationDataSelection) => {
    const selectionValues = _.map(dataSelection.items, item => item.id).join(';');
    return selectionValues !== ''
      ? 'dimension=' +
             dataSelection.dimension +
             ':' +
             selectionValues
      : '';
  }).join('&');
}

function getAggregateAnalyticsUrl(dataSelections: VisualizationDataSelection[], config?: any): string {
  const flattenedDimensionString = flattenDimensions(dataSelections);
  return flattenedDimensionString !== ''
    ? 'analytics.json?' +
           flattenedDimensionString
    : '';
}

// function getAnalyticsUrlOptions(dimensionConfig: DataSelectionConfig) {
//   if (!dimensionConfig) {
//     return '';
//   }
//
//   const displayPropertySection = dimensionConfig.displayNameProperty
//     ? '&displayProperty=' + dimensionConfig.displayNameProperty
//     : '';
//
//   const aggregrationTypeSection =
//     dimensionConfig.aggregationType &&
//     dimensionConfig.aggregationType !== 'DEFAULT'
//       ? '&aggregationType=' + dimensionConfig.aggregationType
//       : '';
//
//   return displayPropertySection + aggregrationTypeSection;
// }

function getEventAnalyticsUrl() {
  return '';
}
