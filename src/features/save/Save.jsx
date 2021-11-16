import { useSelector } from "react-redux";
import { selectSaved } from "./saveSlice";
import { SavedItemTile } from "./SavedItemTile";
const Save = () => {

    let content;

    const { saved, status, error } = useSelector(selectSaved)

    if (status === "loading") {
        content = <div className="loader loader-like">Loading....</div>
    } else if (status === "fulfilled") {
        content = saved.length > 0 ? (
            saved.map((save, indx) => < SavedItemTile save={save} indx={indx} />)
        ) : (
            <div className="fulfilled">Empty, Please save some videos</div>
        )
    } else if (status === "failed") {
        content = <div className="failed failed-like color-light">{error}</div>
    }

    return (
        <div className="Save">
            <h1 className="Save-title mb-2 color-gray-300">Your Saved Videos</h1>
            <div className="Save-content flex">
                {content}
            </div>
        </div>
    )
}


export default Save
