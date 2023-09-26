import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as auth from '../utils/auth';
import success from '../images/success.svg';
import fail from '../images/fail.svg';

function Register({ setInfoTooltipOpen, setInfoTooltipData }) {

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { email, password } = formValues;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    auth
      .register(email, password)
      .then((res) => {
        console.log(res)
        setFormValues({
          email: '',
          password: '',
        });
        setInfoTooltipOpen(true);
        setInfoTooltipData({
          src: success,
          alt: 'Аутентификация прошла успешно',
          title: 'Вы успешно зарегистрировались!',
        });
        navigate('/signin', { replace: true });
      })
      .catch((err) => {
        setInfoTooltipOpen(true);
        setInfoTooltipData({
          src: fail,
          alt: 'Ошибка аутентификации',
          title: 'Что-то пошло не так! Попробуйте еще раз.',
        });
        console.error(`${err} ${err.message}`);
      })
  };

  return (
    <section className="auth">
      <div className="auth__container">
        <h2 className="auth__title">Регистрация</h2>
        <form name="authForm" className="form form_type_auth" onSubmit={handleSubmit}>
          <input id="email-input" name="email" type="email" className="form__input form__input_el_auth" placeholder="Email" maxLength="40" required onChange={handleChange}/>
          <span className="form__input-error place-input-error"></span>
          <input id="password-input" name='password' type="password" className="form__input form__input_el_auth" placeholder="Пароль" minLength="2" required onChange={handleChange}/>
          <span className="form__input-error place-input-error"></span>
          <button type="submit" className="form__submit-button form__submit-button_type_auth">Зарегистрироваться</button>
          <p className="auth__text">Уже зарегестрированы? <Link className="link link_place_register" to="/signin">Войти</Link></p>
        </form>
      </div>
    </section>
  );
}

export default Register;