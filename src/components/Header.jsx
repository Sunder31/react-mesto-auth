import { Route, Routes } from 'react-router-dom';
import MainHeader from './MainHeader';
import InitialHeader from './InitialHeader';

function Header({userData, setLoggedIn}) {

    return(
        <Routes>
            <Route path='/signin' element={<InitialHeader linkTo='/signup' titleLink='Регистрация'/>}/>
            <Route path='/signup' element={<InitialHeader linkTo='/signin' titleLink='Войти'/>}/>
            <Route path='/' element={<MainHeader userData={userData} setLoggedIn={setLoggedIn}/>}/>
        </Routes>
    )
}

export default Header