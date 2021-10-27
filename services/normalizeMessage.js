const normalizeMessage = (obj) => {
    const newDate = new Date();
    const days = newDate.toLocaleDateString().split('/').join('-');
    const hours = newDate.toLocaleTimeString();    
    const message = `${days} ${hours} - ${obj.nickname}: ${obj.chatMessage}`;
    return message;  
};

module.exports = normalizeMessage;