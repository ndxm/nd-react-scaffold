/**
 * 任务列表
 */
import styles from './list.css'
import React from 'react'
import Router from 'react-router'
import Row from './row'

export default React.createClass({
    getDefaultProps() {
        return {
            head: ['任务名称']
        }
    },
    render() {

        const { taskList } = this.props;
        console.info(taskList);
        // style classes
        let tableStyle = styles.table
        let cellStyle = styles.cell

        // 表格内容
        let rows = taskList.map((task, index) => {
            return (
                <Row key={index} data={task} />
            )
        })

        // 表格标题
        let heads = this.props.head.map((head, index) => {
            return (
                <th className={cellStyle} key={index}>{head}</th>
            )
        })

        return (
            <table className={tableStyle}>
                <thead>
                <tr>
                    {heads}
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        )
    }
})
