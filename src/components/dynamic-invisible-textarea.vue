<template>
  <textarea
    rows="1"
    :style="style"
  >
    {{ defaultValue }}
  </textarea>
</template>

<script>
  import autosize from 'autosize'

  export default {
    props: [ 'defaultValue', 'style' ],
    ready () {
      autosize(this.$el)
    }
  }
</script>

<style scoped>
  textarea {
    background: transparent;
    border: none;
    outline: none;
    resize: none;
    padding: 0;
  }
</style>
