import { useDispatch, useSelector } from 'react-redux'
import styles from './Posts.module.scss'
import { useEffect, useState } from 'react'
import { getPostsByPage, setCategoryId, setPage } from '../../../store/feed/feedSlices'

const Posts = () => {
    const dispatch = useDispatch()
    const feedStore = useSelector((state) => state.feed)
    const posts = feedStore.posts

    const parser = new DOMParser()
    const [canFetchPosts, setCanFetchPosts] = useState(true)

    const categoryId = feedStore.categoryId
	const page = feedStore.page

    const postByPageConfig = {
        categoryId: categoryId,
        page: page,
    }

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                    document.body.offsetHeight &&
                canFetchPosts
            ) {
				if(categoryId !== null && page !== null) {
					dispatch(getPostsByPage(postByPageConfig))
				}
                setCanFetchPosts(false)
				dispatch(setPage(page + 1))
				
                setTimeout(() => {
                    setCanFetchPosts(true)
                }, 200)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [dispatch, canFetchPosts, setCanFetchPosts, postByPageConfig])

    useEffect(() => {
        dispatch(setCategoryId(categoryId))
    }, [categoryId, dispatch,])

    const renderedArray = [...Object.keys(posts).map((item) => posts[item])]

    return (
        <div className={styles.posts}>
            {renderedArray.map((item, index) => {
                return (
                    <div key={index} className={styles.post}>
                        <h3>{item.title}</h3>
                        <span>
                            {item.content
                                ? parser.parseFromString(
                                      item.content,
                                      'text/html'
                                  ).body.textContent
                                : ''}
                        </span>
                        <div className={styles.user}>
                            <h3 className={styles.userName}>
                                {item.user.name}
                            </h3>
                            <div className={styles.stats}>
                                <h3>
                                    <i className="ri-thumb-up-line"></i>{' '}
                                    {item.stats.totalLikes}
                                </h3>
                                <h3>
                                    <i className="ri-chat-3-line"></i>{' '}
                                    {item.stats.totalComments}
                                </h3>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Posts
