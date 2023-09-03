<template>
  <v-form
      v-model="isFormValid"
      class="telebot-form"
      :disabled="!isEditing"
      @submit.prevent="createOrEditTagGroup(form)"
  >
    <v-text-field
        v-model="form.tag"
        class="telebot-form__input"
        label="@Tag"
        :rules="rules"
    />
    <v-combobox
        v-model="form.usernames"
        class="telebot-form__combobox"
        label="Usernames"
        multiple
        clearable
        chips
        closable-chips
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
        @click="isEditing = true">
      Edit
    </v-btn>
    <v-btn
        color="red-lighten-1"
        type="button"
        @click="handleWantToDeleteTagGroup">
      Delete
    </v-btn>
    <v-dialog v-model="isConfirmationDialogOpen" width="auto">
      <v-card>
        <v-card-text>
          Are you sure you want to delete this tag group rule?
        </v-card-text>
        <v-card-actions>
          <v-btn color="light-blue-darken-2" @click="isConfirmationDialogOpen = false">Cancel</v-btn>
          <v-btn color="red-lighten-1" @click="handleDeleteTagGroup(form.id)">Delete</v-btn>
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
  watchEffect,
} from 'vue'
import {
  useCreateTagGroupMutation,
  useDeleteTagGroupMutation,
  useEditTagGroupMutation
} from "@/queries/tag-grouper.query"
import useSnackbar from "@/composables/useSnackbar";

const { mutateAsync: createTagGroupMutation } = useCreateTagGroupMutation()
const { mutateAsync: editTagGroupMutation } = useEditTagGroupMutation()
const { mutateAsync: deleteTagGroup } = useDeleteTagGroupMutation()
const { showSnackbar, isSnackbarVisible, snackbarColor, snackbarMessage } = useSnackbar()

const emits = defineEmits(['delete', 'upsert'])

const props = defineProps({
  tag: {
    type: String,
    default: undefined,
  },
  usernames: {
    type: Array,
    default: undefined,
  },
  tagId: {
    type: Number,
    default: undefined,
  },
})

const isFormValid = ref(false)
const isComponentCreated = ref(false)

const rules = [
  value => {
    if (value.length) return true

    return 'This field is required.'
  },
]

const form = reactive({})

const isEditing = ref(!props.tagId)
const isConfirmationDialogOpen = ref(false)

const handleWantToDeleteTagGroup = async () => {
  if (form.id) {
    isConfirmationDialogOpen.value = true
  } else {
    emits('delete')
  }
}

const handleDeleteTagGroup = async (tagId) => {
  try {
    await deleteTagGroup(tagId)
    emits('delete')
  } catch (e) {
    showSnackbar('Error deleting tag group', 'red-lighten-1')
  }
  isConfirmationDialogOpen.value = false
}

const createOrEditTagGroup = async (form) => {
  if (isFormValid.value) {
    if (form.id) {
      try {
        const editedTagGroup = await editTagGroupMutation(form)
        Object.assign(form, editedTagGroup)
        emits('upsert', form)
        showSnackbar('Tag group successfully edited', 'green-darken-2')
        isEditing.value = false
      } catch (e) {
        showSnackbar('Error editing tag group', 'red-lighten-1')
      }
    } else {
      try {
        const newTagGroup = await createTagGroupMutation(form)
        Object.assign(form, newTagGroup)
        emits('upsert', form)
        showSnackbar('Tag group successfully created', 'green-darken-2')
        isEditing.value = false
      } catch (e) {
        showSnackbar('Error creating tag group', 'red-lighten-1')
      }
    }
  }
}

watchEffect(() => {
  if (isComponentCreated.value === false) {
    form.tag = props.tag || ''
    form.usernames = props.usernames || []
    form.id = props.tagId || undefined
    isEditing.value = !props.tagId
    isComponentCreated.value = true
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/form";
</style>
