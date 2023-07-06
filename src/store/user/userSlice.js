import { createSlice, createAsyncThunk, findNonSerializableValue } from '@reduxjs/toolkit'

export const getUserProfile = createAsyncThunk(
	'user/getUserProfile',
	async function (id, { rejectWithValue }) {
		const url__user = `http://16.162.236.210:3001/user/${id}`

		const requestOptions = {
			method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('bearer')}`,
            },
		}

		try {
			const response = await fetch(url__user, requestOptions)

			if(!response.ok) {
				throw new Error('Error with get user profile')
			}

			const data = await response.json()
			return data
			
		} catch (error) {
			rejectWithValue(error.message)
		}

	}
)

const userSlice = createSlice({
	name: 'user',
	initialState: {
		userId: null,
		userData: null
	},
	reducers: {
		setUserId: (state, action) => {
			state.userId = action.payload
		}
	},
	extraReducers: {
		[getUserProfile.fulfilled]: (state, action) => {
			state.userData = action.payload
		}
	},
})

export const { setUserId } = userSlice.actions
export default userSlice.reducer