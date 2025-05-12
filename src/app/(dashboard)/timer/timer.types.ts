import type { Dispatch, SetStateAction } from 'react'

import type { IPomodoroRoundResponse } from '@/types/pomodoro.types'

export interface ITimerState {
	breakInterval: number
	workInterval: number
	isRunning: boolean
	secondsLeft: number
	activeRound: IPomodoroRoundResponse | undefined
	isBreakTime: boolean

	setIsBreakTime: Dispatch<SetStateAction<boolean>>
	setIsRunning: Dispatch<SetStateAction<boolean>>
	setSecondsLeft: Dispatch<SetStateAction<number>>
	setActiveRound: Dispatch<SetStateAction<IPomodoroRoundResponse | undefined>>
}
