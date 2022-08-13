export const getSenderName = (user, chatUsers) => {
    // console.log("user", user)
    // console.log("ChatUsers", chatUsers[0].name)
    return user.user._id === chatUsers[1]._id ? chatUsers[0].name : chatUsers[1].name
}