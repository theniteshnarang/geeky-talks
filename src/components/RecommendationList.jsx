import { Link } from 'react-router-dom'
import { shortNumber } from '../utils'
import { useState, useEffect } from 'react'
import { getTwoRandomNumber, getNumberHavingDifferenceSix } from './util'
export const RecommendationCard = ({ video }) => {
    const { name, _id, creator, stats, videoId } = video
    const thumbnailImage = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    return (

        <Link to={`/v/${_id}`} className="Recommendation-card card flex flex--justify_between">
            <div className="Recommendation-card-header card__header">
                <img className="card__image" src={thumbnailImage} alt="card" />
            </div>
            <div className="Recommendation-card-content card__content flex flex--column flex--justify_around">
                <h3 className="Recommendation-card-name">{name}</h3>
                <p className="Recommendation-card-creator">{creator.name}</p>
                <p className="Recommendation-card-views">{shortNumber(stats.views)} views</p>
            </div>
        </Link>

    );
}
export const RecommendationList = ({ videos }) => {
    const [indexes, setIndexes] = useState({ start: null, end: null })

    const noOfVideos = videos.length

    useEffect(() => {
        const [num1, num2] = getTwoRandomNumber(noOfVideos)
        const [start, end] = getNumberHavingDifferenceSix(num1, num2)
        setIndexes({ start, end })
    }, [noOfVideos])

    return (
        <div className="Recommendation">
            <ul className="flex flex--column flex--align_center">
                {videos.slice(indexes.start, indexes.end).map(video => <li key={video._id}><RecommendationCard video={video} /></li>)}
            </ul>
        </div>
    );
};
