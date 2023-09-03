<template>
  <section class="tag-grouper">
    <h1 class="text-h4 mb-10">Tag Grouper</h1>
    <div class="tag-grouper__list">
      <TagGroupRow
          v-for="(group, index) in groups"
          :key="index"
          :tag-id="group.id"
          :tag="group.tag"
          :usernames="group.usernames"
          @delete="deleteTagGroupRow(index)"
      />
      <v-btn
          color="#2e86c1"
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

const tagGroupCount = ref(1)
const groups = ref([''])

const { data: tagGroups, suspense: suspenseTagGroups } = useGetTagGroupsQuery()

const addTagGroupRow = () => {
  tagGroupCount.value++
  groups.value.push(tagGroupCount.value)
}

onBeforeMount(async () => {
  await suspenseTagGroups()
  if (tagGroups.value?.results?.length) {
    groups.value = [...tagGroups.value.results]
  }
})

const deleteTagGroupRow = (index) => {
  groups.value.splice(index, 1)
}
</script>

<style lang="scss" scoped>
.tag-grouper {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-bottom: 100px;

    @media (max-width: 768px) {
      gap: 40px;
    }
  }

  .v-btn {
    bottom: 24px;
    right: 24px;
  }
}
</style>
