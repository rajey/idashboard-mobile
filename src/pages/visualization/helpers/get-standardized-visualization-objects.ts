import { Visualization } from '../models/visualization.model';
import * as _ from 'lodash';

export function getStandardizedVisualizationObjects(visualizationItems: any[]): Visualization[] {
  return _.map(visualizationItems, visualizationItem => {
    const isNonVisualizable = checkIfIsNonVisualizable(visualizationItem.type);
    return {
      id: visualizationItem.id,
      name: getVisualizationName(visualizationItem),
      type: getSanitizedCurrentVisualizationType(visualizationItem.type),
      favorite: getFavoriteDetails(visualizationItem),
      created: visualizationItem.created,
      lastUpdated: visualizationItem.lastUpdated,
      progress: isNonVisualizable ? {
        statusCode: 200,
        statusText: 'OK',
        percent: 100,
        message: 'Loaded'
      } : null,
      uiConfig: {
        shape: visualizationItem.shape || 'NORMAL',
        height: '450px',
        showBody: visualizationItem.isOpen,
        hideFilters: isNonVisualizable,
        hideTypeButtons: isNonVisualizable
      },
      layers: getLayerDetailsForNonVisualizableObject(visualizationItem)
    };
  });
}

function getVisualizationName(visualizationItem: any) {
  if (!visualizationItem) {
    return null;
  }

  /**
   * Return the app key as name when visualization is an app
   */
  if (visualizationItem.type === 'APP') {
    return visualizationItem.appKey;
  }

  return visualizationItem.type &&
         visualizationItem.hasOwnProperty(_.camelCase(visualizationItem.type))
    ? _.isPlainObject(visualizationItem[_.camelCase(visualizationItem.type)])
           ? visualizationItem[_.camelCase(visualizationItem.type)].displayName
           : null
    : null;
}

function getSanitizedCurrentVisualizationType(visualizationType: string): string {
  return (visualizationType === 'CHART' || visualizationType === 'EVENT_CHART') ?
         'CHART' :
         (
           visualizationType === 'TABLE' ||
           visualizationType === 'EVENT_REPORT' ||
           visualizationType === 'REPORT_TABLE'
         ) ?
         'TABLE' :
         (visualizationType === 'MAP') ?
         'MAP' :
         visualizationType;
}

function getFavoriteDetails(visualizationItem: any) {
  return visualizationItem.type &&
         visualizationItem.hasOwnProperty(_.camelCase(visualizationItem.type))
    ? {
      id: _.isPlainObject(
        visualizationItem[_.camelCase(visualizationItem.type)]
      )
        ? visualizationItem[_.camelCase(visualizationItem.type)].id
        : undefined,
      type: _.camelCase(visualizationItem.type)
    }
    : null;
}

function checkIfIsNonVisualizable(visualizationType: string) {
  return visualizationType === 'USERS' || visualizationType === 'REPORTS' ||
    visualizationType === 'RESOURCES' || visualizationType === 'APP' ||
    visualizationType === 'MESSAGES';
}

function getLayerDetailsForNonVisualizableObject(visualizationItem) {
  return visualizationItem.type === 'USERS' ||
         visualizationItem.type === 'REPORTS' ||
         visualizationItem.type === 'RESOURCES'
    ? [{rows: visualizationItem[_.camelCase(visualizationItem.type)]}]
    : [];
}
