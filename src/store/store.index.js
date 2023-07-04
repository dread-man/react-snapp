import { configureStore } from "@reduxjs/toolkit";
import authReducer from './storeSlices'
import feedReducer from './feed/feedSlices'
import userReducer from "./user/userSlice"
import insiderReducer from "./insiderRequests/insiderSlice";

export default configureStore({
	reducer: {
		auth: authReducer,
		feed: feedReducer,
		user: userReducer,
		insider: insiderReducer,
	}
})
