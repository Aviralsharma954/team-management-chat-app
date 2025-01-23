export const socket = new WebSocket('ws://172.20.10.11:8080');
export function handleSend(){
    if (socket.readyState == WebSocket.OPEN) {
        const UserId = localStorage.getItem("user");
        if(UserId!=null){
            const data = {"init":UserId}
            socket.send(JSON.stringify(data)); 
        }
    } else {
    // Queue a retry
        setTimeout(handleSend, 1000)
    }
    };