import { Link } from 'react-router-dom';

function InitialHeader({linkTo, titleLink}) {

    return(
        <header className="header">
            <div className="logo"></div>
            <Link className='link' to={linkTo}>
                {titleLink}
            </Link>
        </header>
    )
}

export default InitialHeader;