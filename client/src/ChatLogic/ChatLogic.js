export const getSenderName = (user, chatUsers) => {
    return user._id === chatUsers[1]._id ? chatUsers[0].name : chatUsers[1].name

}

export const getFullUser = (user, chatUsers) => {
    return user._id === chatUsers[1]._id ? chatUsers[0].name : chatUsers[1].name


}