'use client'

import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { PropsWithChildren, useState } from 'react'
import {ChakraProviderWrap} from "@/components/ui/provider";
import {ErrorBoundary} from "react-error-boundary";

export function Providers({ children }: PropsWithChildren) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false
				}
			}
		})
	)

	return (
		<ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
			<ChakraProviderWrap>
				<QueryClientProvider client={client}>
					{children}
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</ChakraProviderWrap>
		</ErrorBoundary>
	)
}
