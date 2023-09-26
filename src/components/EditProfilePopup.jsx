import PopupWithForm from "./PopupWithForm";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const currentUser = useContext(CurrentUserContext)

    useEffect(() => {
        setName(currentUser.name)
        setDescription(currentUser.about)
    }, [currentUser, isOpen])

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        onUpdateUser({
            username: name,
            userabout: description,
        })
    }

    return(
        <PopupWithForm 
            name='popup_edit-profile'
            formName='editProfileForm'
            title='Редактировать профиль'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText='Сохранить'
         >
                <input id="name-input" name="username" type="text" className="form__input form__input_el_name" placeholder="Имя" minLength="2" maxLength="40" required onChange={handleChangeName} value={name || ''}/>
                <span className="form__input-error name-input-error"></span>
                <input id="about-input" name='userabout' type="text" className="form__input form__input_el_about" placeholder="Вид деятельности" minLength="2" maxLength="200" onChange={handleChangeDescription} required value={description || ''}/>
                <span className="form__input-error about-input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup