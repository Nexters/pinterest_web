import Image from 'next/image';
import { useRouter } from 'next/router';
import { FieldValues, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useSignInUser } from '@/query-hooks/useUsers';
import { isString } from '@/utils';
import axios, { AxiosError } from 'axios';
import { Button, Input } from '@/components/shared';

export default function SignInPage() {
  const router = useRouter();
  const { mutate } = useSignInUser();
  // const {mutate} = useMutation()

  const {
    formState: { isValid, errors },
    register,
    handleSubmit,
    setError,
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    mutate(
      { userId: data.id, password: data.password },
      {
        onSuccess: (data) => {
          const userId = data.user_id;
          localStorage.setItem('userId', userId);
          router.push(`/user/${data.user_id}`);
        },
        onError: (e: any) => {
          const err = e as AxiosError;
          setError(
            'password',
            {
              message: err.response?.data as string,
            },
            { shouldFocus: true },
          );
        },
      },
    );
  };

  const { ref: idRef, onChange: onIdChange } = register('id', {
    required: true,
  });
  const { ref: pwRef, onChange: onPwChange } = register('password', {
    required: true,
    minLength: 4,
  });

  return (
    <div className='tw-relative tw-flex tw-h-[100vh] tw-w-full tw-flex-col tw-bg-white tw-px-5 tw-py-8'>
      <div className='mb-10 tw-mb-11 tw-flex tw-items-center tw-gap-2'>
        <Image alt='logo' src='/logo.svg' width={32} height={32} />
        <h1 className='tw-text-logo'>Grafi</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='tw-flex tw-flex-1 tw-flex-col tw-justify-between'
      >
        <div className='tw-flex tw-flex-col tw-gap-10'>
          <Input
            inputKey='id'
            label='아이디'
            caption='영문 소문자, 숫자만 입력 가능'
            placeholder='아이디를 입력해주세요'
            maxLength={15}
            ref={idRef}
            handleChange={onIdChange}
          />
          <Input
            type='password'
            inputKey='password'
            label='비밀번호'
            caption='숫자만 입력 가능'
            placeholder='비밀번호 4자리를 입력해주세요'
            feedback={
              isString(errors.password?.message) ? errors.password?.message : ''
            }
            maxLength={4}
            ref={pwRef}
            handleChange={onPwChange}
          />
        </div>

        <Button disabled={!isValid} className='tw-w-full tw-justify-center'>
          로그인하기
        </Button>
      </form>
    </div>
  );
}
