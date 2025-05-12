import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { IUserForm } from '@/types/auth.types'

import { userService } from '@/services/user.service'

export function useUpdateSettings() {
	const queryClient = useQueryClient()

	const { isPending, mutateAsync } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: IUserForm) => userService.update(data),
		onSuccess() {
			toast.success('Successfully update profile!')
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		}
	})

	return { mutateAsync, isPending }
}
