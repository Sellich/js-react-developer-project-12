import axios from 'axios';
import { Formik } from 'formik';
import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const signUpSchema = Yup.object().shape({
  login: Yup.string()
    .min(4, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Too short')
    .max(8, 'Too Long')
    .required('Required'),
});

const SignUp = ({setUser}) => {
  const navigate = useNavigate();

  return (
    <div>
      <Formik
        initialValues={{login: '', password: ''}}
        validationSchema={signUpSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={(values, actions) => {
          const data = {
            username: values.login,
            password: values.password,
          };

          axios.post('/api/v1/signup', data)
          .then((response) => {
            localStorage.setItem('token', response.data.token);
            setUser(response.data);
            navigate('/');
          })
          .catch((error) => actions.setErrors({request: error.message}))
        }}
      >
        {
          ({values, errors, touched, handleSubmit, handleChange, handleBlur}) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3'>
                <Form.Label>
                  Login:
                </Form.Label>
                <Form.Control isValid={!errors.login && touched.login} name='login' placeholder='login' onChange={handleChange} value={values.login} onBlur={handleBlur}/>
                <Form.Control.Feedback className='text-danger' type='text-danger'>{errors.login}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>
                  Password:
                </Form.Label>
                <Form.Control isValid={!errors.password && touched.password} name='password' type='password' placeholder='password' onChange={handleChange} value={values.password} onBlur={handleBlur}/>
                <Form.Control.Feedback className='text-danger' type='text-danger'>{errors.password}</Form.Control.Feedback>
              </Form.Group>
              <Button type='submit'>
                Sign Up
              </Button>{' '}
              <Button variant="dark" onClick={() => navigate('/login')}>I already have account</Button>
              <Form.Control.Feedback className='text-danger' type='text-danger'>{errors.request}</Form.Control.Feedback>
            </Form>
          )
        }
      </Formik>
    </div>
  )
}

export default SignUp