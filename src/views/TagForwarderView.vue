<template>
  <section class="tag-forwarder">
    <h1 class="text-h4 mb-10">Tag Forwarder</h1>
    <div class="tag-forwarder__list">
      <TagForwardRow
          v-for="(forward, index) in forwards"
          :key="index"
          :forward-id="forward.id"
          :tag="forward.tag"
          :to-chats="forward.to_chats"
          @delete="deleteForwardRow(index)"
      />
      <v-btn
          color="#2e86c1"
          icon="mdi-plus"
          position="fixed"
          size="large"
          variant="elevated"
          @click="addForwardItem"
      />
    </div>
  </section>
</template>

<script setup>
import { useGetTagForwardsQuery} from '@/queries/tag-forwarder.query'
import TagForwardRow from '@/components/TagForwardRow.vue'
import { onBeforeMount, ref } from "vue"

const forwardCount = ref(1)
const forwards = ref([''])

const { data: tagForwards, suspense: suspenseTagForwards } = useGetTagForwardsQuery()

const addForwardItem = () => {
  forwardCount.value++
  forwards.value.push(forwardCount.value)
}

onBeforeMount(async () => {
  await suspenseTagForwards()
  if (tagForwards.value?.results?.length) {
    forwards.value = [...tagForwards.value.results]
  }
})

const deleteForwardRow = (index) => {
  forwards.value.splice(index, 1)
}
</script>

<style lang="scss" scoped>
.tag-forwarder {
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
