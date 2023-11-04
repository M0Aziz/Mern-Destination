import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const AddDestination = () => {
  const [destinationData, setDestinationData] = useState({
    name: '',
    location: '',
    description: '',
    things: '',
   // images: [],
  });
  const navigate = useNavigate();


  const [successMessage, setSuccessMessage] = useState('');

  const [errors, setErrors] = useState({
    location: '',
    description: '',
    things: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDestinationData({
      ...destinationData,
      [name]: value,
    });

    // Validate the input value
    if (name === 'location') {
      setErrors({
        ...errors,
        location: value.length < 3 ? 'Emplacement should be at least 3 characters long' : '',
      });
    } else if (name === 'description') {
      setErrors({
        ...errors,
        description: value.length < 10 ? 'Description should be at least 10 characters long' : '',
      });
    } else if (name === 'things') {
      setErrors({
        ...errors,
        things: value.length < 10 ? 'Things to do should be at least 10 characters long' : '',
      });
    }
  };

 /* const handleImageChange = (e) => {
    const imageFiles = [...e.target.files];
    setDestinationData({
      ...destinationData,
      images: imageFiles,
    });
  };*/

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log('Données du formulaire:', destinationData);

    if (
      destinationData.location.length < 3 ||
      destinationData.description.length < 10 ||
      destinationData.things.length < 10
    ) {
      alert('Please correct the errors in the form before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('name', destinationData.name);
    formData.append('location', destinationData.location);
    formData.append('description', destinationData.description);
    formData.append('things', destinationData.things);
    

    //for (const image of destinationData.images) {
     // formData.append('image', image);
    //}

    console.log('Données du formulaire:', destinationData);


    axios
      .post('http://localhost:8000/api/destination', destinationData)
      .then((response) => {
        console.log('Destination ajoutée avec succès:', response.data);

    setSuccessMessage('La destination a été ajoutée avec succès!');
    navigate('/', { state: { successMessage: 'La destination a été ajoutée avec succès!' } });

        setDestinationData({
          name: '',
          location: '',
          description: '',
          things: '',
          //images: [],
        });
        setErrors({
          location: '',
          description: '',
          things: '',
        });
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la destination:", error);
      });
  };

  return (
    <div className="container">
      <h1 className='mt-5'>Add a new destination</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group row mt-5">
          <label htmlFor="name" className="col-lg-2 col-form-label">Name:</label>
          <div className="col-lg-10">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={destinationData.name}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group row mt-4">
          <label htmlFor="location" className="col-lg-2 col-form-label">Location:</label>
          <div className="col-lg-10">
            <input
              type="text"
              name="location"
              className={`form-control ${errors.location ? 'is-invalid' : ''}`}
              placeholder="Location"
              value={destinationData.location}
              onChange={handleInputChange}
            />
            {errors.location && <div className="invalid-feedback">{errors.location}</div>}
          </div>
        </div>
        <div className="form-group row mt-4">
          <label htmlFor="description" className="col-lg-2 col-form-label">Description:</label>
          <div className="col-lg-10">
            <textarea
              name="description"
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              placeholder="Add a Description"
              value={destinationData.description}
              onChange={handleInputChange}
            />
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>
        </div>
        <div className="form-group row mt-4">
          <label htmlFor="things" className="col-lg-2 col-form-label">Things to do</label>
          <div className="col-lg-10">
            <textarea
              name="things"
              className={`form-control ${errors.things ? 'is-invalid' : ''}`}
              placeholder="Add things to do here"
              value={destinationData.things}
              onChange={handleInputChange}
            />
            {errors.things && <div className="invalid-feedback">{errors.things}</div>}
          </div>
        </div>
     {/*   <div className="form-group row mt-4">
          <label htmlFor="image" className="col-lg-2 col-form-label">Images:</label>
          <div className="col-lg-10">
            <input
              type="file"
              name="image"
              className="form-control-file"
              accept=".jpg, .jpeg, .png"
              multiple
              onChange={handleImageChange}
            />
          </div>
        </div>
        {destinationData.images.length > 0 && (
          <div className="form-group row mt-3">
            <div className="col-lg-12">
              <p>Images sélectionnées:</p>
              {destinationData.images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt=""
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
              ))}
            </div>
          </div>
              )} */ }
        <div className="form-group row mt-5">
          <div className="col-lg-12">
            <button type="submit" className="btn btn-primary me-2">Add</button>
            <Link to="/" className="btn btn-secondary ms-2">Back to Home</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDestination;
