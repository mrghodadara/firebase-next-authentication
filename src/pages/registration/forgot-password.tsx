import { useFormik } from 'formik';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import { Button } from '@/Components/Button/Index';
import { Input } from '@/Components/Form/Input';
import { EmailIcon } from '@/Components/Icons/EmailIcon';
import { Spinner } from '@/Components/Loader/Spinner';
import { sendForgotPasswordLink } from '@/Database/Index';
import publicRoute from '@/hoc/publicRoute';
import { Container } from '@/layouts/Container';

const ForgotPassword = () => {
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
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().email('Invalid Email').required('Required'),
    }),
    onSubmit: ({ email }, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      sendForgotPasswordLink(email)
        .then(async () => {
          toast.success(`We've sent email. Please check your email.`);
          resetForm();
        })
        .catch(() => {
          toast.error(`Please check your email`);
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
              Forgot Password
            </h5>
            <p className="text-center font-inter text-sm font-normal leading-4 text-gray-5">
              Enter your email and we’ll send you a link to reset your password.
            </p>
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

            <div className="col-span-2 mt-2 w-full">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Spinner stroke="#FFFFFF" />
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </div>

            <div className="col-span-2 flex flex-row items-center justify-center gap-1">
              <p className="font-inter text-xs font-normal leading-4 text-gray-15">
                Remember your password?
              </p>
              <Link
                className="font-inter text-xs font-normal leading-4 text-primary hover:underline"
                href="/registration/sign-in"
              >
                Back to Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default publicRoute(ForgotPassword);
