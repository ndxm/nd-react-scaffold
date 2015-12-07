import React from 'react'
import styles from './Pagination.css'

const {createClass, PropTypes} = React

export default createClass({
    PropTypes: {
      isShow: PropTypes.bool,
      requestPageX: PropTypes.func.isRequired,
      title: PropTypes.string
    },
    getDefaultProps() {
      return {
        isShow: true,
        title: ''
      }
    },
    onClick(e) {
      e.preventDefault()
      this.props.requestPageX()
    },
    render() {
      if (this.props.isShow === true) {
        return (
          <li className={styles["c-pagination__item"]}><a className={styles.navigateBtn} href='#' onClick={this.onClick} title={this.props.title}>{this.props.children}</a></li>
        )
      } else {
        return null
      }
    }
})
