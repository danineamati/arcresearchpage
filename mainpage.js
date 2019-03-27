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
var divisions;

// Basic code fore XMLHTTP Request is from W3 School
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // We basically read in the JSON file
        // Note that the filename is at the bottom of the script
        divisions = JSON.parse(xhttp.responseText);
        console.log("JSON Database Loaded.")

        // We use the tag of divisions to update the HTML Page
		const tag = $("#divisions")

		// First we will display the divisions (e.g. EAS)
		for (const divis of divisions) {
			// We want each Division to be collapsible
			tag.append(
				$('<input>')
					.attr({
						// type: "checkbox"
						type: "image",
						src: "caret.svg",
						style: "width:15px;",
						id: divis.name
					})
				)
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


// "Fake Class for testing"
class singleProf {
	constructor(name, email, depts, accepting,
	studentYears, requirements, students, opportunities) {
		if (name != undefined) {this.name = name} 
			else {this.name = "Not Listed"};
		if (email != undefined) {this.email = email} 
			else {this.email = "Not Listed"};
		if (depts != undefined) {this.depts = depts} 
			else {this.depts = "Not Listed"};
		if (accepting != undefined) {this.accepting = accepting} 
			else {this.accepting = "Not Listed"};
		if (studentYears != undefined) {this.studentYears = studentYears} 
			else {this.studentYears = "Not Listed"};
		if (requirements != undefined) {this.requirements = requirements} 
			else {this.requirements = "Not Listed"};
		if (students != undefined) {this.students = students} 
			else {this.students = "Not Listed"};
		if (opportunities != undefined) {this.opportunities = opportunities} 
			else {this.opportunities = "Not Listed"};
	}
}

function clicked(){
	document.getElementById("opps").innerHTML = "new text";

	// Here is an example of creating a card.
	// Assuming we find the Prof. Ralph Adolphs. We add this prof's card to
	// the display.
	const ralph = divisions[0].departments[4].faculty[0]
	console.log(ralph)
	makeCard("oppTable", ralph)
}


function makeCard(id, prof) {

	// ------------------------------
	//  Start with the Card instance
	// ------------------------------
	var thisCard = document.createElement("div");
	thisCard.className = "dispCard";

	// ------------
	//   Top Line
	// ------------
	// First we start with the top line of the card:

	var topLine = document.createElement("div");
	topLine.className = "topLine";

	
	var profName = document.createElement("div");
	profName.className = 'profName';
	profName.innerHTML = "<h3>" + prof.name +"</h3>\
						<p><b>Currently Accepting?</b> " +
						prof.accepting + "</p>";

	var profDepts = document.createElement("div");
	profDepts.className = 'profDepts';
	deptsStr = '<p>'
	for (dept of prof.depts) {
		deptsStr = deptsStr + dept + '<br>'
	}
	// Now also add the email
	deptsStr = deptsStr + "Email: <a href = \"mailto:" +
		prof.email + "\" >" + prof.email + "</p>";
	profDepts.innerHTML = deptsStr

	topLine.appendChild(profName);
	topLine.appendChild(profDepts);
	thisCard.appendChild(topLine);

	// ----------------
	//   Body of Card
	// ----------------

	// First, the Student Years
	var studentYears = document.createElement("p")
	studentYears.innerHTML = "<b>Student Years: </b>" + prof.studentYears;

	// Second, the Requirements
	var requirements = document.createElement("p")
	requirements.innerHTML = "<b>Requirements: </b>" + prof.requirements;

	// Third, Previous Students
	var students = document.createElement("p")
	var studStr = "<b>Previous Students:</b> "
	for (stud of prof.students) {
		studStr = studStr + ", " + stud
	}
	// Ignore the first comma
	studStr = studStr.replace(',', '');
	students.innerHTML = studStr;

	// Fourth, Current Opportunities
	var opportunities = document.createElement("p")
	opportunities.innerHTML =  "<b>Current Opportunities: </b>" 
									+ prof.opportunities;


	thisCard.appendChild(studentYears);
	thisCard.appendChild(requirements);
	thisCard.appendChild(students);
	thisCard.appendChild(opportunities);

	document.getElementById(id).appendChild(thisCard);
}