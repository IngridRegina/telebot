<template>
  <v-form
      v-model="isFormValid"
      class="telebot-form"
      :disabled="!isEditing"
      @submit.prevent="createOrEditMessageForward(form)"
  >
    <v-text-field
        v-model="form.from_chat"
        class="telebot-form__input"
        label="From (chat ID)"
        :rules="rules"
        required
    />
    <v-combobox
        v-model="form.to_chats"
        class="telebot-form__combobox"
        label="To chats (chat ID-s)"
        multiple
        clearable
        chips
        closable-chips
        :rules="rules"
        required
    />
    <v-btn
        v-if="isEditing"
        color="light-blue-darken-2"
        type="submit"
    >
      Save
    </v-btn>
    <v-btn
        v-if="form.id && !isEditing"
        color="light-blue-darken-2"
        type="button"
        @click="isEditing = true"
    >
      Edit
    </v-btn>
    <v-btn
        color="red-lighten-1"
        type="button"
        @click="handleWantToDeleteForward"
    >
      Delete
    </v-btn>
    <v-dialog v-model="isConfirmationDialogOpen" width="auto">
      <v-card>
        <v-card-text>
          Are you sure you want to delete this message forward rule?
        </v-card-text>
        <v-card-actions>
          <v-btn color="light-blue-darken-2" @click="isConfirmationDialogOpen = false">Cancel</v-btn>
          <v-btn color="red-lighten-1" @click="handleDeleteForward(form.id)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
        v-model="isSnackbarVisible"
        :timeout="1000"
        :color="snackbarColor"
        transition="scroll-y-reverse-transition"
    >
      {{ snackbarMessage }}
      <template #actions>
        <v-btn
            color="white"
            icon="mdi-close"
            @click="isSnackbarVisible = false"
        />
      </template>
    </v-snackbar>
  </v-form>
</template>

<script setup>
import {
  reactive,
  ref,
} from 'vue'
import {
  useCreateMessageForwardMutation,
  useDeleteMessageForwardMutation,
  useEditMessageForwardMutation
} from '@/queries/message-forwarder.query'
import useSnackbar from '@/composables/useSnackbar'

const { mutateAsync: createMessageForwardMutation } = useCreateMessageForwardMutation()
const { mutateAsync: editMessageForwardMutation } = useEditMessageForwardMutation()
const { mutateAsync: deleteForward } = useDeleteMessageForwardMutation()
const { showSnackbar, isSnackbarVisible, snackbarColor, snackbarMessage } = useSnackbar()

const emits = defineEmits(['delete', 'upsert'])

const props = defineProps({
  fromChat: {
    type: String,
    default: undefined,
  },
  toChats: {
    type: Array,
    default: undefined,
  },
  forwardId: {
    type: Number,
    default: undefined,
  },
})

const isFormValid = ref(false)

const form = reactive({
  from_chat: props.fromChat || '',
  to_chats: props.toChats || [],
  id: props.forwardId || undefined,
})

const rules = [
  value => {
    if (value.length) return true

    return 'This field is required.'
  },
]

const isEditing = ref()
const isConfirmationDialogOpen = ref(false)

const handleWantToDeleteForward = async () => {
  if (form.id) {
    isConfirmationDialogOpen.value = true
  } else {
    emits('delete')
  }
}

const handleDeleteForward = async () => {
  try {
    await deleteForward(form.id)
    emits('delete')
    isConfirmationDialogOpen.value = false
  } catch (e) {
    showSnackbar('Error deleting message forward', 'red-lighten-1')
  }
}

const createOrEditMessageForward = async (form) => {
  if (isFormValid.value) {
    if (form.id) {
      try {
        const editedForward = await editMessageForwardMutation(form)
        Object.assign(form, editedForward)
        emits('upsert', form)
        showSnackbar('Message forward successfully edited', 'green-darken-2')
        isEditing.value = false
      } catch (e) {
        showSnackbar('Error editing message forward', 'red-lighten-1')
      }
    } else {
      try {
        const newForward = await createMessageForwardMutation(form)
        Object.assign(form, newForward)
        emits('upsert', form)
        showSnackbar('Message forward successfully created', 'green-darken-2')
        isEditing.value = false
      } catch (e) {
        showSnackbar('Error creating message forward', 'red-lighten-1')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/form";
</style>
