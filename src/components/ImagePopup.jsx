function ImagePopup({card, isOpen, onClose}) {


    return(
        <section className={`popup popup_image-view ${isOpen && 'popup_opened'}`}>
            <div className="popup__image-container">
                <button type="button" className="popup__close-button" onClick={onClose}></button>
                <img src={card ? card.link : '#'} alt={card ? card.name : '#'} className="popup__image"/>
                <p className="popup__image-subtitle">{card ? card.name : '#'}</p>
            </div>
        </section>
    )
}

export default ImagePopup