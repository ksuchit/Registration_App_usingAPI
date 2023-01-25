import { render,screen, within  } from "@testing-library/react"
import SeeMore from "../Shopping/Cart/SeeMore"
import "@testing-library/jest-dom";

describe('see more', () => {
    it('see more details',()=>{
        render(<SeeMore />)
        const htmlEle=within(screen.getByTestId('product'))
        // screen.debug();
        expect(htmlEle('Products')).toBeInTheDocument();
    })
})