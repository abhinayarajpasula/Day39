import React, { useEffect, useState } from 'react';
import { getStudents } from '../services/api';

function StudentList() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const studentData = await getStudents();
            setStudents(studentData);
        };
        fetchStudents();
    }, []);

    return (
        <div>
            <h2>Student List</h2>
            <ul>
                {students.map(student => (
                    <li key={student._id}>{student.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default StudentList;