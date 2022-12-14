import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import  Post  from '../../services/Http-Service';

export default function ChangePasswordModal() {

  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    delete data.confirm_password;
    console.log(data)

    Post('/users/auth/change-password',data)
    .then((response)=>{
      console.log(response)
      reset();
      toast.success('Password Changed Successfully')
      navigate('/seller/my-profile')

    })
    .catch((error)=>{
      console.log(error)
    })

  }

  return (
    <div className='changePassword'>
    <div className='registration'>
      <Form onSubmit={handleSubmit(onSubmit)} >
        <Form.Group className="d-flex flex-column p-1">
            <Form.Label>old_password</Form.Label>
            <Form.Control type='text' placeholder='Enter old Password'
                {...register('old_password',{required:true, minLength:8})}
            />
        </Form.Group>  
        {errors.old_password?.type === 'required' && <p style={{color:'red'}}>old_password is required</p>}
        {errors.old_password?.type === 'minLength' && <p style={{ color: 'red' }}>minimum 8 charachters needed</p>}
        
        <Form.Group className="d-flex flex-column p-1">
            <Form.Label>new_password</Form.Label>
            <Form.Control type='text' placeholder='Enter new Password'
              {...register('new_password',{required:true,minLength:8})}
            />
        </Form.Group>
        {errors.new_password?.type === 'required' && <p style={{color:'red'}}>new_password is required</p>}
        {errors.new_password?.type === 'minLength' && <p style={{ color: 'red' }}>minimum 8 charachters needed</p>}

        <Form.Group className="d-flex flex-column p-1">
            <Form.Label>Confirm_Password</Form.Label>
            <Form.Control type='password' placeholder='Confirm Password'
              {...register('confirm_password',
                {
                  required: true, minLength: 8,
                  validate: (val) => {
                    if (watch('new_password') !== val) {
                      return "Your passwords do no match";
                    }
                  }
                })}
            />
        </Form.Group>
        {errors.confirm_password && <p style={{ color: 'red' }}>Your passwords do no match</p>}
        <Button type="submit" className="m-1 p-2" style={{backgroundColor:"rgb(1, 1, 10)",color:"white"}}>Submit</Button>
        
      </Form>
      </div>
    </div>
  );
}
