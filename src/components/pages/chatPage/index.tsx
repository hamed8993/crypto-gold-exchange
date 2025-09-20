"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

const ChatPage = () => {
  useEffect(() => {
    Crisp.configure(process.env.NEXT_PUBLIC_CRISP_ID || "");
  }, []);

  return <div></div>;
};

export default ChatPage;
