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
    sendComment,
    deleteComment,
} from '../../store/insiderRequests/insiderSlice'

import Header from '../Header/Header'
import { setHeaderName } from '../../store/storeSlices'
import User from './User/User'

import { setUserId } from '../../store/user/userSlice'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Insider = () => {
    window.scrollTo(0, 0)
    const dispatch = useDispatch()
    const feedStore = useSelector((state) => state.feed)
    const authStore = useSelector((state) => state.auth)
    const insiderStore = useSelector((state) => state.insider)

    const navigate = useNavigate()

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
        if (likesData) {
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
            (item) => `#${postIdRender.tags[item]} `,
        )
    }

    let userName = ''
    let userIdPost = ''
    if (postIdRender.user) {
        userName = postIdRender.user.name
        userIdPost = postIdRender.user.id
    }

    const contentRef = useRef(null)
    const htmlContent = postIdRender.content

    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }

    const handleButtonClick = () => {
        console.log(inputValue)
        console.log(postIdRender.id)

        const data = {
            postId: postIdRender.id,
            content: inputValue,
        }

        dispatch(sendComment(data))
        setInputValue('')

        setInterval(() => {
            window.location.reload()
        }, 500)
    }

    const [edit, setEdit] = useState(false)
    // console.log(postIdRender)

    useEffect(() => {
        if (typeof postIdRender === 'object') {
            navigate('/')
        }
    }, [postIdRender])

    return (
        <div className={styles.insider}>
            <Header />
            <div className={styles.container}>
                <h1>{postIdRender.title}</h1>
                <p className={styles.tags}>{tags}</p>
                <div className={styles.userContainer}>
                    <div className={styles.infoContainer}>
                        <Link
                            className={styles.link}
                            key={`mention-link-${userIdPost}`}
                            to={`/profile`}
                        >
                            <img
                                src={
                                    postIdRender.user
                                        ? postIdRender.user.avatar
                                            ? postIdRender.user.avatar
                                            : `http://16.162.235.143:3002/assets/avatarPlaceholder${
                                                  Math.floor(
                                                      Math.random() * 4,
                                                  ) + 1
                                              }.png`
                                        : ''
                                }
                                className={styles.avatar}
                                onClick={() => {
                                    dispatch(setUserId(userIdPost))
                                    sessionStorage.setItem('userId', userIdPost)
                                }}
                            ></img>
                        </Link>

                        <div className={styles.nameAndData}>
                            <Link
                                className={styles.link}
                                key={`mention-link-${userIdPost}`}
                                to={`/profile`}
                            >
                                <h3
                                    className={styles.userName}
                                    key={`mention-span-${userIdPost}`}
                                    onClick={() => {
                                        dispatch(setUserId(userIdPost))
                                        sessionStorage.setItem(
                                            'userId',
                                            userIdPost,
                                        )
                                    }}
                                >
                                    {userName}
                                </h3>
                            </Link>

                            <h3 className={styles.data}>
                                {new Date(
                                    postIdRender.createdAt,
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
                                    }, 500)
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
                    <input
                        type="text"
                        placeholder="Add a comment"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleButtonClick}>Send</button>
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
                                            <Link
                                                className={styles.link}
                                                key={`mention-link-${userIdPost}`}
                                                to={`/profile`}
                                                onClick={() => {
                                                    dispatch(
                                                        setUserId(userIdPost),
                                                    )
                                                    sessionStorage.setItem(
                                                        'userId',
                                                        item.user.id,
                                                    )
                                                }}
                                            >
                                                <img
                                                    src={
                                                        item.user
                                                            ? item.user.avatar
                                                                ? item.user
                                                                      .avatar
                                                                : `http://16.162.235.143:3002/assets/avatarPlaceholder${
                                                                      Math.floor(
                                                                          Math.random() *
                                                                              4,
                                                                      ) + 1
                                                                  }.png`
                                                            : ''
                                                    }
                                                    className={
                                                        styles.avatarComment
                                                    }
                                                    onClick={() => {
                                                        dispatch(
                                                            setUserId(
                                                                userIdPost,
                                                            ),
                                                        )
                                                        sessionStorage.setItem(
                                                            'userId',
                                                            userIdPost,
                                                        )
                                                    }}
                                                ></img>
                                            </Link>
                                            <div className={styles.nameAndData}>
                                                <Link
                                                    className={styles.link}
                                                    key={`mention-link-${userIdPost}`}
                                                    to={`/profile`}
                                                    onClick={() => {
                                                        dispatch(
                                                            setUserId(
                                                                userIdPost,
                                                            ),
                                                        )
                                                        sessionStorage.setItem(
                                                            'userId',
                                                            item.user.id,
                                                        )
                                                    }}
                                                >
                                                    <h3
                                                        className={
                                                            styles.userNameComment
                                                        }
                                                    >
                                                        {item.user.name}
                                                    </h3>
                                                </Link>
                                            </div>
                                            {meId == item.user.id && (
                                                <div
                                                    className={
                                                        styles.commentMenu
                                                    }
                                                >
                                                    <i className="ri-more-fill"></i>
                                                    {!edit && (
                                                        <ul
                                                            className={
                                                                styles.dropdown
                                                            }
                                                        >
                                                            {/* <li
                                                                className={
                                                                    styles.textDrop
                                                                }
                                                                onClick={() => {
                                                                    setEdit(
                                                                        !edit
                                                                    )
                                                                }}
                                                            >
                                                                Edit
                                                            </li> */}
                                                            <li
                                                                className={
                                                                    styles.textDrop
                                                                }
                                                                onClick={() => {
                                                                    dispatch(
                                                                        deleteComment(
                                                                            item.id,
                                                                        ),
                                                                    )
                                                                    setInterval(
                                                                        () => {
                                                                            window.location.reload()
                                                                        },
                                                                        500,
                                                                    )
                                                                }}
                                                            >
                                                                Delete
                                                            </li>
                                                        </ul>
                                                    )}
                                                    {/* {edit && (
                                                        <ul
                                                            className={
                                                                styles.dropdown
                                                            }
                                                        >
                                                            <li
                                                                className={
                                                                    styles.textDrop
                                                                }
                                                                onClick={() => {
                                                                    console.log(
                                                                        'send response for edit'
                                                                    )
                                                                }}
                                                            >
                                                                Save
                                                            </li>
                                                            <li
                                                                className={
                                                                    styles.textDrop
                                                                }
                                                                onClick={() => {
                                                                    setEdit(
                                                                        !edit
                                                                    )
                                                                }}
                                                            >
                                                                Cancel
                                                            </li>
                                                        </ul>
                                                    )} */}
                                                </div>
                                            )}
                                        </div>

                                        <User
                                            key={index}
                                            value={item.content}
                                        />

                                        <div className={styles.replyContainer}>
                                            <h3 className={styles.data}>
                                                {new Date(
                                                    item.createdAt,
                                                ).toLocaleString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </h3>
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
                                                    onClick={() => {
                                                        console.log(child)
                                                    }}
                                                >
                                                    <div
                                                        className={
                                                            styles.userContainerComment
                                                        }
                                                    >
                                                        <Link
                                                            className={
                                                                styles.link
                                                            }
                                                            key={`mention-link-${userIdPost}`}
                                                            to={`/profile`}
                                                        >
                                                            <div
                                                                className={
                                                                    styles.infoContainerComment
                                                                }
                                                                onClick={() => {
                                                                    dispatch(
                                                                        setUserId(
                                                                            userIdPost,
                                                                        ),
                                                                    )
                                                                    sessionStorage.setItem(
                                                                        'userId',
                                                                        child
                                                                            .user
                                                                            .id,
                                                                    )
                                                                }}
                                                            >
                                                                <img
                                                                    src={
                                                                        child.user
                                                                            ? child
                                                                                  .user
                                                                                  .avatar
                                                                                ? child
                                                                                      .user
                                                                                      .avatar
                                                                                : `http://16.162.235.143:3002/assets/avatarPlaceholder${
                                                                                      Math.floor(
                                                                                          Math.random() *
                                                                                              4,
                                                                                      ) +
                                                                                      1
                                                                                  }.png`
                                                                            : ''
                                                                    }
                                                                    className={
                                                                        styles.avatarComment
                                                                    }
                                                                    onClick={() => {
                                                                        dispatch(
                                                                            setUserId(
                                                                                userIdPost,
                                                                            ),
                                                                        )
                                                                        sessionStorage.setItem(
                                                                            'userId',
                                                                            userIdPost,
                                                                        )
                                                                    }}
                                                                ></img>
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
                                                        </Link>

                                                        <span
                                                            className={
                                                                styles.mentionedUser
                                                            }
                                                        >
                                                            {child
                                                                .mentionedUsers[0] &&
                                                                child
                                                                    .mentionedUsers[0]
                                                                    .name +
                                                                    '   '}
                                                        </span>
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
                                                                    child.createdAt,
                                                                ).toLocaleString(
                                                                    'en-US',
                                                                    {
                                                                        month: 'short',
                                                                        day: 'numeric',
                                                                    },
                                                                )}
                                                            </h3>

                                                            {/* <button
                                                                className={
                                                                    styles.commentReply
                                                                }
                                                            >
                                                                Reply
                                                            </button> */}
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
