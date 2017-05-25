<template lang="html">
  <div class="pannel pannel-default"></div>
</template>

<script>
import { mapState, mapActions } from '../../../../lib/vue/vuex'
import * as types from '../../constants/types'
// import childComponent from  './childComponent.vue'

export default {
  name: 'detail',
  data(){
    return {

    }
  },
  components: {
    // 'child-component': childComponent
  },
  computed: Object.assign(mapState({
    params: state => state.filters.params
  }), {
    isSelf(){
      return this.params.type === 1
    }
  }),
  methods: Object.assign(mapActions({
    getDetail: types.GET_DETAIL_DATA
  }), {
    update(){

    }
  }),
  created() {},
  mounted() {
    this.$store.dispatch(types.GET_DETAIL_DATA);
  }
}
</script>
