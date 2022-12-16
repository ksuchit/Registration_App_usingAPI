import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import Post  from "../../Services/HttpService";

export default function PostModal() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

    
    const onSubmit = (data) => {
      delete data.confirm_password;
      const token=searchParams.get('token')
      console.log(data);

      Post(`/auth/reset-password?token=${token}`, data)
          .then((response) => {
              console.log(response)
              toast.success('Successfully Changed Password')
              navigate('/seller/auth/login')
          })
          .catch((error) => {
              console.log(error)
              toast.error(error.response.data?.message)
          })
        
    };
  return (
    
    <div className="registration p-4">
        <h1>Reset Password</h1>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column justify-content-center"
          >
            <Form.Field className="d-flex flex-column py-2">
              <label>New Password</label>
              <input
                type="text"
                placeholder="Enter new Password"
                {...register("password", { required: true, minLength: 8 })}
              />
            </Form.Field>
            {errors.password?.type==='required' && <p style={{ color: "red" }}>Password is Required</p>}
            {errors.password?.type==='minLength' && <p style={{ color: "red" }}>minimum 8 charachters required</p>}
            <Form.Field className="d-flex flex-column">
              <label>Confirm Password</label>
              <input
                type="text"
                placeholder="Enter confirm Password"
                {...register("confirm_password", {
                    validate: (val) => {
                        if (watch('password') !== val) {
                            return "Your passwords do no match";
                        }
                      },
                })}
              />
            </Form.Field>
            {errors.confirm_password && <p style={{ color: "red" }}>your password do not match</p>}
            
            <Button type="submit" className="my-3 btn btn-primary" style={{backgroundColor:"rgb(1, 1, 10)",color:"white"}}>
              Reset Password
            </Button>
      </Form>
      <NavLink to='/seller/auth/login' 
        style={{ textDecoration: 'none', position: '' }}>Back</NavLink>
        </div>
        
  );
}
