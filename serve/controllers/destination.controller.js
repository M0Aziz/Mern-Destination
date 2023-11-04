const Destination = require('../models/destination.model');
const multer = require('multer');

/*const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); 
  },
});

const upload = multer({ storage: storage });*/



exports.createDestination = (req, res) => {
    const { name, location, description, things } = req.body;

    console.log(req.body);

    console.log(req.body.name);
    /*upload.array('image')(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          error: 'Erreur lors du téléchargement d\'images',
        });
      }*/


      //console.log(req.body);
  
      const destination = new Destination({
        name: name,
        location: location,
        description: description,
        things: things,
      });
  
      destination.save()
        .then((data) => {
          res.json(data);
        })
        .catch((saveError) => {
          res.status(400).json({
            error: 'Erreur lors de la création de la destination',
          });
        });
   // });
  };
  



exports.getAllDestinations = (req, res) => {
  Destination.find()
    .then((destinations) => {
      res.json(destinations);
    })
    .catch((err) => {
      res.status(400).json({
        error: 'Erreur lors de la récupération des destinations',
      });
    });
};



exports.getDestinationById = (req, res) => {
    const id = req.params.id;
  
    Destination.findById(id)
      .then((destination) => {
        if (!destination) {
          return res.status(404).json({
            error: 'Destination non trouvée',
          });
        }
        res.json(destination);
      })
      .catch((err) => {
        res.status(500).json({
          error: 'Erreur lors de la recherche de la destination',
        });
      });
  };
  

exports.updateDestination = (req, res) => {
  const id = req.params.id;
 /* upload.array('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        error: "Erreur lors du téléchargement d'images",
      });
    }*/

        Destination.findByIdAndUpdate(id, {
            $set: {
              name: req.body.name,
              location: req.body.location,
              description: req.body.description,
              things: req.body.things,
              // image: req.files.map((file) => file.filename), 
            }
          }, { new: true })
            .then(destination => {
              res.json(destination);
            })
            .catch(error => {
              res.status(400).json({
                error: 'Erreur lors de la mise à jour de la destination',
              });
            });
  //});
};



exports.deleteDestination = (req, res) => {
    const id = req.body.id; 
    console.log(id);
    Destination.findOneAndDelete({ _id: id })
      .then((deletedDestination) => {
        if (!deletedDestination) {
          return res.status(404).json({
            error: 'Destination non trouvée',
          });
        }
        res.json({ message: 'Destination supprimée avec succès' });
      })
      .catch((err) => {
        res.status(400).json({
          error: 'Erreur lors de la suppression de la destination',
        });
      });
  };
  
