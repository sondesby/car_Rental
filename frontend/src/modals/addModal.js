import React, { useEffect, useState } from "react";
import { addCarPost } from "../services/postsOperations";

function AddModal(props) {
  var { carPosts, setCarPosts, setAction, err, setErr} = props;
  const [years, setYears] = useState([]);
  const [currentYear] = useState(new Date().getFullYear());
  

  const initialValues = {
    title: "",
    model: "",
    engine: "",
    fuel: "Gasoline",
    transmission: "Manual",
    year: currentYear,
    km: "",
    price: "",
    description: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  
  const handleChange = (event) => {
    const { name, value} = event.target;
    setErr(false);
    setFormValues({ ...formValues, [name]: value });
  };
  useEffect(() => {
    const startYear = currentYear - 70;
    const endYear = currentYear + 1;

    const yearOptions = [];
    for (let year = endYear; year >= startYear; year--) {
      yearOptions.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    setYears(yearOptions);
  }, [currentYear]);

  const addCar = (e) => {
    
    e.preventDefault();
    if (
      !formValues.title ||
      !formValues.model ||
      !formValues.engine ||
      !formValues.price ||
      !formValues.km
    ) {
      setErr("req")
    } else {
      const formData = new FormData();
      Object.keys(formValues).forEach((key) => {
          formData.append(key, formValues[key]);
      });

      const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
      formData.append("user", userId);
      
      // for (const pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }
      
      addCarPost(formData, (res) => {
        if (res.status === 201) {
          setFormValues(initialValues);
          setCarPosts([...carPosts, res.data.carPost])
          setAction("added")
          document.getElementById('addClose').click();
        } else {
          setErr("smth");
        }
      });
    }
  };

  return (
    <div
      className="modal fade"
      id="addModal"
      tabIndex="-1"
      aria-labelledby="addModalLabel"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addModalLabel">
              Add more cars to your collection
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={addCar}>
              <div className="row mt-3">
                <div className="col-lg-6">
                  <label className="form-label">Post Title :</label>
                  <input type="text" className={`form-control ${(err === "req" && !formValues.title) ? "is-invalid" : ""}`} placeholder="Title" name="title"
                    onChange={handleChange}
                    value={formValues.title}
                  />
                </div>
                <div className="col-lg-6">
                  <label className="form-label">Model :</label>
                  <input type="text" className={`form-control ${(err === "req" && !formValues.model) ? "is-invalid" : ""}`} placeholder="Model" name="model"
                    onChange={handleChange}
                    value={formValues.model}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-4">
                  <label className="form-label">Engine:</label>
                  <input type="text" className={`form-control ${(err === "req" && !formValues.engine) ? "is-invalid" : ""}`} placeholder="Engine" name="engine"
                    onChange={handleChange}
                    value={formValues.engine}
                  />
                </div>
                <div className="col-lg-4">
                  <label className="form-label">Fuel :</label>
                  <select className={`form-select`} name="fuel"
                    onChange={handleChange}
                    value={formValues.fuel}
                  >
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
                <div className="col-lg-4">
                  <label className="form-label">Transmission :</label>
                  <select className={`form-select`} name="transmission"
                    onChange={handleChange}
                    value={formValues.transmission}
                  >
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-4">
                  <label className="form-label">Traveled Distance :</label>
                  <input type="number" className={`form-control ${(err === "req" && !formValues.km) ? "is-invalid" : ""}`} placeholder="Traveled Distance"
                    name="km"
                    onChange={handleChange}
                    value={formValues.km}
                  />
                </div>
                <div className="col-lg-4">
                  <label className="form-label">Year :</label>
                  <select className={`form-select`} name="year" id="year"
                    onChange={handleChange}
                    value={formValues.year}
                  >
                    <option hidden value={currentYear}>
                      {currentYear}
                    </option>
                    {years}
                  </select>
                </div>
                <div className="col-lg-4">
                  <label className="form-label">Price in TND:</label>
                  <input type="number" className={`form-control ${(err === "req" && !formValues.price) ? "is-invalid" : ""}`} placeholder="Price" name="price"
                    onChange={handleChange}
                    value={formValues.price}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                <label className="form-label">Add a photo:</label>
                <input
                name="photos"
                  type="file"
                  className={`form-control ${err === "req" ? "is-invalid" : ""}`}
                  onChange={(e) => {
                    const photos = e.target.files[0];
                    setFormValues({ ...formValues, photos: photos });
                  }}
                />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <label className="form-label">Description:</label>
                  <textarea className="form-control mb-3" name="description" rows="2" onChange={handleChange} 
                    value={formValues.description} >
                  </textarea>
                </div>
                
                <div className="text-danger text-center mb-3">
                    {err === "req" ? "All fields are required !" : ""}
                    {err === "smth" ? "Somthing went wrong !" : ""}
                </div>
              </div>
              <div className="modal-footer">
                <button id="addClose" type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="Submit" className="btn btn-primary" >
                  Add car
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
