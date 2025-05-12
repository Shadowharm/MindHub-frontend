import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import Workspaces from "@/app/(dashboard)/workspaces/Workspaces";


export const metadata: Metadata = {
	title: 'Workspaces',
	...NO_INDEX_PAGE
}

export default function WorkspacesPage() {
	return (
		<div>
			<Heading title='Workspaces' />
			<Workspaces />
		</div>
	)
}
