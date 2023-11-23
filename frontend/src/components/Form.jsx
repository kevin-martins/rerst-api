import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import FieldErrors from './FieldError'

const fields = [
  {
    id: "first_name",
    name: 'Prenom',
    type: "text",
    options: {
      required: 'Veuillez préciser votre nom'
    }
  },
  {
    id: "age",
    name: 'Age',
    type: "text",
    options: {
      required: 'Veuillez préciser votre age',
      maxLength: {
        value: 18,
        message: 'Vous devez avoir au minimum 18 ans'
      }
    }
  },
]
// (field?.options && Object.keys(field.options).includes(errors[`${field.id}`]?.type))
const Form = ({ onSubmit }) => {
  const { register, watch, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' })
  const [formData, setFormData] = useState(
    {
      "first_name": undefined,
      "last_name": undefined,
      "age": undefined,
      "phone_number": undefined,
      "password": undefined,
    }
  );

  const handleChange = (e) => {
    setFormData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  };

  return (
    <form
        className='flex flex-col gap-4 w-2/3 mx-auto'
        onSubmit={handleSubmit(onSubmit)}
      >
        {fields.map(field => (
          <div>
            <label htmlFor="phone_number">
              Numéro de téléphone
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 rounded text-black outline-none"
              {...register(field.id, { ...field?.options })}
            />
            <FieldErrors error={errors[field.id]} />
          </div>
        ))}
      </form>
  )
}

export default Form