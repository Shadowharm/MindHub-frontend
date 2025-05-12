import { useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'

import { IUserForm } from '@/types/auth.types'

import { useProfile } from '@/hooks/useProfile'

export function useInitialData(reset: UseFormReset<IUserForm>) {
	const { data, isSuccess } = useProfile()
	useEffect(() => {
		if (isSuccess && data) {
			reset({
				email: data.user.email,
				name: data.user.name,
				breakInterval: data.user.settings.breakInterval,
				intervalsCount: data.user.settings.intervalsCount,
				workInterval: data.user.settings.workInterval,
				password: ''
			})
		}
	}, [data])
}
