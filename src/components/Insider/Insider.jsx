import { useRef } from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Insider.module.scss'
import { getApiKey } from '../../App'
import {
    getMe,
    setPostId,
    getPostById,
    getCommentsByPostId,
} from '../../store/feed/feedSlices'

import {
    postLike,
    postLikeInfo,
    postUnLike,
} from '../../store/insiderRequests/insiderSlice'

import Header from '../Header/Header'
import { setHeaderName } from '../../store/storeSlices'
import User from './User/User'

const Insider = () => {
    window.scrollTo(0, 0)
    const dispatch = useDispatch()
    const feedStore = useSelector((state) => state.feed)
    const authStore = useSelector((state) => state.auth)
    const insiderStore = useSelector((state) => state.insider)

    sessionStorage.removeItem('userId')

    useEffect(() => {
        dispatch(setHeaderName('Insider'))

        const fetchData = async (userEmail, userCode) => {
            const data = await getApiKey(userEmail, userCode)
            localStorage.setItem('userId', data.id)
        }

        const fetchDataAsync = async () => {
            await fetchData(authStore.userEmail, authStore.userAccessCode)
            dispatch(getMe())
        }

        if (authStore.userEmail && authStore.userAccessCode) {
            fetchDataAsync()
        } else {
            const savedUserId = localStorage.getItem('userId')
            if (savedUserId) {
                dispatch(getMe())
            }
        }

        const savedPostId = localStorage.getItem('postId')
        if (savedPostId) {
            dispatch(setPostId(savedPostId))
        }

        dispatch(getPostById(savedPostId))
        dispatch(getCommentsByPostId(savedPostId))
    }, [authStore.userEmail, authStore.userAccessCode, dispatch])

    const postIdRender = feedStore.postIdRender
    const postComments = feedStore.postComments

    const [isLiked, setIsLiked] = useState(false)
    const [numberOfLikes, setNumberOfLikes] = useState(null)

    useEffect(() => {
        dispatch(postLikeInfo(postIdRender.id))
        setNumberOfLikes(postIdRender.likes_number)
    }, [postIdRender])

    const meId = localStorage.getItem('userId')
    const likesData = insiderStore.postLikeData

	useEffect(() => {
		if(likesData) {
			const hasObject = likesData.items
			? likesData.items.some((obj) => obj.user.id === meId)
			: ''

			setIsLiked(hasObject)
		}
	}, [likesData])

    
	const checkFuntion = (likesData, meId) => {
		const hasObject = likesData.items
			? likesData.items.some((obj) => obj.user.id === meId)
			: ''
		if (!hasObject) {
			dispatch(postLike(postIdRender.id))
			setNumberOfLikes(Number(numberOfLikes) + 1)
		} else {
			dispatch(postUnLike(postIdRender.id))
			setNumberOfLikes(Number(numberOfLikes) - 1)
		}
	}

    let tags = []
    if (postIdRender.tags) {
        tags = Object.keys(postIdRender.tags).map(
            (item) => `#${postIdRender.tags[item]} `
        )
    }

    let userName = ''
    if (postIdRender.user) {
        userName = postIdRender.user.name
    }

    const contentRef = useRef(null)
    const htmlContent = postIdRender.content

    return (
        <div className={styles.insider}>
            <Header />
            <div className={styles.container}>
                <h1>{postIdRender.title}</h1>
                <p className={styles.tags}>{tags}</p>
                <div className={styles.userContainer}>
                    <div className={styles.infoContainer}>
                        <div className={styles.avatar}></div>
                        <div className={styles.nameAndData}>
                            <h3 className={styles.userName}>{userName}</h3>
                            <h3 className={styles.data}>
                                {new Date(
                                    postIdRender.createdAt
                                ).toLocaleString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </h3>
                        </div>
                    </div>
                    <div className={styles.iconContainer}>
                        <div className={isLiked ? styles.active : ''}>
                            <i
                                className={`ri-thumb-up-line`}
                                onClick={() => {
                                    checkFuntion(likesData, meId)

									setInterval(() => {
										window.location.reload()
									},350);
                                }}
                            ></i>
                        </div>
                        <span>{numberOfLikes}</span>
                    </div>
                </div>
                <div
                    className={styles.content}
                    ref={contentRef}
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                ></div>
                <div className={styles.commentContainer}>
                    <input type="text" placeholder="Add a comment" />
                    <button>Send</button>
                </div>

                {postComments && (
                    <div className={styles.comments}>
                        <span className={styles.title}>Comments</span>
                        {postComments &&
                            postComments.map((item, index) => (
                                <div key={index}>
                                    <div
                                        className={styles.userContainerComment}
                                    >
                                        <div
                                            className={
                                                styles.infoContainerComment
                                            }
                                        >
                                            <div
                                                className={styles.avatarComment}
                                            ></div>
                                            <div className={styles.nameAndData}>
                                                <h3
                                                    className={
                                                        styles.userNameComment
                                                    }
                                                >
                                                    {item.user.name}
                                                </h3>
                                            </div>
                                        </div>
                                        {
                                            <User
                                                key={index}
                                                value={item.content}
                                            />
                                        }
                                        <div className={styles.replyContainer}>
                                            <h3 className={styles.data}>
                                                {new Date(
                                                    postIdRender.createdAt
                                                ).toLocaleString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </h3>

                                            <button
                                                className={styles.commentReply}
                                            >
                                                Reply
                                            </button>
                                        </div>
                                    </div>
                                    {item.children &&
                                        item.children.map((child, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={
                                                        styles.childrenContainer
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.userContainerComment
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.infoContainerComment
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.avatarComment
                                                                }
                                                            ></div>
                                                            <div
                                                                className={
                                                                    styles.nameAndData
                                                                }
                                                            >
                                                                <h3
                                                                    className={
                                                                        styles.userNameComment
                                                                    }
                                                                >
                                                                    {
                                                                        child
                                                                            .user
                                                                            .name
                                                                    }
                                                                </h3>
                                                            </div>
                                                        </div>
                                                        <User
                                                            key={index}
                                                            value={
                                                                child.content
                                                            }
                                                        />
                                                        <div
                                                            className={
                                                                styles.replyContainer
                                                            }
                                                        >
                                                            <h3
                                                                className={
                                                                    styles.data
                                                                }
                                                            >
                                                                {new Date(
                                                                    postIdRender.createdAt
                                                                ).toLocaleString(
                                                                    'en-US',
                                                                    {
                                                                        month: 'short',
                                                                        day: 'numeric',
                                                                    }
                                                                )}
                                                            </h3>

                                                            <button
                                                                className={
                                                                    styles.commentReply
                                                                }
                                                            >
                                                                Reply
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Insider
