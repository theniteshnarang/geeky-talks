import { VideoCard } from './VideoCard.jsx';
import {useStore} from '../../context/provider'

export const VideoStandard = () => {
    const {videos} = useStore()
    return (
        <div className="VideoStandard">
            <div className="Videos flex flex--justify_evenly">
                {videos ? videos.map(item => <VideoCard key={item._id} {...item}/>) : <p>Loading...</p>}
            </div>
        </div>
    )
}