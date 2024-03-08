import { useEffect, useState, useRef } from "react";
import st from "./profile.module.css";
import { getUserById, updateUserById } from "../../services/usersOpertaions";

function Profile(props) {
  const { action, setAction } = props;
  const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
  const [user, setUser] = useState();
  const [err, setErr] = useState(false);
  const [avatar, setAvatar]=useState();
  const [load, setLoad] = useState(false);
  const [update, setUpdate] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    getUserById(userId, (cb) => {
      if (cb.data) {
        setUser(cb.data.user);
      } else console.error(cb);
    });
  }, [userId,action]);

  const handleChange = (event) => {
    setErr(false)
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const imgView = document.getElementById("img-view")
  const inputFile = document.getElementById("input-file")

  const uploadImage = (e)=>{
    let imgLink = URL.createObjectURL(inputFile.files[0]);
    imgView.src=imgLink;
    if (imgRef.current) {
      imgRef.current.src = imgLink;
    }
    setAvatar(e.target.files[0])
    }


  const UpdateUser = (e) => {
    e.preventDefault();
    
    if (
      !user.name ||
      !user.cin ||
      !user.phone ||
      !user.city ||
      !user.birthdate ||
      !user.email
    ) {
      setErr("req");
    } else {
        setLoad(true);
      const updatedUser = {
        name: user.name,
        cin: user.cin,
        phone: user.phone,
        city: user.city,
        birthdate: user.birthdate,
        email: user.email,
      };
      const formData = new FormData();
      Object.keys(updatedUser).forEach((key)=>{
        formData.append(key,updatedUser[key])
      });
      if(avatar instanceof File)
      {
        formData.append('avatar',avatar);
      }

      //  for (const pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }

      updateUserById(user._id,formData,(cb)=>{
        if (cb.status === 200) {
          setTimeout(()=>{
           setLoad(false);
           setUpdate(true);
          },2000);
          
          setTimeout(()=>{
            setUpdate(false)
           },4000);
          
          setAction("updated");
        }else console.error(cb);
      })
    }
  };

  return (
    <div className={`container ${st.profilePage}`}>
        <div className={`row d-flex justify-content-center`}>
        <div className="col-lg-12">
          <h1 className={`${st.title}`}> Profile </h1>
        </div>
        </div>
      {user ? (
        <>
          <form onSubmit={UpdateUser} encType="multipart/form-data">
            <div className="row">
              <div className="col-xl-4">
                <div className={`card mb-3 ${st.card}`}>
                  <div className={`${st.cardheader} card-header`}>
                    Profile Picture
                  </div>
                  <div className={`card-body text-center`}>
                    <div id="img-view">
                      <img
                        className={`${st.img} ${st.roundedCircle}`}
                        src={user.avatar ? `${process.env.REACT_APP_PHOTOS_DIRECTORY}${user.avatar}`: "./images/avatar.png"}
                        alt="avatar"
                        ref={imgRef}
                      />
                    </div>

                    <div id="drop-area" htmlFor="input-file" className={`${st.dropArea}`}
                      onDragOver={(e)=>{e.preventDefault()}}
                      onDrop={(e)=>{
                        e.preventDefault();
                        inputFile.files = e.dataTransfer.files
                        uploadImage();
                      }}
                     onClick={() => document.getElementById('input-file').click()}>

                      <input type="file" accept="image/*" id="input-file" onChange={uploadImage} style={{display:"none"}}/>

                      <div className={st.icon}>
                        <i className="bi bi-cloud-arrow-up"></i>
                      </div>

                      <div className="mb-1" style={{color:"#49494891"}}>
                        Upload new image
                      </div>
                    </div>
                  
                  </div>
                </div>
              </div>
              <div className="col-xl-8">
                <div className={`card ${st.card} mb-4`}>
                  <div className={`${st.cardheader} card-header`}>
                    Account Details
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="small mb-1">Name</label>
                      <input
                        className={`form-control ${err === "req" && !user.name ? "is-invalid" : ""}`}
                        type="text"
                        placeholder="Enter your Name"
                        name="name"
                        onChange={handleChange}
                        value={user.name}
                      />
                    </div>

                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1">CIN</label>
                        <input
                          className={`form-control ${err === "req" && !user.cin ? "is-invalid" : ""}`}
                          type="number"
                          placeholder="Enter your National Card Number"
                          name="cin"
                          onChange={handleChange}
                          value={user.cin}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="small mb-1">Phone Number</label>
                        <input
                          className={`form-control ${err === "req" && !user.phone ? "is-invalid" : ""}`}
                          id="inputLastName"
                          type="tel"
                          placeholder="Enter your phone number"
                          name="phone"
                          onChange={handleChange}
                          value={user.phone}
                        />
                      </div>
                    </div>

                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1">City</label>
                        <input
                          className={`form-control ${err === "req" && !user.city ? "is-invalid" : ""}`}
                          type="text"
                          placeholder="Enter your city name"
                          name="city"
                          onChange={handleChange}
                          value={user.city}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="small mb-1">Birthdate</label>
                        <input
                          className={`form-control ${err === "req" && !user.birthdate ? "is-invalid" : ""}`}
                          type="date"
                          name="birthdate"
                          onChange={handleChange}
                          value={user.birthdate}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-3">
                        <label className="small mb-1">Email address</label>
                        <input
                          className={`form-control ${err === "req" && !user.email ? "is-invalid" : ""}`}
                          type="email"
                          placeholder="Enter your email address"
                          name="email"
                          onChange={handleChange}
                          value={user.email}
                        />
                      </div>
                    </div>

                    <div className="row">
                    {load ? <div className="d-flex justify-content-center mb-2"><div className={`${st.loader}`}></div></div> : ""}
                    {update ? <div className="d-flex justify-content-center mb-2"><div className={`text-success`}>Profile saved</div></div> : ""}
                    {err === 'req' ? <div className="d-flex justify-content-center mb-2"><div className={`text-danger`}>Please fill all the fileds</div></div> : ""} 
                      <div className="d-flex justify-content-center">
                        <button className={`btn myBtn ${st.myBtn}`} type="submit">
                            Save changes
                        </button>
                      </div>                      
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Profile;
