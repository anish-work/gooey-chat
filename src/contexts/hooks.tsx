import { useContext } from "react";
import { MessagesContext } from "./MessagesContext";
import { WidgetContext } from "src/App";

export const useResponseContext = () => useContext(MessagesContext);
export const useWidgetContext = () => useContext(WidgetContext);
