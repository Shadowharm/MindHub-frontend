'use client'

import Loader from '@/components/ui/Loader'

import { useProfile } from '@/hooks/useProfile'

export function Statistics() {
	const { data, isLoading } = useProfile()

	return isLoading || !data ? (
		<Loader />
	) : (
		<div className='grid grid-cols-4 gap-12 mt-7'>
				<div
					className='bg-border/5 rounded p-layout text-center hover:-translate-y-3 transition-transform duration-500'
				>
					<div className='text-xl'>Completed tasks</div>
					<div className='text-3xl font-semibold'>{data.statistics.completedTasks}</div>
				</div>
			<div
				className='bg-border/5 rounded p-layout text-center hover:-translate-y-3 transition-transform duration-500'
			>
				<div className='text-xl'>Total tasks</div>
				<div className='text-3xl font-semibold'>{data.statistics.totalTasks}</div>
			</div>
			<div
				className='bg-border/5 rounded p-layout text-center hover:-translate-y-3 transition-transform duration-500'
			>
				<div className='text-xl'>Today tasks</div>
				<div className='text-3xl font-semibold'>{data.statistics.todayTasks}</div>
			</div>
			<div
				className='bg-border/5 rounded p-layout text-center hover:-translate-y-3 transition-transform duration-500'
			>
				<div className='text-xl'>Week tasks</div>
				<div className='text-3xl font-semibold'>{data.statistics.weekTasks}</div>
			</div>
		</div>
	)
}
