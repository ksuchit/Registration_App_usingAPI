import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Login from '../Shopping/Auth/Login'

describe('Test the login Components', () => {
    // test("render the login form with 1 buttons", async () => {
    //     render(<Login />)
    //     const buttonList = await screen.find;
    //     console.log(buttonList)
    //     expect(buttonList).toHaveLength(1);
    // });

    test('email input field should accept email', () => {
        render(<Login />)
        const email = screen.getByPlaceholderText('Enter Email');
        userEvent.type(email, "dipesh");
        expect(email.value).not.toMatch('dipesh@gmail.com');
    })
})