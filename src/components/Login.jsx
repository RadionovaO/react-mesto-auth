import React, {useState} from "react";
import { Link } from "react-router-dom";

function Login({}) {
    const [values,setValues] = useState({});

    function handleSubmit(evt) {
        evt.preventDefault();
        
    };

        function handleChange(evt) {
            setValues({ ...values, [evt.target.name]: evt.target.value });
        };

    return (
        <div className="autorization">
            <h2 className="autorization__title">Вход</h2>
            <form className="autorization__form" >
                <input
                    className="autorization__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                />
                <input
                    className="autorization__input"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    required
                    onChange={handleChange}
                />
                <button
                    className="autorization__button-save"
                    type="submit">Войти</button>
                
                <Link className="autorization__link" to="/sign-up">Нет аккаунта? Зарегистрируйтесь</Link>
            </form>
        </div>
    );
};

export default Login;