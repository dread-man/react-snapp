import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getApiKey = createAsyncThunk(
    'auth/getApiKey',
    async function (_, { rejectWithValue }) {
        const url = 'http://16.162.236.210:3001/auth/login-master-password'

        const requestBody = {
            email: 'davidvorona112@gmail.com',
            accessCode: '3759',
            masterPassword: 'smappsilverhorn123',
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        }

        try {
            const response = await fetch(url, requestOptions)
            if (!response.ok) {
                throw new Error('Cant get api key')
            }
            const data = response.json()
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const setError = (state) => {
    state.status = 'rejected'
}

const setLoading = (state) => {
    state.status = 'loading '
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        apiKey: '',
        apiKeyStatus: null,
    },
    // reducers: {

    // },
    extraReducers: {
        [getApiKey.pending]: setLoading,
        [getApiKey.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.apiKey = action.payload
        },
        [getApiKey.rejected]: setError,
    },
})

export default authSlice.reducer
