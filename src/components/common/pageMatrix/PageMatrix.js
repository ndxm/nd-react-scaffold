'use strict';

import styles from './PageMatrix.css'
import React from 'react';
const { PropTypes, Component } = React

let c_pagination = `${styles["c-pagination"]} u-cf`;

class PageMatrix extends Component {

    _onChangePage(pageNumber) {
        this.props.action(pageNumber);
    }

    constructor(props) {
        super(props);
    }

    _changePage(e) {
        e.preventDefault();
        let pageNumber = e.target.getAttribute('data-page');
        this._onChangePage(pageNumber);
    }

    _reminder(){
      if (this.props.total !== 0) {
        let style = `${styles['c-pagination__item']} ${styles['c-pagination__item--relate']}`;
        let c_li = `${styles['c-pagination__item']} ${styles['c-pagination__item--show']}`;
        let c_active = `${styles['c-pagination__item']} ${styles['c-pagination__item--active']} ${styles['c-pagination__item--show']}`;
        let c_status = `${styles['c-pagination__item']} ${styles['c-status']} ${styles['c-pagination__item--show']}`;

        return (
          <ul className={c_pagination}>
            <li className={c_li}>
              <a></a>
            </li>
            <li className={style}>
              <span>未确认</span>
            </li>
            <li className={c_status}>
              <a></a>
            </li>
            <li className={style}>
              <span>已确认</span>
            </li>
            <li className={c_active}>
              <a></a>
            </li>
            <li className={style}>
              <span>当前页</span>
            </li>
          </ul>
        )
      }
    }

    _relate() {
      if (this.props.total !== 0) {
        let style = `${styles['c-pagination__item']} ${styles['c-pagination__item--relate']}`;
        let pageSize = this.props.pageSize;

        return (
          <ul className={c_pagination}>
            <li className={style}>
              <span>第 {(this.props.currentPage - 1) * pageSize + 1} - {Math.min(this.props.currentPage * pageSize, this.props.total)} 条，共 {this.props.total} 条</span>
            </li>
          </ul>
        )
      }
    }

    _matrixPagesShow(){
      let c_li = styles['c-pagination__item'];
      let c_active = `${styles['c-pagination__item']} ${styles['c-pagination__item--active']}`;
      let c_status = `${styles['c-pagination__item']} ${styles['c-status']}`;
      let rowsPages = [];
      let matrixRow = Math.ceil(this.props.totalPages/this.props.matrixCol);
      for (let row = 1; row <= matrixRow; row++) {
          let colsPages =[];
          let currentRow = (row-1)*this.props.matrixCol;
          for (let col = 1; col <= this.props.matrixCol; col++) {
              let currentPage = currentRow + col;
              if( currentPage <= this.props.totalPages ){
                  if (currentPage !== this.props.currentPage) {
                      colsPages.push(<li key={currentPage} className={(this.props.status.length>0 && this.props.status[currentPage-1])?c_status:c_li}>
                                        <a href="javascript: void 0;" onClick={this._changePage.bind(this)} data-page={currentPage}
                                        title={`查看第${currentPage}页`}>{currentPage}</a></li>)
                  } else {
                      colsPages.push(<li key={currentPage} className={c_active} title={`查看第${currentPage}页`}><a
                        href="javascript: void 0;">{currentPage}</a></li>)
                  }
              }
          }
          rowsPages.push(
              <ul key={row} className={c_pagination}>
                  {colsPages}
              </ul>
          )
      }
      return rowsPages;
    }

    render() {
        if (this.props.total === 0) {
          return null
        } else {
          return (
            <div>
                {this._reminder()}
                {this._matrixPagesShow()}
                {this._relate()}
            </div>
          );
        }

    }
}


/**
 * 定义 props 类型
 */
PageMatrix.propTypes = {

    // 当前页码
    currentPage: PropTypes.number.isRequired,

    // 总页数
    totalPages: PropTypes.number.isRequired,

    // 每行要显示的页码数
    matrixCol: PropTypes.number.isRequired,

    // 页码变化要派发的动作
    action: PropTypes.func.isRequired,

    // 总数 可以接收一个 total 属性，显示总数
    total: PropTypes.number,
    pageSize: PropTypes.number,

    //页面状态
    status: PropTypes.array
}
/**
 * 定义 props 默认值
 */
PageMatrix.defaultProps = {
    currentPage: 1,
    matrixCol: 8,
    total: 0,
    pageSize: 0,
    status:[]
}
export default PageMatrix
