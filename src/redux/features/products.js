import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { isLoading, shouldLoad } from '../utils';
import { STATUS } from '../constants';
import api from '../../api';

export const loadProducts = createAsyncThunk(
  'products/load',
  (id) => api.loadProducts(id),
  {
    condition: (id, { getState }) =>
      shouldLoadProductsSelector(getState(), { restaurantId: id }),
  }
);
const Products = createEntityAdapter();

const initialState = {
  ...Products.getInitialState(),
  status: {},
  error: null,
};

const { reducer } = createSlice({
  name: 'products',
  initialState,
  extraReducers: {
    [loadProducts.pending]: (state, { meta }) => {
      state.status[meta.arg] = STATUS.pending;
      state.error = null;
    },
    [loadProducts.fulfilled]: (state, action) => {
      state.status[action.meta.arg] = STATUS.fulfilled;
      Products.addMany(state, action);
    },
    [loadProducts.rejected]: (state, { meta, error }) => {
      state.status[meta.arg] = STATUS.rejected;
      state.error = error;
    },
  },
});

export default reducer;

const productsSelectors = Products.getSelectors((state) => state.products);

export const productsSelector = productsSelectors.selectEntities;

export const productSelector = (state, { id }) =>
  productsSelectors.selectById(state, id);

const productsStatusSelector = (state, props) =>
  state.products.status[props.restaurantId];

export const productsLoadingSelector = isLoading(productsStatusSelector);
const shouldLoadProductsSelector = shouldLoad(productsStatusSelector);
