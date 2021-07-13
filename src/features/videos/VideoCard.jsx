import React from 'react'
import { Link } from 'react-router-dom'
import { shortNumber } from '../../utils'
export const VideoCard = ({ name, _id, videoId, creator, stats }) => {
    const thumbnailImage = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    return (
        <div key={_id} className="Video-card card card--col flex flex--column">
            <Link className="Video-link" to={`/${_id}`}>
                <div className="Video-card__header card__header--col pos-rel flex flex--column">
                    <img src={thumbnailImage} alt="author" />
                </div>
                <div className="Video-card__content card__content--col flex flex--column flex--justify_around">
                    <h3 className="Video-name">{name}</h3>
                    <p className="Video-context color-gray-600">{creator.name}</p>
                    <p className="Video-context">
                        <span className="color-gray-600">{shortNumber(stats.views)} views</span>
                    </p>
                </div>
            </Link>
        </div>
    )
}

