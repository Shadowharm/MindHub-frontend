'use client'
import React from 'react';

import {CloseButton, Dialog as ChakraDialog, DialogRootProps, Portal} from "@chakra-ui/react";

function Dialog(props: DialogRootProps & {trigger?: React.ReactNode, title?: React.ReactNode, footer?: React.ReactNode}) {
    return (
        <ChakraDialog.Root {...props}>
            <ChakraDialog.Trigger asChild>
                {props.trigger}
            </ChakraDialog.Trigger>
            <Portal>
                <ChakraDialog.Backdrop />
                <ChakraDialog.Positioner>
                    <ChakraDialog.Content>
                        <ChakraDialog.CloseTrigger />
                        <ChakraDialog.Header>
                            <ChakraDialog.Title>{props.title}</ChakraDialog.Title>
                        </ChakraDialog.Header>
                        <ChakraDialog.Body>{props.children}</ChakraDialog.Body>
                        <ChakraDialog.Footer>
                            {props.footer}
                        </ChakraDialog.Footer>
                        <ChakraDialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </ChakraDialog.CloseTrigger>
                    </ChakraDialog.Content>
                </ChakraDialog.Positioner>
            </Portal>
        </ChakraDialog.Root>
    );
}

export default Dialog;
