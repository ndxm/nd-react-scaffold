import React, { Component, PropTypes } from 'react'
import List from './list'
import { Provider, connect } from 'react-redux'
import {getTaskList} from '../../actions/task.js'

class Index extends Component {
    componentDidMount() {
        this.props.loadData(1, 10);
    }

    render() {
        return (
            //<button>asdf</button>
            <List  {...this.props}/>
        )
    }
}

function mapStateToProps(state) {
    const {
        taskList,
        pagination,
        } = state.task.task;


    return {
        taskList,
        pagination
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadData: (page, size) => dispatch(getTaskList(page, size))
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Index);


