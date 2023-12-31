import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const postLike = createAsyncThunk(
    'insider/postLike',
    async function (id, { rejectWithValue }) {
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
    async function (id, { rejectWithValue }) {
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
    async function (id, { rejectWithValue }) {
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

export const sendComment = createAsyncThunk(
    'insider/sendComment',
    async function ({ postId, content }, { rejectWithValue }) {
        const url__comment = 'http://16.162.236.210:3001/comment'

        const requestBody = {
            postId: postId,
            content: content,
            parentCommentId: null,
            repliedChildCommentId: null,
            taggedUserIds: [],
            mentionedUserIds: [],
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('bearer')}`,
            },
			body: JSON.stringify(requestBody),
        }

        try {
			const response = await fetch(url__comment, requestOptions)
			if(!response.ok) {
				throw new Error('Error with send comment')
			}

			const data = await response.json()
			return data


        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)

export const deleteComment = createAsyncThunk(
	'insider/deleteComment',
	async function (id, { rejectWithValue }) {
		const url__comment = `http://16.162.236.210:3001/comment/${id}`

		const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('bearer')}`,
            },
        }

		try {
			const response = await fetch(url__comment, requestOptions)

			if(!response.ok) {
				throw new Error('Error with deleting comment')
			}

			// const data = await response.json()

		} catch (error) {
			rejectWithValue(error.message)
		}
	}
)

export const getAvatar = createAsyncThunk(
	'insider/gatAvatars',
	async function (_, { rejectWithValue }) {
		const url = 'http://16.162.235.143:3002/assets/avatarPlaceholder1.png'

		const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('bearer')}`,
            },
        }
		
		try {
			const response = await fetch(url, requestOptions)

			if(!response.ok) {
				throw new Error('Error get avatar')
			}

			// const data = await response.json()
			
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


		sendCommentAfter: null,
		avatars: null,
    },
    reducers: {},
    extraReducers: {
        [postLikeInfo.fulfilled]: (state, action) => {
            state.postLikeData = action.payload
        },
		[sendComment.fulfilled]: (state, action) => {
			state.sendCommentAfter = action.payload
		}
    },
})

export default insiderSlice.reducer
