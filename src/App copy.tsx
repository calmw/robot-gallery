import React from 'react';
import logo from './assets/images/logo.svg';
import styles from './App.module.css';
import robots from './mockdata/robots.json';
import Robot from './components/Robots';
import ShoppingCart from './components/ShoppingCart';

interface Props { }

interface State {
  robotGallery: any,
  count: number
}

class App extends React.Component<Props, State> {

  // 组件生命周期第一阶段，在组件创建好dom元素之后，挂载页面的时候调用
  constructor(props: any) {
    super(props);
    this.state = {
      robotGallery: [],
      count: 0
    }
  }

  // 组件生命周期第一阶段
  componentDidMount(): void {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then((data) => this.setState({ robotGallery: data }))
  }
  // 组件生命周期第二阶段，组件更新

  // 组件更新后调用
  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {

  }
  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
    return false; //可以根据参数判断状态，返回true就更新组件，返回false就不更新
  }

  // 组件生命周期第三阶段，销毁
  
  // 组件销毁时调用
  componentWillUnmount(): void {

  }

  render(): React.ReactNode {
    return (
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <img src={logo} alt="logo" className={styles.appLogo} />
          <h1>罗伯特机器人炫酷界面罗伯特机器人炫酷界面罗伯特机器人炫酷界面罗伯特机器人炫酷界面罗伯特机器人炫酷界面罗伯特机器人炫酷界面</h1>
        </div>
        <button onClick={() => {
          // setState的回调函数中值大，并且先输出count1，说明setState是异步执行的
          this.setState({ count: this.state.count + 1 }, () => {
            console.log("count2:", this.state.count);
          });
          console.log("count1:", this.state.count);
        }}>
          click
        </button>
        <span>{this.state.count}</span>
        <button onClick={() => {
          // setState执行后只会更新一次
          this.setState({ count: this.state.count + 1 }, () => {
            console.log("count1:", this.state.count);
          });
          this.setState({ count: this.state.count + 1 }, () => {
            console.log("count2:", this.state.count);
          });
        }}>
          click2
        </button>
        <span>{this.state.count}</span>
        <button onClick={() => {
          // setState执行后只会更新2次
          this.setState((preState, preProps) => {
            return { count: preState.count + 1 }
          }, () => {
            console.log("count1:", this.state.count);
          });
          this.setState((preState, preProps) => {
            return { count: preState.count + 1 }
          }, () => {
            console.log("count2:", this.state.count);
          });
        }}>
          click3
        </button>
        <span>{this.state.count}</span>
        <ShoppingCart />
        <div className={styles.robotList}>
          {robots.map((r) => (<Robot id={r.id} email={r.email} name={r.name} />))}
        </div>
      </div >
    );
  }

}

export default App;
