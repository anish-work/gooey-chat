import IconButton from "src/components/shared/IconButton";
import "./chatInput.scss";
import { useEffect, useRef, useState } from "react";
import { useResponseContext } from "src/App";
import AttachFilesButton from "./AttachFilesButton";
import clsx from "clsx";

const CHAT_INPUT_ID = "gooeyChat-input";

const ChatInput = () => {
  const { initializeQuery }: any = useResponseContext();
  const [value, setValue] = useState("");
  // const [file, setFile] = useState("");

  const [isExpanded, setExpanded] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (e: any) => {
    if (isExpanded) setExpanded(false);
    const { value } = e.target;
    setValue(value);
  };

  const handleFocus = () => {
    setExpanded(false);
  };

  const handlePressEnter = (e: any) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChangeLine = (e: any) => {
    // increase height by 24px
    e.preventDefault();
    const ele: HTMLElement | null = inputRef.current;
    ele!.style.height = "";
    ele!.style!.height = ele!.scrollHeight - 1 + "px";
  };

  const handleSendMessage = () => {
    const ele: HTMLElement | null = inputRef.current;
    ele!.style!.height = "50px";
    initializeQuery(value);
    setValue("");
  };

  const handleAttachClick = (val: boolean) => {
    const ele: HTMLElement | null = inputRef.current;
    setExpanded((prev) => {
      ele!.style.marginLeft = prev ? "0" : "6px";
      return val;
    });
    return null;
  };

  const showSend = !!value.length;
  useEffect(() => {
    const ele: HTMLElement | null = inputRef.current;
    if (!isExpanded) ele!.style.marginLeft = "0";
    if (showSend) ele!.style.marginRight = "12px";
    else ele!.style.marginRight = "0";
  }, [showSend, isExpanded]);

  return (
    <div className="gooeyChat-chat-input br-large text-left d-flex flex-col justify-start">
      {/* Typing area */}

      {/* In line input */}
      <div className="d-flex align-center  justify-between br-large flex-1 mr-16 ml-16 flex-1">
        <div className="mr-12">
          <AttachFilesButton
            open={isExpanded}
            onAttachClick={handleAttachClick}
          />
        </div>

        {/* Typing area */}
        {
          <textarea
            ref={inputRef}
            value={value}
            onInput={handleChangeLine}
            onChange={handleInputChange}
            onKeyDown={handlePressEnter}
            onFocus={handleFocus}
            id={CHAT_INPUT_ID}
            className={clsx(
              "pl-16 pr-16 br-large pt-16 pb-16 font_16_500 bg-white",
              showSend ? "w-80" : "w-100"
            )}
            placeholder="Message RadBot"
          />
        }

        {/* Send Actions */}
        {showSend && (
          <IconButton
            data-tooltip={"Send"}
            onClick={handleSendMessage}
            className="pt-16 pb-16 hover-grow br-large pl-16 pr-16"
          >
            {"⬆"}
          </IconButton>
        )}
      </div>

      {/* Blur Background - Mast head */}
      <p
        className="font_10_500 pt-8 pb-4 mr-12 text-darkGrey pr-12 text-right"
        style={{ fontSize: "8px" }}
      >
        Powered by:{" "}
        <a
          href="https://gooey.ai"
          target="_ablank"
          className="text-darkGrey hover-underline"
        >
          gooey.ai
        </a>
      </p>
    </div>
  );
};

export default ChatInput;
