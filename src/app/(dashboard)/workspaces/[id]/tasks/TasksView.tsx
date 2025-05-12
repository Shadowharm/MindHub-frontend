'use client'

import Loader from '@/components/ui/Loader'

import { useLocalStorage } from '@/hooks/useLocalStorage'

import { SwitcherView } from './SwitcherView'
import { KanbanView } from './kanban-view/KanbanView'
import { ListView } from './list-view/ListView'
import {useQuery} from "@tanstack/react-query";
import {workspaceService} from "@/services/workspace.service";
import {useParams} from "next/navigation";
import WorkspaceSettings from "@/app/(dashboard)/workspaces/[id]/tasks/WorkspaceSettings";
import {useProfile} from "@/hooks/useProfile";
import {IUsersOnWorkspaces} from "@/types/workspace.types";
import {useEffect, useState} from "react";

export type TypeView = 'list' | 'kanban'

export function TasksView() {
	const params = useParams<{id: string}>()
	const [user, setUser] = useState<IUsersOnWorkspaces | null>(null)

	const [type, setType, isLoading] = useLocalStorage<TypeView>({
		key: 'view-type',
		defaultValue: 'list'
	})


	const { data: profile } = useProfile()

	const { data } = useQuery({
		queryKey: ['workspace'],
		queryFn: () => workspaceService.getWorkspace(params.id)
	})
	useEffect(() => {
		if (profile && data) {
			const temp = data?.users?.find(user => user.user.id === profile.user.id)
			if (temp) {
				setUser(temp)
			}
		}
	}, [data, profile])

	if (isLoading || !user || !data) return <Loader />

	return (
		<div>
			<WorkspaceSettings data={data} profile={user} />
			<SwitcherView
				setType={setType}
				type={type}
			/>
			{type === 'list' ? <ListView /> : <KanbanView />}
		</div>
	)
}
