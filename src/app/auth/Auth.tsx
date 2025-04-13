'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';



import { Heading } from '@/components/ui/Heading';
import { Field } from '@/components/ui/fields/Field';



import { DASHBOARD_PAGES } from '../../config/pages-url.config';
import { authService } from '../../services/auth.service'
import { IAuthForm } from '../../types/auth.types'
import { Button } from '../../components/ui/buttons/Button'


export function Auth () {
	const {register, handleSubmit, reset} = useForm<IAuthForm>({
		mode: 'onChange',
	})

	const [formType, setFormType] = useState<"login" | "register">('register')

	const {push} = useRouter()

	const {mutate} = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) => authService.main(formType, data),
		onSuccess () {
			toast.success('Auth successfully logged in')
			reset()
			push(DASHBOARD_PAGES.HOME)
		}
	})

	const onSubmit:SubmitHandler<IAuthForm> = data => {
		mutate(data)
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
				{...register('email', {
					required: 'Email is required!'
				})}
			/>

			<Field
				id='password'
				label='Password: '
				placeholder='Enter password: '
				type='password'
				{...register('password', {
					required: 'Password is required!'
				})}
				extra='mb-6'
			/>

			<div className='flex items-center gap-5 justify-center'>
				<Button onClick={() => setFormType('login')}>Login</Button>
				<Button onClick={() => setFormType('register')}>Register</Button>
			</div>
		</form>
	</div>)
}
