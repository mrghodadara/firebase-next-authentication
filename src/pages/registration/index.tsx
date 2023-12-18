import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { Input } from '@/Components/Form/Input';
import { Container } from '@/Layouts/Container';

const Index = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      validationSchema: Yup.object({}),
      onSubmit: () => {},
    });

  return (
    <div>
      <Container>
        <div className="flex h-screen w-full items-center justify-center">
          <div className="flex w-full max-w-lg flex-col gap-6 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h3 className="font-inter text-xl font-semibold leading-5 text-black">
              Sign Up
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <Input
                    id="firstName"
                    placeholder="Enter First Name"
                    value={values?.firstName}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    error={touched?.firstName && !!errors?.firstName}
                  />
                </div>

                <div>
                  <input type="text" name="email" id="email" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Index;
