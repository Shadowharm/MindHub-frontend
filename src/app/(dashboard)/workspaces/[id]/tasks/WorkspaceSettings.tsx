'use client';

import { Button, Heading, Text } from "@chakra-ui/react";


import { Dialog as ChakraDialog } from '@chakra-ui/react';
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";



import Dialog from "@/components/ui/dialog";
import { Field } from "@/components/ui/fields/Field";

import {CreateWorkspace, IUsersOnWorkspaces, IWorkspace} from "@/types/workspace.types";



import { useUpdateWorkspace } from "@/app/(dashboard)/workspaces/[id]/tasks/hooks/useUpdateWorkspace";
import { workspaceService } from "@/services/workspace.service";
import WorkspaceMembers from "@/app/(dashboard)/workspaces/[id]/tasks/WorkspaceMembers";


function WorkspaceSettings({profile, data}: {profile: IUsersOnWorkspaces, data: IWorkspace}) {
    const router = useRouter()
    const params = useParams<{id: string}>()
    const {updateWorkspace} = useUpdateWorkspace()

    const { register, handleSubmit, reset } = useForm<CreateWorkspace>({
        mode: 'onChange'
    })

    useEffect(() => {
        if (data) {
            reset({
               name: data.name,
                description: data.description,
            })
        }
    }, [data])

    const onSubmit: SubmitHandler<CreateWorkspace> = async data => {
			updateWorkspace({id: params.id, data })
		}

    const deleteWorkspace = async () => {
        try {
            await workspaceService.deleteWorkspace(params.id)
            router.push('/workspaces')
        } catch (e) {
            console.error(e)
        }
    }

    const leaveWorkspace = async () => {
        try {
            await workspaceService.toggleWorkspaceMembers(params.id, {
                exclude: profile?.user?.id
            })
            router.push('/workspaces')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="flex flex-row justify-between mb-3">
            <div className="flex flex-row gap-2 items-center">
                <Heading>{data?.name}</Heading>
                <Text textStyle="xs">{data?.description}</Text>
            </div>
            <div className='flex flex-row gap-2'>
                <Dialog
                    trigger={<Button>Settings</Button>}
                    footer={(profile?.role !== 'member') && <><ChakraDialog.ActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </ChakraDialog.ActionTrigger>
                    <ChakraDialog.ActionTrigger asChild>
                        <Button colorPalette="blue" onClick={handleSubmit(onSubmit)}>Edit</Button>
                    </ChakraDialog.ActionTrigger>
                    </>}
                    title={'Edit workspace'}
                >

                    <form>
                        <Field
                            id='name'
                            label='Name: '
                            disabled={profile?.role === 'member'}
                            placeholder='Enter name: '
                            {...register('name', {
                                required: 'Name is required!'
                            })}
                            extra='mb-4'
                        />

                        <Field
                            id='description'
                            label='Description: '
                            disabled={profile?.role === 'member'}
                            placeholder='Enter description: '
                            {...register('description')}
                            extra='mb-4'
                        />
                    </form>
                    {data && <WorkspaceMembers data={data} profile={profile} leaveWorkspace={leaveWorkspace}/>}

                </Dialog>


                {(profile?.role === 'owner' && <Dialog
                    trigger={<Button colorPalette='red'>Delete</Button>}
                    role="alertdialog"
                    footer={<><ChakraDialog.ActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </ChakraDialog.ActionTrigger>
                        <Button colorPalette="red" onClick={deleteWorkspace}>Delete</Button></>}
                    title={'Are you sure?'}
                >
                    <p>
                        This action cannot be undone. This will permanently delete your
                        workspace and remove your data from our systems.
                    </p>
                </Dialog>)}

                <Dialog
                    trigger={<Button colorPalette='red'>Leave</Button>}
                    role="alertdialog"
                    footer={<><ChakraDialog.ActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </ChakraDialog.ActionTrigger>
                        <Button colorPalette="red" onClick={leaveWorkspace}>Leave</Button></>}
                    title={'Are you sure?'}
                >
                    <p>
                        This action cannot be undone. This will permanently leave from
                        workspace and remove your data from our systems.
                    </p>
                </Dialog>
            </div>
        </div>
    );
}

export default WorkspaceSettings;
