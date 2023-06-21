import { configureStore } from "@reduxjs/toolkit";
import authReducer from './storeSlices'
import feedReducer from './feed/feedSlices'

export default configureStore({
	reducer: {
		auth: authReducer,
		feed: feedReducer,
	}
})
