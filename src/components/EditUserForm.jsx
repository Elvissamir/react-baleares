import Joi from 'joi'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useForm from './hooks/useForm'
import routes from '../routes';
import Form from './common/Form';
import InputField from './common/InputField';
import FormFooter from './common/FormFooter';
import FormButton from './common/FormButton';
import { updateUser } from '../services/usersService';

function EditUserForm () {
    const navigate = useNavigate()
    const { state: { user } } = useLocation()

    const [isChecked, setIsChecked] = useState(false)

    const dataInit = {
        user: user.user,
        roles: user.roles? user.roles : [],
        password: user.password
    }

    const roleOption = 'admin'

    const dataSchema = {
        user: Joi.string().required().label('User'),
        roles: Joi.array().required(),
        password: Joi.string().required().label('Password')
    }

    const { 
        formData, 
        formErrors, 
        setFormErrors,
        setFormData,
        validate, 
        handleChange
    } = useForm(dataInit, dataSchema)   
    
    const handleSubmit = async e => {
        e.preventDefault()

        try {
            console.log(formData)
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

    const handleOnChange = () => {
        setIsChecked(!isChecked)
        let temp = {...formData}
        !isChecked? temp.roles.push(roleOption) : temp.roles.pop()
        setFormData(temp)
     };

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
                    <FormButton text='Update' validate={ validate } />
                </FormFooter>
            </Form>
        </div>
    )
}

export default EditUserForm