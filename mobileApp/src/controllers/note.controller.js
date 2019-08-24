const httpStatus = require("http-status");
const db = require("../config/sequelize");
const _ = require("lodash");
const bcryptService = require("../services/bcrypt.service");


const notedb = db.TblActivityNote;

const noteController = () => {
	/**
	 * Returns jwt token if valid username and password is provided
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */

    const postNote = async (req, res, next) => {
        const postData = req.body;
        if (postData) {
        await notedb.create(
        {
            notes:postData.notes,
        },
        {
        returning: true
        }).then(data => {
        console.log(data)
        res.send({ status: "success", msg: "Inserted Successfully", data: data })
        }).catch(err => {
        res.send({ status: "failed", msg: "failed to insert data", error: err })
        })
        }
        else {
        res.send({ status: 'failed', msg: 'Please enter medicine data' })
        }
        }


        const addNoteBulk = async (req, res, next) => {
            const notelist = req.body;
            if (notelist.length > 0) {
            try {
            var _notelist = [];
            notelist.forEach(function (arrayItem) {
            const obj = {
            notes: arrayItem.notes,
          
            }
            _notelist.push(obj);
            })
            console.log("-----------------------------__>>>>>>>>>>>>>>>>>notelist",_notelist)
            const notedbImport = await notedb.bulkCreate(
                _notelist,
            {
            fields: ["notes",""],
            updateOnDuplicate: ["notes"],
            },
            {
            returning: true
            })
            return res.status(httpStatus.OK).json({ notedbImport });
            }
            catch (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
            }
            }
            };


return{
postNote,
addNoteBulk
};
}

module.exports = noteController();