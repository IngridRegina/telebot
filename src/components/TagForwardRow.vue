<template>
  <v-form :id="'tagforward_' + index" class="telebot-form" @submit.prevent="createOrEditTagForward(form)">
    <v-text-field
        v-model="form.tag"
        class="telebot-form__input"
        label="@Tag"
        :disabled="!isEditing"
        :rules="rules"
    />
    <v-combobox
        v-model="form.to_chats"
        class="telebot-form__combobox"
        label="To chats (chat ID-s)"
        multiple
        clearable
        chips
        closable-chips
        :disabled="!isEditing"
        :rules="rules"
    />
    <v-combobox
        v-model="form.allowed_users"
        class="telebot-form__combobox"
        label="Allowed users (ID-s)"
        multiple
        clearable
        chips
        closable-chips
        :disabled="!isEditing"
        :rules="rules"
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
        @click="handleWantToDeleteTagForward"
    >
      Delete
    </v-btn>
    <v-dialog v-model="isConfirmationDialogOpen" width="auto">
      <v-card>
        <v-card-text>
          Are you sure you want to delete this tag forward rule?
        </v-card-text>
        <v-card-actions>
          <v-btn color="light-blue-darken-2" @click="isConfirmationDialogOpen = false">Cancel</v-btn>
          <v-btn color="red-lighten-1" @click="handleDeleteTagForward(form.id)">Delete</v-btn>
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
  watch,
  ref,
  onBeforeMount
} from 'vue'
import {
  useCreateTagForwardMutation,
  useDeleteTagForwardMutation,
  useEditTagForwardMutation
} from "@/queries/tag-forwarder.query"
import useSnackbar from "@/composables/useSnackbar"

const { mutateAsync: createTagForwardMutation } = useCreateTagForwardMutation()
const { mutateAsync: editTagForwardMutation } = useEditTagForwardMutation()
const { mutateAsync: deleteTagForward } = useDeleteTagForwardMutation()
const { showSnackbar, isSnackbarVisible, snackbarColor, snackbarMessage } = useSnackbar()

const emits = defineEmits(['delete'])

const props = defineProps({
  tag: {
    type: String,
    default: undefined,
  },
  toChats: {
    type: Array,
    default: undefined,
  },
  allowedUsers: {
    type: Array,
    default: undefined,
  },
  forwardId: {
    type: Number,
    default: undefined,
  },
  index: {
    type: Number,
    required: true,
  }
})

const rules = [
  value => {
    if (value.length) return true

    return 'This field is required.'
  },
]

const form = reactive({
  tag: props.tag || '',
  to_chats: props.toChats || [],
  allowed_users: props.allowedUsers || [],
  id: props.forwardId || undefined,
})

const isEditing = ref(!props.forwardId)
const isConfirmationDialogOpen = ref(false)

const handleWantToDeleteTagForward = async () => {
  if (form.id) {
    isConfirmationDialogOpen.value = true
  } else {
    emits('delete')
  }
}

const handleDeleteTagForward = async (forwardId) => {
  try {
    await deleteTagForward(forwardId)
    emits('delete')
  } catch (error) {
    showSnackbar('Error deleting tag forward', 'red-lighten-1')
  }
  isConfirmationDialogOpen.value = false
}

const createOrEditTagForward = async (form) => {
  if (form.id) {
    try {
      const editedTagForward = await editTagForwardMutation(form)
      Object.assign(form, editedTagForward)
      showSnackbar('Tag forward successfully edited', 'green-darken-2')
      isEditing.value = false
    } catch (error) {
      showSnackbar('Error editing tag forward', 'red-lighten-1')
    }
  } else {
    try {
      const newTagForward = await createTagForwardMutation(form)
      Object.assign(form, newTagForward)
      showSnackbar('Tag forward successfully created', 'green-darken-2')
      isEditing.value = false
    } catch (error) {
      showSnackbar('Error creating tag forward', 'red-lighten-1')
    }
  }
}

onBeforeMount(() => {
  watch(() => [props.tag, props.toChats, props.forwardId, props.allowedUsers], ([newTag, newToChats, newTagId, newAllowedUsers]) => {
    form.tag = newTag
    form.to_chats = newToChats
    form.allowed_users = newAllowedUsers
    form.id = newTagId
    isEditing.value = false
  })
})
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/form";
</style>
