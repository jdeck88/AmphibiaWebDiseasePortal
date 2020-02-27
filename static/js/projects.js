
function downloadButton(a) {
    fetch ('https://api.geome-db.org/records/Sample/excel?networkId=1&q=_projects_:174+and+_expeditions_:%5B'+a+'%5D+_select_:%5BEvent,Sample%5D+')
        .then(response => {
	    return response.json();
	})
        .then(json => {
		var a = document.createElement("a");
  		a.href = json.url;
  		a.setAttribute("download", a);
  		a.click();
	})
	.catch(err => {
		alert('error fetching download link from GEOME'+err)
	})
}


// Fetching all projects from GEOME
let baseURL = 'https://api.geome-db.org/projects/stats?'

var query = window.location.search.substring(1);
var qs = parse_query_string(query);
console.log(qs)
/*
pseudo-code!!
if (qs.key != some value)
set innerHTML to be project specific shit
else
set innerHTML to be a a list of all fetchProjects
*/

function fetchProjects() {
  fetch(baseURL)
  .then((resp) => resp.json())
  .then(function(data) {
    
    return data.forEach(function(project) {
      // 45 is the Amphibian Disease Portal TEAM configuration ID.
      if(project.projectConfiguration.id == 45 && project.public == true) {
        //console.log(project)

        // DATA TABLE
        const table = document.getElementById('projects-display')
        let tr = document.createElement('tr') // Table row


              tr.innerHTML = `
                <td> <i class="fa fa-globe"></i> </td>
                <td> ${project.projectTitle} </td>
                <td> ${project.principalInvestigator} </td>
                <td> ${project.principalInvestigatorAffiliation} </td>
                <td><button class="detailsBtn" data-id='${project.projectId}' data-title="${project.projectTitle}">Details</button></td>
                `
              table.appendChild(tr)

                //TODO: 
                // DONE: Get all buttons to be clickable.
                // Get each button to correspond to each project and be able to 
                // display the data for that project.

        // BUTTONS AND MODALS
        let p = document.createElement('p')
        let modalContent = document.querySelector('.modal-content')

        // Get the buttons that open the modal by class
        let btns = document.querySelectorAll(".detailsBtn");
        // Get the modals by class
        let modal = document.querySelector(".modal");

          // Makes all the buttons clickable
          for (const btn of btns) {
            btn.addEventListener('click', function(event) {
              modal.style.display = "block";
              let targetId = btn.dataset.id
              let title = btn.dataset.title
              
                p.innerHTML = title
                modalContent.appendChild(p)
            })
           
            
          }

          

          //CLOSING THE MODALS

          // Get the <span> element that closes the modal
          let span = document.getElementsByClassName("close")[0];

          // When the user clicks on <span> (x), close the modal
          span.onclick = function() {
            modal.style.display = "none";
          }

          // When the user clicks anywhere outside of the modal, close it
          window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
          }

          // Keep this for now.
          // When the user clicks on the button, open the modal
          // btn.onclick = function() {
          //   modal.style.display = "block";
          // 


      }
    })
  })
  .catch(function(err) {
    console.log(err)
  })
}

function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}