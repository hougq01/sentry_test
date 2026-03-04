
import React, { useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
// import My from "./views/My";
// import Detail from "./views/Detail";

// const My = React.lazy(() => import('./views/My'))
// const Detail = React.lazy(() => import('./views/Detail'))

/**
 * 动态加载视图组件的函数
 * 使用ES6的import()方法实现懒加载，提高页面初始加载速度
 * @returns {Promise} 返回一个Promise，解析为My组件
 */
const loadMyPage = () => import('./views/My') // 使用动态导入语法加载My视图组件
const loadDetailPage = () => import('./views/Detail')

const My = React.lazy(loadMyPage)
const Detail = React.lazy(loadDetailPage)



function App() {

  const preloadMyView = () => {
    loadMyPage().catch(error => {
      console.log(error, "预加载失败")
    })
  }

  const preloadMyView2 = () => {
    loadMyPage().catch(error => {
      console.log(error, "预加载失败")
    })
  }




  // useEffect(() => {
  //   const idleCallback = window.requestIdleCallback(() => {
  //     loadDetailPage().catch(err => console.error("detail preload error: ", err))
  //   })


  //   return () => {
  //     window.cancelIdleCallback(idleCallback)
  //   }
  // }, [])

  return (
    <div className="App">

      <button
        onClick={() => {
          throw new Error('This is your first error!');
        }}
      >
        Break the world
      </button>

      <Link to="/my" onMouseEnter={() => { preloadMyView() }}>show My</Link>
      <br />
      <Link to="/my" onMouseEnter={() => { preloadMyView2() }}>show My 2</Link>
      <br />
      <Link to="/detail">show Detail</Link>
      <hr />
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my" element={<My />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>

      </React.Suspense>

    </div>
  );
}

export default App;
