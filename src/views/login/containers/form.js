import React from 'react';
import {Formik} from 'formik';
import Button from '../../../components/button';
import FormGroup from '../../../components/form/formGroup';
import Input from '../../../components/form/input'
import ErrorText from "../../../components/form/error";

const LoginForm = props => (
  <Formik
    initialValues={{username: '', password: ''}}
    {...props}
  >
    {({handleChange, handleBlur, values, handleSubmit, isSubmitting, errors, touched}) => (
      <FormGroup>
        {errors.genericError &&
          <ErrorText>{errors.genericError}</ErrorText>
        }
        <Input
          name='username'
          id='username'
          placeholder={'Username'}
          onChange={handleChange('username')}
          onBlur={handleBlur('username')}
          error={errors.username}
          value={values.username}
        />
        <Input
          id='password'
          name='password'
          type={'password'}
          placeholder={'Password'}
          onChange={handleChange('password')}
          onBlur={handleBlur('password')}
          error={errors.password}
          value={values.password}
        />
        <Button primary large onClick={handleSubmit} type="submit" >Login</Button>
      </FormGroup>
    )}
  </Formik>
);

export default LoginForm;
