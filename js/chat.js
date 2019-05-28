
window.onload = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
    };

    request.open("GET", "./get_currentuser.php", false);
    request.send();

    current = JSON.parse(request.responseText);

    current_user = current[0].current_user;

    request.open("GET", "./get_chat.php", false);
    request.send();

    chat = JSON.parse(request.responseText);
    // console.log(request.responseText);

    let contact_list = document.getElementById("contacts");
    let formHTML = '';

    var count = 0;
    var lastReciever = 0;
    var active = 0;
    var messages = 0;

    for (let c of chat) {
    
        if (count == 0) {

            if (c.reciever == current_user) {

                lastReciever = c.sender;

            } else if (c.sender == current_user) {

                lastReciever = c.reciever;
            }

            
            formHTML += `
                <li class="active">
                <div class="d-flex bd-highlight">
                    <div class="img_cont">
                        <img src="${lastReciever}.jpg" class="rounded-circle user_img">
                    </div>
                    <div class="user_info">
                        <span>Flat ${lastReciever}</span>
                        <p>${c.message}</p>
                    </div>
                </div>
            </li>`;

            active = lastReciever;

        } else {

            if (c.reciever == lastReciever || c.sender == lastReciever) {

                continue;

            } else {

                if (c.reciever == current_user) {

                    lastReciever = c.sender;
    
                } else if (c.sender == current_user) {
    
                    lastReciever = c.reciever;
                }

                formHTML += `
                    <li>
                    <div class="d-flex bd-highlight">
                        <div class="img_cont">
                            <img src="${lastReciever}.jpg" class="rounded-circle user_img">
                        </div>
                        <div class="user_info">
                            <span>Flat ${lastReciever}</span>
                            <p>${c.message}</p>
                        </div>
                    </div>
                    </li>`;
            }

        }

        count++;

    }

    contact_list.innerHTML = formHTML;


    let card_body = document.getElementById("card-body");

    formHTML = ``;

    for (let c of chat) {

        if (c.sender == active || c.reciever == active) {
            messages++;

            if (c.reciever == active) {
                formHTML += `
                <div class="d-flex justify-content-start mb-4">
                    <div class="img_cont_msg">
                        <img src="${c.sender}.jpg" class="rounded-circle user_img_msg">
                    </div>
                    <div class="message">
                        ${c.message}
                        <div class="message_time">${c.time} | ${c.date}</div>
                    </div>
                </div>`;

            } else if (c.sender == active) {

                formHTML += `
                <div class="d-flex justify-content-end mb-4">
                    <div class="img_cont_msg">
                        <img src="${c.sender}.jpg" class="rounded-circle user_img_msg">
                    </div>
                    <div class="message_sent">
                        ${c.message}
                        <div class="message_time_sent">${c.time} | ${c.date}</div>
                    </div>
                </div>`;
            }

        } else {
            break;
        }

        card_body.innerHTML = formHTML;
    }

    formHTML = ``;
    let card_header = document.getElementById("card-header");

    formHTML += `
        <div class="d-flex bd-highlight">
            <div class="img_cont">
                <img src="${active}.jpg" class="rounded-circle user_img">
            </div>
            <div class="user_info">
                <span>Flat ${active}</span>
                <p>${messages} Messages</p>
            </div>
        </div>`;

    card_header.innerHTML = formHTML;

    /* ==================================================
        Post Message
    ================================================== */

    document.getElementById("send_button").onclick = function (e) {

        //stop form submission
        e.preventDefault();
       
        //ajax call here
        var sender = current_user;
        var reciever = active;
        var message = document.getElementById('message_text').value;
 
        process_signup(sender, reciever, message);

        document.getElementById("message_text").value = " ";
     };
 
     function process_signup(s, r, m) {
        var request = new XMLHttpRequest();

        var data = new FormData();
        data.append('sender', s);
        data.append('reciever', r);
        data.append('message', m);

        request.open("POST", './generate_message.php', false);
       
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                console.log(request.responseText);
            }
        }

        request.send(data);
 
    }

    setInterval(myrefresh, 1000); 

}

function myrefresh() {

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
    };

    request.open("GET", "./get_currentuser.php", false);
    request.send();

    current = JSON.parse(request.responseText);

    current_user = current[0].current_user;

    request.open("GET", "./get_chat.php", false);
    request.send();

    chat = JSON.parse(request.responseText);
    // console.log(request.responseText);

    let contact_list = document.getElementById("contacts");
    let formHTML = '';

    var count = 0;
    var lastReciever = 0;
    var active = 0;
    var messages = 0;

    for (let c of chat) {
    
        if (count == 0) {

            if (c.reciever == current_user) {

                lastReciever = c.sender;

            } else if (c.sender == current_user) {

                lastReciever = c.reciever;
            }

            
            // formHTML += `
            //     <li class="active">
            //     <div class="d-flex bd-highlight">
            //         <div class="img_cont">
            //             <img src="${lastReciever}.jpg" class="rounded-circle user_img">
            //         </div>
            //         <div class="user_info">
            //             <span>Flat ${lastReciever}</span>
            //             <p>${c.message}</p>
            //         </div>
            //     </div>
            // </li>`;

            active = lastReciever;

        } else {

            if (c.reciever == lastReciever || c.sender == lastReciever) {

                continue;

            } else {

                if (c.reciever == current_user) {

                    lastReciever = c.sender;
    
                } else if (c.sender == current_user) {
    
                    lastReciever = c.reciever;
                }
            }
            
            // } else {

            //     if (c.reciever == current_user) {

            //         lastReciever = c.sender;
    
            //     } else if (c.sender == current_user) {
    
            //         lastReciever = c.reciever;
            //     }

            //     formHTML += `
            //         <li>
            //         <div class="d-flex bd-highlight">
            //             <div class="img_cont">
            //                 <img src="${lastReciever}.jpg" class="rounded-circle user_img">
            //             </div>
            //             <div class="user_info">
            //                 <span>Flat ${lastReciever}</span>
            //                 <p>${c.message}</p>
            //             </div>
            //         </div>
            //         </li>`;
            // }

        }

        count++;

    }

    // contact_list.innerHTML = formHTML;


    let card_body = document.getElementById("card-body");

    formHTML = ``;

    for (let c of chat) {

        if (c.sender == active || c.reciever == active) {
            messages++;

            if (c.reciever == active) {
                formHTML += `
                <div class="d-flex justify-content-start mb-4">
                    <div class="img_cont_msg">
                        <img src="${c.sender}.jpg" class="rounded-circle user_img_msg">
                    </div>
                    <div class="message">
                        ${c.message}
                        <div class="message_time">${c.time} | ${c.date}</div>
                    </div>
                </div>`;

            } else if (c.sender == active) {

                formHTML += `
                <div class="d-flex justify-content-end mb-4">
                    <div class="img_cont_msg">
                        <img src="${c.sender}.jpg" class="rounded-circle user_img_msg">
                    </div>
                    <div class="message_sent">
                        ${c.message}
                        <div class="message_time_sent">${c.time} | ${c.date}</div>
                    </div>
                </div>`;
            }

        } else {
            break;
        }

        card_body.innerHTML = formHTML;
    }

    formHTML = ``;
    let card_header = document.getElementById("card-header");

    formHTML += `
        <div class="d-flex bd-highlight">
            <div class="img_cont">
                <img src="${active}.jpg" class="rounded-circle user_img">
            </div>
            <div class="user_info">
                <span>Flat ${active}</span>
                <p>${messages} Messages</p>
            </div>
        </div>`;

    card_header.innerHTML = formHTML;
    
}
