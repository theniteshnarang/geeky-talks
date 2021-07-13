import { VideoCard } from "./VideoCard";
import { useSelector } from "react-redux";
import { selectAllVideos } from "./videoSlice";

export const VideosList = () => {

    const { videos, status, error } = useSelector(selectAllVideos)

    let content;

    if (status === 'loading') {
        content = <div className="loader">Loading....</div>
    } else if (status === 'fulfilled') {
        content = videos.map(video => (<VideoCard showClose={false} key={video._id} {...video} />))
    } else if (status === 'failed') {
        content = <div className="failed">{error}</div>
    }

    return (
        <div className="VideosList mt-2">
            <div className="Videos flex flex--justify_evenly">
                {content}
            </div>
        </div>
    )
}