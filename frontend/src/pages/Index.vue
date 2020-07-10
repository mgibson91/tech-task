<template>
  <q-page class="column items-center bg-grey-3 padding-medium">
    <q-card class="flex-auto card">
      <div>
        <div class="url-header padding-medium">
          Shortened urls
        </div>

        <!-- Add new url section -->
        <div
          class="flex-row align-items-center justify-content-between padding-medium"
        >
          <q-input
            class="flex-auto margin-right-medium"
            clearable
            color="brand1"
            filled
            id="new-url"
            placeholder="Enter URL"
            v-model="url"
          />
          <q-btn
            :loading="loading"
            @click="shortenUrl()"
            class="btn-shorten"
            color="brand2"
            label="Shorten"
            rounded
            text-color="brand1"
          >
            <template v-slot:loading>
              <q-spinner-facebook/>
            </template>
          </q-btn>
        </div>

        <short-url-list
          :items="shortenedUrls"
          class="min-width-300px"
        />
      </div>
    </q-card>
  </q-page>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from 'vue';
import axios from 'axios';

import ShortUrlList from 'components/short-url-list.vue';
import Component from 'app/node_modules/vue-class-component';
import { ShortUrl } from 'components/models';
import { Notify } from 'app/node_modules/quasar';

const baseUrl = `http://localhost:6002`;

@Component({
  components: { ShortUrlList },
})
export default class PageIndex extends Vue {
    url = '';

    shortenedUrls: ShortUrl[] = [];

    loading = false;

    async created() {
      await this.getUrls();
    }

    async getUrls() {
      try {
        const { data } = await axios.get(`${baseUrl}/get-short-urls`);
        if (data) {
          // We should be doing this in the backend, reversing as Mongo returns in order of entry
          this.shortenedUrls = (data as ShortUrl[]).reverse();
        }
      }
      catch (err) {
        console.error(err);

        Notify.create({
          type: 'negative',
          message: 'Unable to add URL',
        });
      }
    }

    async shortenUrl() {
      try {
        this.loading = true;
        const { data: added } = await axios.post(`${baseUrl}/add-short-url`, { url: this.url });

        if (added) {
          // Add to start of the array. This allows us to show newest urls at the top
          this.shortenedUrls.unshift(added as ShortUrl);
        }
      }
      catch (err) {
        console.error(err);

        let message = 'Unable to add URL';

        if (err?.response?.data?.error === 'ExpressValidationError') {
          message = 'Invalid URL';
        }

        Notify.create({
          type: 'negative',
          message,
        });
      }
      finally {
        this.loading = false;
      }
    }
}
</script>

<style>
  @import "../css/app.css";

  .card {
    width: 600px;
  }

  @media screen and (max-width: 632px) {
    .card {
      width: 100%;
      max-width: 600px;
    }
  }

  .url-header {
    font-weight: bold;
    color: white;
    background: #09143D;
  }

  .btn-shorten {
    height: 40px
  }

  #new-url {
    color: red;
  }
</style>
