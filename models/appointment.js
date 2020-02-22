//export appointment tablet
module.exports = (sequelize,DataTypes) => {

  var Appointment = sequelize.define('Appointment', {
    reservation_date: {
      type: DataTypes.STRING,
      defaultValue: "",

      // allowNull: false,
    },
    reservation_time: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    barber_name: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    customer_name: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    customer_email: {
      type: DataTypes.STRING,
      validate: {
      }
    },
    customer_phone: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 15]
      }
    }
  });
////////////////////////////////////////////////////////////////////////////////////////////// 
// Temporarily commented out  the associate with the Employee model to get the app to run.
//////////////////////////////////////////////////////////////////////////////////////////////
  

  //Associate with
  Appointment.associate = models => {

    // Appointment.belongsTo(models.Employee,{
    //   EmployeeId: {
    //     allowNull: false
    //   }
    // });
    Appointment.belongsTo(models.User,{
      username: {
        allowNull: false
      }
    });
  };

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
  
  
  return Appointment;
};