function PopupWithForm(props) {

    return(
        <section className={`popup ${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={props.onClose}></button>
                <form className="form" name={`${props.formName}`} onSubmit={props.onSubmit} noValidate>
                    <h2 className="form__title">{props.title}</h2>
                        {props.children}
                    <button type="submit" className="popup__submit-button">{props.buttonText}</button>
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm