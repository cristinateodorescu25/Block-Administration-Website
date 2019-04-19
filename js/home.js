$(document).ready(function(){
    $('.header').height($(window).height());
})

$(".navbar a").click(function(){
    $("body,html").animate({
     scrollTop:$("#" + $(this).data('value')).offset().top - 100
    }, 1000)
})

$('.carousel').carousel({
    interval: false
});
  

window.onload = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        // console.log(request);
    };
    request.open("GET", "./get_notice_board.php", false); //true = async
    request.send();

    // console.log(request.responseText);

    allFlats = JSON.parse(request.responseText);

    let noticeBoard_Table = document.getElementById("notice_table");
    let htmlTableText = '';
    
    for (let f of allFlats) {
        htmlTableText += `<tr class="row100"><td class="column100 column1">${f.number}
            <\/td><td class="column100 column1">${f.name}
            <\/td><td class="column100 column1">${f.water_consumption}
            <\/td><td class="column100 column1">${f.gas_consumption}
            <\/td><td class="column100 column1">${f.price}
            <\/td><\/tr>`;	
    }
        
    noticeBoard_Table.innerHTML += htmlTableText;

    document.getElementById("contact_form").onsubmit = function (e) {
       //stop form submission
       e.preventDefault();
       console.log("Form submission here");
       //ajax call here
       var sender = document.getElementById('sender').value;
       var email = document.getElementById('email').value;
       var message = document.getElementById('contact_message').value;
    //    console.log(message);

       create_contact_message(sender, email, message);
    };

    function create_contact_message(s, e, m) {
        var request = new XMLHttpRequest();

        var data = new FormData();
        data.append('sender', s);
        data.append('email', e);
        data.append('message', m);

        request.open("POST", './generate_contact_message.php', false);
        request.send(data);
    }

    document.getElementById("login_form").onsubmit = function (e) {
       //stop form submission
       e.preventDefault();

       //ajax call here
       var username = document.getElementById('login_username').value;
       var password = document.getElementById('login_password').value;

       process_login(username, password);
    };

    function process_login(u, p) {
        var request = new XMLHttpRequest();

        var data = new FormData();
        data.append('username', u);
        data.append('password', p);

        request.open("POST", './process_login.php', false);

        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                console.log(request.responseText);
            }
        }

        request.send(data);

    }

    document.getElementById("signup_form").onsubmit = function (e) {
        //stop form submission
        e.preventDefault();
       
        //ajax call here
        var signup_name = document.getElementById('signup_name').value;
        var signup_surname = document.getElementById('signup_surname').value;
        var signup_flatnr = document.getElementById('signup_flatnr').value;
        var signup_password = document.getElementById('signup_password').value;
        var signup_email = document.getElementById('signup_email').value;
 
        process_signup(signup_name, signup_surname, signup_flatnr, signup_password, signup_email);
     };
 
     function process_signup(n, s, f, p, e) {
        var request = new XMLHttpRequest();

        var data = new FormData();
        data.append('name', n);
        data.append('surname', s);
        data.append('flat_number', f);
        data.append('password', p);
        data.append('email', e);

        request.open("POST", './process_signup.php', false);
       
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                console.log(request.responseText);
            }
        }

        request.send(data);
 
     }

}