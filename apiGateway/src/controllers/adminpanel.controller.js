
const httpStatus = require("http-status");
const axios = require("axios");
const authService = require("../services/auth.service");
const bcryptService = require("../services/bcrypt.service");
const Utils = require("../utils/generic");
const api = require("../services/api.service");

const AdminpanelController = () => {
  /**
   * Returns jwt token if valid username and password is provided
   * @param req
   * @param res
   * @param next
    @returns {}
   */
  / Get Customers /
  const constructResponseMsg = async response => {
    if (response && response.status === 200) {
      return response.data;
    } else {
      return response.response.data;
    }
  };
    
  const getTable = async (req, res, next) => {
    console.log("Viewchecklist bindings");
    api
      .makeServiceCall(
        "POST",
        "adminpanel",
        "/adminpanel/getTable"//,req.body,
        //req.headers
      )
      .then(async response => {
        console.log('response1',response)
        res.send(await constructResponseMsg(response));
      })
      .catch(err => {
        console.log(err.response.status);
        res.status(err.response.status).json(err.response.data);
      });
  };

  const createTable  = async (req, res, next) => {
    api
      .makeServiceCall(
        "POST",
        "adminpanel",
        "/adminpanel/createTable",
        req.body,
        // req,headers
        
      )
      .then(async response => {
        res.send(await constructResponseMsg(response));
      })
      .catch(err => {
        console.log(err.response.status);
        res.status(err.response.status).json(err.response.data);
      });
  };

  const updateTable = async (req, res, next) => {
    api.makeServiceCall("PUT", "adminpanel", "/adminpanel/updateTable", req.body, req.headers)
        .then(response => {
            res.send(response.data); // <= send data to the client
        })
        .catch(err => {
            console.log(err.response.status);
            res.status(err.response.status).json(err.response.data);
        });
};


const addContent = async (req, res, next) => {
    api.makeServiceCall("POST", "adminpanel", "/adminpanel/addContent", req.body, req.headers)
      .then(response => {
        res.send(response.data); // <= send data to the client
      })
      .catch(err => {
        console.log(err.response.status);
        res.status(err.response.status).json(err.response.data);
      });
  };

const getTableaction = async (req, res, next) => {
    api.makeServiceCall("POST", "checklist", "/adminpanel/getTableaction", req.body, req.headers)
      .then(response => {
        res.send(response.data); // <= send data to the client
      })
      .catch(err => {
        console.log(err.response.status);
        res.status(err.response.status).json(err.response.data);
      });
  };


const deleteTable = async (req, res, next) => {
    api.makeServiceCall("PUT", "adminpanel", "/adminpanel/deleteTable", req.body, req.headers)
      .then(response => {
        res.send(response.data); // <= send data to the client
      })
      .catch(err => {
        console.log(err.response.status);
        res.status(err.response.status).json(err.response.data);
      });
  };
  



		
  
  return {
    getTable,
    createTable, 
    updateTable,
    addContent,
    getTableaction,
    deleteTable

    
  }; 
};

module.exports = AdminpanelController();