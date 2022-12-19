export default function Pagination(props) {
    return (
        <div className="my-2 d-flex justify-content-center">
            {props.pageNum === 1 ? "" :
                <button onClick={() => props.setPageNum((prev) => prev - 1)}
                    className='btn btn-secondary'                
                >Previous</button>
            }
            <p className='fw-bolder mx-2'>{props.pageNum}</p>
            { props.totalPages!==props.pageNum && props.totalPages!==0? 
                <button onClick={() => props.setPageNum((prev) => prev + 1)}
                    className='btn btn-secondary'
                >Next</button>
            : ""
            }
        </div>
    )
}