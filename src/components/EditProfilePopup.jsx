import React, {useContext, useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading, onClickOverlay }) {
    const currentUser = useContext(CurrentUserContext);

    const [values, setValues] = useState({});

    useEffect(() => {
        setValues({ name: currentUser.name, about: currentUser.about })
    }, [currentUser, isOpen])
 
    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateUser({
            name: values.name,
            about: values.about,
        });
    };

    function handleChange(evt) {
        setValues({ ...values, [evt.target.name]: evt.target.value });
    };

    return (
        <PopupWithForm
                name='edit'
                title='Редактировать профиль'
                buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
                isOpen={isOpen}
                onClose={onClose} 
                onSubmit={handleSubmit}
                >
                <input
                    className='popup__input popup__input_type_name'
                    type='text'
                    name='name'
                    placeholder='Имя'
                    minLength='2'
                    maxLength='40'
                    required
                    id='name__input'
                    value={values.name ?? ''}
                    onChange={handleChange}
                />
                <span className='popup__input-error' id='name__input-error'></span>
                <input
                    className='popup__input popup__input_type_work'
                    type='text'
                    name='about'
                    placeholder='Род деятельности'
                    required
                    minLength='2'
                    maxLength='200'
                    id='about__input'
                    value={values.about ?? ''}
                    onChange={handleChange}
                />
                <span className='popup__input-error' id='about__input-error'></span>
            </PopupWithForm>   
    )
};

export default EditProfilePopup;