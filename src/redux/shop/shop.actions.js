import ShopActionType from "./shop.types";

export const updateCollections = (collMap) => ({
  type: ShopActionType.UPDATE_COLLECIONS,
  payload: collMap,
});
