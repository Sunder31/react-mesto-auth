import { useContext } from "react"
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Card(props){

    const currentUser = useContext(CurrentUserContext)

    const isLiked = props.card.likes.some(i => i._id === currentUser._id)

    const cardLikeButtonClassName = `element__like-button ${isLiked ? 'element__like-button_active' : ''}`

    const isOwn = props.card.owner._id === currentUser._id

    const handleClick = () => {
        props.onCardClick(props.card);
    };

    const handleLikeClick = () => {
        props.onCardLike(props.card);
    }

    const handleDeleteClick = () => {
        props.onCardDelete(props.card)
    }

    return(
        <div className="element">
            {isOwn &&  <button type="button" className="element__delete-button" onClick={handleDeleteClick}></button>}
            <img src={props.link} alt={props.name} className="element__picture" onClick={handleClick}/>
            <div className="element__info">
                <h2 className="element__name">{props.name}</h2>
                <div className="element__likes">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <span className="element__like-counter">{props.likes}</span>
                </div>
            </div>
        </div>
    )
}

export default Card