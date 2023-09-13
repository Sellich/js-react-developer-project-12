import { Formik, Form, Field } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const Login = ({setUser}) => {
  const navigate = useNavigate();

  return (
    <div>
      <Formik
        initialValues={{login: '', password: ''}}
        validationSchema={signUpSchema}
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
          ({errors, touched}) => (
            <Form>
              <div>
                <label htmlFor='login'>
                  Логин:
                </label>
                <Field name='login'/>
                {errors.login && touched.login ? (<div>{errors.login}</div>) : null}
              </div>
              <div>
                <label htmlFor='password'>
                  Пароль:
                </label>
                <Field name='password' type='password'/>
                {errors.password && touched.password ? (<div>{errors.password}</div>) : null}
              </div>
              <button type='submit'>
                Отправить
              </button>
              {errors.request && (<div>{errors.request}</div>)}
            </Form>
          )
        }
      </Formik>
    </div>
  )
}

export default Login;