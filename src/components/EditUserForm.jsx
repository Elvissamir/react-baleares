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
import routes from '../routes';

function EditUserForm () {
    const navigate = useNavigate()

    const currentUser = useLocation()
    console.log(currentUser)

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
            
            navigate(routes.admin.users.url, { replace: true })
        } 
           
        catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = {...formErrors}
                errors.user = ex.response.data
                setFormErrors(errors)
            }
        }
    }

    return (
        <Form size='w-6/12' title='Login' handleSubmit={ handleSubmit }>
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
                <a className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800" href="/">
                    Forgot Password?
                </a>
            </FormFooter>
        </Form>
    )
}

export default EditUserForm