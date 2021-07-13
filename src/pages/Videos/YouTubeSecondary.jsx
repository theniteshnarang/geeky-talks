import { Link } from 'react-router-dom'
import { shortNumber } from '../../utils'
export const YouTubeSecondaryCard = ({ video }) => {
    const { name, _id, creator, stats, videoId } = video
    const thumbnailImage = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    return (

        <Link to={`/${_id}`} className="YouTubeSecondary-card card flex flex--justify_between">
            <div className="YouTubeSecondary-card-header card__header">
                <img className="card__image" src={thumbnailImage} alt="card" />
            </div>
            <div className="YouTubeSecondary-card-content card__content flex flex--column flex--justify_around">
                <h3 className="YouTubeSecondary-card-name">{name}</h3>
                <p>{creator.name}</p>
                <p>{shortNumber(stats.views)} views</p>
            </div>
        </Link>

    );
}
export const YouTubeSecondary = ({ videos }) => {
    return (
        <div className="YouTubeSecondary">
            <ul className="flex flex--column flex--align_center">
                {videos.slice(0, 5).map(video => <li key={video._id}><YouTubeSecondaryCard video={video} /></li>)}
            </ul>
        </div>
    );
};
