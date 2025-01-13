import HeaderMini from "../../components/header/HeaderMini";
import Button from "../../components/buttons/Button";
import Input from "../../components/inputs/input/input";
import loginIcon from "./../../imgMFC/loginIcon.svg";
import "./LoginEmployee.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserService from "../../API/UserService";

const LoginEmployee = function () {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false); //состояние, чтобы определить были ли нажата кнопка
  const [response, setResponse] = useState(null); // ответ от сервера после отправки логина
  const navigate = useNavigate();
  const handleChangeLogin = (e) => {
    //выводит текст логина в инпут
    setLogin(e.target.value);
  };
  const handleChangePassword = (e) => {
    //выводит текст логина в инпут
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // запускает useEffect при клике
    setSubmitted(true);
    // navigate("/LeftPanel"); // переход на след этап
  };

  useEffect(() => {
    if (submitted) {
      // если submitted true, то вызывается функция sendLogin
      const sendLogin = async () => {
        try {
          const response = await UserService.login({
            snils: login,
            password: password,
          })

          // const result = await axios.post(config.apiUrl + "/api/v1/user/login", {
          //   snils: login,
          //   password: password,
          // });

          setResponse(response.data);
          if (response.success) {
            navigate("/LeftPanel"); // Переход на другой экран при успешном входе
          } else {
            alert("Неверный логин или пароль");
          }
        } catch (error) {
          console.error("Ошибка ввода:", error);
        } finally {
          setSubmitted(false); // Сбрасываем, чтобы отправить повторно
        }
      };

      sendLogin();
    }
  }, [submitted, login, password]);

  return (
    <div className="section">
      {/* className="section" применен flex для выравниван я по центру */}
      <div className="wrapperFirst">
        {/* wrapper - ограничивающий контейнер 382px */}
        <HeaderMini />
        <div className="container-loginEmployee">
          <img src={loginIcon} alt="loginIcon" />

          <div className="text-loginEmployee">ВХОД В УЧЕТНУЮ ЗАПИСЬ</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-loginEmployee">
            <Input
              value={login}
              onChange={handleChangeLogin}
              label={"СНИЛС"}
            ></Input>
            <Input
              type="password"
              value={password}
              onChange={handleChangePassword}
              label={"ПАРОЛЬ"}
            ></Input>{" "}
          </div>
          <Button type="submit">ВОЙТИ</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginEmployee;
