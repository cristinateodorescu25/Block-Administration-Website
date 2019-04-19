window.onload = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
    };
  
    document.getElementById("contact_messages").innerHTML = 20;
    document.getElementById("top_user").innerHTML = 'John Smith';
    document.getElementById("day_most_users").innerHTML = 'Sunday';
    document.getElementById("total_users").innerHTML = 5;

    new Chart(document.getElementById("top-user-chart"), {
        type: 'horizontalBar',
        data: {
          labels: ["asdasdasdadadasdadad", "Guy2", "Guy3"],
          datasets: [
            {
              label: "Top Users",
              backgroundColor: ["rgb(38, 180, 45)", "rgb(38, 180, 45)","rgb(38, 180, 45)"],
              data: [20, 13, 7]
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

    new Chart(document.getElementById("user-page-chart"), {            
        type: 'bar',
        data: {
        labels: ["U1", "U2", "U3", "U4"],
        datasets: [
            {
            label: "Homepage",
            backgroundColor: "rgb(0, 108, 249)",
            data: [133,221,783,2478]
            }, {
            label: "Chatroom",
            backgroundColor: "rgb(102, 16, 172)",
            data: [408,547,675,734]
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

    new Chart(document.getElementById("userperday-chart"), {
        type: 'line',
        data: {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
                    'Sunday'],
          datasets: [{ 
              data: [2, 3, 4, 1, 2, 4, 6],
              label: "total users",
              borderColor: "#f97300",
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

        console.log(counter , c)

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
        }
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
    
    console.log(htmlTableText);

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

}
