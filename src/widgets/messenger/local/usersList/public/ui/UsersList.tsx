import { memo } from "react";

import { ControlledTextField } from "@/shared/ui/controlledInsta/ControlledTextField/ControlledTextField";
import { UsersListItem } from "@/widgets/messenger/local/usersList/local/UsersListItem";
import { UsersListProps } from "@/widgets/messenger/local/usersList/public/container";
import { clsx } from "clsx";

import s from "./UsersList.module.scss";

export const UsersList = memo(({ control,lastMessages, onClickUserOpenChatHandler, sent, userId }: UsersListProps) => {
  return (<>
    <div className={s.search}>
      <ControlledTextField className={s.test} control={control} name={'searchName'} placeholder={"Input search"}/>
    </div>
    <div className={s.usersList}>
      <ul>
        {lastMessages?.map(msg => {
          return (<li className={clsx((msg.receiverId === +sent || msg.ownerId === +sent) && s.active)} key={msg.id}><UsersListItem lastUserMsg={msg}
                                                                                                                                  onClickOpenChat={onClickUserOpenChatHandler}
                                                                                                                                  userId={userId} />
          </li>)
        })}
      </ul>
    </div>
  </>);
});
