import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authLogout, selectAuth } from '../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { querySearch } from '../features/videos/videoSlice'
import { debounce } from 'lodash'

export const NavMenu = () => {
    const { token, user } = useSelector(selectAuth)
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const searchInput = (e) => {
        dispatch(querySearch({ query: e.target.value }))
    }

    const debounced = debounce(searchInput, 300)

    return (
        <>
            <div className="header">
                <div className="header__wrapper flex flex--justify_between flex--align_center">
                    <Link to="/" className="header__brand">
                        <span className="header__brand__title ">
                            GEEKY{' '}
                            <strong className="color-secondary">Talks</strong>{' '}
                        </span>
                    </Link>
                    <nav className="header__nav flex flex--justify_between flex--align_center">
                        <div className="search-bar pos-rel show">
                            {pathname === '/' && (
                                <>
                                    <input
                                        className="search-bar__input"
                                        type="text"
                                        name="search"
                                        onChange={(e) => debounced(e)}
                                        placeholder="Search for videos"
                                    />
                                    <i className="search-bar__icon bi bi-search"></i>
                                </>
                            )}
                        </div>
                        <ul className="flex header__list flex--align_center">
                            <li>
                                <Link to="/login" className="color-light">
                                    Hey, &nbsp;
                                    {token ? user.name : 'Guest'}
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => dispatch(authLogout())}
                                    className="btn btn-secondary ml-1"
                                >
                                    {token ? 'Logout' : 'Sign In'}
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}
