module.exports = {
  debug (obj = {}) {
    return JSON.stringify(obj, null, 4)
  },
  getChatId(msg) {
    return msg.chat.id
  }
}