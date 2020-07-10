<template>
  <div>
    <q-list
      class="flex-auto"
      separator
    >
      <q-item
        v-for="(item, index) of items"
        :key="index"
      >
        <div class="flex-auto flex-row justify-content-between position-relative">
          <div class="flex-col">
            <a
              :href="item.shortUrl"
              class="url-short margin-bottom-small"
            >{{ item.shortUrl }}</a>
            <a
              :href="item.originalUrl"
              class="truncate"
            >{{ item.originalUrl }}</a>
          </div>

          <div class="url-created">
            {{ durationString(item.createdAt) }} ago
          </div>
        </div>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { durationString } from 'src/utils/time';
import { ShortUrl } from './models';

  @Component
export default class ShortUrlList extends Vue {
    @Prop({ type: Array, required: true }) readonly items!: ShortUrl[];

    durationString = durationString;
}
</script>

<style scoped>
  .url-short {
    color: #09143D;
    font-weight: bold;
  }

  .url-created {
    color: #888;
    font-style: italic;
    font-size: 12px;
    position: absolute;
    top: 0;
    right: 0;
  }

  /*@media (max-width: 500px) {*/
  /*  .flex-row {*/
  /*    flex-direction: column;*/
  /*  }*/
  /*}*/
</style>
