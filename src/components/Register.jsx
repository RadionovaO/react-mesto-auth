import React, {useState} from "react";
import { Link } from "react-router-dom";

function Register({ onRegisterSubmit }) {

    const [values, setValues] = useState({
        password: '',
        email: '',
    });

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegisterSubmit(values.password, values.email);
    };
  
    function handleChange(evt) {
        setValues({ ...values, [evt.target.name]: evt.target.value });
    };

    return (
        <div className="autorization">
            <h2 className="autorization__title">Регистрация</h2>
            <form className="autorization__form" onSubmit={handleSubmit}>
                <input
                    className="autorization__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                    id="email"
                />
                <input
                    className="autorization__input"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    required
                    onChange={handleChange}
                    id="password"
                />
                <button
                    className="autorization__button-save"
                    type="submit">
                    Зарегистрироваться
                </button>
                <Link className="autorization__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
            </form>
        </div>
    );
};

export default Register;