import IconButton from "src/components/shared/IconButton";
import "./chatInput.scss";
import { useEffect, useState } from "react";
import { useResponseContext } from "src/App";

const CHAT_INPUT_ID = "gooeyChat-input";
const CHAT_TEXTAREA_ID = "gooeyChat-textArea";

const ChatInput = () => {
  const { initializeQuery } = useResponseContext();
  const [value, setValue] = useState("");
  const [isMultiline, setIsMultiple] = useState(false);
  const [isFocused, setFocused] = useState(true);

  const handleNewLine = (event) => {
    if (!isFocused) return;
    if (event.key === "Enter") {
      setIsMultiple(true);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleSendMessage = () => {
    initializeQuery(value);
  };

  useEffect(() => {
    // Focus on input
    setTimeout(() => {
      const input = document.getElementById(
        isMultiline ? CHAT_TEXTAREA_ID : CHAT_INPUT_ID
      );
      if (input) input.focus();
    }, 1000);
  }, [isMultiline]);

  return (
    <div className="gooeyChat-chat-input pos-absolute">
      <div className="bx-shadowA br-default ml-12 mr-12 d-flex flex-col mr-8overflow-hidden flex-1">
        {/* Typing area */}

        {/* Multi input */}
        {!!isMultiline && (
          <textarea
            value={value}
            onChange={handleInputChange}
            id={CHAT_INPUT_ID}
            className="flex-1 font_14_500 bg-white mb-0 p-10 br-default pt-16"
            placeholder="Ask anything..."
            rows={15}
          />
        )}

        {/* In line input */}
        <div className="d-flex bg-grey w-100 justify-between">
          {/* Multimedia Selector */}
          <IconButton>+</IconButton>

          {/* Typing area */}
          {!isMultiline && (
            <input
              value={value}
              onKeyDown={handleNewLine}
              onChange={handleInputChange}
              onFocus={handleFocus}
              id={CHAT_INPUT_ID}
              className="pl-10 pr-10 flex-1 font_14_500 bg-white"
              placeholder="Ask anything..."
            />
          )}

          {/* Send Actions */}
          <div>
            <IconButton className="bg-darkGrey" onClick={handleSendMessage}>
              {">>"}
            </IconButton>
          </div>
        </div>
      </div>

      {/* Blur Background - Mast head */}
      <div className="gooeyChat-input-blurBottom d-flex justify-end">
        <p
          className="font_08_500 pl-16 pt-4 pb-2 text-darkGrey pr-12"
          style={{ fontSize: "8px" }}
        >
          Powered by:{" "}
          <a
            href="https://gooey.ai"
            target="_ablank"
            className="text-darkGrey text-underline hover-underline"
          >
            gooey.ai
          </a>
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
