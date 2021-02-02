import { expect } from 'chai'
const actionsInjector = require('inject-loader!./actions')

// create the module with our mocks
const actions = actionsInjector({
  '../api/shop': {
    getProducts (cb) {
      setTimeout(() => {
        cb([ /* mocked response */ ])
      }, 100)
    }
  }
})

// helper for testing action with expected mutations
const testAction = (action, payload, state, expectedMutations, done) => {
    let count = 0
  
    // mock commit
    const commit = (type, payload) => {
      const mutation = expectedMutations[count]
  
      try {
        expect(type).to.equal(mutation.type)
        expect(payload).to.deep.equal(mutation.payload)
      } catch (error) {
        done(error)
      }
  
      count++
      if (count >= expectedMutations.length) {
        done()
      }
    }
  
    // call the action with mocked store and arguments
    action({ commit, state }, payload)
  
    // check if no mutations should have been dispatched
    if (expectedMutations.length === 0) {
      expect(count).to.equal(0)
      done()
    }
  }
  


// example testing async action

describe('actions', () => {
    it('getAllProducts', done => {
      testAction(actions.getAllProducts, null, {}, [
        { type: 'REQUEST_PRODUCTS' },
        { type: 'RECEIVE_PRODUCTS', payload: { /* mocked response */ } }
      ], done)
    })
  })



// NOTE: might be reasonable to use test spy like https://sinonjs.org/ instead an testAction function
// then test is simplified to


describe('actions', () => {
    it('getAllProducts', () => {
      const commit = sinon.spy()
      const state = {}
      
      actions.getAllProducts({ commit, state })
      
      expect(commit.args).to.deep.equal([
        ['REQUEST_PRODUCTS'],
        ['RECEIVE_PRODUCTS', { /* mocked response */ }]
      ])
    })
  })