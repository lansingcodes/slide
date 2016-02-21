<template>
  <div class="slide-title">
    <h1>
      <dynamic-invisible-textarea
        v-if="event"
        :default-value="eventName"
      ></dynamic-invisible-textarea>
      <span v-else>
        Visit
        <a href="#{{currentTopic}}">#{{currentTopic}}</a>
        to generate a<br>
        welcome slide for a specific group's event<br><br>
      </span>
    </h1>
    <div class="image-changer">
      <img v-if="imageUrl" :src="imageUrl">
      <img v-else src="../assets/images/lansingcodes-logo.svg">
      <input v-model="imageUrl" type="text" placeholder="Paste Image URL">
    </div>
  </div>
</template>

<script>
  // HELPERS
  import isObject from '../helpers/is-object'

  // COMPONENTS
  import DynamicInvisibleTextarea from './dynamic-invisible-textarea'

  // CONSTANTS
  const possibleTopics = [
    'devops', 'ruby', 'sql', 'web', 'javascript', 'glugnet', 'mobile',
    'agile', 'testers'
  ]

  export default {
    // COMPONENTS
    components: {
      DynamicInvisibleTextarea
    },
    // PROPS
    props: {
      event: {
        required: true,
        validator: value => {
          return isObject(value) || value === null
        }
      }
    },
    // STATE
    data () {
      return {
        imageUrl: '',
        currentTopicIndex: 0,
        currentTopicUpdater: undefined
      }
    },
    // COMPUTED
    computed: {
      currentTopic () {
        return possibleTopics[this.currentTopicIndex]
      },
      eventName () {
        return this.event.attributes.name
      }
    },
    // LIFECYCLE
    ready () {
      this.currentTopicIndexUpdater = setInterval(() => {
        if (this.currentTopicIndex === possibleTopics.length - 1) {
          this.$set('currentTopicIndex', 0)
        } else {
          this.$set('currentTopicIndex', this.currentTopicIndex + 1)
        }
      }, 3000)
    },
    beforeDestroy () {
      clearInterval(this.currentTopicIndexUpdater)
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/globals';

  // TEXT
  $title-text-font-size: 40px;

  // IMAGE
  $title-image-padding: 50px;
  $title-image-max-height: 300px;

  // IMAGE INPUT
  $title-image-input-line-height: 30px;
  $title-image-input-vertical-padding: 5px;
  $title-image-input-horizontal-padding: 10px;
  $title-image-input-border-width: 2px;
  $title-image-input-hover-opacity: 0.8;
  $title-image-input-fade-time: 0.3s;

  .slide-title {
    width: 100%;
    position: absolute;
    top: $title-distance-from-top;
    text-align: center;

    h1 {
      margin: 0;
      font-size: $title-text-font-size;

      textarea {
        width: 100%;
        text-align: center;
      }
    }

    .image-changer {
      max-width: calc(100% - #{$events-width * 2 + $title-image-padding});
      margin: 0 auto;
      position: relative;

      & > img {
        max-width: 100%;
        max-height: $title-image-max-height;
      }

      & > input {
        width: 100%;
        line-height: $title-image-input-line-height;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: ($title-image-input-line-height + $title-image-input-vertical-padding * 2 + $title-image-input-border-width) / -2;
        opacity: 0;
        transition: opacity $title-image-input-fade-time;
        padding: $title-image-input-vertical-padding $title-image-input-horizontal-padding;
        border-width: $title-image-input-border-width;
        outline: 0;
      }

      &:hover > input {
        opacity: $title-image-input-hover-opacity;
      }
    }
  }
</style>
