import { Link } from 'react-router-dom';

export const NavMenu = () => {

    return (
        <>
            <div className="header">
                <div className="header__wrapper flex flex--justify_between flex--align_center">
                    <Link to="/" className="header__brand flex flex--align_center">
                        {/* <img className="header__brand__logo" src={process.env.PUBLIC_URL + "/assets/img/logo.svg"} alt="logo" /> */}
                        <span className="header__brand__title ">GEEKY <strong className="color-secondary">Talks</strong> </span>
                    </Link>
                    <nav className="header__nav flex flex--justify_between flex--align_center">
                        <div className="search-bar pos-rel">
                            <input className="search-bar__input" type="text" name="search"
                                // onChange = {(e) => storeDispatch(searchStore(e.target.value))}
                                placeholder="Search for videos" />
                            <i className="search-bar__icon bi bi-search"></i>
                        </div>
                        <ul className="header__list flex flex--justify_between flex--align_center">
                            <li><Link className="header__list__item" to="/">Home</Link></li>
                            <li><Link className="header__list__item" to="/videos">Videos</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>)
}
