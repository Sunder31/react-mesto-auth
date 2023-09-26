import PopupWithForm from "./PopupWithForm"
import { useState, useEffect } from "react";

function AddPlacePopup({isOpen, onClose, onAddPlace}){

    const [name, setName] = useState('')
    const [link, setLink] = useState('')

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeLink = (e) => {
        setLink(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        onAddPlace({
            imageName: name,
            imageLink: link,
        })
    }

    useEffect(() => {
        setName('')
        setLink('')
    }, [isOpen])

    return(
        <PopupWithForm 
            name='popup_add-element'
            formName='addElementForm'
            title='Новое место'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText='Создать'
             >
                <input id="place-input" name="imageName" type="text" className="form__input form__input_place-name" placeholder="Название" minLength="2" maxLength="20" onChange={handleChangeName} value={name} required/>
                <span className="form__input-error place-input-error"></span>
                <input id="image-link-input" name="imageLink" type="url" className="form__input form__input_image-link" placeholder="Ссылка на картинку" onChange={handleChangeLink} value={link} required/>
                <span className="form__input-error image-link-input-error"></span>
       </PopupWithForm>
    )
}

export default AddPlacePopup