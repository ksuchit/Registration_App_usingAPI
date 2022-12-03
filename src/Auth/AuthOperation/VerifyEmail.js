import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { VerifyAccount } from "../../Services/HttpService";


export default function VerifyEmail() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get('token')
    
    const verify = () => {
       
        VerifyAccount(`/auth/verify-email?token=${token}`)
            .then((response) => {
                console.log(response)
                toast.success('Successfully Email Verified')
                navigate('/my-profile')
            })
            .catch((error) => {
                console.log(error)
                toast.error(error.response.data?.message)
        })
   }
        
    return (
        <button className="btn btn-primary" onClick={verify}>Verify Email</button>
    )
}