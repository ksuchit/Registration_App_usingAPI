import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addAllSellerProducts } from "../../../Shopping/redux/actions/Seller-Products";
import { getProducts } from "../../services/Http-Service"

export default function Pagination(props)
{
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.totalResults) {
            getProducts(`/products?limit=${props.totalResults}`)
                .then((response) => {
                    console.log(response)
                    dispatch(addAllSellerProducts(response.data.results))
                })
                .catch((error) => {
                console.log(error)
            })
        }
                
    },[])

    return (
        <div className="my-2 d-flex justify-content-center">
            {props.pageNum === 1 ? "" :
                <button onClick={() => props.setPageNum((prev) => prev - 1)}
                    className='btn btn-secondary'                
                >Previous</button>
            }
            {
                props.pageNum <= props.totalPages - 3 ?
                    <div className='fw-bolder mx-2 d-flex align-items-center'>
                        <div><button className="btn btn-primary" onClick={()=>props.setPageNum(props.pageNum)} style={{border:'none'}}>{props.pageNum}</button></div>
                        <div className="mx-1"><button onClick={()=>props.setPageNum(props.pageNum+1)} style={{border:'none'}}>{props.pageNum + 1}</button></div>
                        <div className="mx-1"><button onClick={()=>props.setPageNum(props.pageNum+2)} style={{border:'none'}}>{props.pageNum + 2}</button></div>
                        <div className="mx-1"><button onClick={()=>props.setPageNum(props.pageNum)} style={{border:'none'}}>...</button></div>
                        <div><button onClick={()=>props.setPageNum(props.totalPages)} style={{border:'none'}}>{props.totalPages}</button></div>
                    </div>
                :
                    <div className='fw-bolder mx-2 d-flex align-items-center'>
                        <div><button className={props.totalPages - 2 === props.pageNum ? "btn btn-primary" : ""} onClick={() => props.setPageNum(props.totalPages - 2)} style={{ border: 'none' }}>{props.totalPages - 2}</button></div>
                        <div className="mx-1"><button className={props.totalPages - 1 === props.pageNum ? 'btn btn-primary' : ""} onClick={()=>props.setPageNum(props.totalPages - 1)} style={{ border: 'none' }}>{props.totalPages - 1}</button></div>
                        <div><button className={props.totalPages === props.pageNum ? 'btn btn-primary' : ""} onClick={()=>props.setPageNum(props.totalPages)} style={{border:'none'}}>{props.totalPages}</button></div>
                    </div>
            }
            { props.totalPages!==props.pageNum && props.totalPages!==0? 
                <button onClick={() => props.setPageNum((prev) => prev + 1)}
                    className='btn btn-secondary'
                >Next</button>
            : ""
            }
        </div>
    )
}