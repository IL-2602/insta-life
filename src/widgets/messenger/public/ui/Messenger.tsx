import { memo } from "react";

import { TextField } from "@/shared/ui/Textfield";
import { Typography } from "@/shared/ui/Typography";
import { ChatBody } from "@/widgets/messenger/local/chatBody/ChatBody";
import { ChatHead } from "@/widgets/messenger/local/chatHead/ChatHead";
import { UsersListItem } from "@/widgets/messenger/local/usersList/UsersListItem";
import { MessengerProps } from "@/widgets/messenger/public/container";

import s from "./Messenger.module.scss";

export const Messenger = memo(({
                                 control,
                                 dialogMessages,
                                 dialogPartner,
                                 isLoadingChat,
                                 isLoadingMessenger,
                                 lastElRef,
                                 lastMessages,
                                 message,
                                 onClickUserOpenChatHandler,
                                 onSendMsgHandler,
                                 userId
                               }: MessengerProps) => {
  if (!userId) {
    return null;
  }
  if (isLoadingMessenger) {
    return null;
  }

  return (
    <div className={s.root}>
      <Typography variant={"h1"}>Messenger</Typography>
      <div className={s.messenger}>
        <div className={s.search}>
          <TextField placeholder={"Input search"} type={"search"} />
        </div>
        <div className={s.usersList}>
          <ul>
            {lastMessages?.map(msg => <li key={msg.id}><UsersListItem lastUserMsg={msg}
                                                                      onClickOpenChat={onClickUserOpenChatHandler}
                                                                      userId={userId} />
            </li>)}
          </ul>
        </div>
        <div className={s.chatHead}>
          <ChatHead dialogPartner={dialogPartner} />
        </div>
        <div className={s.chatBody}>
          <ChatBody control={control} dialogPartner={dialogPartner} isLoadingChat={isLoadingChat} message={message} messages={dialogMessages}
                    onSendMsg={onSendMsgHandler} ref={lastElRef}
                    userId={userId} />
        </div>
      </div>
    </div>
  );
});
;
