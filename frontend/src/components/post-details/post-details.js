import st from "./post-details.module.css";


function PostDetails(props) {

    const {carPost} = props;
    return (
        <div className={`container ${st.postDetailsPage}`}>
            {carPost ? (
            <div>
            <div className="row">
                <h3 className={`col-6 mt-4 d-flex justify-content-start text-success ${carPost.dispo ? "text-success" : "text-warning"}`} >
                    {carPost.dispo ? "Available" : "Rented"}</h3>
                <h3 className="col-6 mt-4 d-flex justify-content-end">{carPost.addedat.substring(0, 10)}</h3>
            </div>
            <div className="row">
                <div className="col-lg-6 mt-2">
                    <div className="row">
                        <img className={`${st.postDetailsPhoto}`} src={carPost.photos ? `${process.env.REACT_APP_PHOTOS_DIRECTORY}${carPost.photos}`: "./images/default.png"} alt="Car" />
                    </div>
                    
                    <div className={`row mt-3  d-flex justify-content-center text-center ${st.carDetails}`}>
                        <div className="col-md-4">
                            <div className={`${st.specs}`}>
                                <strong>Model </strong><br />{carPost.model}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={`${st.specs}`}>
                                <strong>Engine </strong><br />{carPost.engine}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={`${st.specs}`}>
                                <strong>Fuel </strong><br />{carPost.fuel}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={`${st.specs}`}>
                                <strong>Year </strong><br />{carPost.year}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={`${st.specs}`}>
                                <strong>Traveled Distance </strong><br />{carPost.km} KM
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={`${st.specs}`}>
                                <strong>Transmission </strong><br />{carPost.transmission}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${st.detailsCard} col-lg-6 mt-4`}>
                    <div className="row ">
                        <div className="col-7"><h3 style={{ color : "#2d2c4a", fontWeight: "600" }}>{carPost.title}</h3></div>
                        <div className="col-5  d-flex justify-content-end mt-1"><h3 style={{ color : "#fd7a09" }}>{carPost.price} TND/Day</h3></div>
                    </div>
                    {carPost.description ? (
                         <div className="row mt-3">
                                <p className={`mt-3${st.carDescription}`}><strong>Details : </strong>{carPost.description}</p>
                         </div>)
                    :("")}
                    <div className="row d-flex justify-content-center">
                        <div className="col-5 ">
                            <img className={`${st.postDetailsAvatar}`} src={carPost.user.avatar ? `${process.env.REACT_APP_PHOTOS_DIRECTORY}${carPost.user.avatar}`: "./images/avatar.png"} alt="avatar" />
                        </div>
                        <div className={`col-7 ${st.postDetailsUser}`}>
                            <h3 style={{ fontWeight : '500', color : "#fd7a09" }}>Owner :</h3>
                            <section>{carPost.user.name}</section>
                            <section>{carPost.user.phone}</section>
                            <section>{carPost.user.email}</section>
                            <section>{carPost.user.city}, Tunisia</section>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-7">
                
                </div>
            </div>
            </div>
            ) : (
                <div className="text-center text-danger"><h1>You didn't select any car</h1></div>
              )}
        </div>
        );
}

export default PostDetails;