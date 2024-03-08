import React, { useEffect, useState } from "react";
import { getAllUserCarPosts, updateCarPost,} from "../../services/postsOperations";
import st from "./user-interface.module.css";
import AddModal from "../../modals/addModal";
import EditModal from "../../modals/editModal";
import DelModal from "../../modals/delModal";

function UserInterface(props) {

  const {setAction, action} = props ;

  const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
   
  const [carPosts, setCarPosts] = useState([]);
  const [selectedCar, setSelectedCar] = useState(false);

  const [err, setErr] = useState(false);
  const resetValues =()=>{
    setErr(false);
    setAction(false);
  }

  const rental = (carPost) => {
    const updatedCarPosts = carPosts.map((cp) => {
      if (cp._id === carPost._id) {
        return { ...cp, dispo: !cp.dispo };
      }
      return cp;
    });
  
    updateCarPost(carPost._id, { ...carPost, dispo: !carPost.dispo }, (res) => {
      if (res.status === 200) {
        setCarPosts(updatedCarPosts);
        setAction(0);
      } else {
      }
    });
  };
  
  useEffect(() => {
    getAllUserCarPosts(userId, (cb) => {
      setCarPosts(cb.data);
    });
  }, [userId,selectedCar,action]);

  const openModal = (p)=>{
    setAction();
    setSelectedCar(p);
  }

  return (
    <div className="container">
      <div className={`row d-flex justify-content-center ${st.userInterfaceHeader }`}>
        <div className="col-lg-6">
          <h1 className={`${st.userInterfaceTitle}`}> Collection </h1>
        </div>
        <div className="col-lg-6 d-flex justify-content-center">
          <button
            className={`btn btn-outline-success ${st.addPostBtn}`}
            data-bs-toggle="modal"
            data-bs-target="#addModal"
            onClick={resetValues}
            
          >
            Rent more
          </button>
        </div>
      </div>
      {
         carPosts ? <div className="row mt-3">
        {carPosts.map((p, i) => (
          <div
            key={i}
            className={`card mb-4 d-flex justify-content-center ${st.cardInfo}`}
          >
            <div className="row ">
              <div className="col-lg-4 p-0">
                <img
                  style={{height:"100%", width:"90%"}}
                  src={p.photos ? `${process.env.REACT_APP_PHOTOS_DIRECTORY}${p.photos}` : "./images/default.png"}
                  alt={p.photos}
                />
              </div>
              <div
                className={`text-center position-absolute top-0 end-0 ${st.editPostBtn}`}
                 onClick={()=>openModal(p)}
                data-bs-toggle="modal"
                data-bs-target="#editModal"
              >
                <i className="bi bi-pencil-fill"></i>
              </div>
              <div
                className={`text-center position-absolute end-0 top-0 ${st.delPostBtn}`}
                 onClick={()=>openModal(p)}
                data-bs-toggle="modal"
                data-bs-target="#delModal"
              > 
                <i className="bi bi-trash3-fill"></i>
              </div>
              <div className={`position-absolute start-0 top-0 ${st.rentBtn}`}>
                      <button
                        onClick={() => rental(p)}
                        className={`${st.availableBtn}  btn ${p.dispo ? "btn-success" : "btn-warning"}` }
                      >
                        {p.dispo ? "Available" : "Rented"}
                      </button>
                    </div>
              <div className="col-lg-8">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-1">
                      <h4>{p.title}</h4>
                    </div>
                    
                  </div>
                  <div className="row mt-3  d-flex justify-content-center text-center">
                    <div className="col-md-3">
                      <div className={`${st.carSpecs}`}>
                        <strong>Model </strong>
                        <br />
                        {p.model}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className={`${st.carSpecs}`}>
                        <strong>Year </strong>
                        <br />
                        {p.year}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className={`${st.carSpecs}`}>
                        <strong>Transmission </strong>
                        <br />
                        {p.transmission}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className={`${st.carSpecs}`}>
                        <strong>Price </strong>
                        <br />
                        {p.price} TND/DAY
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className={`${st.carSpecs}`}>
                        <strong>Engine </strong>
                        <br />
                        {p.engine}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className={`${st.carSpecs}`}>
                        <strong>Traveled Distance </strong>
                        <br />
                        {p.km} KM
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className={`${st.carSpecs}`}>
                        <strong>Fuel </strong>
                        <br />
                        {p.fuel}
                      </div>
                    </div>
                  </div>
                  {p.description ? (
                  <div className="row mt-3">
                        <div className="col-lg-12">
                          <strong>Description: </strong>
                          {p.description}
                        </div>
                  </div> 
                 ) : ""}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div> : <div className="row mt-5"><h1 className="text-center mt-5">You can add a rent car to see it in your collection !</h1></div>
      }
      
      <AddModal err={err} setErr={setErr} setAction={setAction} setSelectedCar={setSelectedCar} setCarPosts={setCarPosts} carPosts={carPosts}  />
      <EditModal setAction={setAction} carPost={selectedCar} setCarPost={setSelectedCar} setCarPosts={setCarPosts} carPosts={carPosts}/>

      {/* DELETE MODAL */}
      <div
        className="modal fade"
        id="delModal"
        tabIndex="-1"
        aria-labelledby="delModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
        <DelModal setAction={setAction} carPost={selectedCar}/>
        </div>
      </div>
      {/* END DELETE MODAL */}
    </div>
  );
}

export default UserInterface;
