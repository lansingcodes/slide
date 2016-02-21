<template>
  <a :href="groupURL" target="_blank" :title="groupName">
    <img v-if="source" :src="source" :alt="groupName">
    <img v-else src="../assets/images/lansingcodes-logo.svg" :alt="groupName">
  </a>
</template>

<script>
  export default {
    // PROPS
    props: [ 'event' ],
    // COMPUTED
    computed: {
      source () {
        return this.event && this.event.relationships.group.attributes.logo
      },
      groupName () {
        if (this.source) {
          return this.event.relationships.group.attributes.name
        } else {
          return 'Click here for instructions on setting a photo for your group. Once you do, it will start appearing here within an hour.'
        }
      },
      groupURL () {
        if (this.source) {
          return this.event && this.event.links.self
        } else {
          return 'http://help.meetup.com/customer/en/portal/articles/930770-meetup-group-settings'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/globals';

  img {
    width: $logo-size;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
