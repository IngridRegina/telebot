<template>
  <div class="message-forward">
    <v-text-field v-model="form.tag" label="@Tag" :disabled="!isEditing" />
    <v-textarea v-model="form.usernames" label="Usernames (CSV)" :disabled="!isEditing" />
    <v-btn v-if="isEditing" color="light-blue-darken-2" type="button" @click="createOrEditTagGroup(form)">Save</v-btn>
    <v-btn v-if="form.id && !isEditing" color="light-blue-darken-2" type="button" @click="isEditing = true">Edit</v-btn>
    <v-btn color="red-lighten-1" type="button" @click="handleWantToDeleteTagGroup">Delete</v-btn>
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
  useCreateTagGroupMutation,
  useDeleteTagGroupMutation,
  useEditTagGroupMutation
} from "@/queries/tag-grouper.query"

const { mutateAsync: createTagGroupMutation } = useCreateTagGroupMutation()
const { mutateAsync: editTagGroupMutation } = useEditTagGroupMutation()
const { mutateAsync: deleteTagGroup } = useDeleteTagGroupMutation()

const emits = defineEmits(['delete'])

const props = defineProps({
  tag: {
    type: String,
    default: undefined,
  },
  usernames: {
    type: String,
    default: undefined,
  },
  tagId: {
    type: Number,
    default: undefined,
  }
})

const form = reactive({
  tag: props.tag || '',
  usernames: props.usernames || '',
  id: props.tagId || undefined,
})

const isEditing = ref(!props.tagId)

const handleWantToDeleteTagGroup = async () => {
  if (props.tagId) {
    await deleteTagGroup(props.tagId)
  }
  emits('delete')
}

const createOrEditTagGroup = async (form) => {
  if (form.id) {
    await editTagGroupMutation(form)
  } else {
    await createTagGroupMutation(form)
  }
  isEditing.value = false
}

onBeforeMount(() => {
  watch(() => [props.tag, props.usernames, props.tagId], ([newTag, newUsernames, newTagId]) => {
    form.tag = newTag
    form.usernames = newUsernames
    form.id = newTagId
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
