'use strict';

import styles from './Pagination.css'
import React from 'react';
import Navigate from './Navigate'
const { PropTypes, Component } = React

let c_li = styles['c-pagination__item']
let c_active = `${styles['c-pagination__item']} ${styles['c-pagination__item--active']}`
let c_disabled = `${styles['c-pagination__item']} ${styles['c-pagination__item--disabled']}`

class Pagination extends Component {

    _onChangePage(pageNumber) {
        this.props.action(pageNumber);
    }

    constructor(props) {
        super(props);
    }

    previousPage() {
      this._onChangePage(this.props.currentPage - 1)
    }

    nextPage() {
      this._onChangePage(this.props.currentPage + 1)
    }

    _changePage(e) {
        e.preventDefault();
        var pageNumber = e.target.getAttribute('data-page');
        this._onChangePage(pageNumber);
    }

    /**
     * Pages渲染方法
     * 如果page超过maximumPages用省略号ellipsis表示
     * 处理active样式
     */
    _renderPages() {
        if (this.props.maximumPages > this.props.totalPages) {
            return this._renderNormalPages();
        } else {
            return this._renderEllipsisPages();
        }
    }

    _renderNormalPages() {
        var pages = [];
        for (let page = 1; page <= this.props.totalPages; page++) {
            if (page !== this.props.currentPage) {
                pages.push(<li key={page} className={c_li}><a href="javascript: void 0;"
                                                              onClick={this._changePage.bind(this)} data-page={page}
                                                              title={`查看第${page}页`}>{page}</a></li>)
            } else {
                pages.push(<li key={page} className={c_active} title={`查看第${page}页`}><a
                    href="javascript: void 0;">{page}</a></li>)
            }
        }
        return pages;
    }

    _renderEllipsisPages() {
        var pages = [];
        var startPage = 1;
        var endPage = startPage + this.props.maximumPages - 1;

        if (this.props.currentPage >= 4) {
            startPage = this.props.currentPage - 1;
            endPage = startPage + this.props.maximumPages - 3;
            //占去前两个位置
            pages.push(
                <li key='1' className={c_li}>
                    <a href="javascript: void 0;" onClick={this._changePage.bind(this)} data-page={1}
                       className="">{1}</a>
                </li>);
            pages.push(
                <li key='ellipsisLeft' className={c_disabled}>
                    <a href="javascript: void 0;">&hellip;</a>
                </li>);
            if ((this.props.totalPages - this.props.currentPage) < (this.props.maximumPages - 3)) {
                startPage = this.props.totalPages - (this.props.maximumPages - 3);
            }
        }

        if ((this.props.totalPages - (startPage - 1)) > (this.props.maximumPages - 2)) {
            endPage = endPage - 2;
        }

        for (let page = startPage; page <= endPage && page <= this.props.totalPages; page++) {
            if (page !== this.props.currentPage) {
                pages.push(
                    <li key={page} className={c_li}>
                        <a href="javascript: void 0;" onClick={this._changePage.bind(this)} data-page={page}
                           className="" title={`查看第${page}页`}>{page}</a>
                    </li>)
            } else {
                pages.push(
                    <li key={page} className={c_active}>
                        <a href="javascript: void 0;">{page}</a>
                    </li>)
            }
        }

        //判断starterPage到结尾是否需要省略
        if ((this.props.totalPages - (startPage - 1)) > (this.props.maximumPages - 2)) {
            pages.push(
                <li key='ellipsisRight' className={c_disabled}>
                    <a href="javascript: void 0;">&hellip;</a>
                </li>);
        }
        return pages;
    }

    relate() {
      if (this.props.total !== 0) {
        let style = `${styles['c-pagination__item']} ${styles['c-pagination__item--relate']}`
        let pageSize = this.props.pageSize

        return (
          <li className={style} key={this.props.currentPage}>
            <span>第 {(this.props.currentPage - 1) * pageSize + 1} - {Math.min(this.props.currentPage * pageSize, this.props.total)} 条，共 {this.props.total} 条</span>
          </li>
        )
      }
    }

    render() {
        var pages = this._renderPages();
        let paginationStyle = `${styles["c-pagination"]} u-cf`;
        if (this.props.total === 0) {
          return null
        } else {
          return (
              <ul className={paginationStyle}>
                  <Navigate key='prev' isShow={this.props.currentPage > 1} requestPageX={this.previousPage.bind(this)} title='上一页'>
                    &laquo;
                  </Navigate>
                  {pages}
                  <Navigate key='next' isShow={this.props.currentPage < this.props.totalPages} requestPageX={this.nextPage.bind(this)} title='下一页'>
                    &raquo;
                  </Navigate>
                  {
                    this.relate()
                  }
              </ul>
          );
        }

    }
}


/**
 * 定义 props 类型
 */
Pagination.propTypes = {

    // 当前页码
    currentPage: PropTypes.number.isRequired,

    // 总页数
    totalPages: PropTypes.number.isRequired,

    // 要显示的页码数
    maximumPages: PropTypes.number.isRequired,

    // 页码变化要派发的动作
    action: PropTypes.func.isRequired,

    // 总数 可以接收一个 total 属性，显示总数
    total: PropTypes.number,
    pageSize: PropTypes.number
}
/**
 * 定义 props 默认值
 */
Pagination.defaultProps = {
    currentPage: 1,
    maximumPages: 7,
    total: 0,
    pageSize: 0
}
export default Pagination
