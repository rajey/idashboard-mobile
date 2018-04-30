import { createSelector } from '@ngrx/store';
import { getVisualizationObjectEntities } from '../reducers';

export const getVisualizationObjectById = (id) => createSelector(getVisualizationObjectEntities,
  (visualizationObjectEntity) => visualizationObjectEntity[id]);
