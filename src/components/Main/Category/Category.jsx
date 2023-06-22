import { useDispatch, useSelector } from 'react-redux'
import styles from './Category.module.scss'
import { useState } from 'react'
import { getPosts } from '../../../store/feed/feedSlices'

const Category = () => {
	const dispatch = useDispatch()
    const feedStore = useSelector((state) => state.feed)
    const config = feedStore.config
    const [activeSpan, setActiveSpan] = useState(null) // Track the active span

    const handleSpanClick = (index, item) => {
        setActiveSpan(index)
		dispatch(getPosts(item.id)) // set post category
    }

    const renderedArray = [
        {
            name: 'My Posts',
			isVisible: true,
			id: localStorage.getItem('userId')
        },
		{
			name: 'Latest',
			isVisible: true,
			id: 999,
		},
        ...Object.keys(config).map((item) => config[item]),
    ]

    return (
        <div className={styles.category}>
            {renderedArray.map((item, index) => {
                if (item.isVisible) {
                    const spanClass = index === activeSpan ? styles.active : ''
                    return (
                        <span
                            key={index}
                            className={spanClass}
                            onClick={() => {
                                handleSpanClick(index, item)
                            }}
                        >
                            {item.name}
                        </span>
                    )
                }
                return null
            })}
        </div>
    )
}

export default Category