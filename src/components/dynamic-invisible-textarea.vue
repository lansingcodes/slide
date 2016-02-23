<template>
  <textarea
    rows="1"
    :style="style"
    v-model="value"
  ></textarea>
</template>

<script>
  // VENDOR
  import autosize from 'autosize'

  // HELPERS
  import QueryAttribute from '../helpers/query-attribute'

  export default {
    // PROPS
    props: {
      name: {
        type: String,
        required: true
      },
      defaultValue: {
        type: String,
        default: ''
      },
      style: {
        type: String,
        default: ''
      }
    },
    // STATE
    data () {
      const queryAttribute = QueryAttribute(this.name)
      return {
        queryAttribute: queryAttribute,
        value: queryAttribute.getValue() || this.defaultValue
      }
    },
    // LIFECYCLE
    ready () {
      autosize(this.$el)
    },
    // WATCHERS
    watch: {
      value (newValue, oldValue) {
        this.queryAttribute.setValue(newValue)
      }
    }
  }
</script>

<style lang="scss" scoped>
  textarea {
    margin: 0;
    padding: 0;
    background: transparent;
    border: none;
    outline: none;
    resize: none;
  }
</style>
