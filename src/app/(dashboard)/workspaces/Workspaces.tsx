'use client'
import React from 'react';
import {useWorkspaces} from "./hooks/useWorkspaces";
import {Grid, Card, Button} from "@chakra-ui/react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {CreateWorkspace} from "@/types/workspace.types";
import {workspaceService} from "@/services/workspace.service";
import {Field} from "@/components/ui/fields/Field";
import Loader from "@/components/ui/Loader";
import {useRouter} from "next/navigation";


function Workspaces() {
    const queryClient = useQueryClient()
    const { items, isLoading } = useWorkspaces()
    const router = useRouter()
    const {	register, handleSubmit, reset } = useForm<CreateWorkspace>({
        mode: 'onChange',
    })


    const { mutate } = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: CreateWorkspace) => workspaceService.createWorkspace(data),
        onSuccess () {
            queryClient.invalidateQueries({
                queryKey: ['workspaces']
            })
            toast.success('Workspace successfully added')
            reset()
        }
    })

    const onSubmit: SubmitHandler<CreateWorkspace> = data => {
        mutate(data)
    }

    return (isLoading ? (
                <Loader />
            ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap="6">
            {items?.map(item => (
                <Card.Root key={item.id}>
                    <Card.Header>{item.name}</Card.Header>
                    <Card.Body>
                        <Card.Description>
                            {item.description}
                        </Card.Description>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => router.push(`/workspaces/${item.id}/tasks`)}>Tasks</Button>
                    </Card.Footer>
                </Card.Root>))}
            <Card.Root variant='subtle'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card.Header>
                        <Field
                            id='name'
                            label='Name:'
                            placeholder='Enter name:'
                            extra='mb-4'
                            {...register('name', {
                                required: 'Name is required!'
                            })}
                        />
                    </Card.Header>
                    <Card.Body>
                        <Field
                            id='description'
                            label='Description:'
                            placeholder='Enter description:'
                            extra='mb-4'
                            {...register('description')}
                        />
                    </Card.Body>
                    <Card.Footer>
                        <Button type="submit">Create</Button>
                    </Card.Footer>
                </form>
            </Card.Root>
        </Grid>)
    );
}

export default Workspaces;
