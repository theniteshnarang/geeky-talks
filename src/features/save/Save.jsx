import { VideoCard } from "../videos/VideoCard"
import { selectAllSaved } from "./saveSlice";
import { useSelector } from "react-redux";
export const Save = () => {

    let content;

    const { saved, status, error } = useSelector(selectAllSaved)

    if (status === "loading") {
        content = <div className="loader loader-like">Loading....</div>
    } else if (status === "fulfilled") {
        content = saved.length > 0 ? (
            saved.map(item => <VideoCard key={item._id} {...item.video} />)
        ) : (
            <div className="fulfilled">Empty, Please save some videos</div>
        )
    } else if (status === "failed") {
        content = <div className="failed failed-like">{error}</div>
    }

    return (
        <div className="Save">
            <h1 className="ml-2 mb-2 color-gray-300">Your Saved Videos</h1>
            <div className="flex ml-2">
                {content}
            </div>
        </div>
    )
}
