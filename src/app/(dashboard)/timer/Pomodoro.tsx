'use client'

import { Loader, Pause, Play, RefreshCcw } from 'lucide-react'

import { formatTime } from './format-time'
import { useCreateSession } from './hooks/useCreateSession'
import { useDeleteSession } from './hooks/useDeleteSession'
import { useTimer } from './hooks/useTimer'
import { useTimerActions } from './hooks/useTimerActions'
import { useTodaySession } from './hooks/useTodaySession'
import { PomodoroRounds } from './rounds/PomodoroRounds'
import {Button} from "@chakra-ui/react";
import {useEffect} from "react";

export function Pomodoro() {
	const timerState = useTimer()
	const { isLoading, sessionsResponse } =
		useTodaySession(timerState)

	const rounds = sessionsResponse?.data.rounds
	const actions = useTimerActions({ ...timerState, rounds })

	const { isPending, mutate } = useCreateSession()
	const { deleteSession, isDeletePending } = useDeleteSession(() => {
			timerState.setSecondsLeft(timerState.workInterval * 60)
			timerState.setIsBreakTime(false)
		}
	)

	useEffect(() => {
		if (!timerState.workInterval || !timerState.breakInterval) return
		if (timerState.secondsLeft > 0) return
		if (timerState.isBreakTime) {
			if (rounds?.find(round => !round.isCompleted && round.id !== timerState.activeRound?.id)) {
				actions.nextRoundHandler()
			} else {
				timerState.setIsRunning(false)
				deleteSession(sessionsResponse?.data.id as string)
				return
			}
		}
		timerState.setIsBreakTime(!timerState.isBreakTime)
		timerState.setSecondsLeft((timerState.isBreakTime ? timerState.workInterval : timerState.breakInterval) * 60)
	}, [timerState.secondsLeft, timerState.isBreakTime, timerState.workInterval, timerState.breakInterval])
	return (
		<div className='relative w-80 text-center'>
			{!isLoading && (
				<div className='text-7xl font-semibold'>
					{formatTime(timerState.secondsLeft)}
				</div>
			)}
			{isLoading ? (
				<Loader />
			) : sessionsResponse?.data ? (
				<>
					<PomodoroRounds
						workInterval={timerState.workInterval}
						secondsLeft={timerState.secondsLeft}
						isBreakTime={timerState.isBreakTime}
						breakInterval={timerState.breakInterval}
						rounds={rounds}
						nextRoundHandler={actions.nextRoundHandler}
						prevRoundHandler={actions.prevRoundHandler}
						activeRound={timerState.activeRound}
					/>
					<button
						className='mt-6 opacity-80 hover:opacity-100 transition-opacity'
						onClick={
							timerState.isRunning ? actions.pauseHandler : actions.playHandler
						}
						disabled={actions.isUpdateRoundPending}
					>
						{timerState.isRunning ? <Pause size={30} /> : <Play size={30} />}
					</button>
					<button
						onClick={() => {
							timerState.setIsRunning(false)
							deleteSession(sessionsResponse.data.id)
						}}
						className='absolute top-0 right-0 opacity-40 hover:opacity-90 transition-opacity'
						disabled={isDeletePending}
					>
						<RefreshCcw size={19} />
					</button>
				</>
			) : (
				<Button
					onClick={() => mutate()}
					className='mt-1'
					disabled={isPending}
				>
					Create session
				</Button>
			)}
		</div>
	)
}
