import { configureStore } from "@reduxjs/toolkit";
import authReducer from './storeSlices'

export default configureStore({
	reducer: {
		auth: authReducer,
	}
})
