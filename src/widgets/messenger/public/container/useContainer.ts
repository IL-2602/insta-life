import {Message} from "@/services/messengerService/lib/messengerEndpoints.types";
import {
    useGetDialogMessagesQuery,
    useGetMessagesArrayOfLastMsgQuery
} from "@/services/messengerService/messengerEndpoints";
import {useRouter} from "next/router";

export const useContainer = () => {

    const {query, replace} = useRouter()

    const chatId = query?.chatId as string || ''

    const {data, isLoading} = useGetMessagesArrayOfLastMsgQuery({
        cursor: undefined,
        pageSize: undefined,
        searchName: undefined
    })
    const {data: dialogData} = useGetDialogMessagesQuery({cursor: undefined, dialogPartnerId: +chatId, pageSize: undefined, searchName: undefined}, {skip: !chatId})

    const lastMessages: Message[] = [
        {
            avatars: [
                {
                    createdAt: "2024-06-18T21:16:34.554Z",
                    fileSize: 300,
                    height: 300,
                    url: "https://example.com/image.jpg",
                    width: 300
                }
            ],
            createdAt: "2023-05-21T21:16:35.272Z",
            id: 10,
            messageText: "You: Ahahahah, just kidding..",
            messageType: "TEXT",
            ownerId: 0,
            receiverId: 10,
            status: "SENT",
            updatedAt: "2024-06-18T21:16:35.272Z",
            userName: "Ekaterina Ivanova"
        },
        {
            avatars: [
                {
                    createdAt: "2024-06-18T21:16:34.554Z",
                    fileSize: 300,
                    height: 300,
                    url: "https://example.com/image.jpg",
                    width: 300
                }
            ],
            createdAt: "2024-05-21T21:16:35.272Z",
            id: 1,
            messageText: "Зачем ты призвал меня...",
            messageType: "TEXT",
            ownerId: 0,
            receiverId: 1,
            status: "SENT",
            updatedAt: "2024-06-18T21:16:35.272Z",
            userName: "Вася Пупкин"
        },
        {
            avatars: [
                {
                    createdAt: "2024-06-18T21:16:34.554Z",
                    fileSize: 300,
                    height: 300,
                    url: "https://example.com/image.jpg",
                    width: 300
                }
            ],
            createdAt: "2024-06-21T21:16:35.272Z",
            id: 2,
            messageText: "You: Зул джин жадит...",
            messageType: "TEXT",
            ownerId: 0,
            receiverId: 2,
            status: "SENT",
            updatedAt: "2024-06-21T21:16:35.272Z",
            userName: "Лягушатники"
        },
        {
            avatars: [
                {
                    createdAt: "2024-06-18T21:16:34.554Z",
                    fileSize: 300,
                    height: 300,
                    url: "https://example.com/image.jpg",
                    width: 300
                }
            ],
            createdAt: "2024-06-20T20:16:35.272Z",
            id: 3,
            messageText: "You: Я всегда один...",
            messageType: "TEXT",
            ownerId: 0,
            receiverId: 3,
            status: "SENT",
            updatedAt: "2024-06-21T21:16:35.272Z",
            userName: "Мракобессы"
        },

    ]
    const dialogMessages = dialogData?.items
    const receiver = lastMessages.find(msg => msg.receiverId === +chatId)
    const onClickUserOpenChatHandler = (chatId: number) =>
        void replace({query: {chatId}}, undefined, {
            shallow: true,
        })


    return {dialogMessages, lastMessages, onClickUserOpenChatHandler, receiver}
}
