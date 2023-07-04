import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export const logIn = createAsyncThunk(
    'auth/logIn',
    async function (
        { userEmail, userCode, apiKey, setAuth, setErrorMessage },
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

			dispatch(setErrorMessage(false))
            dispatch(setAuth())
			
        } catch (error) {
			dispatch(setErrorMessage(true))
            return rejectWithValue(error.message)
        }
    }
)

const saveIsAuthorizedToStorage = (isAuthorized) => {
    // localStorage.setItem('isAuthorized', isAuthorized)

    Cookies.set('isAuthorized', isAuthorized)
}

const loadIsAuthorizedFromStorage = () => {
    // Using local storage:
    // return localStorage.getItem('isAuthorized')
    return Cookies.get('isAuthorized')
}

const initialState = {
    userEmail: '',
    userAccessCode: '',
    isAuthorized: loadIsAuthorizedFromStorage() === 'true',

	headerName: '',
	errorMessage: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserEmail: (state, action) => {
            state.userEmail = action.payload
        },
        setAccessCode: (state, action) => {
            state.userAccessCode = action.payload
        },
        setAuth: (state) => {
            state.isAuthorized = true
            saveIsAuthorizedToStorage(true)
        },
        setLogOut: (state) => {
            state.isAuthorized = false
			localStorage.removeItem('bearer')
            saveIsAuthorizedToStorage(false)
        },
		setHeaderName: (state, action) => {
			state.headerName = action.payload
		},
		setErrorMessage: (state, action) => {
			state.errorMessage = action.payload
		}
    },
})

export const { setUserEmail, setAccessCode, setAuth, setLogOut, setHeaderName, setErrorMessage } =
    authSlice.actions
export default authSlice.reducer
