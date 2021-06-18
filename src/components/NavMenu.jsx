import { Link } from 'react-router-dom';
import {AiOutlineLogin,AiOutlineLogout} from 'react-icons/ai'
export const NavMenu = () => {

    return (
        <>
            <div className="header">
                <div className="header__wrapper flex flex--justify_between flex--align_center">
                    <Link to="/" className="header__brand">
                        <span className="header__brand__title ">GEEKY <strong className="color-secondary">Talks</strong> </span>
                    </Link>
                    <nav className="header__nav flex flex--justify_between flex--align_center">
                        <div className="search-bar pos-rel show">
                            <input className="search-bar__input" type="text" name="search"
                                // onChange = {(e) => storeDispatch(searchStore(e.target.value))}
                                placeholder="Search for videos" />
                            <i className="search-bar__icon bi bi-search"></i>
                        </div>
                        <ul className="header__list flex flex--justify_between flex--align_center">
                            <li><Link className="header__list__item" to="/videos">Videos</Link></li>
                            <li><Link to="/register/login"><AiOutlineLogin className="header__list__item react-icon"/></Link></li>
                            <li><AiOutlineLogout className="react-icon header__list__item"/></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>)
}
