import { useEffect } from "react";

import { useGetMeQuery } from "@/services/authService/authEndpoints";
import { UserType } from "@/services/authService/lib/authEndpoints.types";
import {
  useGetArrayOfLastMsgQuery,
  useGetDialogMessagesQuery, useSendMessageMutation, useUpdateMessagesStatusMutation
} from "@/services/messengerService/messengerEndpoints";
import { useRouter } from "next/router";

export const useContainer = () => {

  const { query, replace } = useRouter();

  const sent = query?.sent as string || "";

  const { data, isLoading } = useGetArrayOfLastMsgQuery({
    cursor: undefined,
    pageSize: undefined,
    searchName: undefined
  });

  const { data: me } = useGetMeQuery() as { data: UserType };
  const { data: dialogData } = useGetDialogMessagesQuery({ cursor: undefined, dialogPartnerId: +sent, pageSize: 5, searchName: undefined }, { skip: !sent });
  const [sendMessage] = useSendMessageMutation();
  const [updateMessagesStatus] = useUpdateMessagesStatusMutation();
  const lastMessages = data?.items;
  const dialogPartner = lastMessages?.find(msg => msg.ownerId === +sent || msg.receiverId === +sent);
  const dialogMessages = dialogData?.items;
  const unreadMessages = dialogMessages?.reduce((acc, curr) => {
    if (curr.status !== "READ") {
      acc.push(curr.id);
    }

    return acc;
  }, [] as number[]) || [];


  const { userId } = me;


  const onClickUserOpenChatHandler = (sent: number) =>
    void replace({ query: { sent } }, undefined, {
      shallow: true
    });
  const test = () => sendMessage({ message: "64 сообщение, оно такое!!!", receiverId: 538 });
  const test2 = () => updateMessagesStatus({ ids: unreadMessages });


  return { dialogMessages, dialogPartner, lastMessages, me, onClickUserOpenChatHandler, test, test2, userId };
};
