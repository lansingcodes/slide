<template>
  <div id="app">
    <title
      :event="currentEvent"
    ></title>
    <slack-invitation></slack-invitation>
    <logo
      :event="currentEvent"
    ></logo>
    <wifi></wifi>
    <upcoming-events
      :events="groupEvents"
      :heading="currentGroupUpcomingTitle"
      position="left"
    ></upcoming-events>
    <upcoming-events
      :events="otherEvents"
      heading="Other Upcoming"
      position="right"
    ></upcoming-events>
  </div>
</template>

<script>
  // VENDOR
  import moment from 'moment'

  // HELPERS
  import rehydrateJSON from './helpers/rehydrate-json'

  // COMPONENTS
  import Title from './components/title'
  import Wifi from './components/wifi'
  import UpcomingEvents from './components/upcoming-events'
  import SlackInvitation from './components/slack-invitation'
  import Logo from './components/logo'

  export default {
    // COMPONENTS
    components: {
      Title, Wifi, UpcomingEvents, SlackInvitation, Logo
    },
    // STATE
    data () {
      return {
        currentEvent: null,
        groupEvents: [],
        otherEvents: [],
        groupFocus: this.getHashFromURL()
      }
    },
    // COMPUTED
    computed: {
      currentGroupUpcomingTitle () {
        return this.currentEvent && ('Upcoming ' + this.currentEvent.relationships.group.attributes.focus)
      }
    },
    // LIFECYCLE
    created () {
      this.fetchEvents()
      window.addEventListener('hashchange', this.setGroupFocus)
    },
    beforeDestroy () {
      window.removeEventListener('hashchange', this.setGroupFocus)
    },
    // WATCHERS
    watch: {
      groupFocus () {
        this.fetchEvents()
      }
    },
    // HELPERS
    methods: {
      fetchEvents () {
        // Don't even try to fetch events if
        // no group focus has been set
        if (this.groupFocus.length === 0) {
          this.$set('currentEvent', null)
          this.$set('groupEvents', [])
          this.$set('otherEvents', [])
          return
        }

        this.$http
          .get(`http://api.lansing.codes/v1/events/upcoming/search/${encodeURIComponent(this.groupFocus)}?per_group_limit=5`)
          .then(
            response => {
              let groupEvents = rehydrateJSON(response.data)
              const currentEvent = groupEvents.shift()
              this.$set('currentEvent', currentEvent)
              this.$set('groupEvents', groupEvents)

              if (currentEvent === undefined) {
                this.$set('otherEvents', [])
                return
              }

              this.$http
                .get('http://api.lansing.codes/v1/events/upcoming/list')
                .then(
                  response => {
                    const otherEvents = rehydrateJSON(response.data).filter(event => {
                      return event.relationships.group.attributes.slug !== currentEvent.relationships.group.attributes.slug &&
                        !moment(event.attributes.time.absolute).isSame(new Date(), 'day')
                    })
                    this.$set('otherEvents', otherEvents)
                  }, error => {
                    throw new Error('Could not communicate with api.lansing.codes ::', error)
                  }
                )
            }, error => {
              throw new Error('Could not communicate with api.lansing.codes ::', error)
            }
          )
      },
      getHashFromURL () {
        return decodeURIComponent(window.location.hash.slice(1))
      },
      setGroupFocus () {
        this.$set('groupFocus', this.getHashFromURL())
      }
    }
  }
</script>

<style lang="scss">
  @import './scss/globals';

  *, *:before, *:after {
    box-sizing: border-box;
  }
  html, body {
    height: 100%;
  }
  body {
    font-family: $default-font-family;
    font-weight: $default-font-weight;
    line-height: $default-line-height;
    color: $text-color;
    background: $slide-bg;
    padding: 30px;
  }
  h1,h2,h3,h4,h5,h6,strong {
    font-weight: $bolded-font-weight;
  }
  a, a:visited {
    color: $link-color;
    text-decoration: none;
  }
  a:hover, a:active {
    color: $link-color-active;
    text-decoration: underline;
  }
  #app {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
