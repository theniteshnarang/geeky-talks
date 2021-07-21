import { useState } from 'react'
import { AiOutlineHome, AiOutlineSave, AiOutlineLike, AiOutlineMenuUnfold, AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
export const Guide = () => {
    const [guide, setGuide] = useState(true)
    function toggleDisplay() {
        return setGuide(guide => !guide)
    }
    return (
        <>
            <div className={`Guide ${guide ? 'show' : 'hide'}`}>
                <ul className="Guide-list list list-stacked flex flex--column">
                    <li className="search-bar pos-rel hide">
                        <input className="search-bar__input" type="text" name="search"
                            // onChange = {(e) => storeDispatch(searchStore(e.target.value))}
                            placeholder="Search for videos" />
                        <i className="search-bar__icon bi bi-search"></i>
                    </li>
                    <li className="list__item"><Link className="Guide-item flex flex--align_center" to="/"><AiOutlineHome className="react-icon" /><span className="Guide-item-name list-item-name">Home</span></Link></li>
                    {/* <li className="list__item"><Link className="Guide-item flex flex--align_center" to="/"><AiOutlineFire className="react-icon" /><span className="Guide-item-name list-item-name">Trending</span></Link></li> */}
                    <li className="list__item"><Link className="Guide-item flex flex--align_center" to="/save"><AiOutlineSave className="react-icon" /><span className="Guide-item-name list-item-name">Saved</span></Link></li>
                    <li className="list__item"><Link className="Guide-item flex flex--align_center" to="/like"><AiOutlineLike className="react-icon" /><span className="Guide-item-name list-item-name">Liked</span></Link></li>
                </ul>
            </div>
            <button onClick={toggleDisplay}>
                {
                    guide ? <AiOutlineMenuUnfold className="Guide-icon" /> :
                        <AiOutlineClose className="Guide-icon" />
                }
            </button>

        </>
    )
}
