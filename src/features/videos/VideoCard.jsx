import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AiFillCloseCircle } from 'react-icons/ai'
import { shortNumber } from '../../utils'
import { removeFromLikes } from '../like/likeSlice'
import { removeVideoFromSave } from '../save/saveSlice'

export const VideoCard = ({ name, _id, videoId, creator, stats, showClose, like, playlistId }) => {
    const thumbnailImage = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    const dispatch = useDispatch()

    const handleClose = (like) => {
        return like ? dispatch(removeFromLikes({ _id })) : dispatch(removeVideoFromSave({ playlistId, _id }))
    }

    return (
        <div key={_id} className="Video-card card card--col">
            <div className="Video-card__header card__header--col pos-rel">
                <Link to={`/v/${_id}`}>
                    <img className="w-100" src={thumbnailImage} alt="author" />
                </Link>
                {showClose && (
                    <AiFillCloseCircle
                        onClick={() => {
                            handleClose(like)
                        }}
                        className="fs-2 card__icon card__icon--col bi bi-heart-fill color-light"
                    />
                )}
            </div>
            <Link className="Video-link" to={`/v/${_id}`}>
                <div className="Video-card__content card__content--col flex flex--column flex--justify_around">
                    <h3 className="Video-name">{name}</h3>
                    <p className="Video-context color-gray-600">{creator.name}</p>
                    <p className="Video-context">
                        <span className="color-gray-600">{shortNumber(stats.views)} views</span>
                    </p>
                </div>
            </Link>
        </div >
    )
}

