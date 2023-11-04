import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateDestination = ({ match }) => {
    const { id } = useParams();
    const navigate = useNavigate();

  const [destinationData, setDestinationData] = useState({
    name: '',
    location: '',
    description: '',
    things: '',
  });

  const [initialData, setInitialData] = useState({});

  const [errors, setErrors] = useState({
    location: '',
    description: '',
    things: '',
  });

  const [isFormModified, setIsFormModified] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/destination/${id}`)
      .then((response) => {
        const initialDestinationData = response.data;
        console.log(initialDestinationData);
      setDestinationData(initialDestinationData);
      setInitialData(initialDestinationData);
      })
      .catch((error) => {
        console.error('Error fetching destination data:', error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDestinationData({
      ...destinationData,
      [name]: value,
    });

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

    const isModified = JSON.stringify(destinationData) !== JSON.stringify(initialData);
    setIsFormModified(isModified);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (destinationData.location.length < 3 || destinationData.description.length < 10 || destinationData.things.length < 10) {
      alert('Please correct the errors in the form before submitting.');
      return;
    }

    axios
      .put(`http://localhost:8000/api/destination/${id}`, destinationData)
      .then((response) => {
        console.log('Destination updated successfully:', response.data);
        alert('Destination updated successfully');
navigate('/');     
 })
      .catch((error) => {
        console.error('Error updating destination:', error);
      });
  };

  return (
    <div className="container">
      <h1 className="mt-5">Edit Destination</h1>
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
    </div>        <div className="form-group row mt-5">
          <div className="col-lg-12">
            <button type="submit" className="btn btn-primary me-2" disabled={!isFormModified}>
              Update
            </button>
            <Link to={`/`} className="btn btn-secondary ms-2">
              Back to Destination
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateDestination;
