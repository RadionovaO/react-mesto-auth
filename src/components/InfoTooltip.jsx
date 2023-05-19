import React from "react";
import imageOk from "../images/Ok.png";
import imageError from "../images/Error.png";

function InfoTooltip() {
    return (
        <div className={`popup popup__tooltip &{isOpen ? "popup_active" : ""}`}>
            <div className="popup__block">
                <div className="popup__status">
                    {tooltopImage === "Ok" && (<img src={imageOk} alt="Все Ок" />)}
                    {tooltopImage === "Error" && (<img src={imageError} alt="Что-то не так" />)}
                </div>
                <p className="popup__tooltip_title">{title}</p>
                <button className="popup__close"
                    type="button"
                    onClick={onClose}
                />
            </div>
        </div>
    );
};

export default InfoTooltip;
