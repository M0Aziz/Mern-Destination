import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import serverBaseUrl from '../config'; 
import { useLocation } from 'react-router-dom';


const DisplayAll = () => {
    const location = useLocation();

  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/destination')
      .then((response) => {
        setDestinations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching destinations:', error);
      });
  }, []);



  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette destination ?");

    if (confirmDelete) {
      axios
        .delete(`http://localhost:8000/api/destination/`, { data: { id } })
        .then((response) => {
          console.log('Destination supprimée avec succès:', response.data);

          axios.get('http://localhost:8000/api/destination')
            .then((response) => {
              setDestinations(response.data);
            })
            .catch((error) => {
              console.error('Error fetching destinations:', error);
            });
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de la destination:", error);
        });
    }
  };






  const successMessage = location.state && location.state.successMessage;

  return (
    <div className="container">
    {successMessage && (
        <div className="alert alert-success alert-dismissible">
        {successMessage}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      
      )}
      <h1 className='mt-5'>Don't know where to travel? We got you</h1>
      <Link to="/add" className="btn btn-primary mt-3">Add Destination</Link>

      {destinations.map((destination) => (
        <div key={destination._id} className="card mb-3 mt-5">
          <div className="row g-0">
         
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title mt-4">{destination.name}</h5>
                <div className="btn-group mt-4 mb-4" role="group">
                  <Link to={`/view/${destination._id}`} className="btn btn-secondary">View</Link>
                  <Link to={`/edit/${destination._id}`} className="btn btn-primary mx-2">Edit</Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(destination._id)}>Delete</button>
                </div>
              </div>
            </div>

            <div className="col-md-4">
            {/* Vous pouvez ajouter l'image ici */}
            {/* <img src={`${serverBaseUrl}/public/${destination.image}`} alt={`Image for ${destination.name}`} className="img-fluid" /> */}
          </div>
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default DisplayAll;
