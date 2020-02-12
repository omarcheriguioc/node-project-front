import { createContext } from "react";

const MessageContext = createContext({
    auth: Boolean,
    user: ""
});

export default MessageContext;