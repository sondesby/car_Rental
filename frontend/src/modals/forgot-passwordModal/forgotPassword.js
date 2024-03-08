import { forgotPassword } from "../../services/mailService";
import st from "./forgotPassword.module.css"

function ForgotPassword(props) {

    const {email,setEmail,loading,setLoading,sent,setSent,err, setErr}= props;
   
  
    const handelChange = (event) => {
      setErr(false);
      setEmail(event.target.value)
    };
    
    const resetValues = ()=>{
      setTimeout(() => {
        setEmail('');
        setErr(false)
      }, 500);
    }
  
    const sendResetEmail = (event)=>{
      event.preventDefault();
      if (!email) {
        setErr("req");    
      }
      else{
        setLoading(true);
        forgotPassword({ email }, (cb) => {
          if (cb.status === 200) {
            setTimeout(() => {
               setLoading(false);
               setSent(true);
            },1000);
          }else if (cb.response.status === 404) {
            setErr("notFound");
            setTimeout(() => {
              setLoading(false);
              setSent(false);
           },1000);
          } else if (cb.response.status === 500) {
            setTimeout(() => {
              setLoading(false);
              setSent(false);
           },1000);
            setErr("err");
          }
        });
      }
    }
    
    return (
      <div
        className={`modal fade`}
        id="forgotPassModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content p-2">
          
            <div className="row d-flex justify-content-end">
              <button
                onClick={resetValues}
                id="forgotPassClose"
                type="button"
                className={`btn-close ${st.btnClose}`}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {loading?
            (
             <>
                <div className={`text-center ${st.sending}`}>
                  <h5 className={st.sendEmail}>Sending in progress</h5>
                  <span className={st.loader}></span>
                </div>
             </>
            ):(
              <>
                {!sent ?
                (
                <>
                  <div className="d-flex justify-content-center">
                    <img src="./images/lock.png" className={st.lock} alt="" />
                  </div>
  
                  <div className="row d-flex justify-content-center text-center mt-5">
                      <h1 className="modal-title fs-5">Forgot your password?</h1>
                  </div>
  
                  <div className="modal-body">
                      <div className="row">
                        <div className="text-center mb-2">
                        Please enter your email address to initiate the reset.
                        </div>
                      </div>
  
                      <form onSubmit={sendResetEmail}>
  
                        <div className="row">
                          <div className="input-group mt-2 mb-2">
                              <input type="email" value={email} name="email" className={`form-control ${err === "req" || err === "notFound" ? 'is-invalid' : ''}`} placeholder="Adresse E-mail" aria-label="Adresse E-mail" aria-describedby="basic-addon1" onChange={handelChange}/>
                              <span className="input-group-text" id="basic-addon1"><i className="bi bi-envelope"></i></span>
                          </div>
                        </div>
  
                        <div className="text-center text-danger errs mb-1" style={{ height: "20px" }} >
                              {err === "notFound" && "Aucun compte avec cette e-mail !" }
                              {err === "req" && "Veuillez entrer votre adresse e-mail !" }
                              {err === "err" && "Erreur lors de l'envoi de l'e-mail !" }
                        </div>
  
                        <div className="row  d-flex justify-content-center text-center mt-3">
                          <button type="submit" className={`${st.btn}`}>Send</button>
                        </div>
  
                      </form>
                    </div>
                </>
                )
                :
                (
                  <>
                   <div className={`text-center ${st.sending}`}>
                      <h5 className={st.sendEmail}>Check your inbox</h5>
                      <div className="d-flex justify-content-center">
                        <img src="./images/done.png" alt="" />
                      </div>
                    </div>
                  </>
                 )
                }
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default ForgotPassword;