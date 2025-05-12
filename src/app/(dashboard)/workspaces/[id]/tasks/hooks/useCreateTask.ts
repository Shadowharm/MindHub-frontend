import { useMutation, useQueryClient } from '@tanstack/react-query'

import { CreateTask } from '@/types/task.types'

import { taskService } from '@/services/task.service'

export function useCreateTask() {
	const queryClient = useQueryClient()

	const { mutate: createTask } = useMutation({
		mutationKey: ['create task'],
		mutationFn: (data: CreateTask) => taskService.createTask(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['tasks']
			})
		}
	})

	return { createTask }
}
