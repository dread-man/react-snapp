import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getConfig = createAsyncThunk(
    'feed/getConfig',
    async function (_, { rejectWithValue }) {
        try {
            const url__config = 'http://16.162.236.210:3001/config'
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('bearer')}`,
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

export const getMe = createAsyncThunk(
    'feed/getMe',
    async function (_, { rejectWithValue }) {
        try {
            const url__me = 'http://16.162.236.210:3001/me'
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('bearer')}`,
                },
            }

            const response = await fetch(url__me, requestOptions)
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

export const getPosts = createAsyncThunk(
    'feed/getPosts',
    async function (value, { rejectWithValue }) {
        const url__post = 'http://16.162.236.210:3001/post'

        const params = new URLSearchParams({
            categoryId: value,
        })

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('bearer')}`,
            },
        }
        try {
            if (value == 999) {
                const response = await fetch(url__post, requestOptions)
                if (!response.ok) {
                    throw new Error('Error post')
                }
                const data = response.json()
                return data
            }

            const response = await fetch(
                `${url__post}?${params.toString()}`,
                requestOptions
            )
            if (!response.ok) {
                throw new Error('Error post')
            }

            const data = response.json()
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const getPostsByPage = createAsyncThunk(
    'feed/getPostsByPage',
    async function ({ categoryId, page }, { rejectWithValue, dispatch }) {
        const url__post = 'http://16.162.236.210:3001/post'

        const params = new URLSearchParams({
            page: page,
            categoryId: categoryId,
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
                `${url__post}?${params.toString()}`,
                requestOptions
            )
            if (!response.ok) {
                throw new Error('Error post by page')
            }
            const data = response.json()
            return data
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)

export const getPostById = createAsyncThunk(
    'feed/getPostById',
    async function (value, { rejectWithValue }) {
        const url__post__value = `http://16.162.236.210:3001/post/${value}`

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('bearer')}`,
            },
        }

        try {
            const response = await fetch(url__post__value, requestOptions)
            if (!response.ok) {
                throw new Error('Error post by id')
            }

            const data = response.json()
            return data
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)

export const getCommentsByPostId = createAsyncThunk(
    'feed/getCommentsByPostId',
    async function (postId, { rejectWithValue }) {
        const url__comment = `http://16.162.236.210:3001/comment/?postId=${postId}`

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('bearer')}`,
            },
        }

        try {
            const response = await fetch(url__comment, requestOptions)
            if (!response.ok) {
                throw new Error('Error post by id')
            }

            const data = response.json()
            return data
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)



const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        config: '',
        me: '',
        posts: '',

        categoryId: sessionStorage.getItem('categoryId'),
        page: 2,

        postId: null,
        postIdRender: {},

		postComments: null,

		videoData: null,
    },
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        setPostId: (state, action) => {
            state.postId = action.payload
        },
    },
    extraReducers: {
        [getConfig.fulfilled]: (state, action) => {
            state.config = action.payload.categories
        },
        [getMe.fulfilled]: (state, action) => {
            state.me = action.payload
        },
        [getPosts.fulfilled]: (state, action) => {
            state.posts = action.payload.items
        },
        [getPostsByPage.fulfilled]: (state, action) => {
            if (state.categoryId === 1 && state.page >= 4) {
                state.categoryId = null
                state.page = null
            }
            if (state.categoryId === 4 && state.page >= 18) {
                state.categoryId = null
                state.page = null
            }
            state.posts = [...state.posts, ...action.payload.items]
        },

        [getPostById.fulfilled]: (state, action) => {
            state.postIdRender = action.payload
        },
		[getCommentsByPostId.fulfilled]: (state, action) => {
			state.postComments = [...action.payload.items]
		},
		
    },
})

export const { setCategoryId, setPage, setPostId } = feedSlice.actions
export default feedSlice.reducer
