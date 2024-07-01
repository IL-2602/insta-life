import { memo } from "react";

import { ChatBody } from "@/widgets/messenger/local/Chat/local/chatBody/ChatBody";
import { ChatHead } from "@/widgets/messenger/local/Chat/local/chatHead/ChatHead";
import { ChatProps } from "@/widgets/messenger/local/Chat/public/container";

import s from "./Chat.module.scss";

export const Chat = memo(({ control, dialogMessages, dialogPartnerData, isLoadingChat, lastElRef, message, onSendMsgHandler, userId }: ChatProps) => {
  return (<>
    <div className={s.chatHead}>
      <ChatHead dialogPartner={dialogPartnerData} />
    </div>
    <div className={s.chatBody}>
      <ChatBody control={control} dialogPartner={dialogPartnerData} isLoadingChat={isLoadingChat} message={message}
                messages={dialogMessages}
                onSendMsg={onSendMsgHandler} ref={lastElRef}
                userId={userId} />
    </div>
  </>);
});
