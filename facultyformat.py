# Python Script to format into JSON

name = input("Prof Name: ")
email = input("Email: ")
other_depts = input("Other Departments: ")
accepting = input("Is faculty currently accepting? [Yes/No] ")
studentYears = input("studentYears: ")
requirements = input("requirements: ")
opportunities = input("Input faculty opportunities: ")
students = input("students: ")


with open("facultyformat.txt", "a") as file:
	file.write("\n{")
	file.write('\n  "name":"{}"'.format(name))
	file.write(',\n  "email":"{}"'.format(email))
	file.write(',\n  "other_depts":"{}"'.format(other_depts))
	file.write(',\n  "accepting":"{}"'.format(accepting))
	file.write(',\n  "studentYears":"{}"'.format(studentYears))
	file.write(',\n  "requirements":"{}"'.format(requirements))
	file.write(',\n  "opportunities":"{}"'.format(opportunities))
	file.write("\n}\n")

