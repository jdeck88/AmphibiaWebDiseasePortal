
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

function fetchProjects() {
  fetch(baseURL)
  .then((resp) => resp.json())
  .then(function(data) {
    
    return data.forEach(function(project) {
      // 45 is the Amphibian Disease Portal TEAM configuration ID.
      if(project.projectConfiguration.id == 45 && project.public == true) {
        //console.log(project)

        const table = document.getElementById('projects-display')
        let tr = document.createElement('tr') // Table row
        let p = document.createElement('p') // Paragraph tag
        let modalContent = document.getElementById('m-content')


                tr.innerHTML = `
                <td> <i class="fa fa-globe"></i> </td>
                <td> ${project.projectTitle} </td>
                <td> ${project.principalInvestigator} </td>
                <td> ${project.principalInvestigatorAffiliation} </td>
                <td><button id="detailsBtn" data-id='${project.projectId}'>Details</button></td>
                `
                table.appendChild(tr)

                //TODO: Get all buttons to be clickable.
                // Get each button to correspond to each project and be able to 
                // display the data for that project.
                
                p.innerHTML =`
                ${project.projectTitle}
                `
                modalContent.appendChild(p)

          // Get the button that opens the modal
          let btn = document.getElementById("detailsBtn");

          // Get the modal
          let modal = document.getElementById("detailModal");

          // Get the <span> element that closes the modal
          let span = document.getElementsByClassName("close")[0];
          // When the user clicks on the button, open the modal
          btn.onclick = function() {
            modal.style.display = "block";
          }
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


      }
    })
  })
  .catch(function(err) {
    console.log(err)
  })
}