function InfoTooltip({ isOpen, onClose, data}) {
    const {src, alt, title} = data;

    return (
        <section className={`popup ${isOpen ? `popup_opened` : ''} `}>
          <div className="popup__container">
            <button
                className="popup__close-button"
                type="button"
                onClick={onClose}
            />
            <img src={src} alt={alt} className="popup__auth-image" />
            <h2 className="popup__title popup__title_auth">{title}</h2>
          </div>
        </section>
    );
}

export default InfoTooltip;