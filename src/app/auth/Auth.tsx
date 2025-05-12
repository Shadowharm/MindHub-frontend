'use client';

import { Button } from "@chakra-ui/react";
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from "axios";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';



import { Heading } from '@/components/ui/Heading';
import { Field } from '@/components/ui/fields/Field';



import { IAuthResponse } from "@/types/user.types";



import { CustomError } from "@/api/customError";



import { DASHBOARD_PAGES } from '../../config/pages-url.config';
import { authService } from '../../services/auth.service';
import { IAuthForm } from '../../types/auth.types';


// import { Button } from '../../components/ui/buttons/Button'


export function Auth () {
	const {	register, handleSubmit, reset } = useForm<IAuthForm>({
		mode: 'onChange',
	})

	const [formType, setFormType] = useState<"login" | "register">('register')

	const {push} = useRouter()


	const {mutate, error } = useMutation<AxiosResponse<IAuthResponse, any>, CustomError, IAuthForm>({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) => authService.main(formType, data),
		onSuccess () {
			toast.success('Auth successfully logged in')
			reset()
			push(DASHBOARD_PAGES.HOME)
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate({ ...data, name: data.email })
	}

	return (<div className='flex min-h-screen'>
		<form
			className='lg:w-1/3 md:w-1/2 w-5/6 m-auto shadow bg-sidebar rounded-xl p-layout'
			onSubmit={handleSubmit(onSubmit)}
		>
			<Heading title='Auth' />
			<Field
				id='email'
				label='Email:'
				placeholder='Enter email:'
				type='email'
				extra='mb-4'
				errorMessage={error?.errors?.email?.[0] || error?.message}
				{...register('email', {
					required: 'Email is required!'
				})}
			/>

			<Field
				id='password'
				label='Password: '
				placeholder='Enter password: '
				errorMessage={error?.errors?.password?.[0] || error?.message}
				type='password'
				{...register('password', {
					required: 'Password is required!'
				})}
				extra='mb-6'
			/>

			<div className='flex items-center gap-5 justify-center'>
				<Button type="submit" onClick={() => setFormType('login')}>Login</Button>
				<Button type="submit" onClick={() => setFormType('register')}>Register</Button>
			</div>
		</form>
	</div>)
}
