import { useState } from "react";
import st from "./resetPassword.module.css";
import { resetPassword } from "../../services/mailService";

function ResetPassword() {

    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get('token');
    
    const initialValues = {
        newpass: "",
        confirmNewPass: "",
      };

    const [err, setErr] = useState(false);
    const [resetFormValues, setResetFormValues] = useState(initialValues);
    const [showPass, setShowPass] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErr(false);
        setResetFormValues({ ...resetFormValues, [name]: value });
    };
          
    const resetPass = (event) => {
        event.preventDefault();
        let passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
        
        if (!resetFormValues.newpass || !resetFormValues.confirmNewPass)
        {
          setErr("req");
          return;
        } 
        if (!passwordPattern.test(resetFormValues.newpass)) {
          setErr("pattern");
          return;
        }
        if (resetFormValues.newpass !== resetFormValues.confirmNewPass)
        {
          setErr("pass");
          return;
        }
          const newPassword = resetFormValues.newpass;

          resetPassword({newPassword},token,(cb)=>{
            if (cb.status === 200) {
              window.location.href='/login'
            }else {
              console.error(cb);
            }
          })
    };

  return (
  
    <div className={`${st.resetPage} d-flex justify-content-center`}>
    <form className={`${st.resetForm}`} onSubmit={resetPass}>
        <h2 className="text-center mt-2 mb-3 loginTitle" style={{ color: "#413f7a", }}>Password Reset</h2>
        <div className="form-floating mb-2">
            <input
                type={showPass ? "text" : "password"}
                value={resetFormValues.newpass}
                onChange={handleChange}
                className={`form-control ${(err === "req" && !resetFormValues.newpass) || err === "pattern" || err === "pass" ? 'is-invalid' : ''}`}
                name="newpass"
                placeholder="Password" />
            <label>Password</label>
        </div>
        <div className="form-floating mb-2">
            <input
                type={showPass ? "text" : "password"}
                value={resetFormValues.confirmNewPass}
                onChange={handleChange}
                className={`form-control ${(err === "req" && !resetFormValues.confirmNewPass) || err === "pass" ? 'is-invalid' : ''}`}
                name="confirmNewPass"
                placeholder="Confirm Password" />
            <label>Confirm Password</label>
        </div>
        <div className="text-center text-danger mt-1 mb-1">
              {err === "pass" && "Passwords doesn't match !"}
              {err === 'pattern' && "Password format is incorrect !"}
              {err === "req" && "All fields are required !"}
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
            <button type="submit" className="myBtn">Reset</button>
        </div>
    </form>
</div>
  );
}

export default ResetPassword;
