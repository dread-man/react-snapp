import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const getConfig = createAsyncThunk(
    'feed/getConfig',
    async function (apiKey, { rejectWithValue }) {
        try {
            const url__config = 'http://16.162.236.210:3001/config'
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
            }

            const response = await fetch(url__config, requestOptions)
            if (!response.ok) {
                throw new Error('Error config')
            }

            const data = response.json()
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        config: '',
    },
    reducers: {},
	extraReducers: {
		[getConfig.fulfilled]: (state, action) => {
			state.config = action.payload.categories
		}
	}
})

// export const { } = feedSlice.actions
export default feedSlice.reducer
