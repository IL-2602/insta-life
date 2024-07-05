import { memo } from "react";

import { ChatBody } from "@/widgets/messenger/local/Chat/local/chatBody/ChatBody";
import { ChatHead } from "@/widgets/messenger/local/Chat/local/chatHead/ChatHead";
import { ChatProps } from "@/widgets/messenger/local/Chat/public/container";

import s from "./Chat.module.scss";

export const Chat = memo(({ control,dialogMessages, dialogPartnerData,extraActionsUserPhoto, image, imageError, isLoadingChat, lastElRef, message, onSendMsgHandler, t, userId }: ChatProps) => {
  return (<>
    <div className={s.chatHead}>
      <ChatHead dialogPartner={dialogPartnerData} />
    </div>
    <div className={s.chatBody}>
      <ChatBody control={control} dialogPartner={dialogPartnerData} extraActionsUserPhoto={extraActionsUserPhoto} image={image} imageError={imageError} isLoadingChat={isLoadingChat}
                message={message} messages={dialogMessages}
                onSendMsg={onSendMsgHandler}
                ref={lastElRef} t={t}
                userId={userId} />
    </div>
  </>);
});
