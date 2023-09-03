<template>
  <div v-if="form" class="tag-forward">
    <v-text-field v-model="form.tag" label="@Tag" :disabled="!isEditing" />
    <v-textarea v-model="form.to_chats" label="Chat ids (CSV)" :disabled="!isEditing" />
    <v-btn v-if="isEditing" color="light-blue-darken-2" type="button" @click="createOrEditTagForward(form)">Save</v-btn>
    <v-btn v-if="form.id && !isEditing" color="light-blue-darken-2" type="button" @click="isEditing = true">Edit</v-btn>
    <v-btn color="red-lighten-1" type="button" @click="handleWantToDeleteTagForward">Delete</v-btn>
  </div>
</template>

<script setup>
import {
  reactive,
  watch,
  ref,
  onBeforeMount
} from 'vue'
import {
  useCreateTagForwardMutation,
  useDeleteTagForwardMutation,
  useEditTagForwardMutation
} from "@/queries/tag-forwarder.query"

const { mutateAsync: createTagForwardMutation } = useCreateTagForwardMutation()
const { mutateAsync: editTagForwardMutation } = useEditTagForwardMutation()
const { mutateAsync: deleteTagForward } = useDeleteTagForwardMutation()

const emits = defineEmits(['delete'])

const props = defineProps({
  tag: {
    type: String,
    default: undefined,
  },
  toChats: {
    type: String,
    default: undefined,
  },
  forwardId: {
    type: Number,
    default: undefined,
  }
})

const form = reactive({
  tag: props.tag || '',
  to_chats: props.to_chats || '',
  id: props.forwardId || undefined,
})

const isEditing = ref(!props.forwardId)

const handleWantToDeleteTagForward = async () => {
  if (form.id) {
    await deleteTagForward(form.id)
    emits('delete')
  }
}

const createOrEditTagForward = async (form) => {
  if (form.id) {
    await editTagForwardMutation(form)
  } else {
    await createTagForwardMutation(form)
  }
  isEditing.value = false
}

onBeforeMount(() => {
  watch(() => [props.tag, props.toChats, props.forwardId], ([newTag, newToChats, newTagId]) => {
    form.tag = newTag
    form.to_chats = newToChats
    form.id = newTagId
    isEditing.value = false
  })
})
</script>

<style lang="scss" scoped>
.tag-forward {
  display: flex;
  gap: 24px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
