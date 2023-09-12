import { Formik, Form, Field } from 'formik';
import React from 'react';
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

const Login = () => {
  return (
    <div>
      <Formik
        initialValues={{login: '', password: ''}}
        validationSchema={signUpSchema}
        onSubmit={() => {
          console.log('submit')
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
            </Form>
          )
        }
      </Formik>
    </div>
  )
}

export default Login;