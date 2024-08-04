import React from 'react';
import './App.css';

export const validateInput = (input: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
};

const App: React.FC = () => {
    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        const usernameInput = form.elements.namedItem(
            'username'
        ) as HTMLInputElement | null;
        const passwordInput = form.elements.namedItem(
            'password'
        ) as HTMLInputElement | null;

        if (usernameInput && passwordInput) {
            const username = usernameInput.value;
            const password = passwordInput.value;

            if (username && password && validateInput(username)) {
                alert('Success');
            } else {
                alert('Invalid input');
            }
        }
    };

    return (
        <div className="login">
            <div className="login__title">Login</div>
            <form className="login_form" onSubmit={handleSubmit}>
                <div className="login_form__input">
                    <div className="login_form__item">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                        />
                    </div>
                </div>
                <div className="login_form__input">
                    <div className="login_form__item">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                        />
                    </div>
                </div>
                <button className="login_form__submit">Submit</button>
            </form>
        </div>
    );
};

export default App;
