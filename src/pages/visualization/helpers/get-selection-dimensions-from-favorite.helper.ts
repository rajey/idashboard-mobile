import * as _ from 'lodash';

export function getSelectionDimensionsFromFavorite(favoriteLayer) {
  return [
    ...getStandardizedDimensions(favoriteLayer.rows, 'row'),
    ...getStandardizedDimensions(favoriteLayer.columns, 'column'),
    ...getStandardizedDimensions(favoriteLayer.filters, 'filter')
  ];
}

function getStandardizedDimensions(dimensions, dimensionLayout: string) {

  return _.map(dimensions, dimensionObject => {
    return {
      dimension: dimensionObject.dimension,
      layout: dimensionLayout,
      filter: dimensionObject.filter,
      items: _.map(dimensionObject.items, item => {
        return {id: item.dimensionItem || item.id, name: item.displayName, type: item.dimensionItemType};
      })
    };
  });
}
