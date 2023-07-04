import React from 'react'
import styles from './User.module.scss'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserId } from '../../../store/user/userSlice'

const User = ({ value }) => {
	const dispatch = useDispatch()

    const processMentions = (content) => {
        const mentionRegex = /<mention user_id="(\d+)">([^<]+)<\/mention>/g
        const matches = content.matchAll(mentionRegex)

        let currentIndex = 0
        const result = []

        for (const match of matches) {
            const userId = match[1]
            const userName = match[2]

            const beforeText = content.slice(currentIndex, match.index)

			result.push(
				beforeText.replace(/&nbsp;/g, ''),
				<Link key={`mention-link-${userId}`} to={`/profile`}>
					<span
						key={`mention-span-${userId}`}
						onClick={() => {
							dispatch(setUserId(userId))
							sessionStorage.setItem('userId', userId);
							console.log(userId)
						}}
					>
						{userName}
					</span>
				</Link>
			)
			
			

            currentIndex = match.index + match[0].length
        }

        result.push(content.slice(currentIndex).replace(/&nbsp;/g, ''))
        return result
    }

    const item = {
        content: value,
    }

    const processedContent = processMentions(item.content)

    return <span>{processedContent}</span>
}

export default User
