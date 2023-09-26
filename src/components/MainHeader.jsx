import { Link, useNavigate } from 'react-router-dom';

function MainHeader({userData, setLoggedIn}) {

    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        navigate('/signin', { replace: true });
      }

    return (
        <header className="header">
            <div className="logo"></div>
            <div className="header__data">
                <p className="header__user-info">{userData}</p>
                <Link className='link' onClick={handleSignOut}>Выйти</Link>
            </div>
        </header>
    );
}

export default MainHeader;