import { useProfile } from '@/hooks/useProfile'

export function useLoadSettings() {
	const { data } = useProfile()
	const workInterval = data?.user.settings.workInterval || 0
	const breakInterval = data?.user.settings.breakInterval || 0

	return { workInterval, breakInterval }
}
