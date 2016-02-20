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
  import moment from 'moment'

  import rehydrateJSON from './helpers/rehydrate-json'

  import Title from './components/title'
  import Wifi from './components/wifi'
  import UpcomingEvents from './components/upcoming-events'
  import SlackInvitation from './components/slack-invitation'
  import Logo from './components/logo'

  export default {
    data () {
      return {
        currentEvent: null,
        groupEvents: [],
        otherEvents: [],
        focus: decodeURIComponent(window.location.hash.slice(1))
      }
    },
    methods: {
      fetchEvents () {
        if (this.focus.length === 0) {
          this.$set('currentEvent', null)
          this.$set('groupEvents', [])
          this.$set('otherEvents', [])
          return
        }
        this.$http.get(`http://api.lansing.codes/v1/events/upcoming/search/${encodeURIComponent(this.focus)}?per_group_limit=5`).then(response => {
          let groupEvents = rehydrateJSON(response.data)
          const currentEvent = groupEvents.shift()
          this.$set('currentEvent', currentEvent)
          this.$set('groupEvents', groupEvents)

          if (currentEvent === undefined) {
            this.$set('otherEvents', [])
            return
          }

          this.$http.get('http://api.lansing.codes/v1/events/upcoming/list').then(response => {
            const otherEvents = rehydrateJSON(response.data).filter(event => {
              return event.relationships.group.attributes.slug !== currentEvent.relationships.group.attributes.slug &&
                !moment(event.attributes.time.absolute).isSame(new Date(), 'day')
            })
            this.$set('otherEvents', otherEvents)
          }, error => {
            throw new Error('Could not communicate with api.lansing.codes', error)
          })
        }, error => {
          throw new Error('Could not communicate with api.lansing.codes', error)
        })
      },
      setFocus () {
        const focus = decodeURIComponent(window.location.hash.slice(1))
        this.$set('focus', focus)
      }
    },
    created () {
      this.fetchEvents()
      window.addEventListener('hashchange', this.setFocus)
    },
    watch: {
      focus () {
        this.fetchEvents()
      }
    },
    computed: {
      currentGroupUpcomingTitle () {
        return this.currentEvent && ('Upcoming ' + this.currentEvent.relationships.group.attributes.focus)
      }
    },
    components: {
      Title, Wifi, UpcomingEvents, SlackInvitation, Logo
    }
  }
</script>

<style>
  *, *:before, *:after {
    box-sizing: border-box;
  }
  html, body {
    height: 100%;
  }
  body {
    font-family: 'Open Sans', Helvetica, sans-serif;
    font-weight: 300;
    line-height: 1.4;
    color: #535353;
    background: linear-gradient(45deg, #d3d8dc 0%,#c7ced4 100%);
    padding: 30px;
  }
  h1,h2,h3,h4,h5,h6,strong {
    font-weight: 400;
  }
  a, a:visited {
    color: #3E79B9;
    text-decoration: none;
  }
  a:hover, a:active {
    color: #326fb1;
    text-decoration: underline;
  }
  #app {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
