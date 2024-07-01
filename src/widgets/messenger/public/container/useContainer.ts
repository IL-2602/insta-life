import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import {useAppSelector} from "@/app/store/hooks/useAppSelector";
import { useGetMeQuery } from "@/services/authService/authEndpoints";
import { UserType } from "@/services/authService/lib/authEndpoints.types";
import {
  useGetArrayOfLastMsgQuery,
  useGetDialogMessagesQuery, useSendMessageMutation, useUpdateMessagesStatusMutation
} from "@/services/messengerService/messengerEndpoints";
import { MessengerFormSchema, messengerSchema } from "@/widgets/messenger/local/messengerSchema/messengerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";

export const useContainer = () => {
  const {
    control,
    setValue,
    watch
  } = useForm<MessengerFormSchema>({
    defaultValues: {
      message: ""
    },
    mode: "onChange",
    resolver: zodResolver(messengerSchema)
  });

  const { query, replace } = useRouter();
  const sent = query?.sent as string || "";
  const infoMessage = useAppSelector(state => state.messageReducer.messageData)
  const [cursor, setCursor] = useState<number | undefined>(undefined)
  const { data, isLoading: isLoadingLastMsgs } = useGetArrayOfLastMsgQuery({
    cursor: undefined,
    pageSize: undefined,
    searchName: undefined
  });
  const { data: me } = useGetMeQuery() as { data: UserType };
  const { data: dialogData, isFetching: isFetchingDialogData, isLoading: isLoadingDialogData } = useGetDialogMessagesQuery({
    cursor: cursor,
    dialogPartnerId: +sent,
    pageSize: 15,
    searchName: undefined
  }, { skip: !sent });

  const [sendMessage] = useSendMessageMutation();
  const [updateMessage] = useUpdateMessagesStatusMutation();
  const message = watch("message");

  let lastMessages = data?.items;

  if(infoMessage) {
    const findMessage = data?.items.find(item => item.receiverId === infoMessage.id);


    if(!findMessage && lastMessages) {
      lastMessages = [infoMessage, ...lastMessages];
    }
  }

  const dialogPartner = lastMessages?.find(msg => msg.ownerId === +sent || msg.receiverId === +sent) || infoMessage
  const dialogMessages = dialogData?.items;
  const { userId } = me;
  const isLoadingMessenger = isLoadingLastMsgs;
  const isLoadingChat = isLoadingDialogData || isFetchingDialogData;

  const onClickUserOpenChatHandler = (sent: number) =>
    void replace({ query: { sent } }, undefined, {
      shallow: true
    });

  const onSendMsgHandler = () => {
    if (sent) {
      sendMessage({ message, receiverId: +sent });
      setValue("message", "");
    }

  };
  const cursorRef = useRef<IntersectionObserver | null>(null)
  const lastElRef = useCallback((node: HTMLDivElement | null) => {
    if(isLoadingChat) {return}
    if(cursorRef.current){
      cursorRef.current.disconnect()
    }
    cursorRef.current = new IntersectionObserver(entries => {

      if(entries[0].isIntersecting){
        if(entries[0].target.id){
          setCursor(+entries[0].target.id)
        }
      }
    })

    if(node) {
      cursorRef.current.observe(node)
    }
  },[isLoadingChat])

  useEffect(() => {
    const unreadMsgs =
      dialogMessages?.reduce((acc, curr) => {
        if (curr.status !== "READ" && curr.receiverId === userId) {
          acc.push(curr.id);
        }

        return acc;
      }, [] as number[]) || [];

    if (unreadMsgs?.length) {
      updateMessage({ ids: unreadMsgs });
    }


  }, [dialogMessages?.length]);

  return {
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
  };
};
