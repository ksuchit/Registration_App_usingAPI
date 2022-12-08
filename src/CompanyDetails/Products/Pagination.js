import { useState } from "react";
import { useEffect } from "react"
import { getProducts } from "../../Services/HttpService";


export default function Pagination(props) {

    const[nextPageData,setNextPageData]=useState([]);

    useEffect(()=>{
        getProducts(`/products?&limit=${props.itemPerPage}&page=${props.pageNum+1}`)
      .then((response) => {
        console.log(response);
        setNextPageData(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
    },[])

    return (
        <div className="my-2 d-flex justify-content-center">
            {props.pageNum === 1 ? "" :
                <button onClick={() => props.setPageNum((prev) => prev - 1)}
                    className='btn btn-secondary'                
                >Previous</button>
            }
            <p className='fw-bolder mx-2'>{props.pageNum}</p>
            {nextPageData.length >0 ? 
                <button onClick={() => props.setPageNum((prev) => prev + 1)}
                    className='btn btn-secondary'
                >Next</button>
            : ""
            }
        </div>
    )
}