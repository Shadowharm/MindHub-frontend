import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { IWorkspace } from '@/types/workspace.types'

import { workspaceService } from '@/services/workspace.service'

export function useWorkspaces() {
    const { data, isLoading } = useQuery({
        queryKey: ['workspaces'],
        placeholderData: [],
        queryFn: () => workspaceService.getWorkspaces()
    })

    const [items, setItems] = useState<IWorkspace[] | undefined>(data)

    useEffect(() => {
        setItems(data)
    }, [data])

    return { items, setItems, isLoading }
}
