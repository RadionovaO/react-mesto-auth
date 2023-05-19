import React from 'react';

function PopupWithForm(props) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_active' : ''}`}>
            <div className="popup__block">
                <button className="popup__close"
                    type="button"
                    onClick={props.onClose}
                    >
                    </button>
                <h2 className="popup__title">{props.title}</h2>
                <form
                    className={`popup__form popup__form-${props.name}`}
                    name={props.name}
                    noValidate
                    onSubmit={props.onSubmit}
                >
                    {props.children}
                    <button
                        className="popup__save popup__save_disabled"
                        type="submit"
                    >{`${props.buttonText || 'Сохранить'}`}</button>
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;