import { useEffect, useState } from "react";
import { updateCarPost } from "../services/postsOperations";

function EditModal(props) {
  var { carPost, setCarPost, setAction } = props;
  const [years, setYears] = useState([]);
  const [currentYear] = useState(new Date().getFullYear());
  const [err, setErr] = useState(false);
  const [photos, setPhotos] = useState(false);




  const handleChange = (event) => {
    const { name, value } = event.target;
    setCarPost({ ...carPost, [name]: value });
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
  }, [currentYear,carPost, err]);


  const updatePost = (e) => {
    setErr(false)
    e.preventDefault();
    if ( !carPost.title || !carPost.model || !carPost.engine || !carPost.price || !carPost.km ) {
      setErr("req")
    } else {
      const car = {
        title : carPost.title,
        model : carPost.model,
        engine : carPost.engine,
        km : carPost.km,
        price : carPost.price,
        description : carPost.description,
        user : carPost.user._id,
        transmission : carPost.transmission,
        year : carPost.year,
        fuel : carPost.fuel,
      }
      const formData = new FormData();
      Object.keys(car).forEach((key) => {
        if (key !== 'user') {
          formData.append(key, car[key]);
        }
      });
      if (photos) {
        if (photos instanceof File) {
          formData.append("photos", photos);
        }
      }

      updateCarPost(carPost._id, formData, (res) => {
        if (res.status === 200) {
          console.log('Post updated successfully!');
          setAction("edited")
          document.getElementById('editClose').click();
        } else {
          setErr("smth")
        }
      });
    }
  };

  return (
    <div
      className="modal fade"
      id="editModal"
      tabIndex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="editModalLabel">
              Edit your car
            </h1>
            <button
              id="editClose"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {carPost ? (
              <form action="" onSubmit={updatePost}>
                <div className="row mt-3">
                  <div className="col-lg-6">
                    <label className="form-label">Post Title :</label>
                    <input

                      type="text"
                      className={`form-control ${(err && !carPost.title) ? "is-invalid" : ""}`}
                      placeholder="Title"
                      name="title"
                      onChange={handleChange}
                      value={carPost.title}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">Model :</label>
                    <input
                      value={carPost.model}
                      type="text"
                      className={`form-control ${(err && !carPost.model) ? "is-invalid" : ""}`}
                      placeholder="Model"
                      name="model"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-lg-4">
                    <label className="form-label">Engine:</label>
                    <input
                      value={carPost.engine}
                      type="text"
                      className={`form-control ${(err && !carPost.engine) ? "is-invalid" : ""}`}
                      placeholder="Engine"
                      name="engine"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="form-label">Fuel :</label>

                    {carPost.fuel ? (
                      <select
                        className={`form-select`}
                        name="fuel"
                        onChange={handleChange}
                      >
                        <option hidden value={carPost.fuel}>
                          {carPost.fuel}
                        </option>
                        <option value="Gasoline">Gasoline</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                      </select>
                    ) : (
                      <select
                        className={`form-select`}
                        name="fuel"
                        onChange={handleChange}
                      >
                        <option value="Gasoline">Gasoline</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                      </select>
                    )}
                  </div>
                  <div className="col-lg-4">
                    <label className="form-label">Transmission :</label>
                    {carPost.transmission ? (
                      <select
                        className={`form-select`}
                        name="transmission"
                        onChange={handleChange}
                      >
                        <option hidden value={carPost.transmission}>
                          {carPost.transmission}
                        </option>
                        <option value="Manual">Manual</option>
                        <option value="Automatic">Automatic</option>
                      </select>
                    ) : (
                      <select
                        className={`form-select`}
                        name="transmission"
                        onChange={handleChange}
                      >
                        <option value="Manual">Manual</option>
                        <option value="Automatic">Automatic</option>
                      </select>
                    )}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-lg-4">
                    <label className="form-label">Traveled Distance :</label>
                    <input
                      value={carPost.km}
                      type="number"
                      className={`form-control ${(err && !carPost.km) ? "is-invalid" : ""}`}
                      placeholder="Traveled Distance"
                      name="km"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="form-label">Year :</label>
                    <select
                      className={`form-select`}
                      name="year"
                      id="year"
                      onChange={handleChange}
                    >
                      <option hidden value={carPost.year}>
                        {carPost.year}
                      </option>
                      {years}
                    </select>
                  </div>
                  <div className="col-lg-4">
                    <label className="form-label">Price in TND:</label>
                    <input
                      value={carPost.price}
                      type="number"
                      className={`form-control ${(err && !carPost.price) ? "is-invalid" : ""}`}
                      placeholder="Price"
                      name="price"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                <div className="col">
                <label className="form-label">Add a photo:</label>
                <input
                name="photos"
                  type="file"
                  className={`form-control`}
                  onChange={(e) => {
                    setPhotos(e.target.files[0])
                  }}
                />
                </div>
              </div>
                <div className="row mt-3">
                  <div className="col">
                    <label className="form-label">Description:</label>
                    <textarea
                      value={carPost.description}
                      className="form-control"
                      name="description"
                      rows="2"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </form>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
