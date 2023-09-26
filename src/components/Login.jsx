import { useState } from 'react';
import * as auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import fail from '../images/fail.svg';

function Login({handleLogin, setInfoTooltipOpen, setInfoTooltipData, setUserEmail}){
    
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formValues;

    const navigate = useNavigate();

    const handleChange = (evt) => {
        const { name, value } = evt.target;

        setFormValues({
            ...formValues,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

      auth
        .authorize(email, password)
        .then((res) => {
            if (res.token) {
                localStorage.setItem('token', res.token);
                setUserEmail(email);
                setFormValues({
                    email: '',
                    password: '',
                });
                handleLogin();
                navigate('/', { replace: true });
            }
        })
        .catch((err) => {
            setInfoTooltipOpen(true);
            setInfoTooltipData({
                src: fail,
                alt: 'Ошибка аутентификаии',
                title: 'Что-то пошло не так! Попробуйте еще раз.',
            });
            console.error(`${err} ${err.message}`);
        })
    }

    return (
      <section className="auth">
      <div className="auth__container">
        <h2 className="auth__title">Вход</h2>
        <form name="authForm" className="form form_type_auth" onSubmit={handleSubmit}>
          <input id="email-input" name="email" type="email" className="form__input form__input_el_auth" placeholder="Email" maxLength="40" required onChange={handleChange}/>
          <span className="form__input-error place-input-error"></span>
          <input id="password-input" name='password' type="password" className="form__input form__input_el_auth" placeholder="Пароль" minLength="2" required onChange={handleChange}/>
          <span className="form__input-error place-input-error"></span>
          <button type="submit" className="form__submit-button form__submit-button_type_auth">Войти</button>
        </form>
      </div>
    </section>
    );
}

export default Login;