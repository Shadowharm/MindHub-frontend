'use client'
import React from 'react';
import {Box, Button, Flex, HStack, IconButton, Input, Text, VStack} from "@chakra-ui/react";
import {SingleSelect} from "@/components/ui/task-edit/SingleSelect";
import {ERole, IInviteMember, IUsersOnWorkspaces, IWorkspace, Roles} from "@/types/workspace.types";
import {Controller, useForm} from "react-hook-form";
import {Field} from "@/components/ui/fields/Field";
import {workspaceService} from "@/services/workspace.service";
import {useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";


function WorkspaceMembers({data, profile, leaveWorkspace}: {data: IWorkspace, profile: IUsersOnWorkspaces, leaveWorkspace: () => void}) {
    const { register, handleSubmit, control, reset } = useForm<IInviteMember>({
        mode: 'onChange',
        defaultValues: {
            role: ERole.MEMBER,
        }
    })
    const queryClient = useQueryClient()

    const inviteMember = async (user: IInviteMember) => {
        try {
            await workspaceService.toggleWorkspaceMembers(data.id, {
                include: user
            })
            queryClient.invalidateQueries({
                queryKey: ['workspace']
            })
            reset({
                role: ERole.MEMBER,
                email: ''
            })
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    const removeMember = async (id: string) => {
        try {
            await workspaceService.toggleWorkspaceMembers(data.id, {
                exclude: id
            })
            queryClient.invalidateQueries({
                queryKey: ['workspace']
            })
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    return (
        <VStack align="start" p={5} w="100%" borderWidth="1px" borderRadius="lg">
            <Text fontSize="lg" fontWeight="bold">
                Members
            </Text>

            <Box w="100%">
                {data?.users?.map((member) => (
                    <Flex
                        key={member.user.id}
                        align="center"
                        justify="space-between"
                        py={2}
                        borderBottomWidth="1px"
                        _last={{ borderBottomWidth: 0 }}
                    >
                        <Box>
                            <Text fontWeight="semibold">{member.user.name}</Text>
                            <Text fontSize="sm" color="gray.500">
                                Role: {member.role}
                            </Text>
                            <Text fontSize="sm" color="gray.400">
                                Invited by: {member.invitedBy.name}
                            </Text>
                        </Box>
                        {(member.user.id !== profile.user.id) && (profile.role !== 'member') && (member.role !== 'owner') && <IconButton
                            aria-label="Remove member"
                            size="sm"
                            onClick={() => removeMember(member.user.id)}
                        >Remove</IconButton>}
                        {(member.user.id === profile.user.id) && <IconButton
                            aria-label="Leave"
                            size="sm"
                            colorPalette='red'
                            onClick={leaveWorkspace}
                        >Leave</IconButton>}
                    </Flex>
                ))}
            </Box>

            <hr />

            {profile.role !== 'member' && (<VStack w="100%" align="start">
                <Text fontSize="md" fontWeight="bold">
                    Invite new member
                </Text>
                <HStack w="100%">
                    <Field
                        id='email'
                        label='Email: '
                        placeholder='Enter email: '
                        {...register('email', {
                            required: 'Email is required!'
                        })}
                        extra='mb-4'
                    />
                    <Controller
                        control={control}
                        name='role'
                        render={({ field: { value, onChange } }) => (
                            <SingleSelect
                                data={Roles.filter(item => item.value !== 'owner')}
                                onChange={onChange}
                                value={value}
                                clearable={false}
                            />
                        )}
                    />
                    <Button
                        colorScheme="blue"
                        onClick={handleSubmit(inviteMember)}
                    >
                        Invite
                    </Button>
                </HStack>
            </VStack>)}
        </VStack>
    );
}

export default WorkspaceMembers;
