import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setError, setLoading } from './store.helpers'

export const getApiKey = createAsyncThunk(
    'auth/getApiKey',
    async function (_, { rejectWithValue }) {
        const url__login__master__password =
            'http://16.162.236.210:3001/auth/login-master-password'

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
            const response = await fetch(
                url__login__master__password,
                requestOptions
            )
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

export const logIn = createAsyncThunk(
    'auth/logIn',
    async function (
        { userEmail, userCode, apiKey, setAuth },
        { rejectWithValue, dispatch }
    ) {
        try {
            const url__verify__access__code =
                'http://16.162.236.210:3001/auth/verify-access-code'

            const requestBody = {
                email: userEmail,
                accessCode: userCode,
            }

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify(requestBody),
            }

            const response = await fetch(
                url__verify__access__code,
                requestOptions
            )
            if (!response.ok) {
                throw new Error('Unauthorized')
            }

            dispatch(setAuth())
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        apiKey: '',
        apiKeyStatus: null,

        userEmail: '',
        userAccessCode: '',

        isAuthorized: false,
    },
    reducers: {
        setUserEmail: (state, action) => {
            state.userEmail = action.payload
        },
        setAccessCode: (state, action) => {
            state.userAccessCode = action.payload
        },
        setAuth: (state) => {
            state.isAuthorized = true
        },
        setLogOut: (state) => {
            state.isAuthorized = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getApiKey.pending, setLoading)
            .addCase(getApiKey.fulfilled, (state, action) => {
                state.apiKeyStatus = 'resolved'
                state.apiKey = action.payload
            })
            .addCase(getApiKey.rejected, setError)
    },
})

export const { setUserEmail, setAccessCode, setAuth, setLogOut } =
    authSlice.actions
export default authSlice.reducer
