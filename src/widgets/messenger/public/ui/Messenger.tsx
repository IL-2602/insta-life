import {memo} from 'react'

import {TextField} from '@/shared/ui/Textfield'
import {Typography} from '@/shared/ui/Typography'
import {ChatBody} from "@/widgets/messenger/local/chatBody/ChatBody";
import {ChatHead} from "@/widgets/messenger/local/chatHead/ChatHead";
import {UsersListItem} from "@/widgets/messenger/local/usersList/UsersListItem";
import {MessengerProps} from '@/widgets/messenger/public/container'

import s from './Messenger.module.scss'

export const Messenger = memo(({dialogMessages,lastMessages, onClickUserOpenChatHandler, receiver}: MessengerProps) => {
    return (
        <div className={s.root}>
            <Typography variant={'h1'}>Messenger</Typography>
            <div className={s.messenger}>
                <div className={s.search}>
                    <TextField placeholder={'Input search'} type={'search'}/>
                </div>
                <div className={s.usersList}>
                    <ul>
                        {lastMessages?.map(msg => <li key={msg.id}><UsersListItem lastUserMsg={msg}
                                                                                  onClickOpenChat={onClickUserOpenChatHandler}/>
                        </li>)}
                    </ul>
                </div>
                <div className={s.chatHead}>
                    <ChatHead user={receiver}/>
                </div>
                <div className={s.chatBody}>
                    <ChatBody messages={dialogMessages} user={receiver}/>
                </div>
            </div>
        </div>
    )
})
