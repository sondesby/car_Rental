import React, { useState} from "react";
import { signin } from "../../services/usersOpertaions";
import st from  './login.module.css'
import ForgotPassword from "../../modals/forgot-passwordModal/forgotPassword";


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(false);
    const [remember, setRemember] = useState(false);

    const [resEmail, setResEmail] = useState('');
    const [resErr,setResErr] = useState(false)
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    //reset the values of the modal
    const resetValues = () => {
        setResEmail('');
        setLoading(false);
        setSent(false);
        setResErr(false);
      }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setErr(false);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setErr(false);
    };

    const login = (event) => {
        event.preventDefault();

        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;

        if (!email || !password) {
            setErr("req");
            return;
        } 
        if (!emailPattern.test(email)) {
            setErr("email");
            return;
          }
        if (!passwordPattern.test(password)) {
            setErr("password");
            return;
        }

        signin({ email, password }, (cb) => {
                if (cb.status === 200) {
                    console.log(cb);
                    if (remember) {
                        localStorage.setItem("name", cb.data.userLogged.name);
                        localStorage.setItem("role", cb.data.userLogged.role);
                        localStorage.setItem("userId", cb.data.userLogged._id);
                        localStorage.setItem("Token", cb.data.Token);
                      } else {
                        sessionStorage.setItem("name", cb.data.userLogged.name);
                        sessionStorage.setItem("role", cb.data.userLogged.role);
                        sessionStorage.setItem("userId", cb.data.userLogged._id);
                        sessionStorage.setItem("Token", cb.data.Token);
                      }
                    window.location.href = "/";
                }else{
                    setErr("cred")
                }
            });
       
    };

    return (
        <div className={`${st.logPage} d-flex justify-content-center`}>
            <form className={`${st.logForm}`} onSubmit={login}>
                <h2 className="text-center mt-3 loginTitle" style={{ color: "#413f7a", }}>Login</h2>
                <h4 className="text-center" style={{ marginBottom: "20px" }}>
                    Welcome To <strong style={{ color: "#413f7a", }}> BY-CARS</strong>
                </h4>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        className={`form-control ${(err === "req" && !email) || err === "email" || err === "cred" ? 'is-invalid' : ''}`}
                        id="floatingInput"
                        placeholder="Email address" />
                    <label>Email address</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className={`form-control ${(err === "req" && !password) || err === "password" || err === "cred" ? 'is-invalid' : ''}`}
                        id="floatingPassword"
                        placeholder="Password" />
                    <label>Password</label>
                </div>
                <div className="col-lg-6 mt-1">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                        <label className="form-check-label">Remember me</label>
                    </div>
                </div>
                <div className="row text-end my-2">
                    <div data-bs-toggle="modal" data-bs-target="#forgotPassModal" onClick={resetValues} className={`${st.forgot}`}>Forgot your password?</div>
                </div>
                <div className="text-center text-danger mt-1 mb-1">
                    {err === "cred" && "Invalid Credentials !"}
                    {err === 'password' && "Password format is incorrect !"}
                    {err === 'email' && "Enter a valid email !"}
                    {err === "req" && "All Fields Are Required !"}
                </div>
                
                <div className="text-center">
                    <button type="submit" className="myBtn">Login</button>
                </div>
            </form>
            <ForgotPassword email={resEmail} setEmail={setResEmail} err={resErr} setErr={setResErr} sent={sent} setSent={setSent} loading={loading} setLoading={setLoading}/>
        </div>
    )
}

export default Login;
