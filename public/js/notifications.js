function notify(type){
        
    switch (type){
        case "sidechat-invite" :
            return mainchatOutputContainer.innerHTML += `
            <!----------------------- SIDECHAT INVITE ----------------------->
        <div class="sidechat-invite" id="sidechat-invite">
            <div class="sidechat-invite--shadow-layer"></div>
            <div class="sidechat-invite--window ">
                Would you like to chat with ${data.sender}?
                <div class="sidechat-button ">
                    <div class="sidechat-button--yes" id="yes">random yes</div>
                    <div class="sidechat-button--no" id="no">random no</div>
                </div>
                
            </div>

        </div>
        `
            break;

        case "invite-accepted":
            return mainchatOutputContainer.innerHTML += `
            <!----------------------- SIDECHAT INVITE ----------------------->
        <div class="sidechat-invite" id="sidechat-invite">
            <div class="sidechat-invite--shadow-layer"></div>
            <div class="sidechat-invite--window ">
                Would you like to chat with ${data.sender}?
                <div class="sidechat-button ">
                    <div class="sidechat-button--yes" id="yes">random yes</div>
                    <div class="sidechat-button--no" id="no">random no</div>
                </div>
                
            </div>

        </div>
        `
            break;

        default :
            return;
    }