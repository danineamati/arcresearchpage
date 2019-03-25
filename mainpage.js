// JS for ARC Research Page

// Example structure of the database
// const divisions = // JSON.parse("divisionDatabase.json")
// [
// 	{
// 		name:"Engineering and Applied Science", 
// 		link:"http://eas.caltech.edu/",
// 		departments: [
// 			{
// 				name:"Aerospace", 
// 				link: "http://www.galcit.caltech.edu/"
// 			},
// 			{	
// 				name:"Applied Physics and Material Science",
// 				link: "http://aphms.caltech.edu/"
// 			}
// 		]
// 	}
// ]


// TO RUN LOCALLY, navigate to folder and (using nodejs)
// run "npm install -g live-server"
// To actually run the server, "live-server"


// First we want to load the navigation bar...

// Basic code fore XMLHTTP Request is from W3 School
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // We basically read in the JSON file
        // Note that the filename is at the bottom of the script
        const divisions = JSON.parse(xhttp.responseText);
        console.log("JSON Database Loaded.")

        // We use the tag of divisions to update the HTML Page
		const tag = $("#divisions")

		// First we will display the divisions (e.g. EAS)
		for (const divis of divisions) {
			// We want each Division labelled with an anchor tage
			// Which is the link to the division website
			tag.append(
				$('<a>')
					.attr({
						href: divis.link, 
						target: "_blank", 
						rel: "noopener noreferrer"
					})
					.text(divis.name)
				)
			tag.append($('<br>'))


			// Each division has departments within it
			for (const dept of divis.departments) {
				tag.append(
				$('<input>')
					.attr({
						type: "checkbox",
						onclick: "clicked()"
					})
				)

				// We also want each department within each division
				// to have an anchor to the department website
				tag.append(
				$('<a>')
					.attr({
						href: dept.link, 
						target: "_blank", 
						rel: "noopener noreferrer"
					})
					.text(dept.name)
				)
				tag.append($('<br>'))
			}

			tag.append($('<br>'))
		}
	}
};

xhttp.open("GET", "divisionDatabase.json", true);
xhttp.send();



// Now we can deal with the display cards

function clicked(){
	document.getElementById("opps").innerHTML = "new text";
}