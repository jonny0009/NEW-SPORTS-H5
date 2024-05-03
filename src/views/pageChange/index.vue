<template>
  <div class="pageChange">
    <component :is="currentCom" />
  </div>
</template>

<script>
//
//
import home98 from '@/views/start/index'
import home7 from '@/views/home/index'
//
export default {
  name: 'PageChange',
  components: {},
  data() {
    return {
      currentCom: ''
    }
  },
  created() {
    //
  },
  methods: {
    //
  }
}
</script>
