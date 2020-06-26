const express = require('express')
const app = express()
const port = 3000

const studentInfo = {'students':['Jerry', 'Alisha', 'Pablo', 'John']}
const classInfo = { 'students': [
    {
        "Name": "Tyran",
        "Last": "Banks",
        "StudentID": "99999999",
        "Grades": "3.3"
    },
    {
        "Name": "Bob",
        "Last": "Traverse",
        "StudentID": "12359812",
        "Grades": "2.9"
    },
    {
        "Name": "Jessie",
        "Last": "Riddle",
        "StudentID": "53234589",
        "Grades": "3.4"
    },
    {
        "Name": "Bob",
        "Last": "Marley",
        "StudentID": "12340588",
        "Grades": "4.0"
    },
    {
        "Name": "Test",
        "Last": "Driven",
        "StudentID": "2",
        "Grades": "4.0"
    }
]
}

app.get('/', (req, res) => {
    res.send('Hello, and welcome to my app')
})

app.get('/students', (req, res) => {
        if(req.query.search == undefined)
        {
            var students = ""

            for(var i = 0; i < Object.keys(classInfo['students']).length; i++)
            {
                students = students + classInfo['students'][i]['Name'] + " " + classInfo['students'][i]['Last'] + ", "
            }
            students = students.substring(0, students.length -2)

            res.send("Here is a list of students: " + students)
        }
        else{
            var students = ""
            for(var i = 0; i < Object.keys(classInfo['students']).length; i++)
            {
                var studname = classInfo['students'][i]['Name']
                var studlast = classInfo['students'][i]['Last']
                if(req.query.search == studname)
                    students = students + studname + " " + studlast + ", "
            }
            students = students.substring(0, students.length -2)
            res.send("Here is a list of students: " + students)
        }   
})


app.get('/:studentParam/:StudentID', (req, res) => {
    const studentParam = req.params.studentParam
    const StudentID = req.params.StudentID
    var location = 0
    for(var i = 0; i < Object.keys(classInfo['students']).length; i++)
    {
       if(classInfo['students'][i]['StudentID'] == StudentID)
            location = i
    }
    if(studentParam == 'students')
        res.send(`Student name: ${classInfo['students'][location]['Name']}`)
    else if(studentParam == 'grades')
        res.send(`Student Grade: ${classInfo['students'][location]['Grades']}`)
})

app.use(express.json())
//test $ curl -d '{"StudentID":"2", "Grades":"3.3"}' -H "Content-Type: application/json" -X POST http://localhost:3000/grades

app.post('/grades/', function (req, res) {
    const StudentID = req.body.StudentID
    const Grades = req.body.Grades
    for(var i = 0; i < Object.keys(classInfo['students']).length; i++)
    {
       if(classInfo['students'][i]['StudentID'] == StudentID)
        {
            classInfo['students'][i]['Grades'] = Grades
            res.send(`Updated the student: ${classInfo['students'][i]['Name']} with the grade: ${Grades}`)
        }
    }
})

app.post('/register/', function (req, res) {
    const StudentID = req.body.StudentID
    const Grades = req.body.Grades
    const Name = req.body.Name
    const firstName = Name.split(" ")[0]
    const lastName = Name.split(" ")[1]
    var obj = JSON.parse(classInfo)
    obj['students'].push({"Name":firstName, "Last":lastName,"StudentID":StudentID, "Grades":Grades})
    res.send(`Added a new student: ${firstName} ${lastName}, Student ID: ${StudentID}, Grade Average: ${Grades}`)
})
app.put('/user', function (req, res) {
res.send('Got a PUT request at /user')
})

app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))