import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const validationSchemaStep1 = Yup.object({
    firstname: Yup.string().required('firstname is required'),
  });

  const validationSchemaStep2 = Yup.object({
    lastname: Yup.string().required('lastname is required'),
  });

  const validationSchemaStep3 = Yup.object({
    email: Yup.string().required('email is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
    },
    validationSchema: 
      step === 1 ? validationSchemaStep1 : 
      step === 2 ? validationSchemaStep2 : 
      validationSchemaStep3,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  const prevStep = () => setStep((prevStep) => prevStep - 1);
  const nextStep = () => setStep((prevStep) => prevStep + 1);

  const isNextDisabled = () => {
    if (step === 1) {
      return !formik.values.firstname || Object.keys(formik.errors).length > 0;
    } else if (step === 2) {
      return !formik.values.lastname || Object.keys(formik.errors).length > 0;
    } else if (step === 3) {
      return !formik.values.email || Object.keys(formik.errors).length > 0;
    }
    return false;
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {step === 1 && (
        <>
          <div className="w-full text-2xl font-bold flex items-center justify-center my-5">Step 1</div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="firstname">First Name</label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text" 
                name="firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="w-full text-2xl font-bold flex items-center justify-center my-5">Step 2</div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="email">
                Last Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input 
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text" 
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="w-full text-2xl font-bold flex items-center justify-center my-5">Step 3</div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="email">
                Email
              </label>
            </div>
            <div className="md:w-2/3">
              <input 
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text" 
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
        </>
      )}

      <div className='flex justify-between gap-x-4 mt-5'>
        {step > 1 && (
          <button
            className="w-full bg-transparent border-sky-500"
            type="button" 
            onClick={prevStep}
          >
            Prev
          </button>
        )}

        {step < 3 && (
          <button
            className="w-full bg-sky-500 border-sky-500"
            type="button" 
            onClick={nextStep}
            disabled={isNextDisabled()}>
              Next
            </button>
        )}
        
        {step === 3 && (
          <button
            className="w-full bg-sky-500 border-sky-500"
            type="submit"
            disabled={Object.keys(formik.errors).length > 0}
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default MultiStepForm;
