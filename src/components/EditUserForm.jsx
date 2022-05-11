import Joi from 'joi'
import useForm from './hooks/useForm'
import { useLocation, useNavigate } from 'react-router-dom';
import Form from './common/Form';
import InputField from './common/InputField';
import FormFooter from './common/FormFooter';
import FormButton from './common/FormButton';
import { updateUser } from '../services/usersService';
import routes from '../routes';

function EditUserForm () {
    const navigate = useNavigate()
    const { state: { user } } = useLocation()

    const dataInit = {
        user: user.user,
        password: user.password
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
            await updateUser(dataInit.user, formData)
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
        <div className='content-wrapper'>
            <Form size='w-6/12' title='Edit User' handleSubmit={ handleSubmit }>
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
                    <FormButton text='Update' validate={ validate } />
                </FormFooter>
            </Form>
        </div>
    )
}

export default EditUserForm