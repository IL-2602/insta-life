import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { useGetMeQuery } from "@/services/authService/authEndpoints";
import { UserType } from "@/services/authService/lib/authEndpoints.types";
import {
  useGetDialogMessagesQuery,
  useSendMessageMutation,
  useUpdateMessagesStatusMutation
} from "@/services/messengerService/messengerEndpoints";
import { useGetPublicUserProfileQuery } from "@/services/publicService/publicEndpoints";
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

  const message = watch("message");

  const { query} = useRouter();
  const sent = query?.sent as string || "";

  const { data: me } = useGetMeQuery() as { data: UserType };
  const [cursor, setCursor] = useState<number | undefined>(undefined)

  const { data: dialogData, isFetching: isFetchingDialogData, isLoading: isLoadingDialogData } = useGetDialogMessagesQuery({
    cursor: cursor,
    dialogPartnerId: +sent,
    pageSize: 15,
    searchName: undefined
  }, { skip: !sent });
  const {data: dialogPartnerData} = useGetPublicUserProfileQuery({profileId: +sent}, {skip: !sent})
  const [sendMessage] = useSendMessageMutation();
  const [updateMessage] = useUpdateMessagesStatusMutation();
  const dialogMessages = dialogData?.items;
  const isLoadingChat = isLoadingDialogData || isFetchingDialogData;
  const { userId } = me;

  const onSendMsgHandler = () => {
    if (sent && message.trim()) {
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


  return {control,dialogMessages, dialogPartnerData, isLoadingChat, lastElRef, message, onSendMsgHandler, userId}
}
