import Joi from 'joi'
import useForm from './hooks/useForm'
import { login } from '../services/usersService';
import { useContext } from 'react';
import { UserContext } from './context/userContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from './common/Form';
import InputField from './common/InputField';
import FormFooter from './common/FormFooter';
import FormButton from './common/FormButton';

function LoginForm () {
    const navigate = useNavigate()
    const { loginUser } = useContext(UserContext)

    const dataInit = {
        user: '',
        password: ''
    }

    const dataSchema = {
        user: Joi.string().required().label('User'),
        password: Joi.string().required().label('Password')
    }

    const { 
        formData, 
        formErrors, 
        setFormErrors,
        validate, 
        handleChange
    } = useForm(dataInit, dataSchema)   
    
    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const {data: jwt } = await login(formData)

            loginUser(jwt)
            navigate('/options', { replace: true })
        } 
           
        catch (ex) {
           navigate('/notfound', { replace: true })
        }
    }

    return (
        <Form size='w-4/12' title='Login' handleSubmit={ handleSubmit }>
            <InputField 
                label='User'
                id='user'
                type='text'
                value={ formData.user }
                error={ formErrors.user }
                handleChange={ handleChange } />
            <InputField 
                label='Password'
                id='password'
                type='password'
                value={ formData.password }
                error={ formErrors.password }
                handleChange={ handleChange } />
            <FormFooter>
                <FormButton text='Login' validate={ validate } />
            </FormFooter>
        </Form>
    )
}

export default LoginForm