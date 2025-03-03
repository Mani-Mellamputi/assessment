import React, { useEffect, useState } from "react";
import axios from "axios";


function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [editableId, setEditableId] = useState(null);
    const [editedData, setEditedData] = useState({
        fullName: "",
        jobTitle: "",
        department: "",
        location: "",
        age: "",
        salary: "",
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:4500/api/users");
            setEmployees(response.data);
        } catch (err) {
            console.error("Error fetching employees:", err);
        }
    };

    const toggleEdit = (id) => {
        const employee = employees.find((emp) => emp._id === id); 
        if (employee) {
            setEditableId(id);
            setEditedData({ ...employee });
        } else {
            setEditableId(null);
            resetEditedData();
        }
    };

    const saveEdit = async (id) => {
        console.log("Saving edit for employee with id:", id); 
        if (!id) {
            console.error("No ID provided for the employee to edit.");
            return; 
        }
        try {
            await axios.put(`http://localhost:4500/api/users/${id}`, editedData); 
            setEmployees((prev) =>
                prev.map((emp) => (emp._id === id ? { ...emp, ...editedData } : emp))
            );
            setEditableId(null);
            resetEditedData();
        } catch (err) {
            console.error("Error saving edit:", err);
        }
    };

    const deleteEmployee = async (id) => {
        try {
            if (!id) {
                console.error("Invalid employee ID");
                return;
            }
            await axios.delete(`http://localhost:4500/api/users/${id}`); 
            setEmployees((prev) => prev.filter((emp) => emp._id !== id)); 
        } catch (err) {
            console.error("Error deleting employee:", err);
        }
    };

    const resetEditedData = () => {
        setEditedData({
            fullName: "",
            jobTitle: "",
            department: "",
            location: "",
            age: "",
            salary: "",
        });
    };

    return (
        <div>
            <h1>Employee Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Job Title</th>
                        <th>Department</th>
                        <th>Location</th>
                        <th>Age</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp._id}> 
                            {editableId === emp._id ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            value={editedData.fullName}
                                            onChange={(e) =>
                                                setEditedData({ ...editedData, fullName: e.target.value })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editedData.jobTitle}
                                            onChange={(e) =>
                                                setEditedData({ ...editedData, jobTitle: e.target.value })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editedData.department}
                                            onChange={(e) =>
                                                setEditedData({ ...editedData, department: e.target.value })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editedData.location}
                                            onChange={(e) =>
                                                setEditedData({ ...editedData, location: e.target.value })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={editedData.age}
                                            onChange={(e) =>
                                                setEditedData({ ...editedData, age: e.target.value })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={editedData.salary}
                                            onChange={(e) =>
                                                setEditedData({ ...editedData, salary: e.target.value })
                                            }
                                        />
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{emp.fullName}</td>
                                    <td>{emp.jobTitle}</td>
                                    <td>{emp.department}</td>
                                    <td>{emp.location}</td>
                                    <td>{emp.age}</td>
                                    <td>{emp.salary}</td>
                                </>
                            )}
                            <td>
                                {editableId === emp._id ? (
                                    <>
                                        <button onClick={() => saveEdit(emp._id)}>Save</button>
                                        <button onClick={() => toggleEdit(null)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => toggleEdit(emp._id)}>Edit</button>
                                        <button onClick={() => deleteEmployee(emp._id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;