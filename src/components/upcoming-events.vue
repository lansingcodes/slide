<template>
  <div v-if="events.length > 0" class="upcoming-events" :style="position + ': 0'">
    <h2>{{ heading }}</h2>
    <h3 v-for="event in events | limitBy 3">
      <aside>
        <a :href="event.links.self" target="_blank">{{ event.relationships.group.attributes.focus }}</a>
        <div>
          {{
            moment(event.attributes.time.absolute)
              .format('MMMM Do')
          }}
          (in {{ event.attributes.time.relative }})
        </div>
      </aside>
      <dynamic-invisible-textarea
        :default-value="event.attributes.name"
      ></dynamic-invisible-textarea>
    </h3>
  </div>
</template>

<script>
  import moment from 'moment'

  import DynamicInvisibleTextarea from './dynamic-invisible-textarea'

  export default {
    props: [
      'events', 'heading', 'position'
    ],
    data () {
      return {
        moment: moment
      }
    },
    components: {
      DynamicInvisibleTextarea
    }
  }
</script>

<style scoped>
  .upcoming-events {
    position: absolute;
    bottom: 0;
  }
  .upcoming-events h2 {
    margin-top: 0;
    margin-bottom: 15px;
    font-weight: 300;
  }
  .upcoming-events textarea {
    min-width: 300px;
    width: 100%;
  }
  .upcoming-events h3 {
    margin-top: 10px;
    margin-bottom: 0;
  }
  .upcoming-events h3 aside {
    font-weight: 300;
    font-size: 0.8em;
  }
  .upcoming-events h3 aside a {
    font-weight: 400;
    display: block;
    text-transform: uppercase;
  }
</style>
