<template>
  <a :href="groupURL" target="_blank" :title="groupName">
    <img v-if="source" :src="source" :alt="groupName">
    <img v-else src="../assets/images/lansingcodes-logo.svg" :alt="groupName">
  </a>
</template>

<script>
  export default {
    props: [ 'event' ],
    computed: {
      source () {
        return this.event && this.event.relationships.group.attributes.logo
      },
      groupName () {
        return this.event && this.event.relationships.group.attributes.name
      },
      groupURL () {
        return this.event && this.event.links.self
      }
    }
  }
</script>

<style scoped>
  img {
    width: 75px;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
