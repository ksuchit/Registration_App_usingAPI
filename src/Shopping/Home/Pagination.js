import { useEffect } from "react";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addAllProducts } from "../redux/actions/All-Products";
import Get from "../services/Http-Service";

export default function Pagination(props) {
    const [pageList, setPageList] = useState(false)
    const optionValue = Math.floor(props.totalPages / 5);
    const dispatch=useDispatch();
    const state = useSelector((state) => state) || JSON.stringify(localStorage.getItem('store'));
    // console.log(optionValue , 'grgrgrgrdg')
    const options = [
        { value: '', label: 'select'},
        { value: 1, label: `1-${optionValue} `},
        { value: optionValue, label: `${optionValue}-${2*optionValue}` },
        { value: (2*optionValue), label: `${2*optionValue}-${3*optionValue}` },
        { value: (3*optionValue), label: `${3*optionValue}-${4*optionValue}` },
        { value: (4*optionValue), label: `${4*optionValue}-${5*optionValue}` },
    ]
    
    useEffect(()=>{
        console.log(props.totalResults)
        
        props.totalResults && ( 
        Get(`/shop/products?&limit=${props.totalResults}`)
        .then((response) => {
          console.log(response);
          if(state.allProductsReducer.allProducts[0]?._id===response.data.results[0]?._id)
          console.log('same data')
          else
          dispatch(addAllProducts(response.data.results))
        })
        .catch((error) => {
          console.log(error);
        })
        )
    },[])

    return (
        <div className="d-flex justify-content-center" style={{marginTop:'2%'}}>
            {props.pageNum === 1 ? "" :
                <button onClick={() => props.setPageNum((prev) => prev - 1)}
                    className='btn btn-secondary'                
                >Previous</button>
            }
            {
                props.pageNum <= props.totalPages - 3 ?
                    <div className='fw-bolder mx-2 d-flex align-items-center'>
                        <div><button className="btn btn-primary" onClick={()=>props.setPageNum(props.pageNum)} >{props.pageNum}</button></div>
                        <div><button className="mx-1 btn btn-light" onClick={()=>props.setPageNum(props.pageNum+1)} >{props.pageNum + 1}</button></div>
                        <div><button className="mx-1 btn btn-light" onClick={()=>props.setPageNum(props.pageNum+2)} >{props.pageNum + 2}</button></div>
                        {
                            pageList ? "": <div><button className="mx-1 btn btn-light" onClick={()=>setPageList((prev)=>!prev)} >...</button></div>
                        }
                        
                        {pageList &&
                            <select onChange={(e) => {
                                props.setPageNum(parseInt(e.target.value))
                                setPageList(false)
                            }} className="form-select">
                                {
                                    options.map((item,i) => {
                                        return <option value={item.value}>{item.label}</option>
                                    })
                               }
                            </select>  
                            }   
                        <div><button className="mx-1 btn btn-light" onClick={()=>props.setPageNum(props.totalPages)} >{props.totalPages}</button></div>
                    </div>
                :
                    <div className='fw-bolder mx-2 d-flex align-items-center'>
                        <div><button className={props.totalPages - 2 === props.pageNum ? "btn btn-primary" : ""} onClick={() => props.setPageNum(props.totalPages - 2)} style={{ border: 'none' }}>{props.totalPages - 2}</button></div>
                        <div className="mx-1"><button className={props.totalPages - 1 === props.pageNum ? 'btn btn-primary' : ""} onClick={()=>props.setPageNum(props.totalPages - 1)} style={{ border: 'none' }}>{props.totalPages - 1}</button></div>
                        <div><button className={props.totalPages === props.pageNum ? 'btn btn-primary' : ""} onClick={()=>props.setPageNum(props.totalPages)} style={{border:'none'}}>{props.totalPages}</button></div>
                    </div>
            }
            {/* <p className='fw-bolder mx-2'>{ }{props.totalPages}</p> */}
            { props.totalPages!==props.pageNum && props.totalPages!==0? 
                <button onClick={() => props.setPageNum((prev) => prev + 1)}
                    className='btn btn-secondary'
                >Next</button>
            : ""
            }
        </div>
    )
}