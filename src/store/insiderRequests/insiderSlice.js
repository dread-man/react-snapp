import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const postLike = createAsyncThunk(
    'insider/postLike',
    async function (id, { rejectWithValue, dispatch }) {
        const url__post__id__like = `http://16.162.236.210:3001/post/${id}/like`

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('bearer')}`,
            },
        }

        try {
            const response = await fetch(url__post__id__like, requestOptions)

            if (!response.ok) {
                throw new Error('Post like error')
            }
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)

export const postUnLike = createAsyncThunk(
    'insider/postLike',
    async function (id, { rejectWithValue, dispatch }) {
        const url__post__id__unlike = `http://16.162.236.210:3001/post/${id}/unlike`

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('bearer')}`,
            },
        }

        try {
            const response = await fetch(url__post__id__unlike, requestOptions)

            if (!response.ok) {
                throw new Error('Post unlike error')
            }
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)


export const postLikeInfo = createAsyncThunk(
    'insider/postLike',
    async function (id, { rejectWithValue, dispatch }) {
        const url__post__id__likeInfo = `
		http://16.162.236.210:3001/post-like`

        const params = new URLSearchParams({
            postId: id,
        })

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('bearer')}`,
            },
        }

        try {
            const response = await fetch(
                `${url__post__id__likeInfo}?${params.toString()}`,
                requestOptions
            )

            if (!response.ok) {
                throw new Error('Post like info error')
            }

            const data = await response.json()
            return data
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)

const insiderSlice = createSlice({
    name: 'insider',
    initialState: {
        hehe: 'hello',
        postLikeData: null,
    },
    reducers: {
        setPostLikeData: (state, action) => {
            state.postLikeData = action.payload
        },
    },
    extraReducers: {
        [postLikeInfo.fulfilled]: (state, action) => {
            state.postLikeData = action.payload
        },
    },
})

export const { setPostLikeData } = insiderSlice.actions
export default insiderSlice.reducer
