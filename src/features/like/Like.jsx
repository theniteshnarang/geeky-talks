import { VideoCard } from "../../features/videos/VideoCard"
import { useSelector } from "react-redux"
import { selectAllLikes } from "./likeSlice"

export const Like = () => {
    let content;

    const { likes, status, error } = useSelector(selectAllLikes)

    if (status === "loading") {
        content = <div className="loader loader-like">Loading....</div>
    } else if (status === "fulfilled") {
        content = likes.length > 0 ? (
            likes.map(item => <VideoCard key={item._id} {...item.video} />)
        ) : (
            <div className="fulfilled">Empty, Please like some videos</div>
        )
    } else if (status === "failed") {
        content = <div className="failed failed-like">{error}</div>
    }

    return (
        <div className="Like">
            <h1 className="ml-2 mb-2 color-gray-300">Your Liked videos</h1>
            <div className="Like-content flex ml-2">
                {content}
            </div>
        </div>
    )
}