<template>
  <div class="slide-title">
    <h1>
      <dynamic-invisible-textarea
        v-if="event"
        :default-value="event.attributes.name"
      ></dynamic-invisible-textarea>
      <span v-else>
        Visit
        <a href="/#{{currentTopic}}">/#{{currentTopic}}</a>
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
  import DynamicInvisibleTextarea from './dynamic-invisible-textarea'

  export default {
    props: [ 'event' ],
    data () {
      return {
        imageUrl: '',
        possibleTopics: [
          'javascript', 'ruby', 'devops', 'agile', 'web', 'glugnet',
          'pmi', 'c#', 'js', 'rb', 'mobile', 'sql'
        ],
        currentTopic: 'javascript'
      }
    },
    ready () {
      const newRandomTopic = () => {
        const newTopic = this.possibleTopics[Math.floor(Math.random() * this.possibleTopics.length)]
        if (this.currentTopic !== newTopic) {
          return newTopic
        } else {
          return newRandomTopic()
        }
      }
      setInterval(() => {
        this.$set('currentTopic', newRandomTopic())
      }, 3000)
    },
    components: {
      DynamicInvisibleTextarea
    }
  }
</script>

<style scoped>
  .slide-title {
    position: absolute;
    top: 100px;
    width: 100%;
    text-align: center;
  }
  .slide-title h1 {
    margin: 0;
    font-size: 40px;
  }
  .slide-title h1 textarea {
    width: 100%;
    text-align: center;
  }
  .slide-title .image-changer {
    position: relative;
    max-width: calc(90% - 600px);
    max-height: 250px;
    margin: 0 auto;
    text-align: center;
  }
  .slide-title .image-changer > img {
    max-width: 100%;
    max-height: 300px;
  }
  .slide-title .image-changer > input {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: -20px;
    line-height: 30px;
    opacity: 0;
    transition: all 0.3s;
    padding: 5px 10px;
    outline: 0;
  }
  .slide-title .image-changer:hover > input {
    opacity: 0.8;
  }
</style>
