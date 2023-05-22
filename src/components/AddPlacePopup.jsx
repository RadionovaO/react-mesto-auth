import React, {useState} from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

    const [values, setValues] = useState({});

    function handleSubmit(evt) {
        evt.preventDefault();

        onAddPlace({
            name: values.name,
            link: values.link
        });
    };

    function handleChange(evt) {
        setValues({ ...values, [evt.target.name]: evt.target.value });
    };

    return (
        <PopupWithForm
            name='add'
            title='Новое место'
            buttonText={isLoading? 'Создание...' : 'Создать'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className='popup__input popup__input_type_title'
                type='text'
                name='name'
                placeholder='Название'
                minLength='2'
                maxLength='30'
                required
                //id='name__input'
                value={values.name ?? ''}
                onChange={handleChange}
            />
            <span className='popup__input-error' id='name__input-error'></span>
            <input
                className='popup__input popup__input_type_link'
                type='url'
                name='link'
                placeholder='Ссылка на картинку'
                required
               // id='link__input'
                value={values.link ?? ''}
                onChange={handleChange}
            />
            <span className='popup__input-error' id='link__input-error'></span>
        </PopupWithForm>
    );
};

export default AddPlacePopup;