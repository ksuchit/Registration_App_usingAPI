import { getUsers } from "../Services/HttpService"


export default function Pagination(props) {

    const onPrevious = () => {
        props.setPageNum((pre) => pre - 1)

        // getUsers(`/users?&limit=${props.itemsPerPage}&page=${props.pageNum}`)
        // .then((response) => {
        //     console.log(response)
        //     props.setUsers(response.data.results)
        // })
        // .catch((error) => {
        //     console.log(error)
        // })
        
    }
    const onNext = () => {
        
        props.setPageNum((pre) => pre + 1)

        // getUsers(`/users?&limit=${props.itemsPerPage}&page=${props.pageNum}`)
        // .then((response) => {
        //     console.log(response)
        //     props.setUsers(response.data.results)
        // })
        // .catch((error) => {
        //     console.log(error)
        // })
    }

    return (
        <div>
            <div className="d-flex justify-content-center ">
                {props.pageNum===1 ? "" :
                <button className="btn btn-secondary mx-2"
                    onClick={onPrevious}>Previous</button>}
                {props.pageNum === 1 && props.fullUsers.length < (props.itemsPerPage * props.pageNum)
                ? "" :  <p className="fw-bolder"> {props.pageNum} </p>}

                { (props.users.length * props.pageNum < (props.itemsPerPage * props.pageNum) ) ? "" :
                    <button className="btn btn-secondary mx-2"
                        onClick={onNext}>Next</button>
                }
                
            </div>
            <div>
                    <label>Items Per Page</label>
                    <select onChange={(e)=>props.setItemsPerPage(e.target.value)}>
                        <option disabled>select item/page</option>
                        <option value={4}>4</option>
                        <option value={7}>7</option>
                        <option value={10}>10</option>
                    </select>

                <div className="my-4 d-flex ">
                    <p>Data showing from </p> 
                    <p className="fw-bolder mx-1">{((props.pageNum -1) * props.itemsPerPage)+1}</p>
                    <p> to </p><p className="fw-bolder mx-1">{((props.pageNum -1) * props.itemsPerPage)+props.users.length}</p>
                    
                </div>
            </div>
            
        </div>
    )
}