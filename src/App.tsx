import React, { useState, useEffect } from 'react';
import logo from './assets/images/logo.svg';
import styles from './App.module.css';
import Robot from './components/Robots';
import ShoppingCart from './components/ShoppingCart';

interface Props { }

interface State {
  robotGallery: any[],
  count: number
}

const App: React.FC = (props) => {
  const [count, setCount] = useState<number>(0);
  const [robotGallery, setRobotGallery] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    document.title = `点击${count}次`
  }, [count]); // 后面括号中的count，是在检测到count数据变化时候，执行当前useEffect中的逻辑

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await response.json()
        setRobotGallery(data)
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message)
        }
      }
      setLoading(false)
    }
    fetchData()
  }, []); // 在组件加载的时候被访问一次

  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} alt="logo" className={styles.appLogo} />
        <h1>罗伯特机器人炫酷界面罗伯特机器人炫酷界面罗伯特机器人炫酷界面罗伯特机器人炫酷界面罗伯特机器人炫酷界面罗伯特机器人炫酷界面</h1>
      </div>
      <button onClick={() => {
        setCount(count + 1)
      }}>
        click
      </button>
      <span>{count}</span>
      {(!error || error !== "") && <div>网站出错：{error}</div>}
      <ShoppingCart />
      {
        !loading ?
          <div className={styles.robotList}>
            {robotGallery.map((r: { id: number; email: string; name: string; }) => (
              <Robot id={r.id} email={r.email} name={r.name} />
            ))}
          </div>
          :
          <h2>loading ...</h2>
      }
    </div >
  );

}

export default App;
