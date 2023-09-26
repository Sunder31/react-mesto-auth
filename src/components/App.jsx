import { useEffect, useState } from 'react'
import '../index.css'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import {api} from '../utils/api.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import Login from './Login';
import InfoTooltip from './InfoToolTip'
import Register from './Register';

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isImagePopupOpen, setImagePopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null)
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([])
    const [loggedIn, setLoggedIn] = useState(false);
    const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [infoTooltipData, setInfoTooltipData] = useState({
      src: '',
      alt: '',
      title: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token){
            auth.checkToken(token)
                .then((res) => {
                    if(res){
                        setUserEmail(res.data.email)
                        setLoggedIn(true)
                        navigate('/', {replace: true})
                    }
                })
                .catch((err) => {
                    console.error(`${err} ${err.message}`)
                })
        }
    }, [])

    useEffect(() => {
        if(loggedIn) {
            api.getInitialData()
                .then((result) => {
                    const [initialUserInfo, initialCards] = result;

                    setCurrentUser(initialUserInfo);
                    setCards(initialCards);
                })
                .catch((err) => {
                    console.error(`${err} ${err.message}`)
                })
        }
    }, [loggedIn])
    
    const handleLogin = () => {
        setLoggedIn(true)
    }

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true)
    }
    
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true)
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true)
    }

    const handleCardClick = (card) => {
        setSelectedCard(card)
        setImagePopupOpen(true)
    }

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setImagePopupOpen(false)
        setInfoTooltipOpen(false)
    }

    const handleUpdateUser = (newUserInfo) => {
        api.editUserInfo(newUserInfo)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups()
            })
            .catch((err) => console.error(`${err} ${err.message}`));
    }

    const handleAvatarUpdate = (newAvatar) => {
        api.changeAvatar(newAvatar.avatar)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups()
            })
            .catch((err) => console.error(`${err} ${err.message}`));
    }

    const handleAddPlaceSubmit = (Card) =>{
        api.addNewCard(Card)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch((err) => console.error(`${err} ${err.message}`));
    }

    const handleCardLike = (card) => {
        const isLiked = card.likes.some((item) => item._id === currentUser._id);
        
        api.changeLikeCardStatus(card._id, !isLiked)
          .then((newCard) => {
            setCards((state) =>
              state.map((c) => (c._id === card._id ? newCard : c))
            );
          })
          .catch((err) => console.error(`${err} ${err.message}`));
    };

    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((item) => item._id !== card._id))
            })
            .catch((err) => console.error(`${err} ${err.message}`))
    }

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header userData={userEmail} setLoggedIn={setLoggedIn} />
                <Routes>
                    <Route path='/' element={
                        <ProtectedRoute element={
                            <Main 
                                onEditAvatar={handleEditAvatarClick}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                                cards={cards}
                            />
                        }
                        loggedIn={loggedIn}
                        />
                    }
                    />
                    <Route path='/signup' element={
                        <Register 
                            setInfoTooltipData={setInfoTooltipData}
                            setInfoTooltipOpen={setInfoTooltipOpen}
                        />
                    }
                    />
                    <Route path='/signin' element={
                        <Login
                            handleLogin={handleLogin}
                            setInfoTooltipData={setInfoTooltipData}
                            setInfoTooltipOpen={setInfoTooltipOpen}
                            setUserEmail={setUserEmail}
                        />
                    }
                    />
                    <Route path='*' element={
                        loggedIn ? (
                            <Navigate to='/' replace />
                        ) : (<Navigate to='/signin' replace />)
                    }
                    />
                </Routes>
                <EditProfilePopup 
                    isOpen={isEditProfilePopupOpen} 
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <AddPlacePopup 
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleAvatarUpdate}
                />
                <ImagePopup 
                    card={selectedCard}
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups}
                />
                <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    data={infoTooltipData}
                />
                <Footer />
            </CurrentUserContext.Provider>
        </div>
    )
}

export default App
