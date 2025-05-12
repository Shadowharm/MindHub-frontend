import { forwardRef } from 'react'

interface InputFieldProps {
	id: string
	label: string
	extra?: string
	placeholder: string
	variant?: "outline" | "subtle" | "flushed" | undefined
	// state?: 'error' | 'success'
	disabled?: boolean
	type?: string
	isNumber?: boolean
	errorMessage?: string
}
import {
	Field as ChakraField, Input
} from "@chakra-ui/react"

export const Field = forwardRef<HTMLInputElement, InputFieldProps>(
	(
		{ label, id, extra, type, placeholder, disabled, isNumber, errorMessage, ...rest },
		ref
	) => {
		return (
			<ChakraField.Root className={`${extra}`} invalid={!!errorMessage}>
				<ChakraField.Label>
					{label}
				</ChakraField.Label>
				<Input
					colorPalette="purple"
					ref={ref}
					disabled={disabled}
				    type={type}
				    id={id}
				    placeholder={placeholder}
				    onKeyDown={event => {
					   if (
						   isNumber &&
						   !/[0-9]/.test(event.key) &&
						   event.key !== 'Backspace' &&
						   event.key !== 'Tab' &&
						   event.key !== 'Enter' &&
						   event.key !== 'ArrowLeft' &&
						   event.key !== 'ArrowRight'
					   ) {
						   event.preventDefault()
					   }
				   }}
				   {...rest}/>
				<ChakraField.ErrorText>{errorMessage}</ChakraField.ErrorText>
			</ChakraField.Root>
		)
	}
)

Field.displayName = 'field'
