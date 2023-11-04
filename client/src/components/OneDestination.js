import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const OneDestination = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/destination/${id}`)
      .then((response) => {
        setDestination(response.data);
      })
      .catch((error) => {
        console.error('Error fetching destination details:', error);
      });
  }, [id]);

  if (!destination) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>{destination.name}</h1>

      <div className="destination-info">
        <div className="location-box">
          <div className=" p-3 text-center">
            {destination.location}
          </div>
        </div>

        <div className="description-box mt-5">
          <div className="border rounded p-3 text-start">
            {destination.description}
          </div>
        </div>

        <div className="things-box mt-5">
          <div className="border rounded p-3 text-start">
            {destination.things}
          </div>
        </div>



        <Link to={`/`} className="btn btn-secondary mt-5">
        Back to Destination
      </Link>
      </div>
    </div>
  );
};

export default OneDestination;
