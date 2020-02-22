var express = require('express');
const momentTimeZone = require('moment-timezone');
const moment = require('moment');
const Appointment = require('../models/appointment');
var router  = express.Router();
// var path = require("path");
// var db = require("../models");
const getTimeZones = function() {
  return momentTimeZone.tz.names();
};

var appointments_controller = require('../controllers/appointments_controller');
var isAuthenticated = require("../config/middleware/isAuthenticated");

router.get('/', isAuthenticated, appointments_controller.index);

// appointments route loads appointments.handlebars
// router.get("/appointments", function(req, res) {
//     res.render("appointments");
//     // res.sendFile(path.join(__dirname, "../public/makeReservation.html"));    // This is for non-handlebars version
//   });

router.post('/new', isAuthenticated, appointments_controller.makeAppointment);
// router.post('/new', isAuthenticated, appointments_controller.sendText);

router.get('/api/appointments/', isAuthenticated, appointments_controller.getAppointments);

router.get('/api/appointments/barber/:barberId', function (req, res, next) {
    var cool = new Date();
    var Sequelize = require("sequelize")
    const Op = Sequelize.Op



    // console.log(cool)
    var nowDate = moment(cool).format("YYYY/MM/DD");
    var timeNow = moment(cool).format("LT");
    db.Reservation.findAll({
        order: [
          ["reservation_date"],
          ["reservation_time"]
        ],

        where: {
          barber_name: req.params.barberId,
          reservation_date: {
            [Op.gte]: nowDate
          }
        }
      })
      .then(function (dbReservation) {
        res.json(dbReservation);
      });
});



module.exports = router;

// 

// module.exports = app => {

//   //Get Appoiment where id
//   app.get("/api/appointment/:id", (req, res) => {
//     db.Appointment.findOne({
//       where: {
//         id: req.params.id
//       },
//       include: [
//         {model: db.User},
//         {model: db.Employee}
//       ]
//     }).then( dbAppointment => {
//       res.json(dbAppointment);
//     });
//   });
//   //Get Appoiment where UserId

//   app.get("/api/appointment/user/:id", (req, res) => {
    
//     db.Appointment.findAll({
//       where: {
//         UserId: req.params.id
//       },
//       include: [
//         {model: db.Employee}
//       ]
//     }).then( dbAppointment => {
//       res.json(dbAppointment);
//     });
//   });
//   //Get Appoiment where EmployeeID
//   app.get("/api/appointment/employee/:id", (req, res) => {
//     db.Appointment.findAll({
//       where: {
//         EmployeeID: req.params.id
//       },
//       include: [
//         {model: db.User}
//       ]
//     }).then( dbAppointment => {
//       res.json(dbAppointment);
//     });
//   });
//   //Create Appoiment where id
//   app.post("/api/appointment", (req, res) => {
//     db.Appointment.create(req.body).then( dbAppointment => {
//       res.json(dbAppointment);
//     });
//   });
//   //Delete Appoiment where id
//   app.delete("/api/appointment/:id", (req, res) => {
//     db.Appointment.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then( dbAppointment => {
//       res.json(dbAppointment);
//     });
//   });
//   //Update Appoiment where id
//   app.put("/api/appointment", (req, res) => {
//     db.Appointment.update(
//       req.body,
//       {
//         where: {
//           id: req.body.id
//         }
//       }).then( dbAppointment => {
//         res.json(dbAppointment);
//       });
//   });
// };