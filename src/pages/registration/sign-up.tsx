import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import * as Yup from 'yup';

import { Button } from '@/Components/Button/Index';
import { Input } from '@/Components/Form/Input';
import { PasswordInput } from '@/Components/Form/PasswordInput';
import { EmailIcon } from '@/Components/Icons/EmailIcon';
import { Spinner } from '@/Components/Loader/Spinner';
import { createUserInDB } from '@/Database/FireStore';
import { signUpWithEmailAndPassword } from '@/Database/Index';
import publicRoute from '@/hoc/publicRoute';
import { Container } from '@/layouts/Container';

const Index = () => {
  const router = useRouter();

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
      password: Yup.string()
        .required('Required')
        .matches(
          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/,
          'Password must be at least 6 characters long and include letters, numbers, and special characters.'
        ),
      confirmPassword: Yup.string()
        .required('Required')
        .oneOf(
          [Yup.ref('password')],
          'Confirm Password must match with Password'
        ),
    }),
    onSubmit: (
      { email, password, firstName, lastName },
      { setSubmitting, resetForm, setFieldError }
    ) => {
      setSubmitting(true);

      signUpWithEmailAndPassword(email, password)
        .then(async (response) => {
          if (response?.user?.uid) {
            await createUserInDB({
              firstName,
              lastName,
              email,
              uid: response?.user?.uid,
            });

            // setUser(response?.user);
            router.push('/');
            resetForm();
          }
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              setFieldError('email', 'This email is already in use.');
              break;
            case 'auth/invalid-email':
              setFieldError('email', 'Invalid email address.');
              break;
            case 'auth/weak-password':
              setFieldError(
                'password',
                'Password should be at least 6 characters.'
              );
              break;
            default:
              console.error('Error signing up:', error.message);
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
              Sign Up
            </h5>
            <p className="font-inter text-sm font-normal leading-4 text-gray-5">
              Create your free account
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="mt-4 grid w-full grid-cols-2 gap-3 sm:gap-x-6 sm:gap-y-4"
          >
            <div>
              <Input
                label="First Name"
                id="firstName"
                placeholder="First Name"
                name="firstName"
                type="text"
                value={values?.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={` ${
                  touched?.firstName && errors?.firstName
                    ? 'border-red-600'
                    : 'border-gray-10'
                }`}
                error={
                  touched?.firstName && errors?.firstName
                    ? errors?.firstName
                    : ''
                }
                icon={<EmailIcon />}
              />
            </div>

            <div>
              <Input
                label="Last Name"
                id="lastName"
                placeholder="Last Name"
                name="lastName"
                type="text"
                value={values?.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={` ${
                  touched?.lastName && errors?.lastName
                    ? 'border-red-600'
                    : 'border-gray-10'
                }`}
                error={
                  touched?.lastName && errors?.lastName ? errors?.lastName : ''
                }
                icon={<EmailIcon />}
              />
            </div>

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
                placeholder="Create a Strong Password"
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
            </div>

            <div className="col-span-2">
              <PasswordInput
                label="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Create a Strong Password"
                value={values?.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${
                  touched?.confirmPassword && errors?.confirmPassword
                    ? 'border-red-600'
                    : 'border-gray-10'
                }`}
                error={
                  touched?.confirmPassword && errors?.confirmPassword
                    ? errors?.confirmPassword
                    : ''
                }
              />
            </div>

            <div className="col-span-2 mt-2 w-full">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner stroke="#FFFFFF" /> : 'Sign up'}
              </Button>
            </div>

            <div className="col-span-2 flex flex-row items-center justify-center gap-1">
              <p className="font-inter text-xs font-normal leading-4 text-gray-15">
                Already have an account?
              </p>
              <Link
                className="font-inter text-xs font-normal leading-4 text-primary"
                href={'/registration/sign-in'}
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default publicRoute(Index);
