import React, { useContext, useState } from 'react'
import './Sidebar.css'
import {assets} from '../assets/assets'
import { context } from '../context/context';

const Sidebar = () => {
  const [extended,setExtended]=useState(false);
  const {onSent,prePrompts,setRecentPrompt,newchat}=useContext(context);
  const handleSidebar=()=>{
    if(extended===false){
    setExtended(true);
    }else{
      setExtended(false);
    }
    
  }
  const load=async(prompt)=>{
    // setRecentPrompt(prompt);
    await onSent(prompt);
  }
  return (
    <div className={`sidebar ${extended ? 'sidebar--extended' : ''}`}>
      <div className="top">
        <img className="menu" onClick={handleSidebar} src={assets.menu_icon} alt="menu" />
        <div onClick={()=>{
          newchat()
        }} className="new-chat">
          <img src={assets.plus_icon} />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
           
            <p className="recent-title">Recent</p>
            {prePrompts.map((item,index)=>{
              return(
                <div onClick={()=>{
                  load(item);
                }}className="recent-entry">
              <img src="src\assets\chat_bubble_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png" alt="" />
              
              <p >{item.slice(0,23)}... </p>
            </div>
              )

            })}
            
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended?<p>Help</p>:null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended?<p>Activity</p>:null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended?<p>Settings</p>:null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar
