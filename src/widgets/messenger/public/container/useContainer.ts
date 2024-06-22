import { useGetMeQuery } from "@/services/authService/authEndpoints";
import { UserType } from "@/services/authService/lib/authEndpoints.types";
import {
    useGetArrayOfLastMsgQuery,
    useGetDialogMessagesQuery, useSendMessageMutation
} from "@/services/messengerService/messengerEndpoints";
import {useRouter} from "next/router";

export const useContainer = () => {

    const {query, replace} = useRouter()

    const sent = query?.sent as string || ''

    const {data, isLoading} = useGetArrayOfLastMsgQuery({
        cursor: undefined,
        pageSize: undefined,
        searchName: undefined
    })

    const {data: me } = useGetMeQuery() as {data: UserType}
    const {data: dialogData} = useGetDialogMessagesQuery({cursor: undefined, dialogPartnerId: +sent, pageSize: undefined, searchName: undefined}, {skip: !sent})
    const [sendMessage] = useSendMessageMutation()

    const lastMessages = data?.items
    const dialogPartner = lastMessages?.find(msg => msg.ownerId === +sent || msg.receiverId === +sent)
    const dialogMessages = dialogData?.items
    const {userId} = me


    const onClickUserOpenChatHandler = (sent: number) =>
        void replace({query: {sent}}, undefined, {
            shallow: true,
        })
    const test = () => sendMessage({message: '10 сообщение, оно такое!!!', receiverId: 538})

    return {dialogMessages, dialogPartner, lastMessages, me, onClickUserOpenChatHandler, test, userId}
}
