import { useEffect } from "react";

import { useAppDispatch } from "@/app/store/hooks/useAppDispatch";
import { useGetMeQuery } from "@/services/authService/authEndpoints";
import { UserType } from "@/services/authService/lib/authEndpoints.types";
import { Message } from "@/services/messengerService/lib/messengerEndpoints.types";
import {
  useGetArrayOfLastMsgQuery,
  useGetDialogMessagesQuery,
} from "@/services/messengerService/messengerEndpoints";
import { messageActions } from "@/services/messengerService/store/slice/messengerEndpoints.slice";
import { useGetPublicUserProfileQuery } from "@/services/publicService/publicEndpoints";
import { useRouter } from "next/router";

export const useContainer = () => {
  const dispatch = useAppDispatch()
  const { query } = useRouter();
  const sent = query?.sent as string || "";

  const {data: dialogPartnerData, isFetching, isLoading: isLoadingDialogPartnerData} = useGetPublicUserProfileQuery({profileId: +sent}, {skip: !sent})

  const { data,  isLoading: isLoadingLastMsgs } = useGetArrayOfLastMsgQuery({
    cursor: undefined,
    pageSize: undefined,
    searchName: undefined
  });
  const { data: me } = useGetMeQuery() as { data: UserType };
  const {  isLoading: isLoadingDialogData } = useGetDialogMessagesQuery({
    cursor: undefined,
    dialogPartnerId: +sent,
    pageSize: 15,
    searchName: undefined
  }, { skip: !sent });


  const { userId } = me;
  const isLoadingMessenger = isLoadingLastMsgs || isLoadingDialogData || isLoadingDialogPartnerData


  useEffect(() => {
    if(isFetching || isLoadingMessenger) {return}
    if(dialogPartnerData && !data?.items?.find(msg => msg.receiverId === +sent || msg.ownerId === +sent)){
      const tempMsg: Message = {
        avatars: dialogPartnerData.avatars,
        createdAt: new Date().toString(),
        id: 99999999,
        messageText: '',
        messageType: 'TEXT',
        ownerId: userId,
        receiverId: dialogPartnerData.id,
        status: "READ",
        updatedAt: new Date().toString(),
        userName: dialogPartnerData.userName
      }

      dispatch(messageActions.setFirstMessage(tempMsg))
    }

  }, [sent,dialogPartnerData]);

  return {
    isLoadingMessenger,
    userId
  };
};
