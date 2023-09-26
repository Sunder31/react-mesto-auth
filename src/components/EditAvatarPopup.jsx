import PopupWithForm from "./PopupWithForm"
import { useEffect, useRef } from "react";


function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}){
    
    const inputRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        
        onUpdateAvatar({
            avatar: inputRef.current.value
        })
    }

    useEffect(() => {
        inputRef.current.value = '';
      }, [isOpen]);

    return (
        <PopupWithForm 
            name='popup_change-avatar'
            formName='changeAvatar'
            title='Обновить аватар'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText='Обновить'
          >
              <input id="avatar-input" name="avatar" type="url" className="form__input form__input_image-link" placeholder="Ссылка на картинку" ref={inputRef} required/>
              <span className="form__input-error avatar-input-error "></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup