import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { VerifyAccount } from "../../services/Http-Service";

export default function VerifyEmail() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get('token')
    
        VerifyAccount(`/auth/verify-email?token=${token}`)
            .then((response) => {
                console.log(response)
                toast.success('Successfully Email Verified')
                navigate('/seller/my-profile')
            })
            .catch((error) => {
                console.log(error)
                toast.error(error.response.data?.message)
        })
}