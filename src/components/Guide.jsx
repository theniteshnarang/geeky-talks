import React from 'react'
import {AiOutlineHome, AiOutlineFire, AiOutlineSave,AiOutlineLike} from 'react-icons/ai'
import {MdPlaylistAddCheck} from 'react-icons/md'
export const Guide = () => {
    return (
        <div className="Guide">
            <ul className="Guide-list list list-stacked flex flex--column">
                <li className="Guide-item list__item flex flex--align_center"><AiOutlineHome className="react-icon"/><span className="Guide-item-name list-item-name">Home</span></li>
                <li className="Guide-item list__item flex flex--align_center"><AiOutlineFire className="react-icon"/><span className="Guide-item-name list-item-name">Trending</span></li>
                <li className="Guide-item list__item flex flex--align_center"><AiOutlineSave className="react-icon"/><span className="Guide-item-name list-item-name">Saved</span></li>
                <li className="Guide-item list__item flex flex--align_center"><AiOutlineLike className="react-icon"/><span className="Guide-item-name list-item-name">Liked</span></li>
                <li className="Guide-item list__item flex flex--align_center"><MdPlaylistAddCheck className="react-icon"/><span className="Guide-item-name list-item-name">Playlist</span></li>
            </ul>
        </div>
    )
}
