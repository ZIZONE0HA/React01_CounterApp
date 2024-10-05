import { useState,useEffect, useRef } from 'react'
import './App.css'
import Controller from './components/Controller'
import Viewer from './components/Viewer'
import Even from './components/Even'

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');

  //update useEffect가 처음 랜더링 될 때 말고 ㄹㅇ 업데이트 될 때만 실행되게
  const isMount = useRef(false);

  //useEffect(()=>{},[])
  //1번 인수: 사이드이펙트로 여기 있는 콜백함수 실행
  //2번 인수: 배열. 여기에 있는 값이 바뀌게 되면
  //즉, 두번째로 전달한 인수가 바뀌면, 첫번째 전달한 콜백함수 실행한다
  useEffect(()=>{
    console.log(`count:${count} / input:${input}`)
  },[count,input]);
  //의존성 배열 (dependency array : deps) : useEffect는 뒤에 오는 배열에 어떤 값이 오느냐에 따라 동작이 달라져서 


  //1.마운트 : 탄생
  //deps 빈배열 :컴포넌트가 마운트 되었을때만 최초로 1번 실행
  //컴포넌트가 마운트 될 때 어떤 데이터 불러오는 코드 작성할 수 있
  useEffect(()=>{
    console.log("mount");
  },[]);

  //2.업데이트 : 변화, 리랜더링
  //deps 생략 : 업데이트 될 때마다 계속 실행
  //업데이트 되었을때, 업데이트된 state값들이 정상값인지 검사할수 있
  useEffect(()=>{
    if(!isMount.current){
      isMount.current = true;
      return;
    }
    console.log("update");
  });

  //3.언마운트 : 죽음
  //해당 컴포넌트에서 쓰고있던 메모리를 해제하는 최적화 할 수 있
  useEffect(()=>{},[]);


  const onClickButton = (value) =>{
    setCount(count + value); //비동기로 동작 : 함수를 지금 호출했지만, 완료는 뒤늦게 되는거
    //리액트의 state는 비동기로 동작 -> 즉, 변경된 state값을 바로 사용해서 사이드 이펙트(부과작업)을 진행하려면 useEffect사용
  }


  return (
    <div className='App'>
      <h1>Simple Counter</h1>
      <section>
        <input value={input} onChange={(e)=>{
          setInput(e.target.value)
        }}></input>
      </section>
      <section>
        <Viewer count={count}></Viewer>
        {count % 2 ===0 ? <Even/> : null} 
      </section>
      <section>
        <Controller onClickButton={onClickButton}></Controller>
      </section>
    </div>
  )
}

export default App
