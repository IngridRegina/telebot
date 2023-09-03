import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'

export function useGetTagForwardsQuery() {
  return useQuery({
    queryKey: ['tag-forwards'],
    queryFn: async () => {
      const { data } = await axios.get('/api/tagforwardings/',
      )
      return data
    },
    cacheTime: 0,
    staleTime: 0,
  })
}

export function useCreateTagForwardMutation() {
  return useMutation({
    mutationFn: async (form) => {
      const { data } = await axios.post(
        '/api/tagforwardings/', {
          tag: form.tag,
          to_chats: form.to_chats
        },
      )
      return data
    },
  })
}

export function useEditTagForwardMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (form) => {
      if (!form.id) {
        return
      }

      const { data } = await axios.put(
        `/api/tagforwardings/${form.id}/`, {
          tag: form.tag,
          to_chats: form.to_chats
        },
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tag-forwards'])
    },
  })
}

export function useDeleteTagForwardMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (forwardId) => {
      if (!forwardId) {
        return
      }

      await axios.delete(`/api/tagforwardings/${forwardId}/`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tag-forwards'])
    },
  })
}
