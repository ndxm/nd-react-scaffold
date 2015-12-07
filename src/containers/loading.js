/**
 * Created by hjx on 11/5/2015.
 */
import { Provider, connect } from 'react-redux'
import { pushState } from 'redux-router'

import LoadingView from '../components/common/loading/index.js'

function mapStateToProps (state) {
  return {
    isLoading: state.auth.auth.fetching || state.task.task.fetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default  connect(
  mapStateToProps, mapDispatchToProps
)(LoadingView)

