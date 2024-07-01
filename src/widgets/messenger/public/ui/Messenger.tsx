import { memo } from "react";

import { Typography } from "@/shared/ui/Typography";
import { ControlledTextField } from "@/shared/ui/controlledInsta/ControlledTextField/ControlledTextField";
import { ChatBody } from "@/widgets/messenger/local/Chat/local/chatBody/ChatBody";
import { ChatHead } from "@/widgets/messenger/local/Chat/local/chatHead/ChatHead";
import { Chat } from "@/widgets/messenger/local/Chat/public";
import { UsersListItem } from "@/widgets/messenger/local/usersList/local/UsersListItem";
import { UsersList } from "@/widgets/messenger/local/usersList/public";
import { MessengerProps } from "@/widgets/messenger/public/container";

import s from "./Messenger.module.scss";

export const Messenger = memo(({
                                 isLoadingMessenger,
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
        <UsersList.widget/>
        <Chat.widget/>

      </div>
    </div>
  );
});

