const express = require('express')
const app = express()
const port = 3000

const studentInfo = {'students':['Jerry', 'Alisha', 'Pablo', 'John']}
const classInfo = { 'students': [
    {
        "Name": "Tyran",
        "StudentID": "99999999",
        "Grades": "3.3"
    },
    {
        "Name": "Aaron",
        "StudentID": "12359812",
        "Grades": "2.9"
    },
    {
        "Name": "Jessie",
        "StudentID": "53234589",
        "Grades": "3.4"
    },
    {
        "Name": "Bob",
        "StudentID": "12340588",
        "Grades": "4.0"
    },
    {
        "Name": "Test",
        "StudentID": "2",
        "Grades": "4.0"
    }
]
}

app.get('/', (req, res) => {
    res.send('Hello, and welcome to my app')
})

app.get('/students', (req, res) => {
    var students = ""
    for(var i = 0; i < Object.keys(classInfo['students']).length; i++)
    {
       students = students + classInfo['students'][i]['Name'] + ", "
    }
    students = students.substring(0, students.length -2)
    res.send("Here is a list of students: " + students)
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

// app.get('/grades/:StudentID', (req, res) => {
//     const StudentID = req.params.StudentID
//     var location = 0
//     for(var i = 0; i < Object.keys(classInfo['students']).length; i++)
//     {
//        if(classInfo['students'][i]['StudentID'] == StudentID)
//             location = i
//     }
//     res.send(`Student Grade: ${classInfo['students'][location]['Grades']}`)
// })

app.post('/', function (req, res) {
    res.send('Got a POST request')
})

app.put('/user', function (req, res) {
res.send('Got a PUT request at /user')
})

app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))