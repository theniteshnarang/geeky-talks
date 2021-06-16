import { useState } from 'react'
import { AiOutlineHome, AiOutlineFire, AiOutlineSave, AiOutlineLike, AiOutlineMenuUnfold, AiOutlineClose } from 'react-icons/ai'
import { MdPlaylistAddCheck } from 'react-icons/md';
import { Link } from 'react-router-dom'
export const Guide = () => {
    const [guide, setGuide] = useState(true)
    function toggleDisplay() {
        return setGuide(guide => !guide)
    }
    return (
        <>
            <div className={`Guide ${guide ? 'active' : 'hide'}`}>
                <ul className="Guide-list list list-stacked flex flex--column">
                    <li className="list__item"><Link className="Guide-item flex flex--align_center" to="/"><AiOutlineHome className="react-icon"/><span className="Guide-item-name list-item-name">Home</span></Link></li>
                    <li className="list__item"><Link className="Guide-item flex flex--align_center" to="/"><AiOutlineFire className="react-icon"/><span className="Guide-item-name list-item-name">Trending</span></Link></li>
                    <li className="list__item"><Link className="Guide-item flex flex--align_center" to="/"><AiOutlineSave className="react-icon"/><span className="Guide-item-name list-item-name">Saved</span></Link></li>
                    <li className="list__item"><Link className="Guide-item flex flex--align_center" to="/"><AiOutlineLike className="react-icon"/><span className="Guide-item-name list-item-name">Liked</span></Link></li>
                    <li className="list__item"><Link className="Guide-item flex flex--align_center" to="/"><MdPlaylistAddCheck className="react-icon"/><span className="Guide-item-name list-item-name">Playlist</span></Link></li>
                </ul>
            </div>
            <button onClick={toggleDisplay}>
                {
                    guide ? <AiOutlineMenuUnfold className="Guide-icon react-icon" /> :
                        <AiOutlineClose className="Guide-icon react-icon color-light" />
                }

            </button>

        </>
    )
}
