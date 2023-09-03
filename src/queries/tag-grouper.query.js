import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'

export function useGetTagGroupsQuery() {
  return useQuery({
    queryKey: ['tag-groups'],
    queryFn: async () => {
      const { data } = await axios.get('/api/tag-groups/')
      return data
    },
  })
}

export function useCreateTagGroupMutation() {
  return useMutation({
    mutationFn: async (form) => {
      const { data } = await axios.post(
        '/api/tag-groups/', form,
      )
      return data
    },
  })
}

export function useEditTagGroupMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (form) => {
      if (!form.id) {
        return
      }

      const { data } = await axios.put(
        `/api/tag-groups/${form.id}/`, {
          tag: form.tag,
          usernames: form.usernames
        },
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tag-groups'])
    },
  })
}

export function useDeleteTagGroupMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (tagId) => {
      if (!tagId) {
        return
      }

      await axios.delete(`/api/tag-groups/${tagId}/`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tag-groups'])
    },
  })
}
