var express = require('express');
const momentTimeZone = require('moment-timezone');
var moment = require("moment")
var db = require('../models');
const Appointment = require('../models/appointment');
var router  = express.Router();


exports.index = function(req, res, next) {
    res.render('appointments/appointments');
};

// make appointment
exports.makeAppointment = function(req, res, next) {

    console.log("this is req.body", req.body);
    db.Appointment.create({
        customer_name: req.body.customer_name,
        reservation_date: req.body.reservation_date,
        barber_name: req.body.barber_name,
        reservation_time: req.body.reservation_time,
        customer_phone: req.body.customer_phone,
        customer_email: req.body.customer_email
      })
      .then(function (dbAppointment) {
        console.log(dbAppointment)

        // console.log("this isdbReservation:", dbReservation)
        //       res.json(dbPost);
        //     });
        // });
        sendText(dbAppointment);
        res.json({
          dbAppointment
        });
      })
    // .catch(function (err) {
    //   // handle error;
    //   console.log("appointment already booked")
    // });
  
};

function sendText (dbAppointment) {  
  const accountSid = 'AC86a5ecb84dbe987ee0efce53fed3c61b';
  const authToken = '534ab4df7e9e1b7f0d18e202c652549f';
  const client = require('twilio')(accountSid, authToken);    
     
          // Create options to send the message
          const options = {
              to: `+ ${dbAppointment.customer_phone}`,
              from: +18044355223,
              /* eslint-disable max-len */
              body: `Hi ${dbAppointment.customer_name}. Just a reminder that you have an appointment coming up with ${dbAppointment.barber_name} at ${dbAppointment.reservation_time}.`,
              /* eslint-enable max-len */
          };

          // Send the message!
          client.messages.create(options, function(err, response) {
              if (err) {
                  // Just log it for now
                  console.error(err);
              } else {
                  // Log the last few digits of a phone number
                  let masked = dbAppointment.customer_phone.substr(0,
                      dbAppointment.customer_phone.length - 5);
                  masked += '*****';
                  console.log(`Message sent to ${masked}`);
              }
          });
};

exports.getAppointments = function(req, res, next) {
      Appointment.find()
        .then(function(appointments) {
          res.render('appointments/index', {appointments: appointments});
    });
      // var cool = new Date();
      // var nowDate = moment(cool).format("YYYY/MM/DD");
      // var timeNow = moment(cool).format("LT");

      // db.Appointment.findAll({
      //   where: {
      //     username: req.user.id
      //   }
      // }).then(function(dbAppointment) {
      //   console.log(dbAppointment);
      //   res.render('appointment/appointment', {
      //     layout: 'main-appointments',
      //     Appointment: dbAppointment
      //   });
      // });


    // var cool = new Date();
    // var Sequelize = require("sequelize")
    // const Op = Sequelize.Op

    // console.log(cool)
    // var nowDate = moment(cool).format("YYYY/MM/DD");
    // var timeNow = moment(cool).format("LT");

    // console.log(nowDate + " " + timeNow)
    // var momentDateTime = (nowDate + " " + timeNow)
    // db.Appointment.findAll({
    //     order: [
    //       ["reservation_date"],
    //       ["reservation_time"]
    //     ],

    //     where: {
    //       reservation_date: {
    //         [Op.gte]: nowDate
    //       }
    //     }
    //   })
    //   .then(function (dbAppointment) {
    //     console.log(dbAppointment);
    //     res.render(dbAppointment);
    //   });
};

exports.getBarberAppointments = function(req, res) {
  var cool = new Date();
    var Sequelize = require("sequelize")
    const Op = Sequelize.Op

    // console.log(cool)
    var nowDate = moment(cool).format("YYYY/MM/DD");
    var timeNow = moment(cool).format("LT");
    db.Appointment.findAll({
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
      .then(function (dbAppointment) {
        res.json(dbAppointment);
      });
};
