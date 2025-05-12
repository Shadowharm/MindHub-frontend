import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { ITask } from '@/types/task.types'

import { taskService } from '@/services/task.service'

export function useTasks(workspaceId: string) {
	const { data } = useQuery({
		queryKey: ['tasks'],
		queryFn: () => taskService.getTasks(workspaceId)
	})

	const [items, setItems] = useState<ITask[] | undefined>(data?.data)

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data])

	return { items, setItems }
}
