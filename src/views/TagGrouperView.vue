<template>
  <section class="telebot-view">
    <h1 class="text-h4 mb-10">Tag Grouper</h1>
    <div class="telebot-view__list">
      <TagGroupRow
          v-for="(group, index) in groups"
          :key="'tag-group-' + index"
          :tag-id="group.id"
          :tag="group.tag"
          :usernames="group.usernames"
          @delete="deleteTagGroupRow(index)"
          @upsert="(item) => updateTagGroupRow(index, item)"
      />
      <v-btn
          color="light-blue-darken-2"
          icon="mdi-plus"
          position="fixed"
          size="large"
          variant="elevated"
          @click="addTagGroupRow"
      />
    </div>
  </section>
</template>

<script setup>
import { useGetTagGroupsQuery } from '@/queries/tag-grouper.query'
import { onBeforeMount, ref } from "vue"
import TagGroupRow from "@/components/TagGroupRow.vue"

const groups = ref([])

const { data: tagGroups, suspense: suspenseTagGroups } = useGetTagGroupsQuery()

const addTagGroupRow = () => {
  groups.value.push({})
}

onBeforeMount(async () => {
  await suspenseTagGroups()
  if (tagGroups.value?.results?.length) {
    groups.value = [...tagGroups.value.results]
  } else {
    groups.value = [{}]
  }
})

const deleteTagGroupRow = (index) => {
  groups.value.splice(index, 1)
}

const updateTagGroupRow = (index, item) => {
  groups.value.splice(index, 1, item)
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/views/default";
</style>
