import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import api from '../../api';

import { STATUS } from '../constants';
import { addReview } from '../features/reviews';
import { isLoaded, shouldLoad } from '../utils';

export const loadUsers = createAsyncThunk('users/load', () => api.loadUsers(), {
  condition: (_, { getState }) => shouldLoadUsersSelector(getState()),
});

const Users = createEntityAdapter();

const initialState = {
  ...Users.getInitialState(),
  status: STATUS.idle,
  error: null,
};

const { reducer } = createSlice({
  name: 'restaurants',
  initialState,
  extraReducers: {
    [loadUsers.pending]: (state) => {
      state.status = STATUS.pending;
      state.error = null;
    },
    [loadUsers.fulfilled]: (state, action) => {
      state.status = STATUS.fulfilled;
      Users.addMany(state, action);
    },
    [loadUsers.rejected]: (state, { error }) => {
      state.status = STATUS.rejected;
      state.error = error;
    },
    [addReview]: (state, { meta, payload }) => {
      Users.addOne(state, { id: meta.userId, name: payload.review.name });
    },
  },
});

export default reducer;

const usersSelectors = Users.getSelectors((state) => state.users);

export const usersSelector = usersSelectors.selectEntities;
const usersStatusSelector = (state) => state.users.status;

export const usersLoadedSelector = isLoaded(usersStatusSelector);
const shouldLoadUsersSelector = shouldLoad(usersStatusSelector);
