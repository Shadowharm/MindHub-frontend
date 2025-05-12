import { useMutation, useQueryClient } from '@tanstack/react-query'

import { CreateWorkspace } from '@/types/workspace.types'

import { workspaceService } from '@/services/workspace.service'

export function useUpdateWorkspace(key?: string) {
	const queryClient = useQueryClient()

	const { mutate: updateWorkspace } = useMutation({
		mutationKey: ['update workspace', key],
		mutationFn: ({ id, data }: { id: string; data: CreateWorkspace }) =>
			workspaceService.updateWorkspace(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['workspace']
			})
		}
	})

	return { updateWorkspace }
}
