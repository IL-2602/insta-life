import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useAppSelector } from "@/app/store/hooks/useAppSelector";
import { useGetMeQuery } from "@/services/authService/authEndpoints";
import { UserType } from "@/services/authService/lib/authEndpoints.types";
import { useGetArrayOfLastMsgQuery } from "@/services/messengerService/messengerEndpoints";
import { MessengerFormSchema, messengerSchema } from "@/widgets/messenger/local/messengerSchema/messengerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";

export const useContainer = () => {
  const { query,  replace } = useRouter();
  const sent = query?.sent as string || "";

  const {
    control,
    watch
  } = useForm<MessengerFormSchema>({
    defaultValues: {
      searchName: ""
    },
    mode: "onChange",
    resolver: zodResolver(messengerSchema)
  });
  const searchNameLastMsg = watch('searchName')
  const [searchNameLastMsgDebounced, setSearchNameLastMsgDebounced] = useState<string | undefined>(undefined)


  const firstMessage = useAppSelector(state => state.messageReducer?.messageData)

  const { data } = useGetArrayOfLastMsgQuery({
    cursor: undefined,
    pageSize: undefined,
    searchName: searchNameLastMsgDebounced
  });
  const { data: me } = useGetMeQuery() as { data: UserType };



  const { userId } = me
  let lastMessages = data?.items;


  if(lastMessages && firstMessage){
    lastMessages = [firstMessage,...lastMessages]
  }


  const onClickUserOpenChatHandler = (sent: number) =>
    void replace({ query: { sent } }, undefined, {
      shallow: true
    });



  useEffect(() => {
    const timerID = setTimeout(() => setSearchNameLastMsgDebounced(searchNameLastMsg),500)

    return () => clearTimeout(timerID)
  }, [searchNameLastMsg]);

  return {control,lastMessages,onClickUserOpenChatHandler, sent,userId}
}
