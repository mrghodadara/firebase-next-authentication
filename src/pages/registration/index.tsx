import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { Input } from '@/Components/Form/Input';
import { PasswordInput } from '@/Components/Form/PasswordInput';
import { createUserInDB } from '@/Database/FireStore';
import { signUpWithEmailAndPassword } from '@/Database/Index';
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
      validationSchema: Yup.object({
        firstName: Yup.string().trim().required('Required'),
        lastName: Yup.string().trim().required('Required'),
        email: Yup.string().trim().email('Invalid Email').required('Required'),
        password: Yup.string().trim().required('Required'),
        confirmPassword: Yup.string().trim().required('Required'),
      }),
      onSubmit: ({ email, password, firstName, lastName }) => {
        signUpWithEmailAndPassword(email, password)
          .then((response) => {
            return response;
          })
          .then(async (response) => {
            if (response?.user?.uid) {
              await createUserInDB({
                firstName,
                lastName,
                email,
                uid: response?.user?.uid,
              });
            }
          })
          .catch(() => {})
          .finally(() => {});
      },
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
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <Input
                    label="First Name"
                    id="firstName"
                    placeholder="Enter First Name"
                    value={values?.firstName}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    error={touched?.firstName && !!errors?.firstName}
                  />
                </div>

                <div>
                  <Input
                    label="Last Name"
                    id="lastName"
                    placeholder="Enter Last Name"
                    value={values?.lastName}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    error={touched?.lastName && !!errors?.lastName}
                  />
                </div>

                <div className="col-span-2">
                  <Input
                    label="Email"
                    id="email"
                    placeholder="Enter Email"
                    value={values?.email}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    error={touched?.email && !!errors?.email}
                  />
                </div>

                <div className="col-span-2">
                  <PasswordInput
                    label="Password *"
                    id="password"
                    placeholder="Enter Password"
                    value={values?.password}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    error={touched?.password && !!errors?.password}
                  />
                </div>

                <div className="col-span-2">
                  <PasswordInput
                    label="Confirm Password"
                    id="confirmPassword"
                    placeholder="Enter Confirm Password"
                    value={values?.confirmPassword}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    error={
                      touched?.confirmPassword && !!errors?.confirmPassword
                    }
                  />
                </div>

                <div className="col-span-2">
                  <button className="w-full rounded-md bg-blue-600 px-4 py-2 font-inter text-base text-white">
                    Sign Up
                  </button>
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
