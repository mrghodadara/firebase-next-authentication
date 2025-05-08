import { useFormik } from 'formik';
import Link from 'next/link';
import React, { useState } from 'react';
import * as Yup from 'yup';

import { Button } from '@/Components/Button/Index';
import { Input } from '@/Components/Form/Input';
import { PasswordInput } from '@/Components/Form/PasswordInput';
import { EmailIcon } from '@/Components/Icons/EmailIcon';
import { Spinner } from '@/Components/Loader/Spinner';
import { signInWithEmail } from '@/Database/Index';
import publicRoute from '@/hoc/publicRoute';
import { Container } from '@/layouts/Container';

const Index = () => {
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().email('Invalid Email').required('Required'),
      password: Yup.string()
        .required('Required')
        .matches(
          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/,
          'Password must be at least 6 characters long and include letters, numbers, and special characters.'
        ),
    }),
    onSubmit: (
      { email, password },
      { setSubmitting, resetForm, setFieldError }
    ) => {
      setSubmitting(true);
      setLoginError(null);

      signInWithEmail(email, password)
        .then(async (response) => {
          if (response?.user?.uid) {
            resetForm();
          }
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              setFieldError('email', 'Invalid email address.');
              break;
            case 'auth/user-disabled':
              setFieldError('email', 'User account is disabled.');
              break;
            case 'auth/invalid-credential':
              setLoginError('Please check email or password');
              break;
            default:
              console.error(error.code);
          }
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <Container>
      <div className="flex min-h-[100dvh] w-full items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-white px-5 py-6 sm:max-w-xl sm:px-8 sm:py-12 sm:shadow-authBox">
          {/* Heading */}
          <div className="flex flex-col items-center justify-center gap-1">
            <h5 className="font-inter text-2xl font-semibold leading-8 text-gray-25">
              {/* Get Started with DataWise */}
              Sign In
            </h5>
            {/* <p className="font-inter text-sm font-normal leading-4 text-gray-5">
              Create your free account
            </p> */}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="mt-4 grid w-full grid-cols-2 gap-3 sm:gap-x-6 sm:gap-y-4"
          >
            <div className="col-span-2">
              <Input
                label="Email"
                id="email"
                name="email"
                type="text"
                placeholder="Your Email"
                value={values?.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={` ${
                  touched?.email && errors?.email
                    ? 'border-red-600'
                    : 'border-gray-10'
                }`}
                error={touched?.email && errors?.email ? errors?.email : ''}
                icon={<EmailIcon />}
              />
            </div>

            <div className="col-span-2">
              <PasswordInput
                label="Password"
                id="password"
                name="password"
                placeholder="Password"
                value={values?.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${
                  touched?.password && errors?.password
                    ? 'border-red-600'
                    : 'border-gray-10'
                }`}
                error={
                  touched?.password && errors?.password ? errors?.password : ''
                }
              />
              <div className="text-right">
                <Link
                  className="font-inter text-xs font-normal leading-4 text-primary"
                  href={'/registration/forgot-password'}
                >
                  Forgot password
                </Link>
              </div>
            </div>

            <div className="col-span-2 mt-2 w-full">
              {loginError && (
                <p className="mb-1 font-inter text-xs font-medium leading-4 text-red-600">
                  {loginError}
                </p>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner stroke="#FFFFFF" /> : 'Login'}
              </Button>
            </div>

            <div className="col-span-2 flex flex-row items-center justify-center gap-1">
              <p className="font-inter text-xs font-normal leading-4 text-gray-15">
                Don’t have an account?
              </p>
              <Link
                className="font-inter text-xs font-normal leading-4 text-primary"
                href={'/registration/sign-up'}
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default publicRoute(Index);
