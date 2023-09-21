import { Formik } from 'formik';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const Login = ({setUser}) => {
  const navigate = useNavigate();

  return (
    <div>
      <Formik
        initialValues={{login: '', password: ''}}
        onSubmit={(values, actions) => {
          const data = {
            username: values.login,
            password: values.password,
          };

          axios.post('/api/v1/login', data)
          .then((response) => {
            localStorage.setItem('token', response.data.token);
            setUser(response.data);
            navigate('/');
          })
          .catch((error) => actions.setErrors({request: error.message}))
        }}
      >
        {
          ({errors, handleSubmit, handleChange, handleBlur}) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3'>
                <Form.Label>
                  Login:
                </Form.Label>
                <Form.Control name='login' onChange={handleChange} onBlur={handleBlur}/>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>
                  Password:
                </Form.Label>
                <Form.Control name='password' type='password' onChange={handleChange} onBlur={handleBlur}/>
              </Form.Group>
              <Button type='submit'>
                Login
              </Button>{' '}
              <Button variant='dark' onClick={() => navigate('/signUp')}>
                Sign Up
              </Button>
              <Form.Control.Feedback className='text-danger' type='text-danger'>{errors.request}</Form.Control.Feedback>
            </Form>
          )
        }
      </Formik>
    </div>
  )
}

export default Login;