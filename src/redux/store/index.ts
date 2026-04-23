import { combineReducers, configureStore, type Action } from "@reduxjs/toolkit";
import todoReducer from "../../modules/features/todo/todoSlice";
import { useSelector, type TypedUseSelectorHook } from "react-redux";
import globalSlice from "../slices/global.slice";
import authReducer from "../../modules/auth/auth.slice";
import organizationManagementSlice from "../../modules/features/organization-management/organization.slices";
import { persistStore } from "redux-persist";
import userManagementSlice from "../../modules/features//user-management/user.slice";
import cmsSlice from "@/modules/features/cms/cms.slice";

const reducers = combineReducers({
  todos: todoReducer,
  global: globalSlice,
  auth: authReducer,
  organizationManagement: organizationManagementSlice,
  userManagement: userManagementSlice,
  cms:cmsSlice
});

const reducerProxy = (state: any, action: Action) => {
  if (action.type == "logout/LOGOUT") {
    localStorage.clear();
    return reducers(undefined, action);
  }
  return reducers(state, action);
};

const store = configureStore({
  reducer: reducerProxy,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
