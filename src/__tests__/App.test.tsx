import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import React, { act } from 'react';

describe('login', () => {
    beforeEach(() => {
        window.alert = jest.fn(); // Mock alert before each test
    });

    test('should show success alert on valid form submission', () => {
        render(<App />);
        const usernameInput = screen.getByRole('textbox', {
            name: /username/i,
        });
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', { name: /submit/i });

        act(() => {
            fireEvent.change(usernameInput, {
                target: { value: 'text@test.com' },
            });
            fireEvent.change(passwordInput, { target: { value: 'password' } });
            fireEvent.click(submitButton);
        });
        expect(window.alert).toHaveBeenCalledWith('Success');
    });

    test('should show invalid input alert on invalid form submission', () => {
        render(<App />);
        const usernameInput = screen.getByRole('textbox', {
            name: /username/i,
        });
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', { name: /submit/i });
        act(() => {
            fireEvent.change(usernameInput, {
                target: { value: 'invalid-email' },
            });
            fireEvent.change(passwordInput, { target: { value: 'password' } });
            fireEvent.click(submitButton);
        });
        expect(window.alert).toHaveBeenCalledWith('Invalid input');
    });
});
