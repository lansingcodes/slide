<template>
  <div v-if="events.length > 0" class="upcoming-events" :style="position + ': 0; text-align: ' + position">
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
        :style="'text-align: ' + position"
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

<style lang="scss" scoped>
  @import '../scss/globals';

  // HEADING
  $events-heading-margin-bottom: 15px;
  $events-heading-font-weight: $default-font-weight;

  // EVENT
  $event-spacing: 10px;

  // EVENT META
  $event-meta-relative-font-size: 0.8em;

  // EVENT DATE
  $event-date-font-weight: $default-font-weight;

  // EVENT CATEGORY
  $event-category-font-weight: $bolded-font-weight;
  $event-category-text-tranform: uppercase;

  .upcoming-events {
    position: absolute;
    bottom: 0;

    h2 {
      margin-top: 0;
      margin-bottom: $events-heading-margin-bottom;
      font-weight: $events-heading-font-weight;
    }

    h3 {
      margin-top: $event-spacing;
      margin-bottom: 0;

      aside {
        font-size: $event-meta-relative-font-size;
        font-weight: $event-date-font-weight;

        a {
          display: block;
          font-weight: $event-category-font-weight;
          text-transform: $event-category-text-tranform;
        }
      }
    }

    textarea {
      width: $events-width;
    }
  }
</style>
