

export default function Pagination(props) {
    return (
        <div>
            {props.pageNum === 1 ? "" :
                <button onClick={() => props.setPageNum((prev) => prev - 1)}>Previous</button>
            }
            {props.pageNum}
            {props.products.length * props.pageNum < props.pageNum * props.itemPerPage ? "" :
                <button onClick={() => props.setPageNum((prev) => prev + 1)}>Next</button>
            }
        </div>
    )
}