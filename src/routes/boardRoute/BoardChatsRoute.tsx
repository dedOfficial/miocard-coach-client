import React, { FC, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import {
  ChatType,
  DeleteChatDataType,
} from '../../store/chatStore/chat.store.types'
import chatStore from '../../store/chatStore/chat.store'
import operatorStore from '../../store/operatorStore/operator.store'
import accountStore from '../../store/accountStore/account.store'
import BoardHeader from '../../components/board/BoardHeader'
import BoardTitle from '../../components/board/BoardTitle'
import BoardFooter from '../../components/board/BoardFooter'
import BoardChats from '../../components/board/BoardChats'
import ToggleChats from '../../components/board/ToggleChats'
import BoardChatModal from '../../components/board/board-chat-modal'
import DeleteModal from '../../components/modals/delete-modal'
import Loader from '../../components/loader/loader'
import Pagination from '../../components/pagination'

import {
  chatWrapperStyle,
  mainWrapperStyle,
  modalBackgroundStyle,
  styledInput,
} from './BoardRoute.styled'

const BoardChatsRoute: FC = () => {
  const isUser = !!accountStore.user.id.length
  const userType = accountStore.user.type
  const { currentChatPage, viewAllChats } = accountStore.userOptions
  const [deleteChatData, setDeleteChatData] = useState<DeleteChatDataType>({
    chatName: '',
    shortKey: '',
  })
  const [isChatModal, setIsChatModal] = useState(false)
  const [toggleChat, setToggleChat] = useState(false)
  const [isDeleteChatModal, isSetDeleteChatModal] = useState(false)
  const [chatsFilter, setChatsFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [chatsPerPage] = useState(5)
  const lastPageIndex = currentPage * chatsPerPage
  const firstPageIndex = lastPageIndex - chatsPerPage

  const getCurrentPageChats = (chatList: ChatType[]) => {
    return chatList.slice(firstPageIndex, lastPageIndex)
  }

  const paginate = (newCurrent: number) => {
    accountStore.setCurrentChatPage(newCurrent)
  }

  useEffect(() => {
    if (accountStore.userToken) {
      accountStore.getUser()
    }

    return () => {
      chatStore.filterChats('')
    }
  }, [])

  const getChats = async () => {
    await chatStore.fetchChats()
    await chatStore.fetchAllChats()
  }

  const getOperators = async () => {
    await operatorStore.fetchOperators()
    await operatorStore.fetchAssistants()
  }

  const getChatsForMessages = async () => {
    await chatStore.fetchChatsForMessages()
    await chatStore.fetchAllChatsForMessages()
  }

  useEffect(() => {
    if (isUser) {
      getOperators()
      getChats()
    }
  }, [isUser])

  useEffect(() => {
    const timer = setInterval(() => {
      if (isUser) {
        getChatsForMessages()
      }
    }, 5000)
    return () => clearInterval(timer)
  }, [isUser])

  const toggleDeleteModal = useCallback(() => {
    isSetDeleteChatModal(!isDeleteChatModal)
  }, [isDeleteChatModal])

  /**
   * A wrapper function for setToggleChat,
   * which internally calls setCurrentPage
   * to go to 1 page when switching chats
   * @param [Boolean] toggler
   */
  const handleSetToggleChat = (toggler: boolean) => {
    accountStore.setViewAllChats(toggler)
    accountStore.setCurrentChatPage(1)
  }

  const handleDeleteChat = useCallback((dummyName, shortKey) => {
    setDeleteChatData({
      chatName: dummyName,
      shortKey,
    })
  }, [])

  const handeDeleteChatByShortKey = useCallback(() => {
    if (deleteChatData.shortKey !== '') {
      chatStore.removeChat(deleteChatData.shortKey)
      isSetDeleteChatModal(false)
    }
    getChats()
  }, [deleteChatData.shortKey])

  const findChats = useCallback((e) => {
    setChatsFilter(e.target.value)
    chatStore.filterChats(e.target.value)
    accountStore.setCurrentChatPage(1)
  }, [])

  const chats =
    chatStore.filteredChats.length && chatsFilter !== ''
      ? chatStore.filteredChats.filter((chat) => chat.type === userType)
      : chatStore.chats.filter((chat) => chat.type === userType)

  const allChats =
    chatStore.filteredChats.length && chatsFilter !== ''
      ? chatStore.filteredChats
      : chatStore.allChats

  useEffect(() => {
    setCurrentPage(currentChatPage)
  }, [currentChatPage])

  useEffect(() => {
    setToggleChat(viewAllChats)
  }, [viewAllChats])

  return (
    <>
      {isChatModal && <BoardChatModal setIsChatModal={setIsChatModal} />}

      {isDeleteChatModal && <div className={modalBackgroundStyle} />}
      {isDeleteChatModal && (
        <DeleteModal
          name={deleteChatData.chatName}
          onClose={() => isSetDeleteChatModal(false)}
          onDelete={handeDeleteChatByShortKey}
        />
      )}

      <div className={mainWrapperStyle}>
        <BoardHeader />
        <span className="text-2xl font-medium text-gray-400">
          Welcome back, {accountStore.user.type} {accountStore.user.name}
        </span>

        {chatStore.requestInitialState.loading && <Loader />}
        {!chatStore.requestInitialState.loading && (
          <>
            <BoardTitle
              title={toggleChat ? 'Chats' : 'My chats'}
              buttonAction={() => setIsChatModal(true)}
            />
            <input
              className={styledInput}
              type="text"
              placeholder="Find chats..."
              onChange={findChats}
              value={chatsFilter}
            />
            <div className={chatWrapperStyle}>
              {toggleChat ? (
                <div className="h-full">
                  {!chatStore.filteredChats.length && !!chatsFilter.length ? (
                    <span className="text-gray-500">Chats not found.</span>
                  ) : (
                    <>
                      {getCurrentPageChats(allChats).map(
                        ({
                          _id,
                          dummyName,
                          shortKey,
                          unreadMessages,
                          type,
                          active,
                          operatorId,
                          assistantId,
                        }: ChatType) => (
                          <BoardChats
                            unreadMessages={unreadMessages}
                            chatId={_id}
                            active={active}
                            type={type}
                            dummyName={dummyName}
                            shortKey={shortKey}
                            key={_id}
                            toggleDeleteChat={toggleDeleteModal}
                            removeChat={handleDeleteChat}
                            operatorId={operatorId}
                            assistantId={assistantId}
                          />
                        )
                      )}
                      {allChats.length ? (
                        <Pagination
                          countPerPage={chatsPerPage}
                          totalCount={allChats.length}
                          currentPage={currentPage}
                          paginate={paginate}
                        />
                      ) : null}
                    </>
                  )}
                </div>
              ) : (
                <>
                  {chats.length === 0 && (
                    <span className="text-gray-500">No chats for you yet.</span>
                  )}

                  {!chatStore.filteredChats.length && !!chatsFilter.length ? (
                    <span className="text-gray-500">Chats not found.</span>
                  ) : (
                    <>
                      {getCurrentPageChats(chats).map(
                        ({
                          _id,
                          dummyName,
                          unreadMessages,
                          shortKey,
                          type,
                          active,
                          operatorId,
                          assistantId,
                        }: ChatType) => (
                          <BoardChats
                            active={active}
                            unreadMessages={unreadMessages}
                            chatId={_id}
                            type={type}
                            dummyName={dummyName}
                            shortKey={shortKey}
                            key={_id}
                            toggleDeleteChat={toggleDeleteModal}
                            removeChat={handleDeleteChat}
                            operatorId={operatorId}
                            assistantId={assistantId}
                          />
                        )
                      )}
                      {chats.length ? (
                        <Pagination
                          countPerPage={chatsPerPage}
                          totalCount={chats.length}
                          currentPage={currentPage}
                          paginate={paginate}
                        />
                      ) : null}
                    </>
                  )}
                </>
              )}

              {chatsFilter === '' && (
                <ToggleChats
                  setToggleChat={handleSetToggleChat}
                  toggleChat={toggleChat}
                />
              )}
            </div>
          </>
        )}

        <BoardFooter />
      </div>
    </>
  )
}

export default observer(BoardChatsRoute)
