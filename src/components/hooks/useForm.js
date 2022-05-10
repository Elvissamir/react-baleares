import Joi from 'joi'
import { useState } from "react"

function useForm (dataInit, formSchema) {
    const [ dataSchema, setDataSchema ] = useState(formSchema)
    const [ formData, setFormData ] = useState(dataInit)
    const [ formErrors, setFormErrors ] = useState({})

    const validate = () => {
        const schema = Joi.object(dataSchema)
        const options = { abortEarly: false }
        const { error } = schema.validate(formData, options)
    
        if (!error) return null
        
        const errors = {}
        error.details.forEach( item => errors[item.path[0]] = item.message)
        return errors
    }

    const validateProperty = ({id, value}) => {
        const obj = { [id]: value }
        const schema = Joi.object({ [id]: dataSchema[id] })
        const { error } = schema.validate(obj)
    
        return (!error) ? null:error.details[0].message
    }
    
    const handleChange = ({ target: input }) => {
        const errors = { ...formErrors }
        const errorMessage = validateProperty(input)
    
        if (errorMessage) errors[input.id] = errorMessage
        else delete errors[input.id]
        
        const data = { ...formData }
        data[input.id] = input.value
        setFormErrors(errors)
        setFormData(data)
    }

    return { 
        validate, 
        setDataSchema,
        formData, 
        setFormData,
        formErrors,
        setFormErrors,
        handleChange, 
    }
}

export default useForm