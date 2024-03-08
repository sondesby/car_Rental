import React, { useState } from "react";
import st from "./register.module.css";
import { signup } from "../../services/usersOpertaions";

function Register() {

  const initialValues = { 
    name: "", 
    cin: "", 
    phone: "", 
    city: "", 
    birthdate: "", 
    email: "", 
    password: "", 
    confirmPass: "" 
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const register = (event) => {
    event.preventDefault();

    let namePattern = /^[a-zA-Z\s]+$/;
    let passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if ( !formValues.name || 
         !formValues.cin || 
         !formValues.phone || 
         !formValues.city || 
         !formValues.birthdate || 
         !formValues.email || 
         !formValues.password || 
         !formValues.confirmPass ) {
      setErr("req");
      return;
    } 
    if (!namePattern.test(formValues.name)) {
      setErr("name");
      return;
    }
    if (!emailPattern.test(formValues.email)) {
      setErr("email");
      return;
    }
    if (!passwordPattern.test(formValues.password)) {
      setErr("password");
      return;
    }
        if (formValues.password !==  formValues.confirmPass) {
      setErr("pass");
      return;
    }
      const { confirmPass, ...newUser} = formValues;
      signup(newUser, (cb)=>{
        if (cb.status === 201) {
          sessionStorage.setItem("name", cb.data.userLogged.name);
          sessionStorage.setItem("role", cb.data.userLogged.role);
          sessionStorage.setItem("userId", cb.data.userLogged._id);
          sessionStorage.setItem("Token", cb.data.Token);
          window.location.href = "/";
        }else {
          setErr("error");
        }
      })
  };

  
  return (
    <div className={`d-flex justify-content-center ${st.pageReg}`}>
      <form className={`${st.myFormReg}`} onSubmit={register}>
        <h2 className={`text-center mt-3 mb-4 ${st.title}`}>Register</h2>
        <div className="row">
          <div className="col-12">
            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control  ${(err === "req" && !formValues.name) || err === 'name' || err === 'error' ? 'is-invalid' : ''}`}
                placeholder="Name     "
                value={formValues.name}
                name="name"
                onChange={handleChange}
              />
              <label>Name</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-floating mb-3">
              <input
                type="number"
                className={`form-control ${(err === "req" && !formValues.cin)  || err === 'error' ? 'is-invalid' : ''}`}
                placeholder="Cin"
                value={formValues.cin}
                name="cin"
                onChange={handleChange}
              />
              <label>Cin</label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-floating mb-3">
              <input
                type="tel"
                className={`form-control ${(err === "req" && !formValues.phone) || err === 'error' ? 'is-invalid' : ''}`}
                placeholder="Phone"
                value={formValues.phone}
                name="phone"
                onChange={handleChange}
              />
              <label>Phone</label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control ${(err === "req" && !formValues.city) || err === 'error' ? 'is-invalid' : ''}`}
                placeholder="City"
                value={formValues.city}
                name="city"
                onChange={handleChange}
              />
              <label>City</label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-floating mb-3">
              <input
                type="date"
                className={`form-control ${(err === "req" && !formValues.birthdate) || err === 'error' ? 'is-invalid' : ''}`}
                placeholder="Birthdate"
                value={formValues.birthdate}
                name="birthdate"
                onChange={handleChange}
              />
              <label>Birthdate</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="form-floating mb-3">
              <input
                type="email"
                className={`form-control ${(err === "req" && !formValues.email) || err === 'email' || err === 'error' ? 'is-invalid' : ''}`}
                placeholder="Email"
                value={formValues.email}
                name="email"
                onChange={handleChange}
              />
              <label>Email</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-floating mb-2">
              <input
                type={showPass ? "text" : "password"}
                className={`form-control ${(err === "req" && !formValues.password) || err === "password" || err === "pass" ? 'is-invalid' : ''}`}
                placeholder="Password"
                value={formValues.password}
                name="password"
                onChange={handleChange}
              />
              <label>Password</label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-floating mb-2">
              <input
                type={showPass ? "text" : "password"}
                className={`form-control ${(err === "req" && !formValues.password) || err === "pass" ? 'is-invalid' : ''}`}
                placeholder="Confirm Password"
                value={formValues.confirmPass}
                name="confirmPass"
                onChange={handleChange}
              />
              <label>Confirm Password</label>
            </div>
          </div>
        </div>

        <div className={`text-center text-danger`}>
            {err === "pass" && "Passwords doesn't match !"}
            {err === "req" && "All Fields Are Required !"}
            {err === 'email' && "Enter a valid email !"}
            {err === 'password' && "Password format is incorrect !"}
            {err === "name" && "The first name cannot contain any special characters or numbers !"}
            {err === "error" && "Something went wrong a user already has your infos !"}
        </div>

        <div className="row mb-2">
          <div className="col d-flex justify-content-end">
            <div className={`form-check-reverse form-switch `}>
              <label className="form-check-label">Show passwords</label>
              <input className={`form-check-input`} type="checkbox" checked={showPass} onChange={(e) => setShowPass(e.target.checked)} />
            </div>  
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="myBtn" >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
