import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getVideoChatToken = createAsyncThunk(
	'video/getVideoChatToken',
	async function (channelName, { rejectWithValue }) {
		const url__video_chat__access_token = `http://16.162.236.210:3001/video-chat/access-token/${channelName}`

		const requestOptions = {
			method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('bearer')}`,
            },
		}

		try {
			const response = await fetch(url__video_chat__access_token, requestOptions)

			if(!response.ok) {
				throw new Error('Error with getting video token')
			}
			const data = await response.json()
			console.log(data)

			localStorage.setItem('VideoChatToken', data.access_token)


		} catch (error) {
			rejectWithValue(error.message)
		}
	}
)

const videoSlice = createSlice({
	name: 'video',
	initialState: {
		// videoToken: null

	},
	reducers: {

	},
	extraReducers: {

	},
})