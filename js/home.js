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

/* ==================================================
    Probability
================================================== */

function addButtonString(string) {


    // window.onload = function() {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
        };
    
        var data = new FormData();
        data.append('string', string + "");
    
    console.log(string);

        request.open("POST", './generate_probability.php', false);
        console.log('deschis?')
        request.send(data);

        // var sth = JSON.parse(request.responseText);
        console.log(request.responseText);
    // }
}


window.onload = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        // console.log(request);
    };

    request.open("GET", "./get_notice_board.php", false);
    request.send();

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

    /* ==================================================
        Contact Form
    ================================================== */

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

    /* ==================================================
        Signup Form
    ================================================== */

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


     /* ==================================================
        Get Form Builder
        ================================================== */

        request.open("GET", "./get_form.php", false);
        request.send();

        formEntries = JSON.parse(request.responseText);
        console.log(formEntries);


        let weeklyForm = document.getElementById("weekly_form");
        let formHTML = '';

        for (let f of formEntries) {

            formHTML += `
            <div class="form-group">
                <label for="formGroupExampleInput">${f.question}</label>`;
        
            if (f.type == "input-text") {
               
                if (f.shortlong == "short") {

                    formHTML += `
                        <input type="text" class="form-control texti" placeholder="Type your answer"></input>
                        </div>`;

                } else {
                
                    formHTML += `
                        <textarea class="form-control texti" rows="3"></textarea>
                        </div>`;

                }

            } else if (f.type == "dropdown") {

                formHTML += `
                <div class="select">
                    <select name="sel">
                    <option>${f.o1}</option>
                    <option>${f.o2}</option>
                    <option>${f.o3}</option>
                    <option>${f.o4}</option>
                    <option>${f.o5}</option>
                    </select>
                </div>`;

            } else if (f.type == "single_check") {

                formHTML += `
                    <label class="rad">${f.o1}
                    <input type="radio" name="optradio">
                    <span class="checkmark"></span>
                    </label>
                    <label class="rad">${f.o2}
                    <input type="radio" name="optradio">
                    <span class="checkmark"></span>
                    </label>
                    <label class="rad">${f.o3}
                    <input type="radio" name="optradio">
                    <span class="checkmark"></span>
                    </label>
                    <label class="rad">${f.o4}
                    <input type="radio" name="optradio">
                    <span class="checkmark"></span>
                    </label>
                    <label class="rad">${f.o5}
                    <input type="radio" name="optradio">
                    <span class="checkmark"></span>
                    </label>`;          

            } else if (f.type == "multiple_check") {

                formHTML += `
                    <label class="rad2">${f.o1}
                        <input type="checkbox">
                        <span class="checkmark2"></span>
                    </label>
                    <label class="rad2">${f.o2}
                        <input type="checkbox">
                        <span class="checkmark2"></span>
                    </label>
                    <label class="rad2">${f.o3}
                        <input type="checkbox">
                        <span class="checkmark2"></span>
                    </label>
                    <label class="rad2">${f.o4}
                        <input type="checkbox">
                        <span class="checkmark2"></span>
                    </label>
                    <label class="rad2">${f.o5}
                        <input type="checkbox">
                        <span class="checkmark2"></span>
                    </label>`;
            }
        }

        weeklyForm.innerHTML = formHTML;

}