<template>
  <textarea
    rows="1"
    :style="style"
  >{{ defaultValue }}</textarea>
</template>

<script>
  // VENDOR
  import autosize from 'autosize'

  export default {
    // PROPS
    props: {
      defaultValue: {
        type: String,
        default: ''
      },
      style: {
        type: String,
        default: ''
      }
    },
    // LIFECYCLE
    ready () {
      autosize(this.$el)
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
