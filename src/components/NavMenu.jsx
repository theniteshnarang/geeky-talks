import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authLogout } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
export const NavMenu = () => {
    const { token, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
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
                        <ul className=" flex header__list flex--align_center">
                            <li>
                                <Link to="/login" className="color-light">
                                    <ul>
                                        Hey, {token ? user.name : "Sign In"}
                                    </ul>
                                </Link>
                            </li>
                            {
                                token && (
                                    <li>
                                        <button onClick={() => dispatch(authLogout())} className="btn btn-secondary">
                                            Logout
                                        </button>
                                    </li>
                                )
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </>)
}
