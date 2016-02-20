/* global describe, it, expect */

import rehydrateJSON from '../../src/helpers/rehydrate-json.js'

describe('helpers/rehydrate-json', () => {
  it('property rehydrates JSON:API data', () => {
    const dehydratedJSON = {
      'data': [
        {
          'links': {
            'self': 'http://www.meetup.com/Lansing-Ruby-Meetup-Group/events/223606469/'
          },
          'attributes': {
            'name': 'Ruby Hack Night'
          },
          'relationships': {
            'venue': {
              'type': 'venues',
              'id': 19922032
            },
            'group': {
              'type': 'groups',
              'id': 11398352
            }
          }
        }
      ],
      'included': {
        'venues': {
          '19922032': {
            'attributes': {
              'name': 'The Technology Innovation Center'
            }
          }
        },
        'groups': {
          '11398352': {
            'attributes': {
              'name': 'Lansing Ruby Meetup Group'
            }
          }
        }
      }
    }

    expect(JSON.stringify(
      rehydrateJSON(dehydratedJSON)
    )).toEqual(JSON.stringify(
      [
        {
          'links': {
            'self': 'http://www.meetup.com/Lansing-Ruby-Meetup-Group/events/223606469/'
          },
          'attributes': {
            'name': 'Ruby Hack Night'
          },
          'relationships': {
            'venue': {
              'attributes': {
                'name': 'The Technology Innovation Center'
              }
            },
            'group': {
              'attributes': {
                'name': 'Lansing Ruby Meetup Group'
              }
            }
          }
        }
      ]
    ))
  })
})
