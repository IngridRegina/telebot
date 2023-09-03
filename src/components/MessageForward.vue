<template>
  <div class="message-forward">
    <v-text-field v-model="form.from_chat" label="From (chat id)" :disabled="!isEditing" />
    <v-textarea v-model="form.to_chats" label="Chat ids (CSV)" :disabled="!isEditing" />
    <v-btn v-if="isEditing" color="light-blue-darken-2" type="button" @click="createOrEditMessageForward(form)">Save</v-btn>
    <v-btn v-if="form.id && !isEditing" color="light-blue-darken-2" type="button" @click="isEditing = true">Edit</v-btn>
    <v-btn color="red-lighten-1" type="button" @click="handleWantToDeleteForward">Delete</v-btn>
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
  useCreateMessageForwardMutation,
  useDeleteMessageForwardMutation,
  useEditMessageForwardMutation
} from "@/queries/message-forwarder.query"

const { mutateAsync: createMessageForwardMutation } = useCreateMessageForwardMutation()
const { mutateAsync: editMessageForwardMutation } = useEditMessageForwardMutation()
const { mutateAsync: deleteForward } = useDeleteMessageForwardMutation()

const emits = defineEmits(['delete'])

const props = defineProps({
  fromChat: {
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
  from_chat: props.fromChat || '',
  to_chats: props.toChats || '',
  id: props.forwardId || undefined,
})

const isEditing = ref(!props.forwardId)

const handleWantToDeleteForward = async () => {
  if (props.forwardId) {
    await deleteForward(props.forwardId)
    emits('delete')
  }
}

const createOrEditMessageForward = async (form) => {
  if (form.id) {
    await editMessageForwardMutation(form)
  } else {
    await createMessageForwardMutation(form)
  }
  isEditing.value = false
}

onBeforeMount(() => {

  watch(() => [props.fromChat, props.toChats, props.forwardId], ([newFromChat, newToChats, newForwardId]) => {
    form.from_chat = newFromChat
    form.to_chats = newToChats
    form.id = newForwardId
    isEditing.value = false
  })
})
</script>

<style lang="scss" scoped>
.message-forward {
  display: flex;
  gap: 24px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
