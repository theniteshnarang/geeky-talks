import React from 'react'
import { Link } from 'react-router-dom'
export const VideoCard = ({ name, _id }) => {
    const thumbnailImage = `https://img.youtube.com/vi/${_id}/hqdefault.jpg`
    return (
        <div key={_id} className="Video-card card card--col flex flex--column">
            <Link className="Video-link" to={`${_id}`}>
                <div className="Video-card__header card__header--col pos-rel flex flex--column">
                    <img src={thumbnailImage} alt="author" />
                </div>
                <div className="Video-card__content card__content--col flex flex--column flex--justify_around">
                    <h3 className="Video-name">{name}</h3>
                </div>
            </Link>
        </div>
    )
}

