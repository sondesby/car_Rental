import React, { useState, useEffect } from "react";
import st from "./home.module.css";
import { Link } from "react-router-dom";

function Home(props) {
 
  const { carPosts, setCarPost } = props;
  const [search, setSearch]= useState("");
  const [filteredPost, setFilteredPost]=useState();

  const seeMore = (carPost) => {
    setCarPost(carPost);
  };

  useEffect(()=>{
    if (search === "") {
      setFilteredPost(carPosts);
    }else{
      setFilteredPost(carPosts.filter((carPost)=> carPost.title.toLowerCase().includes(search.toLowerCase()) ));
    }
  },[search,carPosts])

  return (
    <div className={`container ${st.homePage}`}>
      <div className="row">
        <div className="col mt-3">
          <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
            <div className="input-group">
              <input onChange={(event) =>{setSearch(event.target.value)}} value={search}
              type="search" list="datalistOptions" id="searchDataList" placeholder="What're you searching for?" aria-describedby="button-addon1" className={`form-control border-0 bg-light ${st.formControl}`}/>
              <div className="input-group-append">
                <button id="button-addon1" type="submit" className="btn btn-link text-primary"><i className="bi bi-search"></i></button>
              </div>
              <datalist id="datalistOptions">
                <option value="Mercedes"></option>
                <option value="Maserati"></option>
                <option value="Toyota"></option>
                <option value="Alfa Romeo"></option>
                <option value="BMW"></option>
              </datalist>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {filteredPost && filteredPost.length > 0 ? (
          filteredPost.map((carPost,i) => (
            <div className="col-lg-4 mb-5" key={i}>
              <div className={`card ${st.carCard}`}>
                <div className={`row mt-3 d-flex justify-content-center ${st.dispo} ${carPost.dispo ? "text-success" : "text-warning"}`}>{carPost.dispo ? "Available" : "Rented"}</div>
                <img src={carPost.photos ? `${process.env.REACT_APP_PHOTOS_DIRECTORY}${carPost.photos}`: "./images/default.png"} className={st.carimage } alt={carPost.title} />
                <div className="card-body">
                  <div className={`${st.titre} d-flex justify-content-center`}> 
                    {carPost.title}
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className={`row ${st.text}`}>
                      <div className={`col-6 ${st.detail}`}>
                        <i style={{ marginLeft : "29px" }} className={`bi bi-car-front-fill ${st.icon}`} ></i> {carPost.year}
                      </div>
                      <div className={`col-6 ${st.detail}`}>
                        <i style={{ marginLeft : "25px" }} className={`bi bi-gear ${st.icon}`} ></i> {carPost.transmission}
                      </div>
                      <div className={`col-6 ${st.detail}`}>
                        <img style={{ marginLeft : "25px" }} src="images/road.png" className={st.road} alt="" /> {carPost.km} KM
                      </div>
                      <div className={`col-6 ${st.detail}`}>
                      <i style={{ marginLeft : "25px" }} className={`bi bi-clock ${st.icon}`}></i> {carPost.addedat.substring(0, 10)}
                      </div>
                    </div>
                  </div>
                  <Link to="/Post-details" className={`btn myBtn`} onClick={() => seeMore(carPost)} >See more</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="row text-center">No car posts available</p>
        )}
      </div>
    </div>
  );
}

export default Home;
