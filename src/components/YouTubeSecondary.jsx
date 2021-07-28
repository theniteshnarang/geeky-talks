import { Link } from 'react-router-dom'
import { shortNumber } from '../utils'
import { getTwoRandomNumber, getNumberHavingDifferenceSix } from './util'
export const YouTubeSecondaryCard = ({ video }) => {
    const { name, _id, creator, stats, videoId } = video
    const thumbnailImage = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    return (

        <Link to={`/v/${_id}`} className="YouTubeSecondary-card card flex flex--justify_between">
            <div className="YouTubeSecondary-card-header card__header">
                <img className="card__image" src={thumbnailImage} alt="card" />
            </div>
            <div className="YouTubeSecondary-card-content card__content flex flex--column flex--justify_around">
                <h3 className="YouTubeSecondary-card-name">{name}</h3>
                <p className="YouTubeSecondary-card-creator">{creator.name}</p>
                <p className="YouTubeSecondary-card-views">{shortNumber(stats.views)} views</p>
            </div>
        </Link>

    );
}
export const YouTubeSecondary = ({ videos }) => {


    const [num1, num2] = getTwoRandomNumber(videos.length)

    const [start, end] = getNumberHavingDifferenceSix(num1, num2)
    return (
        <div className="YouTubeSecondary">
            <ul className="flex flex--column flex--align_center">
                {videos.slice(start, end).map(video => <li key={video._id}><YouTubeSecondaryCard video={video} /></li>)}
            </ul>
        </div>
    );
};
