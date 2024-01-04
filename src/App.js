import { useRef, useState } from "react";
import styles from "./App.module.css";

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [passwordCheckError, setPasswordCheckError] = useState(null);

    const submitButtonRef = useRef(null);

    const onEmailChange = ({ target }) => {
        setEmail(target.value);
        let loginError = null;
        if (
            !/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/.test(
                target.value
            ) &&
            target.value
        ) {
            loginError = "Неверный Email.";
        }
        setEmailError(loginError);
        console.log(target.value);
    };

    const onPasswordChange = ({ target }) => {
        if (target.value === "") {
            setPasswordError(null);
        }
        setPassword(target.value);
        let passwordError = null;
        if (!/[0-9a-zA-Z!@#$%^&*]/g.test(target.value)) {
            passwordError = "Недопустимые символы";
        } else if (target.value.length < 6) {
            passwordError = "Слишком короткий пароль";
        }
        setPasswordError(passwordError);
        console.log(target.value);
    };

    const onBlur = () => {
        if (passwordCheck !== password) {
            setPasswordCheckError("Пароли не совпадают");
        } else if (passwordCheck === password) {
            setPasswordCheckError(null);
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        console.log({ email, password, passwordCheck });
    };

    // const isValid = emailError && passwordError && passwordCheckError;

    if (password === passwordCheck && password !== "") {
        submitButtonRef.current.focus();
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={onSubmit}>
                {emailError && (
                    <div className={styles.errorLabel}>{emailError}</div>
                )}
                <div className={styles.errorLabel}>{passwordError}</div>
                <div className={styles.errorLabel}>{passwordCheckError}</div>
                <input
                    className={styles.input}
                    type="email"
                    value={email}
                    placeholder="email"
                    onChange={onEmailChange}
                />
                <input
                    className={styles.input}
                    type="password"
                    value={password}
                    placeholder="Пароль"
                    onChange={onPasswordChange}
                />
                <input
                    className={styles.input}
                    type="password"
                    value={passwordCheck}
                    placeholder="Введите пароль повторно"
                    onChange={({ target }) => setPasswordCheck(target.value)}
                    onBlur={onBlur}
                />
                <button
                    type="submit"
                    disabled={
                        emailError ||
                        passwordError ||
                        passwordCheckError !== null
                    }
                    ref={submitButtonRef}
                >
                    Зарегистироваться
                </button>
            </form>
        </div>
    );
}

export default App;
