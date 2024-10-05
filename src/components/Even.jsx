import { useEffect } from "react";

const Even =() =>{
    useEffect(()=>{
        //클린업(정리함수) :useEffect의 콜백 함수가 반환하는 함수
        return ()=>{
            console.log("unMount");
        };
    },[]);

    return <div>짝수</div>
}

export default Even;