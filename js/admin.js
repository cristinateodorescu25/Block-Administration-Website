function calculateProb(probString) {

  var probs = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
  ];

  for (i = 0; i < probString.length - 1; i++) {
      probs[probString[i]][probString[i+1]]++;
  }

  for (i = 0; i < 5; i++) {

    var total = 0;

    for (j = 0; j < 5; j++) {
      total += probs[i][j];
    }

    for (j = 0; j < 5; j++) {
      
      probs[i][j] *= 100 / total;
      probs[i][j] = Math.ceil(probs[i][j]);
    }

  }

  return probs;

}


window.onload = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
    };
  
    document.getElementById("total_users").innerHTML = 5;
    document.getElementById("top_user").innerHTML = 'Sebastian Grey';
    document.getElementById("day_most_users").innerHTML = 'Sunday';
   
    /*
      Process probability string
    */

   request.open("GET", "./get_probability.php", false);
   request.send();

   probability = JSON.parse(request.responseText)

   var probString = probability[0].string

   var resProbs = calculateProb(probString)


   new Chart(document.getElementById("buttons-page-chart"), {
    type: 'line',
    data: {
      labels: ['Block', 'Notice board', 'News', 'Contact', 'Weekly form'],
      datasets: [{
        label: 'Block',
        data: [resProbs[0][0], resProbs[0][1], 
                resProbs[0][2], resProbs[0][3],
                resProbs[0][4]],
        backgroundColor: "rgba(66, 134, 244,0.3)"
      }, {
        label: 'Notice board',
        data: [resProbs[1][0], resProbs[1][1], 
                resProbs[1][2], resProbs[1][3],
                resProbs[1][4]],
        backgroundColor: "rgba(53, 66, 255,0.3)"
      }, {
        label: 'News',
        data: [resProbs[2][0], resProbs[2][1], 
                resProbs[2][2], resProbs[2][3],
                resProbs[2][4]],
        backgroundColor: "rgba(116, 52, 255,0.3)"
      }, {
        label: 'Contact',
        data: [resProbs[3][0], resProbs[3][1], 
                resProbs[3][2], resProbs[3][3],
                resProbs[3][4]],
        backgroundColor: "rgba(177, 51, 255,0.3)"
      }, {
        label: 'Weekly form',
        data: [resProbs[4][0], resProbs[4][1], 
                resProbs[4][2], resProbs[4][3],
                resProbs[4][4]],
        backgroundColor: "rgba(224, 50, 255,0.3)"
      }]
    }
  });



    request.open("GET", "./get_top3_users.php", false);
    request.send();

    topUsers = JSON.parse(request.responseText);

    new Chart(document.getElementById("top-user-chart"), {
        type: 'horizontalBar',
        data: {
          labels: ["Flat " + topUsers[0].flat,
                    "Flat " + topUsers[1].flat,
                    "Flat " + topUsers[2].flat],
          datasets: [
            {
              label: "Top Users",
              backgroundColor: ["rgb(38, 180, 45)", "rgb(38, 180, 45)","rgb(38, 180, 45)"],
              data: [topUsers[0].value, topUsers[1].value, topUsers[2].value]
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Top users'
          }
        }
    });

    Chart.plugins.register({
        beforeDraw: function(chartInstance) {
          var ctx = chartInstance.chart.ctx;
          ctx.fillStyle = "white";
          Chart.defaults.global.defaultFontColor = "black";
          ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
        }
    });




    
    request.open("GET", "./get_datetime.php", false);
    request.send();

    userPages = JSON.parse(request.responseText);


    new Chart(document.getElementById("user-page-chart"), {            
        type: 'bar',
        data: {
        labels: [userPages[0].user, userPages[1].user, userPages[2].user, userPages[3].user],
        datasets: [
            {
            label: "Chatroom",
            backgroundColor: "rgb(0, 108, 249)",
            data: [userPages[0].chat_time / 60, userPages[1].chat_time / 60, userPages[2].chat_time / 60, userPages[3].chat_time / 60]
            }, {
            label: "Homepage",
            backgroundColor: "rgb(102, 16, 172)",
            data: [userPages[0].home_time / 60, userPages[1].home_time / 60 , userPages[2].home_time / 60, userPages[3].home_time / 60]
            }
        ]
        },
        options: {
        title: {
            display: true,
            text: 'Time spent per user per page'
        }
        }
    });


    request.open("GET", "./get_logtimes.php", false);
    request.send();

    // console.log(request.responseText);
    logTimes = JSON.parse(request.responseText);


    new Chart(document.getElementById("userperday-chart"), {
        type: 'line',
        data: {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
                    'Sunday'],
          datasets: [{ 
              data: [logTimes[0].log_times, logTimes[1].log_times, logTimes[2].log_times, logTimes[3].log_times, logTimes[4].log_times, logTimes[5].log_times, logTimes[6].log_times],
              label: "April",
              borderColor: "#f97300",
              fill: false
            }, {
              data: [logTimes[7].log_times, logTimes[8].log_times, logTimes[9].log_times, logTimes[10].log_times, logTimes[11].log_times, logTimes[12].log_times, logTimes[13].log_times],
              label: "May",
              borderColor: "rgb(38, 180, 45)",
              fill: false
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Number of users per day'
          }
        }
      });
      
      request.open("GET", "./get_contact_messages.php", false);
      request.send();
  
      allContactMessages = JSON.parse(request.responseText);
  
      let contactCarousel = document.getElementById("carousel_inner");
      let htmlTableText = '';

      let contactCarouselWrapper = document.getElementById("contact_carousel");
      let htmlTableTextWr = '';
      let htmlTableText2 ='';
      
      var counter = 0;

      for (let c of allContactMessages) {

        if (counter == 0) {

          htmlTableTextWr += `
            <ol class="carousel-indicators">
            <li data-target="#contact_carousel" data-slide-to="${c.id-1}" class="active"></li>
          `;

          counter++;

        } else if (counter != allContactMessages.length-1) {

          htmlTableTextWr += `
          <li data-target="#contact_carousel" data-slide-to="${c.id-1}"></li>
          `;	

          counter++;
        } else {

          htmlTableTextWr += `
            <li data-target="#contact_carousel" data-slide-to="${c.id-1}"></li>
            </ol>
          `;
          counter++;
        }

        document.getElementById("contact_messages").innerHTML = counter;
    }

    contactCarouselWrapper.innerHTML += htmlTableTextWr;    

    counter = 0;

    for (let cM of allContactMessages) {

      if (counter == 0) {
        htmlTableText += `<div class="carousel-inner" role="listbox">
        <div class="carousel-item active">
          <div class="view">
            <img class="d-block w-100" src="contact_message.jpg" alt="Carousel Slide">
            <div class="mask rgba-black-strong"></div>
          </div>
          <div class="carousel-caption">
              <h3 class="h3-responsive">${cM.sender}</h3>
              <p>${cM.email}</p>
              <h5 class="h5-responsive">${cM.message}</h5>
          </div>
        </div>
        `;
        counter++;
      } else if (counter == allContactMessages.length - 1) {

        htmlTableText += `
          <div class="carousel-item">
            <div class="view">
              <img class="d-block w-100" src="contact_message.jpg" alt="Carousel Slide">
              <div class="mask rgba-black-strong"></div>
            </div>
            <div class="carousel-caption">
                <h3 class="h3-responsive">${cM.sender}</h3>
                <p>${cM.email}</p>
                <h5 class="h5-responsive">${cM.message}</h5>
            </div>
          </div>
        </div>
        `;

      } else {
        htmlTableText += `
        <div class="carousel-item">
          <div class="view">
            <img class="d-block w-100" src="contact_message.jpg" alt="Carousel Slide">
            <div class="mask rgba-black-strong"></div>
          </div>
          <div class="carousel-caption">
              <h3 class="h3-responsive">${cM.sender}</h3>
              <p>${cM.email}</p>
              <h5 class="h5-responsive">${cM.message}</h5>
          </div>
        </div>
        `;

      }
     
      
    }

    contactCarouselWrapper.innerHTML += htmlTableText;

    htmlTableText2 += `
      <a class="carousel-control-prev" href="#contact_carousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#contact_carousel" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
      </a>
    `;

    contactCarouselWrapper.innerHTML += htmlTableText2;



    document.getElementById("formbuilderBtn").onclick = function (e) {
      //stop form submission
      e.preventDefault();
      console.log("Form sending here");
      //ajax call here
      var formQuestion = document.getElementById("form_question").value;
      var selectedOption = document.getElementById("input_type").value;

      if (selectedOption == "dropdown") {

        var selectedOption1 = document.getElementById("dropdown_option1").value;
        var selectedOption2 = document.getElementById("dropdown_option2").value;
        var selectedOption3 = document.getElementById("dropdown_option3").value;
        var selectedOption4 = document.getElementById("dropdown_option4").value;
        var selectedOption5 = document.getElementById("dropdown_option5").value;
      
        add_form(formQuestion, 'dropdown', ' ', selectedOption1, selectedOption2, selectedOption3, selectedOption4, selectedOption5);
      
      } else if (selectedOption == "single_check") {

        var selectedOption1 = document.getElementById("single_check_option1").value;
        var selectedOption2 = document.getElementById("single_check_option2").value;
        var selectedOption3 = document.getElementById("single_check_option3").value;
        var selectedOption4 = document.getElementById("single_check_option4").value;
        var selectedOption5 = document.getElementById("single_check_option5").value;
      
        add_form(formQuestion, 'single_check', ' ', selectedOption1, selectedOption2, selectedOption3, selectedOption4, selectedOption5);

      } else if (selectedOption == "multiple_check") {

        var selectedOption1 = document.getElementById("multiple_check_option1").value;
        var selectedOption2 = document.getElementById("multiple_check_option2").value;
        var selectedOption3 = document.getElementById("multiple_check_option3").value;
        var selectedOption4 = document.getElementById("multiple_check_option4").value;
        var selectedOption5 = document.getElementById("multiple_check_option5").value;
      
        add_form(formQuestion, 'multiple_check', ' ', selectedOption1, selectedOption2, selectedOption3, selectedOption4, selectedOption5);

      } else if (selectedOption == "input_text") {

        var shortlong = document.getElementById("input_form_textlength").value;

        add_form(formQuestion, 'input_text', shortlong, ' ', ' ', ' ', ' ', ' ');

      }

    function add_form(q, t, sl, d1, d2, d3, d4, d5) {

      var request = new XMLHttpRequest();

      var data = new FormData();
      data.append('question', q);
      data.append('type', t);
      data.append('shortlong', sl);
      data.append('o1', d1);
      data.append('o2', d2);
      data.append('o3', d3);
      data.append('o4', d4);
      data.append('o5', d5);

      console.log(q, t, sl, d1, d2);

      request.open("POST", './generate_form_entry.php', false);
      request.send(data);
    }
  }
  
};



