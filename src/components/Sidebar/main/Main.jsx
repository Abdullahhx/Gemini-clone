import React, { useState, useEffect, useContext } from "react";
import { marked } from "marked";
import "./Main.css";
import { assets } from "../../../assets/assets";
import { context } from "../../../context/context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    setPreviousPrompts,
  } = useContext(context);
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSent();
    }
  };
  const convertMarkdownToHtml = (markdown) => {
    return { __html: marked(markdown) };
  };

  const load = async (prompt) => {
    // setRecentPrompt(prompt);
    setPreviousPrompts((prev) => [...prev, prompt]);
    await onSent(prompt);
  };

  return (
    <>
      <div className="main">
        <div className="nav">
          <p>Gemini</p>
          <img src={assets.user_icon} />
        </div>
        <div className="main-container">
          {!showResult ? (
            <>
              <div className="greet">
                <p>
                  <span>Hello, Dev</span>
                </p>
                <p>How can i help you today</p>
              </div>
              <div className="cards">
                <div
                  onClick={(e) => {
                    const pValue =
                      e.currentTarget.querySelector("p").textContent;
                    load(pValue);
                  }}
                  className="card"
                >
                  <p>Find the best running trails nearby</p>
                  <img src="src\assets\explore_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png" />
                </div>
                <div
                  onClick={(e) => {
                    const pValue =
                      e.currentTarget.querySelector("p").textContent;
                    load(pValue);
                  }}
                  className="card"
                >
                  <p>What are tips to improve public speaking skills?</p>
                  <img src="src\assets\lightbulb_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png" />
                </div>
                <div
                  onClick={(e) => {
                    const pValue =
                      e.currentTarget.querySelector("p").textContent;
                    load(pValue);
                  }}
                  className="card"
                >
                  <p>Create a 12-week study plan for learning a new language</p>
                  <img src="src\assets\chat_bubble_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png" />
                </div>
                <div
                  onClick={(e) => {
                    const pValue =
                      e.currentTarget.querySelector("p").textContent;
                    load(pValue);
                  }}
                  className="card"
                >
                  <p>Give me tips for how to grow my YouTube channel</p>
                  <img src="src\assets\code_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png" />
                </div>
              </div>
            </>
          ) : (
            <div className="result">
              <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading ? (
                  <div className="loader">
                    <div className="first"></div>
                    <div className="second"></div>
                    <div className="third"></div>
                  </div>
                ) : (
                  <p
                    dangerouslySetInnerHTML={convertMarkdownToHtml(resultData)}
                  ></p>
                )}
              </div>
            </div>
          )}

          <div className="main-bottom">
            <div className="search-box">
              <input
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={input}
                type="text"
                placeholder="Enter a prompt here"
              />
              <div>
                <img src="src\assets\mic_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png" />
                <img src="src\assets\image_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png" />
                {input !== "" && (
                  <img className="send"
                    onClick={() => {
                      onSent();
                    }}
                    src="src/assets/send_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png"
                    alt="send"
                  />
                )}
              </div>
            </div>
            <p className="bottom-info">
              Gemini may display inaccurate info, including about people, so
              double-check its responses.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
