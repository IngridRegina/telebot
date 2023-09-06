import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'

export function useGetMessageForwardsQuery() {
  return useQuery({
    queryKey: ['message-forwards'],
    queryFn: async () => {
      const { data } = await axios.get('/api/forwardings/')
      return data
    },
  })
}

export function useCreateMessageForwardMutation() {
  return useMutation({
    mutationFn: async (form) => {
      const { data } = await axios.post('/api/forwardings/', form)
      return data
    },
  })
}

export function useEditMessageForwardMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (form) => {
      if (!form.id) {
        return
      }

      const { data } = await axios.put(`/api/forwardings/${form.id}/`, {
        from_chat: form.from_chat,
        to_chats: form.to_chats,
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['message-forwards'])
    },
  })
}

export function useDeleteMessageForwardMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (forwardId) => {
      if (!forwardId) {
        return
      }

      await axios.delete(`/api/forwardings/${forwardId}/`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['message-forwards'])
    },
  })
}
