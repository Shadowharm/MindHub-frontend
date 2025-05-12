import {Checkbox as ChakraCheckbox} from "@chakra-ui/react";

const Checkbox = (props: {
	id?: string
	extra?: string
	color?:
		| 'red'
		| 'blue'
		| 'green'
		| 'yellow'
		| 'orange'
		| 'teal'
		| 'navy'
		| 'lime'
		| 'cyan'
		| 'pink'
		| 'purple'
		| 'amber'
		| 'indigo'
		| 'gray'
	[x: string]: any
}) => {
	const { extra, color, id, ...rest } = props
	return (
		<ChakraCheckbox.Root className={`${extra}`} id={id} {...rest} colorPalette={color}>
			<ChakraCheckbox.HiddenInput />
			<ChakraCheckbox.Control>
			</ChakraCheckbox.Control>
		</ChakraCheckbox.Root>

	)
}

export default Checkbox
