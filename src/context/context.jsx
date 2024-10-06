import { createContext,useState } from "react";
import run from "../config/gemini";


export const context = createContext();




const ContextProvider = (props) => {
  const [input,setInput]=useState("");
  const [recentPrompt, setRecenPrompt] = useState("");
  const [prePrompts, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara=(index,nextWord)=>{
    setTimeout(function(){
      setResultData(prev=>prev+nextWord);

    },50*index)
    
  }
  const newchat=()=>{
    setLoading(false);
    setShowResult(false);
  }
    
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if(prompt!==undefined){
      setRecenPrompt(prompt);
      response=await run(prompt);
     

    }else{
  
      response=await run(input);
      setRecenPrompt(input);
      setPreviousPrompts(prev=>[...prev,input]);
    }
 

    console.log(response.text());
    let newresponse=response.text().split(" ");
    for(let i=0;i<newresponse.length;i++){
        const nextword=newresponse[i];
        delayPara(i,nextword+" ")
    }
    // setResultData(response.text());
    setLoading(false);
    setInput("")
  };

  const contextValue = {
    prePrompts,
    setPreviousPrompts,
    onSent,
    setRecenPrompt,
    recentPrompt,
    loading,
    resultData,
    input,
    setInput,
    showResult,
    setShowResult,
    newchat

  };

  return (

    <context.Provider value={contextValue}>
      {props.children}
    </context.Provider>
  );
};

export default ContextProvider;
