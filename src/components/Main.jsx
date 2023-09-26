import { useContext } from "react"
import Card from './Card.jsx'
import { CurrentUserContext } from '../contexts/CurrentUserContext'


function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, cards, onCardDelete}) {

    const currentUser = useContext(CurrentUserContext);


    const listItems = cards.map((card) => {
        return(
                <Card 
                    card={card}
                    likes={card.likes.length}
                    link={card.link}
                    name={card.name}
                    key={card._id}
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}
                />
        )
    })

    
    return(
        <main>
            <section className="profile">
                <button type="button" className="profile__avatar-button" onClick={onEditAvatar}><img src={currentUser.avatar} alt="фото профиля" className="avatar"/>
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                {listItems}
            </section>
    </main>
    )
}

export default Main