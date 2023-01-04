import { useSearchParams } from "react-router-dom"

export default function Buy(){
    const [searchParams,]=useSearchParams();
    console.log(searchParams.get('id'));
    return(
        <div>Buy</div>
    )
}