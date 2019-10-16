const httpStatus = require("http-status");
const db = require("../config/sequelize");
const Country = db.TblCountry;
const State = db.TblStates;
const City = db.TblCity;






const lookupController = () => {
	/**
	 * Returns jwt token if valid username and password is provided
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */

  const getCountry = async (req, res, next) => {
    try {
      /* country Data */
      const country = await Country.findAll({
        order: [
            ['countryName', 'ASC'],
        ]
      });
      if (!country) {
        return res
          .status(httpStatus.OK)
          .json({ status: "error", msg: "Data's not found" });
      }
      return res
        .status(httpStatus.OK)
        .json({ status: "success", msg: "Fetched successfully", req: '', res: country });
    } catch (err) {
      const errorMsg = err.errors ? err.errors[0].message : err.message;
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: "error", msg: errorMsg });
    }
  };
  // --------------------------------------------return----------------------------------


  const getStateByCountryId = async (req, res, next) => {
	const { id } = req.body;
	if (id) {
		try {
			var postData = req.body;
			const states = await State.findAll({
				where: {
					countryId:id
                },
                order: [
                    ['name', 'ASC'],
                ]
			}).catch(err => {
				const errorMsg = err.errors ? err.errors[0].message : err.message;
				return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
			});
			return res.status(httpStatus.OK).json({
				states
			});
		} catch (err) {
			console.log(err);
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
		}
	}
};

const getCityByStateId= async (req, res, next) => {
	const { id } = req.body;
	if (id) {
		try {
			var postData = req.body;
			const city = await City.findAll({
				where: {
					stateId:id
                },
                order: [
                    ['name', 'ASC'],
                ]
			}).catch(err => {
				const errorMsg = err.errors ? err.errors[0].message : err.message;
				return res.status(httpStatus.BAD_REQUEST).json({ msg: errorMsg });
			});
			return res.status(httpStatus.OK).json({
				city
			});
		} catch (err) {
			console.log(err);
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
		}
	}
};
  return {
    getCountry,
    getStateByCountryId,
    getCityByStateId
  };
};


module.exports = lookupController();