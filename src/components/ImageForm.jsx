import Joi from 'joi'
import useForm from './hooks/useForm'
import Form from './common/Form';
import InputField from './common/InputField';
import FormFooter from './common/FormFooter';
import FormButton from './common/FormButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import imageService from '../services/imageService';
import routes from '../routes';

function ImageForm () {
    const navigate = useNavigate()

    const dataInit = {
        imageName: '',
    }

    const dataSchema = {
        imageName: Joi.string().required().label('Name'),
    }

    const { 
        formData, 
        setFormData,
        formErrors, 
        setFormErrors,
        validate, 
        handleChange
    } = useForm(dataInit, dataSchema)   
    const [file, setFile] = useState(null)

    const handleImageChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            formData.image = file
            await imageService.upload(formData)

            navigate(routes.auth.options.url, { replace: true })
        } 
        catch (ex) {
            console.log(ex)
            setFormData(dataInit)
        }
    }

    return (
        <div className="content-wrapper">
            <div className="mt-5">
                <Form size='w-6/12' title='Image Upload' handleSubmit={ handleSubmit }>
                    <InputField 
                        label='Name'
                        id='imageName'
                        type='text'
                        value={ formData.imageName }
                        error={ formErrors.imageName }
                        handleChange={ handleChange } />
                    
                    <input type="file" name='image' onChange={handleImageChange} />
                    <FormFooter>
                        <FormButton text='Upload' validate={ validate } />
                    </FormFooter>
                </Form>
            </div>
        </div>
    )
}

export default ImageForm