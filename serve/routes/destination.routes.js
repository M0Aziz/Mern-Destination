const DestinationController = require("../controllers/destination.controller");


module.exports = (app)=>{

    app.post("/api/destination", DestinationController.createDestination);
    app.get("/api/destination", DestinationController.getAllDestinations);
    app.delete("/api/destination", DestinationController.deleteDestination);
app.put ("/api/destination/:id", DestinationController.updateDestination)
app.get ("/api/destination/:id", DestinationController.getDestinationById)

}