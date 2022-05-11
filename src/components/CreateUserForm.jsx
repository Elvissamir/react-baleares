import Joi from 'joi'
import useForm from './hooks/useForm'
import { useNavigate } from 'react-router-dom';
import Form from './common/Form';
import InputField from './common/InputField';
import FormFooter from './common/FormFooter';
import FormButton from './common/FormButton';
import { createUser } from '../services/usersService';
import routes from '../routes';
import { useState } from 'react';

function CreateUserForm () {
    const navigate = useNavigate()

    const [isChecked, setIsChecked] = useState(false)

    const dataInit = {
        user: '',
        roles: [],
        password: ''
    }

    const dataSchema = {
        user: Joi.string().required().label('User'),
        roles: Joi.array().required(),
        password: Joi.string().required().label('Password')
    }

    const roleOption = 'admin'

    const { 
        formData, 
        setFormData,
        formErrors, 
        setFormErrors,
        validate, 
        handleChange
    } = useForm(dataInit, dataSchema)   

    const handleOnChange = () => {
        setIsChecked(!isChecked)
        let temp = {...formData}
        !isChecked? temp.roles.push(roleOption) : temp.roles.pop()
        setFormData(temp)
    };
    
    const handleSubmit = async e => {
        e.preventDefault()

        try {
            await createUser(formData)
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
            <Form size='w-6/12' title='Create User' handleSubmit={ handleSubmit }>
                <InputField 
                    label='User'
                    id='user'
                    type='text'
                    value={ formData.user }
                    error={ formErrors.user }
                    handleChange={ handleChange } />

                <div className='flex-row mt-5'>
                    <label htmlFor="role">Admin</label>
                    <input
                            type="checkbox"
                            className='ml-2'
                            id="roles"
                            name="role"
                            value="roles"
                            checked={isChecked}
                            onChange={handleOnChange}
                            />
                </div>

                <InputField 
                    label='Password'
                    id='password'
                    type='password'
                    value={ formData.password }
                    error={ formErrors.password }
                    handleChange={ handleChange } />
                <FormFooter>
                    <FormButton text='Create' validate={ validate } />
                </FormFooter>
            </Form>
        </div>
    )
}

export default CreateUserForm