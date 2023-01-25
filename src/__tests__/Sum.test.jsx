import { render, screen } from "@testing-library/react"
import Sum from "../components/Sum"
import '@testing-library/jest-dom'

describe('sum', () => {
    render(<Sum />)
    // screen.debug();
})