/**
 * 单个任务组件
 */
import styles from './row.css'
import React, { Component, PropTypes } from 'react'
import Router from 'react-router'


class Row extends Component {
	render() {
		let name = this.props.data.name;
		return (
			<tr>
				<td>{name}</td>
			</tr>
		)
	}
}

export default Row

