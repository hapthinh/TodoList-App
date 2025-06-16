import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTodo, deteleTodo, updateTodoStatus, deleteMultiTodo } from "app/services/api";


export function usepostTodoMutation(queryKey: any[]){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: postTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey})
        }
    })
} 

export function useDeleteTodoMutation(queryKey: any[]){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deteleTodo,
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey})
        }
    })
}

export function useUpdateTodoMutation(queryKey: any[], setEditId: (id: null) => void, setEditTodo: (todo: string) => void){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateTodoStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey})
            setEditId(null);
      setEditTodo("");
        }
    })
}

export function useDeleteSelectedTodoMutation(queryKey: any[],  setChecked: (arr: boolean[]) => void, setSelectedId: (arr: number[]) => void, todosLength: number){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteMultiTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey});
            setChecked(new Array(todosLength).fill(false));
      setSelectedId([]);
        }
    })
}