import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import { Button } from '@/Components/Button/Index';
import { PasswordInput } from '@/Components/Form/PasswordInput';
import { Spinner } from '@/Components/Loader/Spinner';
import { createNewPassword } from '@/Database/Index';
import publicRoute from '@/hoc/publicRoute';
import { Container } from '@/layouts/Container';

const Index = () => {
  const router = useRouter();
  const { oobCode } = router.query;

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
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
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
    onSubmit: ({ password }, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      createNewPassword(oobCode as string, password)
        .then(() => {
          toast.success(`New password has been set successfully.`);
          resetForm();
          router.push('/registration/sign-in');
        })
        .catch(() => {
          toast.error(`Link has been expired`);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  useEffect(() => {
    if (router?.isReady && !oobCode) {
      router?.push('/registration/sign-in');
    }
  }, [router]);

  return (
    <Container>
      <div className="flex min-h-[100dvh] w-full items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-white px-5 py-6 sm:max-w-xl sm:px-8 sm:py-12 sm:shadow-authBox">
          {/* Heading */}
          <div className="flex flex-col items-center justify-center gap-1">
            <h5 className="font-inter text-2xl font-semibold leading-8 text-gray-25">
              {/* Get Started with DataWise */}
              Create New Password
            </h5>
            <p className="font-inter text-sm font-normal leading-4 text-gray-5">
              Set your new password
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="mt-4 grid w-full grid-cols-2 gap-3 sm:gap-x-6 sm:gap-y-4"
          >
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
                {isSubmitting ? <Spinner stroke="#FFFFFF" /> : 'Save'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default publicRoute(Index);
