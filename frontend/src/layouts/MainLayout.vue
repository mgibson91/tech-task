<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <index/>
    </q-page-container>
  </q-layout>
</template>

<script>
import Index from '../pages/Index';

export default {
  name: 'MainLayout',

  components: {
    Index,
  },
};
</script>
