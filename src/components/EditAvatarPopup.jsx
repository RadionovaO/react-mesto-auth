import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
    const avatarRef = useRef();

    useEffect(() => {
       avatarRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    };

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            buttonText={isLoading? 'Обновление...' : 'Обновить аватар'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className='popup__input popup__input_type_link'
                type='url'
                name='link'
                placeholder='Ссылка на изображение'
                required
                ref={avatarRef}
                id='avatar__input'
            />
            <span className="popup__input-error" id="avatar__input-error"></span>
        </PopupWithForm>
    );
};

export default EditAvatarPopup;