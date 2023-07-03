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
import Header from '../Header/Header'
import { setHeaderName } from '../../store/storeSlices'
import User from './User/User'

const Insider = () => {
    const dispatch = useDispatch()
    const feedStore = useSelector((state) => state.feed)
    const authStore = useSelector((state) => state.auth)

    const [isLiked, setIsLiked] = useState(false)

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
    // console.log(postIdRender)
    // console.log(postComments)

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

    const formattedDate = isNaN(new Date(postIdRender.createdAt))
        ? ''
        : new Date(postIdRender.createdAt).toISOString().split('T')[0]

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
                            <h3 className={styles.data}>{formattedDate}</h3>
                        </div>
                    </div>
                    <div className={styles.iconContainer}>
                        <div className={isLiked ? styles.active : ''}>
                            <i
                                className={`ri-thumb-up-line`}
                                onClick={() => {
                                    setIsLiked(!isLiked)
                                }}
                            ></i>
                        </div>
                        <span>{isLiked ? 1 : 0}</span>
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
                                        {<User value={item.content} />}
                                        <div className={styles.replyContainer}>
                                            <h3 className={styles.data}>
                                                {postIdRender.createdAt
                                                    ? new Date(
                                                          postIdRender.createdAt
                                                      )
                                                          .toISOString()
                                                          .split('T')[0]
                                                    : ''}
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
                                                                {postIdRender.createdAt
                                                                    ? new Date(
                                                                          child.createdAt
                                                                      )
                                                                          .toISOString()
                                                                          .split(
                                                                              'T'
                                                                          )[0]
                                                                    : ''}
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
