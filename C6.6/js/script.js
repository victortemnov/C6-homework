const echoUrl = "wss://echo.websocket.org";

const sendBtn = document.querySelector(".send-btn");
const geoBtn = document.querySelector(".geo-btn");
let inputVal = document.querySelector(".message-area");

let webSocket;

// WebSocket
window.onload = function() {
    webSocket = new WebSocket(echoUrl);

    webSocket.onopen = function() {
        console.log("Connected")
    };

    webSocket.onmessage = function(e) {
        let data = e.data.split(":");
        console.log(data)
        if (data[0] === "https")
            return;
        else
            createMsg(e.data, user=false);
    };

    webSocket.onclose = function() {
        console.log("Disconnected")
    };

    webSocket.onerror = function(e) {
        console.log("Error" + e.data)
    };
};

window.unload = function() {
    webSocket.close();
    webSocket = null;
};

sendBtn.addEventListener("click", () => {
    let message = inputVal.value;
    createMsg(message);
    webSocket.send(message);
});

function createMsg(message, user=true) {
    let newP = document.createElement("p");
    if (user)
        newP.classList.add("set-msg");
    else
        newP.classList.add("get-msg");
    newP.innerHTML = message;
    document.querySelector(".chat-body").append(newP);
}

// Geolocation
geoBtn.addEventListener("click", () => {
    if (!navigator.geolocation)
        console.log("Your browse is not support 'geolocation'")
    else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
});

function success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let mapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;

    createLink(mapLink);
    webSocket.send(mapLink);
}

function error() {
    console.log("Your location is undefined")
}

function createLink(link) {
    let newlink = document.createElement("a");
    newlink.href = link;
    newlink.classList.add("set-msg");
    newlink.innerHTML = "Geo-location";
    document.querySelector(".chat-body").append(newlink);
}