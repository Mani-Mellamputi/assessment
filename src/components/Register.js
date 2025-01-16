import React, { useRef } from "react";
function Register() {
  const fullNameInputRef = useRef();
  const jobTitleInputRef = useRef();
  const departmentInpuRef = useRef();
  const locationInpuRef = useRef();
  const ageInpuRef = useRef();
  const salaryInputRef = useRef();
  let sendSignupDataToServerThrouhFD = async () => {
    let data = {
      fullName: fullNameInputRef.current.value,
      jobTitle: jobTitleInputRef.current.value,
      department: departmentInpuRef.current.value,
      location: locationInpuRef.current.value,
      age: ageInpuRef.current.value,
      salary: salaryInputRef.current.value,
    };
    console.log(data);

    let reqOption = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };

    let JSONData = await fetch("http://localhost:4500/api/users", reqOption);

    let JSOData = await JSONData.json();
    console.log(JSOData);
  };
  return (
    <div className="App">
      <br></br>
      <form>
        <h1 style={{textAlign:"center", color:"#007bff"}}>Employee Data</h1>
        <div>
          <label>fullName : </label>
          <input placeholder="fullName" ref={fullNameInputRef}></input>
        </div>
        <div>
          <label>jobTitle : </label>
          <input placeholder="jobTitle" ref={jobTitleInputRef}></input>
        </div>
        <div>
          <label>department :</label>
          <input placeholder="deparment" ref={departmentInpuRef}></input>
        </div>
        <div>
          <label>location :</label>
          <input placeholder="location" ref={locationInpuRef}></input>
        </div>
        
        <div>
          <label>age :</label>
          <input placeholder="age" ref={ageInpuRef}></input>
        </div>
        <div>
          <label>salary :</label>
          <input placeholder="salary" ref={salaryInputRef}></input>
        </div>
        <div>
          <button className="btn"
            type="button"
            onClick={() => {
              sendSignupDataToServerThrouhFD();
            }}
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;