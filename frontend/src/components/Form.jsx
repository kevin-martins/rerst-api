import React from 'react'
import { useForm } from 'react-hook-form'
import FieldError from './FieldError'
import { normaliseData } from '../helpers/helpers';

const Form = ({ onSubmit, formData, defaultValues = {} }) => {
  const { register, watch, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched', defaultValues: defaultValues });

  return (
    <form
      className='flex flex-col gap-1 sm:max-w-md sm:w-full w-72 mx-auto'
      onSubmit={handleSubmit((data) => onSubmit(normaliseData(data)))}
    >
      {formData.fields.map(field => (
        <div key={field.id} className=''>
          <label htmlFor={field.id}>
            {field.options?.required && <span className='text-red-500'>* </span>}
            {field.name}
          </label>
          <input
            aria-label={field.name}// to successfully get the label's name in my front-end test
            type={field.type}
            id={field.id}
            className={`w-full p-2 rounded text-black outline-none border-2
              ${(field?.options && Object.keys(field.options).includes(errors[field.id]?.type)) ? 'border-red-500' : ''}
              ${field?.watch ? field.watch(watch) : ''}
            `}
            {...register(field.id, { ...field?.options })}
          />
          <FieldError error={errors[field.id]} />
        </div>
      ))}
      <button type="submit" className="w-full p-2 bg-blue-500 text-white hover:bg-blue-600 mt-2">
        {formData.submitText}
      </button>
    </form>
  )
}

export default Form