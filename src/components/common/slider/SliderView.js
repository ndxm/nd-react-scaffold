/**
 * 分析工具 - 缩放条组件
 * 使用自定义样式封装了 react-slider (https://github.com/mpowaga/react-slider)
 *
    import Slider  from './view/analysis/SliderView.js';
    class App extends Component {
        onSliderChange(value) {
            console.log(value);
        }

        render() {
            return (<div>
                        <Slider value={'10'} onChange={this.onSliderChange.bind(this)}/>
                    </div>);
        }
    }
*/

import styles from './SliderView.css';
import React, { Component, PropTypes } from 'react';

import ReactSlider  from 'react-slider';

export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.value, fullheight: 200};
        this.onPlusClick = this.onPlusClick.bind(this);
        this.onMinusClick = this.onMinusClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        this.props.onChange(value);
        this.setState( {value: value});
    }

    onPlusClick(e) {
        if(this.state.value < this.props.max) {
            let value0 = Math.min(this.props.max, this.state.value + this.props.step);
            this.onChange(value0);
        }
    }
    onMinusClick(e) {
        if(this.state.value > this.props.min) {
            let value0 = Math.max(this.props.min, this.state.value - this.props.step);
            this.onChange(this.state.value - 1);
        }
    }

    render() {
        let height = this.state.fullheight * (this.state.value - this.props.min) / (this.props.max - this.props.min);
        let bottom = height+88; //magic
        let background = <div className={styles.sliderprogress} style={{height:height+'px',bottom:bottom+'px'}} />
        let counter = <div className={styles.counter}>
                          {this.state.value}%
                    </div>
        let plusBtn = <button className={styles.plus} onClick={this.onPlusClick}>{'+'}</button>
        let minusBtn = <button className={styles.minus} onClick={this.onMinusClick}>{[<span>&#8722;</span>]}</button>

        return (
                <div className={styles.sliderbg}>
                    {plusBtn}
                    {minusBtn}
                    <ReactSlider className={styles.slider} 
                        //defaultValue={20}
                        value={this.state.value}
                        min={this.props.min}
                        max={this.props.max}
                        step={this.props.step}
                        withBars 
                        invert 
                        orientation={'vertical'}
                        onChange={this.onChange}>
                        <div className={styles.handle}><span className={styles.handleinner}/></div>
                    </ReactSlider>
                    {counter}
                    {background}
                </div>
                );

    }
}
