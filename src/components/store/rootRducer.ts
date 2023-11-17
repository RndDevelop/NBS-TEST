import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { loginSlice } from "./user";
import { personSlice } from "./personSlice";
import { userUpdateSlice } from "./userUpdate";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login", "person", "userUpdate"],
};

export const rootReducer = combineReducers({
  login: loginSlice.reducer,
  person: personSlice.reducer,
  userUpdate: userUpdateSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
