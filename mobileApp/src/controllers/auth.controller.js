const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");
const authService = require("../services/auth.service");
const bcryptService = require("../services/bcrypt.service");
const db = require("../config/sequelize");
var nodemailer = require("nodemailer");
const config = require("../config/config");
var otplib = require('otplib')
const path = require("path");
const User = db.TblUser;
const UserOtp = db.TblUserOtp
const otpAuth = db.TblOtpAuth;
const Userprofile = db.TblUserProfile;
var email = require('emailjs/email');

var auth = require('otplib/authenticator')
const crypto = require('crypto')
auth.options = { crypto };

const ImagelogoSrc = 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAuAJIDAREAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAABgcAAgUECAP/xAA8EAABAwMBBAcFBgQHAAAAAAABAgMEAAURBgcSIVETMUFhcXSyMjU2gZEUFyJCUrFVcqHRFSNUgpKT8P/EABsBAAICAwEAAAAAAAAAAAAAAAUGAAQBAwcC/8QANhEAAQMCAgcFBwQDAQAAAAAAAQACAwQRBTEGEiFBUXGxEzRhcsEUIjOBkaHRFlJT8BVC4bL/2gAMAwEAAhEDEQA/APVOaiiqFpKsBQJ5ZrFws2OatmsrCmRUUUyOdRRVC0k4CgTyzWLrNjmrVlYSR2y/FjXlUepVJukHeRyHUroeivc3eY9Ai/Yv8LP+bX6U0V0f7sfMegQLSrvjfKOpR/kUdSyqlaQrdKhnlmsXCzY2urZFZWFKiimRUUVUrSr2VA+BrAIKyQRmrZzWVhCG068TrLYWpNse6F5UhLZVuBXAhRxxHdQrGKmSmgD4jY3/ACjeAUcNZUmOcXFieiG9mmqbxetQuRrlL6ZlMdSwno0p4gpGeA7zQ7B8QqKmcsldcW4BFtIMJpaOmEkDbG4GZ4HimnmmZJyRu0TV06fd5UGK+5HgR1lrdbUUlwjgSojjjOcCkzFcSkllMTDZo2c10PA8HhhgbPI273bdu218rLFl6Zvtvtwub8R5qPgLLgcG8kHqJAORVR9BVxM7YtNkQixShnl9nY4E8LbPlssjPZbrCW/cU2e5PmQHEksOLVlYIGd0ntGM48KL4NiUj3+zym98j6Jf0iweKOL2qBtrZjdt3rl20OuN36AG3HEAxicJUR+c1q0ge4TNsd3qVY0UY11PJcX970Qlb71d0wF2q3OyD9od31dEVKcXwxujHHHDPChUNXUdn2ERO07s+SNVFDSmUVMwHui221htz5rjlxrja5CTKalxHz+JJWFIUe8GtMjJoHXeC0/RWY5aeqbaMhw+RTR2X6xk3F42m6uF18JK2Xle0sDrSrmR158aZsGxN057CU3O4pM0hwZlMPaYBZt9o4eIQ5tl+LGvKo9SqHaQd5HIdSjGivc3eY9Ai/Yxw0rI82v0poro/wB2PmPQIFpV3xvlHUoT13ryZOnPQ7Q+uPBbUUFxs4U8RwJz1hPLFDMSxeSR5jgNmjfxRnB8AihjE1S27ztsch8uKEEW26SIxmohzXWOsvhClDxzQoQVD29oGkjjtR01VLG7sS9oPC46Ld0lre42SS2mQ87Lt5IC2nFbxSOaCeIPd1GrtDi0tM4B5u3h+ENxPAoKxpdGA1+4jZ9U6LpfIlusLl1cXvxg2HEFP58+yB45FOE1UyKEzk7LX/CQKejlnqBTNFnXtytn9Eib/qi7X+STIkOJaUrCIzJISOQwPaPeaSKrEKirdtOzgP7tXSKLCqWhZ7rQTvcc/wDi4ZEK62no33486FvH8DikqbyfGtLoqins5wLfqFYZPSVV2Nc1/hsKY2zbXEmVNbtN5d6VbnBiQr2iceyrn3GmDCMVfK4QTG5OR9ClTHsCjhYammFgMx6j8Ic2pRJqNUTpTjMgQVqQEOKB6MncHUerPA0OxqOUVDnkHV2cskW0dmgNIyNrhri9xvzQtbosyXILduZkPPbpUUsAlWO08OzqoZDHLI60QJPgjdRLDE3WnIA8Vpf4DqP+HXX/AILqz7JWfsd91T9vw/8AkZ9QiHXuibkxdpc63R1y4chZdIaGVtk8SCnrIzniKI4nhUrZXSxC7Tt2ZhCcFxyB0DYJ3armi23I8Nqy4Gtb9a2RDkLTIYSnc6Ca1n8PLsOPGq0eK1UA7N+0cCFbmwKiqXdqz3Sdt2nf9wj/AEHqe0XuYlhVriwrkgFSOjbTheOvdOMg47KOYbXwVLtXUDX8uiWsYwuqo2a/al8e+5OzmENbbPf9v8qfWaG6Q/GZy9SjGiXd5PN6LT2JRGCxcpZSkyQ4loEjilGM8PE/tVnR6Nuq9+/L5KlpbK/Xji/1sT872+3qinaZEjyNG3FT6U7zKOlbUetKgRjHj1fOieLRsfSP1t20c0HwGV8ddGGbzY8v7tSc0OtTesbOpBwftKU/I5B/oaUcMJFXHbin3GWh1DLfgt/bJ8VteVR6lVe0g7yPKOpQ3RXubvMegW/s5cWzs3vTjWekQp9Sccw2KvYQS2gkI8eiF480PxWFrsjq/wDpK21tNv3CGy8cNOPNoX/KVAGlqBofK1rsiQnKpe5kL3NzAPRenm20NNJQ2lKEIG6lKRgADsFdIAAFguPklxucyvO+u4zEPV90ZihKWg7vBKepJKQSB8yaQcTY2Oqe1mV11LBpXy0Mb5M7dNi3r9JeVso0+hWdxUhSSeYTv7v/ALuq9VPccMiHj0uhlFEwY1ORw62uvnsfjMSNVLW8lKlsR1ONg9isgZ+QJ+tecAY11SS7cNi2aUyPZRhrci4A8tpTc1REYmafuDMpILRYWTnsIBIPyIzTVVxtkge12VikaglfFUxvZncdV50tLq2rlCdbJDiXm1Jxz3hXP4CWytI4hdVqWtfC9rsiD0Tg2zfCzHm0elVNmkHdh5h0KRNFe+HynqEI7G/ix3yq/UmhOj/ejyPoj2lXch5h0Kd2Kc1zxIfUV61VY7s/Ck3WWChRLajjC0dihwpKq6qtpZTG558PELo9BQ4bWwCVkQ25+B4Zruvuv415085DmWhK5q0bgdUoFKFfrTwyD24rdU4yyogMb4/eIz9VVo9HpKSpEsctmg5byOB3LK2ZQpEvWEJxhKujjEuurHUlOCMHxJxVTB4nSVTXNyG0q/pBOyKhe12btg+votnbZ7+t/lT6zVvSH4zOXqVQ0T7vJ5vRC2mb/cdOSTLggFp3/LWhwEocxxx4jP8AWhtFWTUZ7RmR+iMYjh9PiA7KXMbQRmP+Lu1Vra5aijCK8lqPFyFKbayd8jqyT+1b63FZqtuoRYeCr4dgVPQP7QEudxO7kFq7JLE7Nvabm4giJEzuqPUtwjAA8Mkn5VawOjdJL25yb1VLSavbFT+zNPvO+w/7+VXbJ8VteVR6lV50g7yOQ6letFe5u8x6BFmx9tL2j5bTg3kLkuJUOYKEg0UwFodSuB3k9AgmlDi2ua5uYaOpSu1RY5Onrs5EkJUEZJZd7Fo7CDz58jS3W0j6SUtPyKcMOr46+ASNz3jgUSxtpt4Zt4jqZiuvpTuiQvOT3lOcE0Rbj87WapAJ4oS/RaldJrhxA4bOqFIUSff7v0TAXImyVlSlHmTxUo9goXHHLWS2G1x/t0bmmgoINZ2xrR/QE6L/AKSEnQrVnhkF6KhKmSrhvLT15/myfrTjU4cJKMU7MxlzH5XPqLFjHiBq5MnE35H8bEl7bOnWC7pkMZYmMKKVIcT8ilQpOhmlo5tZuxwXQainhxCDs37Wu3jqERah2g3S821cLoWIrTg3XS0SVLHLJ6hV+qxqaojMYAAOaFUWjlNSSibWLiMr7lTZrp1683xiUtsiBFWHFrI4KUOISOfHBPdWMHoXVEwkI91v9ss4/iTKWnMTT77hbkDmUx9q9vem6RdLCStUdxL5SBxKRkH6A5+VMONQulpTq7jdKmjlQ2CtGtsDgR+En9M32Tp65ibEQ04soLZS5nBSccvAUo0dW+jk7RgvuT5iNBHiEPYyEjbfYi771rp/D4P1X/ei36hm/YPugf6Spv5HfZNa7WeBd2AzcorUhscQFjiPA9Y+VNE1PFO3VkbcJKpqqaldrwuLT4Ic+7fTfSb32V7H6enXj96H/wCEpL31fuUV/Ulfa2sPoES2q1wbTHDFujNx2uspQMZPMntPjRGGCOBurGLBCaiplqX68zi4+KU22z3/AAPKn1mlbSH4zOXqU7aJd3k83otPZJbol003c41wjtyGFSRlCxnjuDiOR7xVnA4mTU72SC4v6KnpNUSU9XHJE6x1d3NEbWznTbb3SGG4sZzuLeUU/TNEG4LSA31fuUKdpFXubq69vkLorixmYjCGYzSGmkDCUIGAB3CibGNYNVosEFe90ji95uSsa96Ts97mCVcopeeCAgK6RSeAJOMA95qpUYfT1LteVtzzKv0mLVVGzs4HWGeQXbY7LBscVUa2tFplSy4UlRV+IgDOT4CttPTR0zdSIWC0VdZNWP7Sc3NrL7XK2w7nHLFwjNSGj+VxOcHmORr3LCyZurILha4KiWndrxOLT4IZVs302XN4RXgP0h9eP3occFpCb6v3KLjSOvAtrj6BENostus7JbtsRqOk+1uDirxPWavwU0VONWJtkLqaueqdrTOLv7wWhW9Vlj3vTNovagq5Qm3XQMBwZSsf7hxqrUUUFT8Vt+qu0mI1NHsheQOG76FZEbZ1ptlwLMNbuPyuvKUPpmqjMGpGm+rfmSr8mkVe8W17cgEVRo7MVlDMZpDTSBhKEJCQB3AUTaxrBqtFggr3ukcXPNyeK+pAIweqvS8oam6G07MeU67bWkrUcktqU3n5AgUPkwqkkOs5m3w2dEVhxuuhbqtkNvGx6rn+7vTX+gV/3r/vWv8AwtH+z7n8rb+osQ/k+w/CLaKIKpUUUqKJM7bPf8Dyp9ZpR0h+Mzl6lPuiXd5PN6Ld2I+5rj5kegVd0e+C/n6Ibpb3iPy+qZNMKVFKiilRRSoopUUUqKKVFFKiilRRSoopUUUqKKVFFKii/9k='.split("base64,")[1];


var smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.googlemail.com', // Gmail Host
  port: 465, // Port
  secure: true, // this is true as port is 465
  auth: {
    user: "boop@sploot.tech",
    pass: "Niknit167!" //give here correct gmail pwd
  }
});
// var smtpTransport = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   domain: 'gmail.com',
//   auth: {
//     user: "boop@sploot.tech  ",
//     pass: "sploot@123" //give here correct gmail pwd
//   }
// });

const AuthController = () => {
  /**
   * Returns jwt token if valid username and password is provided
   * @param req
   * @param res
   * @param next
    @returns {}
   */

  const createUser = async (req, res, next) => {
    const userData = req.body;
    if (userData) {
      try {
        const user = await User.findOne({
          where: {
            email: userData.email
          }
        }).catch(err => {
          const errorMsg = err.errors ? err.errors[0].message : err.message;
          return res.status(httpStatus.OK).json({ msg: errorMsg });
        });
        if (user) {
         // const loginType = user.dataValues.loginType
          const token = authService().issue({ id: user.dataValues.userId });
          return res
            .status(httpStatus.OK)
            .json({ status: true, token, data: user, message: "Login SuccessFully." });
          // loginType == 1 ? res.send({ status: false, message: "Account Already Exists" }) :
          //   (loginType == 2 ? res.send({ status: false, message: "User already have account with google" }) :
          //     (loginType == 3 ? res.send({ status: false, message: "User already have account with facebook" }) :
          //       res.send({ status: false, message: "Invalid login type" })));
        }
        else {
          if (userData.loginType == 1) {
            try {
              const verified = UserOtp.findOne({
                where: {
                  email: userData.email,
                  verified: 1
                }
              })
                .then((data) => {
                  if (data == null) {
                    res.send({ status: false, message: 'Email is not verified' })
                  } else {
                    const postData = req.body;
                    console.log('postdata', postData)
                    User.create({
                      password: postData.password,
                      email: postData.email,
                      loginType: postData.loginType,
                      userTypeId: 1
                    }, {
                        returning: true
                      })
                      .then(async (data) => {
                        await UserOtp.destroy({ where: { email: userData.email } })
                        console.log('data=============>>>>>>', data)
                        const token = authService().issue({ id: data.dataValues.userId });
                        console.log('token==========>>>', token)
                        var mailOptions = {
                          from: "boop@sploot.tech", // sender address
                          to: userData.email, // list of receivers
                          subject: "Happy Splooting!", // Subject line
                          text: 'hai', // plaintext body
                          // html: `<b>Your OTP is ${otp}</b>` // html body
                          html: `
                          <center>
                          <div style="text-align:center;width:600px">
                          <div style="background-color:#ff5705;height:100px;">
                          <br>
                          <span style="color:white;font-size:50px;text-align:center;padding:5px;font-weight:bold;top:10px;">sploot</span>
                          </div>
                          <center>
                          <p style="width: 0;text-align:center;
                            height: 0;
                          margin-top:0px;
                            border-left: 25px solid transparent;
                            border-right: 25px solid transparent;
                            border-top: 20px solid #ff5705;"></p>
                          <center>
                          <p style="color:black;font-size:25px;text-align:center;margin-top:5%;font-weight:bold;">THANKS FOR SIGNING UP!</p>
                          <div>
                          <p style="margin-top:1%;font-size:20px">We hope you love it.</p>
                          <p style="color:black;text-align:center;margin-top:5%;font-size:18px">happy splooting!</p>
                          <p style="color:black;text-align:center;margin-top:5%;font-size:18px">Follow us on :</p>
                          <p style="color:black;display:inline-flex;text-align:center;font-size:10px;padding-right:10px;">
                          <a style="font-size:14px;" href="https://www.instagram.comwesploot/?hl=en"> <span style="margin-right:10%;margin-top:2px;">
                          <img src="https://i.pinimg.com/originals/ff/0e/20/ff0e20de4718fe14cdd256c81c5db771.png" height="20px">@wesploot</span></a>
                           <a style="font-size:14px;" href="https://vm.tiktok.com/4UM5Xc/"><span style="margin-right:10%;margin-top:2px;">
                           <img src="https://i.dlpng.com/static/png/5344193-tiktok-png-and-tiktok-transparent-clipart-free-download-tik-tok-logo-transparent-260_260_preview.png" height="20px">@wesploot</span></a>
                           <a style="font-size:14px;" href="https://twitter.com/wesploot2"><span style="margin-right:10%;margin-top:2px;"><img src="https://i.dlpng.com/static/png/6822906_preview.png" height="20px">@wesploot</span></a>
                           <a style="font-size:14px;" href="http://www.facebook.comwesploot"><span style="margin-right:10%;margin-top:2px;"><img src="https://oyebesmartest.com/public/uploads/preview/rounded-facebook-logo-icon-png-hddbzdrabkgu.png" height="20px"><br>wesploot</span></a>
                           </p>
                          <p style="border-bottom:5px solid black;"></p>
                          </center>
                                  `,
                          attachments: [{
                            filename: 'Spoolt.jpg',
                            content: ImagelogoSrc,
                            encoding: 'base64'
                          }]
                        }
                        // send mail with defined transport object
                        await smtpTransport.sendMail(mailOptions, function (error, response) {
                          if (error) {
                            console.log(error);
                          } else {
                            return res
                              .status(httpStatus.OK)
                              .json({ status: true, message: "User registered successfully", token: token, req: userData, res: data });

                          }
                        });
                      })
                      .catch(err => {
                        const errorMsg = err.errors ? err.errors[0].message : err.message;
                        return res.status(httpStatus.OK).json({ msg: errorMsg });
                      });
                  }
                })

            } catch (err) {
              return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
            }
          } else if (userData.loginType == 2) {
            User.create({
              userName: userData.userName,
              email: userData.email,
              googlePassword: userData.password,
              loginType: userData.loginType,
              userTypeId: 1
            }, {
                returning: true
              })
              .then(async(data) => {
                const token = authService().issue({ id: data.dataValues.userId });
                var mailOptions = {
                  from: "boop@sploot.tech", // sender address
                  to: userData.email, // list of receivers
                  subject: "Happy Splooting!", // Subject line
                // plaintext body
                  // html: `<b>Your OTP is ${otp}</b>` // html body
                  html: `
                  <center>
                  <div style="text-align:center;width:600px">
                  <div style="background-color:#ff5705;height:100px;">
                  <br>
                  <span style="color:white;font-size:50px;text-align:center;padding:5px;font-weight:bold;top:10px;">sploot</span>
                  </div>
                  <center>
                  <p style="width: 0;text-align:center;
                    height: 0;
                  margin-top:0px;
                    border-left: 25px solid transparent;
                    border-right: 25px solid transparent;
                    border-top: 20px solid #ff5705;"></p>
                  <center>
                  <p style="color:black;font-size:25px;text-align:center;margin-top:5%;font-weight:bold;">THANKS FOR SIGNING UP!</p>
                  <div>
                  <p style="margin-top:1%;font-size:20px">We hope you love it.</p>
                  <p style="color:black;text-align:center;margin-top:5%;font-size:18px">happy splooting!</p>
                  <p style="color:black;text-align:center;margin-top:5%;font-size:18px">Follow us on :</p>
                  <p style="color:black;display:inline-flex;text-align:center;font-size:10px;padding-right:10px;">
                          <a style="font-size:14px;" href="https://www.instagram.comwesploot/?hl=en"> <span style="margin-right:10%;margin-top:2px;">
                          <img src="https://i.pinimg.com/originals/ff/0e/20/ff0e20de4718fe14cdd256c81c5db771.png" height="20px">@wesploot</span></a>
                           <a style="font-size:14px;" href="https://vm.tiktok.com/4UM5Xc/"><span style="margin-right:10%;margin-top:2px;">
                           <img src="https://i.dlpng.com/static/png/5344193-tiktok-png-and-tiktok-transparent-clipart-free-download-tik-tok-logo-transparent-260_260_preview.png" height="20px">@wesploot</span></a>
                           <a style="font-size:14px;" href="https://twitter.com/wesploot2"><span style="margin-right:10%;margin-top:2px;"><img src="https://i.dlpng.com/static/png/6822906_preview.png" height="20px">@wesploot</span></a>
                           <a style="font-size:14px;" href="http://www.facebook.comwesploot"><span style="margin-right:10%;margin-top:2px;"><img src="https://oyebesmartest.com/public/uploads/preview/rounded-facebook-logo-icon-png-hddbzdrabkgu.png" height="20px"><br>wesploot</span></a>
                           </p>
                  <p style="border-bottom:5px solid black;"></p>
                  </center>
                          `,
                  attachments: [{
                    filename: 'Spoolt.jpg',
                    content: ImagelogoSrc,
                    encoding: 'base64'
                  }]
                }
                // send mail with defined transport object
                await smtpTransport.sendMail(mailOptions, function (error, response) {
                  if (error) {
                    console.log(error);
                  } else {
                    return res
                      .status(httpStatus.OK)
                      .json({ status: true, token: token, message: "Successfully registered", req: userData, res: data });
                  }
                });
              })
              .catch((err) => {
                res.send({ status: false, message: "Failed to register", err: err });
              })
          } else if (userData.loginType == 3) {
            User.create({
              userName: userData.userName,
              email: userData.email,
              facebookPassword: userData.password,
              loginType: userData.loginType,
              userTypeId: 1
            }, {
                returning: true
              })
              .then(async(data) => {
                const token = authService().issue({ id: data.dataValues.userId });
                var mailOptions = {
                  from: "boop@sploot.tech", // sender address
                  to: userData.email, // list of receivers
                  subject: "Happy Splooting!", // Subject line
                  text: 'hai', // plaintext body
                  // html: `<b>Your OTP is ${otp}</b>` // html body
                  html: `
                  <center>
                  <div style="text-align:center;width:600px">
                  <div style="background-color:#ff5705;height:100px;">
                  <br>
                  <span style="color:white;font-size:50px;text-align:center;padding:5px;font-weight:bold;top:10px;">sploot</span>
                  </div>
                  <center>
                  <p style="width: 0;text-align:center;
                    height: 0;
                  margin-top:0px;
                    border-left: 25px solid transparent;
                    border-right: 25px solid transparent;
                    border-top: 20px solid #ff5705;"></p>
                  <center>
                  <p style="color:black;font-size:25px;text-align:center;margin-top:5%;font-weight:bold;">THANKS FOR SIGNING UP!</p>
                  <div>
                  <p style="margin-top:1%;font-size:20px">We hope you love it.</p>
                  <p style="color:black;text-align:center;margin-top:5%;font-size:18px">happy splooting!</p>
                  <p style="color:black;text-align:center;margin-top:5%;font-size:18px">Follow us on :</p>
                  <p style="color:black;display:inline-flex;text-align:center;font-size:10px;padding-right:10px;">
                  <a style="font-size:14px;" href="https://www.instagram.comwesploot/?hl=en"> <span style="margin-right:10%;margin-top:2px;">
                  <img src="https://i.pinimg.com/originals/ff/0e/20/ff0e20de4718fe14cdd256c81c5db771.png" height="20px">@wesploot</span></a>
                   <a style="font-size:14px;" href="https://vm.tiktok.com/4UM5Xc/"><span style="margin-right:10%;margin-top:2px;">
                   <img src="https://i.dlpng.com/static/png/5344193-tiktok-png-and-tiktok-transparent-clipart-free-download-tik-tok-logo-transparent-260_260_preview.png" height="20px">@wesploot</span></a>
                   <a style="font-size:14px;" href="https://twitter.com/wesploot2"><span style="margin-right:10%;margin-top:2px;"><img src="https://i.dlpng.com/static/png/6822906_preview.png" height="20px">@wesploot</span></a>
                   <a style="font-size:14px;" href="http://www.facebook.comwesploot"><span style="margin-right:10%;margin-top:2px;"><img src="https://oyebesmartest.com/public/uploads/preview/rounded-facebook-logo-icon-png-hddbzdrabkgu.png" height="20px"><br>wesploot</span></a>
                   </p>
                  <p style="border-bottom:5px solid black;"></p>
                  </center>
                          `,
                  attachments: [{
                    filename: 'Spoolt.jpg',
                    content: ImagelogoSrc,
                    encoding: 'base64'
                  }]
                }
                // send mail with defined transport object
                await smtpTransport.sendMail(mailOptions, function (error, response) {
                  if (error) {
                    console.log(error);
                  } else {
                    return res
                      .status(httpStatus.OK)
                      .json({ status: false, token: token, message: "Successfully registered", req: userData, res: data });

                  }
                });
              })
              .catch((err) => {
                res.send({ status: false, message: "Failed to register", err: err });
              })
          } else {
            res.send({ status: false, message: "Invalid login type" })
          }

        }
      } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
      }
    } else {
      res.send({ status: false, message: 'please provide data' })
    }
  };

  const sendOtp = async (req, res, next) => {
    const postData = req.body
    const { email } = req.body;
    var date = new Date()
    const secret = JSON.stringify(await date.getMilliseconds())
    const otp = auth.generate(secret);
    if (email) {
      User.findOne({
        where: {
          email: email
        }
      })
        .then(async (data) => {
          if (data != null) {

            res.send({ status: false, message: 'User already exists' });


        //     if (data.dataValues.loginType == 2) {
        //       res.send({ status: false, message: 'User already exists with Gmail' });
        //     }
        //     else if (data.dataValues.loginType == 3) {
        //       res.send({ status: false, message: 'User already exists with Facebook' });
        //     } else {
        //       try {
        //         const user = await UserOtp.findOne({
        //           where: {
        //             email: email
        //           }
        //         }).catch(err => {
        //           const errorMsg = err.errors ? err.errors[0].message : err.message;
        //           return res.status(httpStatus.OK).json({ msg: errorMsg });
        //         });
        //         if (user) {
        //           var mailOptions = {
        //             from: "boop@sploot.tech  ", // sender address
        //             to: email, // list of receivers
        //             subject: "Sploot SignUp OTP", // Subject line
        //             text: otp, // plaintext body
        //             // html: `<b>Your OTP is ${otp}</b>` // html body
        //             html: `
        //             <center>
        // <div style="text-align:center;width:600px">
        // <div style="background-color:#ff5705;height:100px;">
        // <br>
        // <span style="color:white;font-size:50px;text-align:center;padding:5px;font-weight:bold;top:10px;">sploot</span>
        // </div>
        // <center>
        // <p style="width: 0;text-align:center;
        //   height: 0;
        // margin-top:0px;
        //   border-left: 25px solid transparent;
        //   border-right: 25px solid transparent;
        //   border-top: 20px solid #ff5705;"></p>
        // <center>
        // <p style="color:black;font-size:25px;text-align:center;margin-top:5%;font-weight:bold;">HERE'S YOUR SIGNUP OTP:</p>
        // <div>
        // <p style="border:4px solid black;padding:25px;margin-top:3%;font-size:20px">${otp}</p>
        // <p style="color:black;text-align:center;margin-top:5%;font-size:18px">happy splooting!</p>
        // <p style="color:black;text-align:center;margin-top:5%;font-size:18px">Follow us on :</p>
        // <p style="color:black;display:inline-flex;text-align:center;">
        // <a style="font-size:16px;" href="https://www.instagram.comwesploot/?hl=en"> <span style="margin-right:10%;margin-top:2px;">
        // <img src="https://i.pinimg.com/originals/ff/0e/20/ff0e20de4718fe14cdd256c81c5db771.png" height="25px">@wesploot</span></a>
        //  <a style="font-size:16px;" href="https://vm.tiktok.com/4UM5Xc/"><span style="margin-right:10%;margin-top:2px;">
        //  <img src="https://i.dlpng.com/static/png/5344193-tiktok-png-and-tiktok-transparent-clipart-free-download-tik-tok-logo-transparent-260_260_preview.png" height="25px">@wesploot</span></a>
        //  <a style="font-size:16px;"><span style="margin-right:10%;margin-top:2px;"><img src="https://i.dlpng.com/static/png/6822906_preview.png" height="25px">@wesploot</span></a>
        //  <a style="font-size:16px;" href="http://www.facebook.comwesploot"><span style="margin-right:10%;margin-top:2px;"><img src="https://oyebesmartest.com/public/uploads/preview/rounded-facebook-logo-icon-png-hddbzdrabkgu.png" height="25px">wesploot</span></a>
        //  </p>
        // <p style="border-bottom:5px solid black;"></p>
        // </center>
        //           `,
        //             attachments: [{
        //               filename: 'Spoolt.jpg',
        //               content: ImagelogoSrc,
        //               encoding: 'base64'
        //             }]
        //           }
        //           await smtpTransport.sendMail(mailOptions, function (error, response) {
        //             if (error) {
        //               console.log(error);
        //             } else {
        //               UserOtp.update(
        //                 { otp: otp },
        //                 {
        //                   where: {
        //                     email: email
        //                   }
        //                 }, {
        //                   returning: true
        //                 })
        //                 .then((data) => {
        //                   // console.log(data)
        //                   res.send({ status: true, data: data, message: "OTP resend successfully" })
        //                 })
        //                 .catch(err => {
        //                   const errorMsg = err.errors ? err.errors[0].message : err.message;
        //                   return res.status(httpStatus.OK).json({ status: false, message: errorMsg });
        //                 });
        //             }
        //           });
        //         } else {
        //           try {
        //             var mailOptions = {
        //               from: "boop@sploot.tech  ", // sender address
        //               to: email, // list of receivers
        //               subject: "Sploot SignUp OTP ", // Subject line
        //               text: otp, // plaintext body
        //               // html: `<b>Your OTP is ${otp}</b>` // html body
        //               html: `
        //               <center>
        //               <div style="text-align:center;width:600px">
        //               <div style="background-color:#ff5705;height:100px;">
        //               <br>
        //               <span style="color:white;font-size:50px;text-align:center;padding:5px;font-weight:bold;top:10px;">sploot</span>
        //               </div>
        //               <center>
        //               <p style="width: 0;text-align:center;
        //                 height: 0;
        //               margin-top:0px;
        //                 border-left: 25px solid transparent;
        //                 border-right: 25px solid transparent;
        //                 border-top: 20px solid #ff5705;"></p>
        //               <center>
        //               <p style="color:black;font-size:25px;text-align:center;margin-top:5%;font-weight:bold;">HERE'S YOUR SIGNUP OTP:</p>
        //               <div>
        //               <p style="border:4px solid black;padding:25px;margin-top:3%;font-size:20px">${otp}</p>
        //               <p style="color:black;text-align:center;margin-top:5%;font-size:18px">happy splooting!</p>
        //               <p style="color:black;text-align:center;margin-top:5%;font-size:18px">Follow us on :</p>
        //               <p style="color:black;display:inline-flex;text-align:center;">
        // <a style="font-size:16px;" href="https://www.instagram.comwesploot/?hl=en"> <span style="margin-right:10%;margin-top:2px;">
        // <img src="https://i.pinimg.com/originals/ff/0e/20/ff0e20de4718fe14cdd256c81c5db771.png" height="25px">@wesploot</span></a>
        //  <a style="font-size:16px;" href="https://vm.tiktok.com/4UM5Xc/"><span style="margin-right:10%;margin-top:2px;">
        //  <img src="https://i.dlpng.com/static/png/5344193-tiktok-png-and-tiktok-transparent-clipart-free-download-tik-tok-logo-transparent-260_260_preview.png" height="25px">@wesploot</span></a>
        //  <a style="font-size:16px;"><span style="margin-right:10%;margin-top:2px;"><img src="https://i.dlpng.com/static/png/6822906_preview.png" height="25px">@wesploot</span></a>
        //  <a style="font-size:16px;" href="http://www.facebook.comwesploot"><span style="margin-right:10%;margin-top:2px;"><img src="https://oyebesmartest.com/public/uploads/preview/rounded-facebook-logo-icon-png-hddbzdrabkgu.png" height="25px">wesploot</span></a>
        //  </p>
        //               <p style="border-bottom:5px solid black;"></p>
        //               </center>
        //             `,
        //               attachments: [{
        //                 filename: 'Spoolt.jpg',
        //                 content: ImagelogoSrc,
        //                 encoding: 'base64'
        //               }]
        //             }
        //             // send mail with defined transport object
        //             await smtpTransport.sendMail(mailOptions, function (error, response) {
        //               if (error) {
        //                 console.log(error);
        //               } else {
        //                 console.log("soytrnfhgb")
        //                 const userOtp = UserOtp.create({
        //                   email: email,
        //                   otp: otp
        //                 }, {
        //                     returning: true
        //                   })
        //                   .then((data) => {
        //                     console.log(data)
        //                     return res.send({ status: true, data: data, message: "OTP sent successfully" })
        //                   })
        //                   .catch(err => {
        //                     const errorMsg = err.errors ? err.errors[0].message : err.message;
        //                     return res.status(httpStatus.OK).json({ status: false, message: errorMsg });
        //                   });
        //               }
        //             });
        //           }
        //           catch (err) {
        //             return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: "Internal servers error" });
        //           }
        //         }
        //       } catch (err) {
        //         return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: "Internal server error" });
        //       }
        //     }
          }
          else {
            try {
              const user = await UserOtp.findOne({
                where: {
                  email: email
                }
              }).catch(err => {
                const errorMsg = err.errors ? err.errors[0].message : err.message;
                return res.status(httpStatus.OK).json({ status: false, message: errorMsg });
              });
              if (user) {
                var mailOptions = {
                  from: "boop@sploot.tech", // sender address
                  to: email, // list of receivers
                  subject: "Sploot Signup OTP", // Subject line
                  text: otp, // plaintext body
                  // html: `<b>Your OTP is ${otp}</b>` // html body
                  html: `
                  <center>
                  <div style="text-align:center;width:600px">
                  <div style="background-color:#ff5705;height:100px;">
                  <br>
                  <span style="color:white;font-size:50px;text-align:center;padding:5px;font-weight:bold;top:10px;">sploot</span>
                  </div>
                  <center>
                  <p style="width: 0;text-align:center;
                    height: 0;
                  margin-top:0px;
                    border-left: 25px solid transparent;
                    border-right: 25px solid transparent;
                    border-top: 20px solid #ff5705;"></p>
                  <center>
                  <p style="color:black;font-size:25px;text-align:center;margin-top:5%;font-weight:bold;">HERE'S YOUR SIGNUP OTP:</p>
                  <div>
                  <p style="border:4px solid black;padding:25px;margin-top:3%;font-size:20px">${otp}</p>
                  <p style="color:black;text-align:center;margin-top:5%;font-size:18px">happy splooting!</p>
                  <p style="color:black;text-align:center;margin-top:5%;font-size:18px">Follow us on :</p>
                  <p style="color:black;display:inline-flex;text-align:center;font-size:10px;padding-right:10px;">
                          <a style="font-size:14px;" href="https://www.instagram.comwesploot/?hl=en"> <span style="margin-right:10%;margin-top:2px;">
                          <img src="https://i.pinimg.com/originals/ff/0e/20/ff0e20de4718fe14cdd256c81c5db771.png" height="20px">@wesploot</span></a>
                           <a style="font-size:14px;" href="https://vm.tiktok.com/4UM5Xc/"><span style="margin-right:10%;margin-top:2px;">
                           <img src="https://i.dlpng.com/static/png/5344193-tiktok-png-and-tiktok-transparent-clipart-free-download-tik-tok-logo-transparent-260_260_preview.png" height="20px">@wesploot</span></a>
                           <a style="font-size:14px;" href="https://twitter.com/wesploot2"><span style="margin-right:10%;margin-top:2px;"><img src="https://i.dlpng.com/static/png/6822906_preview.png" height="20px">@wesploot</span></a>
                           <a style="font-size:14px;" href="http://www.facebook.comwesploot"><span style="margin-right:10%;margin-top:2px;"><img src="https://oyebesmartest.com/public/uploads/preview/rounded-facebook-logo-icon-png-hddbzdrabkgu.png" height="20px"><br>wesploot</span></a>
                           </p>
                  <p style="border-bottom:5px solid black;"></p>
                  </center>
                `,
                  attachments: [{
                    filename: 'Spoolt.jpg',
                    content: ImagelogoSrc,
                    encoding: 'base64'
                  }]
                }
                await smtpTransport.sendMail(mailOptions, function (error, response) {
                  if (error) {
                    console.log(error);
                  } else {
                    UserOtp.update(
                      { otp: otp },
                      {
                        where: {
                          email: email
                        }
                      }, {
                        returning: true
                      })
                      .then((data) => {
                        // console.log(data)
                        res.send({ status: true, data: data, message: "OTP resend successfully" })
                      })
                      .catch(err => {
                        const errorMsg = err.errors ? err.errors[0].message : err.message;
                        return res.status(httpStatus.OK).json({ status: false, message: errorMsg });
                      });
                  }
                });
              } else {
                try {
                  var mailOptions = {
                    from: "boop@sploot.tech", // sender address
                    to: email, // list of receivers
                    subject: "Sploot SignUp OTP", // Subject line
                    text: otp, // plaintext body
                    // html: `<b>Your OTP is ${otp}</b>` // html body
                    html: `
                    <center>
                    <div style="text-align:center;width:600px">
                    <div style="background-color:#ff5705;height:100px;">
                    <br>
                    <span style="color:white;font-size:50px;text-align:center;padding:5px;font-weight:bold;top:10px;">sploot</span>
                    </div>
                    <center>
                    <p style="width: 0;text-align:center;
                      height: 0;
                    margin-top:0px;
                      border-left: 25px solid transparent;
                      border-right: 25px solid transparent;
                      border-top: 20px solid #ff5705;"></p>
                    <center>
                    <p style="color:black;font-size:25px;text-align:center;margin-top:5%;font-weight:bold;">HERE'S YOUR SIGNUP OTP:</p>
                    <div>
                    <p style="border:4px solid black;padding:25px;margin-top:3%;font-size:20px">${otp}</p>
                    <p style="color:black;text-align:center;margin-top:5%;font-size:18px">happy splooting!</p>
                    <p style="color:black;text-align:center;margin-top:5%;font-size:18px">Follow us on :</p>
                    <p style="color:black;display:inline-flex;text-align:center;font-size:10px;padding-right:10px;">
                    <a style="font-size:14px;" href="https://www.instagram.comwesploot/?hl=en"> <span style="margin-right:10%;margin-top:2px;">
                    <img src="https://i.pinimg.com/originals/ff/0e/20/ff0e20de4718fe14cdd256c81c5db771.png" height="20px">@wesploot</span></a>
                     <a style="font-size:14px;" href="https://vm.tiktok.com/4UM5Xc/"><span style="margin-right:10%;margin-top:2px;">
                     <img src="https://i.dlpng.com/static/png/5344193-tiktok-png-and-tiktok-transparent-clipart-free-download-tik-tok-logo-transparent-260_260_preview.png" height="20px">@wesploot</span></a>
                     <a style="font-size:14px;" href="https://twitter.com/wesploot2"><span style="margin-right:10%;margin-top:2px;"><img src="https://i.dlpng.com/static/png/6822906_preview.png" height="20px">@wesploot</span></a>
                     <a style="font-size:14px;" href="http://www.facebook.comwesploot"><span style="margin-right:10%;margin-top:2px;"><img src="https://oyebesmartest.com/public/uploads/preview/rounded-facebook-logo-icon-png-hddbzdrabkgu.png" height="20px"><br>wesploot</span></a>
                     </p>
                    <p style="border-bottom:5px solid black;"></p>
                    </center>
                  `,
                    attachments: [{
                      filename: 'Spoolt.jpg',
                      content: ImagelogoSrc,
                      encoding: 'base64'
                    }]
                  }
                  // send mail with defined transport object
                  await smtpTransport.sendMail(mailOptions, function (error, response) {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log("soytrnfhgb")
                      const userOtp = UserOtp.create({
                        email: email,
                        otp: otp
                      }, {
                          returning: true
                        })
                        .then((data) => {
                          return res.send({ status: true, data: data, message: "OTP sent successfully" })
                        })
                        .catch(err => {
                          const errorMsg = err.errors ? err.errors[0].message : err.message;
                          return res.status(httpStatus.OK).json({ status: false, message: errorMsg });
                        });
                    }
                  });
                }
                catch (err) {
                  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: "Internal servers error" });
                }
              }
            } catch (err) {
              return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: "Internal server error" });
            }
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  };

  const verifyOtp = async (req, res, next) => {
    const verifyData = req.body
    console.log(verifyData)
    const user = await UserOtp.findOne({
      where: { email: verifyData.email }
    }, function (err, data) {
      res.json(data)
    }).catch(err => {
      const errorMsg = err.errors ? err.errors[0].message : err.message;
      return res.status(httpStatus.OK).json({ msg: errorMsg });
    });
    if (user) {
      if (user.dataValues.otp === verifyData.otp) {
        UserOtp.update({ verified: 1 }, {
          where: {
            email: verifyData.email
          }
        })
        if (UserOtp)
          res.send({ status: true, data: verifyData, message: "Verified successfully" })
      } else {
        res.send({
          status: false,
          message: "OTP is Invalid"
        });
      }
    }
    else {
      res.send({
        status: false,
        message: "user not exist"
      });
    }

  };




  const login = async (req, res, next) => {
    const userData = req.body;
    if (userData) {
      try {
        const user = await User.findOne({
          where: { email: userData.email }
        })
        if (user != null) {
          if (user.dataValues.loginType == 1) {
            if (userData.password == (user.dataValues.password)) {
              const token = authService().issue({ id: user.dataValues.userId });
              return res
                .status(httpStatus.OK)
                .json({ status: true, token, data: user, message: "Login SuccessFully." });
            }
            else {
              return res
                .status(httpStatus.OK)
                .json({ status: false, message: 'Password is incorrect' })
            }
          }
          else if (user.dataValues.loginType == 2) {
            return res
              .status(httpStatus.OK)
              .json({ status: true, token, data: user, message: "Login SuccessFully." });
          }
          else if (user.dataValues.loginType == 3) {
            return res
              .status(httpStatus.OK)
              .json({ status: true, token, data: user, message: "Login SuccessFully." });
          }
        }
        else {
          return res
            .status(httpStatus.OK)
            .json({ status: false, message: 'User not found.' })
        }
      } catch (err) {
        const errorMsg = err.errors ? err.errors[0].message : err.message;
        return res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({ status: false, message: errorMsg });
      }

    } else {
      return res
        .status(httpStatus.OK)
        .json({ status: false, message: 'please provide data' })
    }
    return res
      .status(httpStatus.OK)
      .json({ status: false, message: "Email or password is wrong" });
  };


  // const UserExitsCheck = async (req, res, next) => {
  //   const userData = req.body;
  //   if (userData) {
  //     try {
  //       const user = await User.findOne({
  //         where: { email: userData.email }
  //       })
  //       if (user != null) {
  //         if (user.dataValues.loginType == 1) {
  //           res.send({ status: 'sucess', msg: '' });
  //         } else if (user.dataValues.loginType == 2) {
  //           res.send({ status: 'sucess', msg: 'User already exists with Gmail' });
  //         }
  //         else if (user.dataValues.loginType == 3) {
  //           res.send({ status: 'sucess', msg: 'User already exists with Facebook' });
  //         }
  //       } else {
  //         res.send({ status: 'failed', msg: 'user not found' })
  //       }
  //     } catch (err) {
  //       const errorMsg = err.errors ? err.errors[0].message : err.message;
  //       return res
  //         .status(httpStatus.INTERNAL_SERVER_ERROR)
  //         .json({ status: "error", msg: errorMsg });
  //     }
  //   } else {
  //     res.send({ status: 'failed', msg: 'please provide data' })
  //   }
  //   return res
  //     .status(httpStatus.OK)
  //     .json({ status: "failed", msg: "Email is wrong" });
  // };

  const createAndLoginUser = async (req, res, next) => {
    const postData = req.body
    const user = await User.findOne({
      where: {
        email: postData.email
      }
    })
      .catch(err => {
        const errorMsg = err.errors ? err.errors[0].message : err.message;
        return res.status(httpStatus.OK).json({ msg: errorMsg });
      });
    if (user) {
      // const loginType = user.dataValues.loginType
      // if (postData.loginType == loginType) {
      //   const token = authService().issue({ id: user.dataValues.userId });
      //   res.send({ status: true, token: token, data: user.dataValues, message: "Login Successfully." });
      // }
      //  else {
      //   loginType == 1 ? res.send({ status: false, message: "Account Already Exists" }) :
      //     (loginType == 2 ? res.send({ status: false, message: "User already have account with Google" }) :
      //       (loginType == 3 ? res.send({ status: false, message: "User already have account with Facebook" }) :
      //         res.send({ status: false, message: "Invalid login type" })));
      // }

      const token = authService().issue({ id: user.dataValues.userId });
      res.send({ status: true, token: token, data: user.dataValues, message: "Login Successfully." });
    } else {
      if (postData.loginType == 2) {
        User.create({
          userName: postData.userName,
          email: postData.email,
          googlePassword: postData.password,
          loginType: postData.loginType,
          userTypeId: 1
        }, {
            returning: true
          })
          .then((data) => {
            const token = authService().issue({ id: data.dataValues.userId });
            res.send({ status: true, token: token, data: data, message: "Successfully registered with google" });
          })
      } else if (postData.loginType == 3) {
        User.create({
          userName: postData.userName,
          email: postData.email,
          facebookPassword: postData.password,
          loginType: postData.loginType,
          userTypeId: 1
        }, {
            returning: true
          })
          .then((data) => {
            const token = authService().issue({ id: data.dataValues.userId });
            res.send({ status: true, token: token, data: data, message: "Successfully registered with facebook" });
          })
          .catch((err) => {
            res.send({ status: false, message: "Failed to register", err: err });
          })
      } else {
        res.send({ status: false, message: "Invalid login type" })
      }
    }
  }

  const forgetPasswordSendOtp = async (req, res, next) => {
    const postData = req.body
    var date = new Date()
    const secret = JSON.stringify(await date.getMilliseconds())
    const otp = auth.generate(secret);
    User.findOne({
      where: {
        email: postData.email
      }
    })
      .then(async (data) => {
        if (data == null) {
          res.send({ status: false, message: "User doesn't exist" })
        } else {
       //   if (data.dataValues.loginType == 1) {
            const user = await UserOtp.findOne({
              where: {
                email: postData.email
              }
            }).catch(err => {
              const errorMsg = err.errors ? err.errors[0].message : err.message;
              return res.status(httpStatus.OK).json({ status: false, message: errorMsg });
            });
            if (user) {
              var mailOptions = {
                from: "boop@sploot.tech", // sender address
                to: postData.email, // list of receivers
                subject: "Sploot Reset OTP", // Subject line
                text: otp, // plaintext body
                // html: `<b>Your OTP is ${otp}</b>` // html body
                html: `
                <center>
                <div style="text-align:center;width:600px">
                <div style="background-color:#ff5705;height:100px;">
                <br>
                <span style="color:white;font-size:50px;text-align:center;padding:5px;font-weight:bold;top:10px;">sploot</span>
                </div>
                <center>
                <p style="width: 0;text-align:center;
                  height: 0;
                margin-top:0px;
                  border-left: 25px solid transparent;
                  border-right: 25px solid transparent;
                  border-top: 20px solid #ff5705;"></p>
                <center>
                <p style="color:black;font-size:25px;text-align:center;margin-top:5%;font-weight:bold;">RESET YOUR PASSWORD:</p>
                <div>
                <p style="border:4px solid black;padding:25px;margin-top:3%;font-size:20px">${otp}</p>
                <p style="color:black;text-align:center;margin-top:5%;font-size:18px">happy splooting!</p>
                <p style="color:black;text-align:center;margin-top:5%;font-size:18px">Follow us on :</p>
                <p style="color:black;display:inline-flex;text-align:center;font-size:10px;padding-right:10px;">
                <a style="font-size:14px;" href="https://www.instagram.comwesploot/?hl=en"> <span style="margin-right:10%;margin-top:2px;">
                <img src="https://i.pinimg.com/originals/ff/0e/20/ff0e20de4718fe14cdd256c81c5db771.png" height="20px">@wesploot</span></a>
                 <a style="font-size:14px;" href="https://vm.tiktok.com/4UM5Xc/"><span style="margin-right:10%;margin-top:2px;">
                 <img src="https://i.dlpng.com/static/png/5344193-tiktok-png-and-tiktok-transparent-clipart-free-download-tik-tok-logo-transparent-260_260_preview.png" height="20px">@wesploot</span></a>
                 <a style="font-size:14px;" href="https://twitter.com/wesploot2"><span style="margin-right:10%;margin-top:2px;"><img src="https://i.dlpng.com/static/png/6822906_preview.png" height="20px">@wesploot</span></a>
                 <a style="font-size:14px;" href="http://www.facebook.comwesploot"><span style="margin-right:10%;margin-top:2px;"><img src="https://oyebesmartest.com/public/uploads/preview/rounded-facebook-logo-icon-png-hddbzdrabkgu.png" height="20px"><br>wesploot</span></a>
                 </p>
                <p style="border-bottom:5px solid black;"></p>
                </center>
            `,
                attachments: [{
                  filename: 'Spoolt.jpg',
                  content: ImagelogoSrc,
                  encoding: 'base64'
                }]
              }
              await smtpTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                  console.log(error);
                } else {
                  UserOtp.update(
                    { otp: otp },
                    {
                      where: {
                        email: postData.email
                      }
                    }, {
                      returning: true
                    })
                    .then((data) => {
                      console.log(data)
                      res.send({ status: true, data: data, message: "OTP resend successfully" })
                    })
                    .catch(err => {
                      const errorMsg = err.errors ? err.errors[0].message : err.message;
                      return res.status(httpStatus.OK).json({ status: false, message: errorMsg });
                    });
                }
              });
            } else {
              try {
                console.log('postdata', postData)
                var mailOptions = {
                  from: "boop@sploot.tech", // sender address
                  to: postData.email, // list of receivers
                  subject: "Sploot Reset OTP ", // Subject line
                  text: otp, // plaintext body
                  // html: `<b>Your OTP is ${otp}</b>` // html body
                  html: `
                  <center>
                  <div style="text-align:center;width:600px">
                  <div style="background-color:#ff5705;height:100px;">
                  <br>
                  <span style="color:white;font-size:50px;text-align:center;padding:5px;font-weight:bold;top:10px;">sploot</span>
                  </div>
                  <center>
                  <p style="width: 0;text-align:center;
                    height: 0;
                  margin-top:0px;
                    border-left: 25px solid transparent;
                    border-right: 25px solid transparent;
                    border-top: 20px solid #ff5705;"></p>
                  <center>
                  <p style="color:black;font-size:25px;text-align:center;margin-top:5%;font-weight:bold;">RESET YOUR PASSWORD:</p>
                  <div>
                  <p style="border:4px solid black;padding:25px;margin-top:3%;font-size:20px">${otp}</p>
                  <p style="color:black;text-align:center;margin-top:5%;font-size:18px">happy splooting!</p>
                  <p style="color:black;text-align:center;margin-top:5%;font-size:18px">Follow us on :</p>
                  <p style="color:black;display:inline-flex;text-align:center;font-size:10px;padding-right:10px;">
                          <a style="font-size:14px;" href="https://www.instagram.comwesploot/?hl=en"> <span style="margin-right:10%;margin-top:2px;">
                          <img src="https://i.pinimg.com/originals/ff/0e/20/ff0e20de4718fe14cdd256c81c5db771.png" height="20px">@wesploot</span></a>
                           <a style="font-size:14px;" href="https://vm.tiktok.com/4UM5Xc/"><span style="margin-right:10%;margin-top:2px;">
                           <img src="https://i.dlpng.com/static/png/5344193-tiktok-png-and-tiktok-transparent-clipart-free-download-tik-tok-logo-transparent-260_260_preview.png" height="20px">@wesploot</span></a>
                           <a style="font-size:14px;" href="https://twitter.com/wesploot2"><span style="margin-right:10%;margin-top:2px;"><img src="https://i.dlpng.com/static/png/6822906_preview.png" height="20px">@wesploot</span></a>
                           <a style="font-size:14px;" href="http://www.facebook.comwesploot"><span style="margin-right:10%;margin-top:2px;"><img src="https://oyebesmartest.com/public/uploads/preview/rounded-facebook-logo-icon-png-hddbzdrabkgu.png" height="20px"><br>wesploot</span></a>
                           </p>
                  <p style="border-bottom:5px solid black;"></p>
                  </center>
              `,
                  attachments: [{
                    filename: 'Spoolt.jpg',
                    content: ImagelogoSrc,
                    encoding: 'base64'
                  }]
                }
                // send mail with defined transport object
                await smtpTransport.sendMail(mailOptions, function (error, response) {
                  if (error) {
                    console.log(error);
                  } else {
                    const userOtp = UserOtp.create({
                      email: postData.email,
                      otp: otp
                    }, {
                        returning: true
                      })
                      .then((data) => {
                        console.log(data)
                        return res.send({ status: true, data: data, message: "OTP sent successfully" })
                      })
                      .catch(err => {
                        const errorMsg = err.errors ? err.errors[0].message : err.message;
                        return res.status(httpStatus.OK).json({ status: false, message: errorMsg });
                      });
                  }
                });
              }
              catch (err) {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: "Internal servers error" });
              }
            }
          // }
          // else if (data.dataValues.loginType == 2) {
          //   res.send({ status: false, message: "User already exist in Gmail" })
          // }
          // else if (data.dataValues.loginType == 3) {
          //   res.send({ status: false, message: "User already exist in Facebook" })
          // }
        }
      })
  }

  const generateOTP = async () => {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  const forgetPassword = async (req, res, next) => {
    console.log(req.body);
    var username = req.body.username;
    let userTypeCondition = {};
    userTypeCondition.userTypeId = 2;
    userTypeCondition.active = "1";

    if (username) {
      if (isNaN(username)) {
        userTypeCondition.email = username;
      } else {
        userTypeCondition.phoneNo = username;
      }

      const user = await User.findOne({
        where: userTypeCondition,
        returning: true
      });
      let value = await generateOTP();
      let otpDetails = {};
      otpDetails = {
        userName: username,
        userId: user.userId,
        expireValue: "30000",
        otpValue: value
      };
      const otpCreate = await otpAuth.create(otpDetails, {
        returning: true
      });
      if (user) {
        let smtpTransport = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 588,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "sfatroondx@gmail.com", // generated ethereal user
            pass: "troon@123" // generated ethereal password
          }
        });
        smtpTransport.verify(function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log("Server is ready to take our messages");
          }
        });
        var mailOptions = {
          to: username,
          from: '"SFA" <sfatroondx@gmail.com>',
          subject: "SFA - Forgot Password:",
          text:
            "Hello SFA," +
            "\n\n" +
            "you have OTP Password is " +
            value +
            " Use this password OTP while login"
        };
        smtpTransport.sendMail(mailOptions, function (err) {
          console.log("err", err);
          if (err) {
            console.log(err);
          } else {
            return res.status(httpStatus.OK).json({
              status: true,
              data: otpCreate,
              message: "success"
            });
          }
        });
      } else {
        return res
          .status(httpStatus.OK)
          .json({ status: false, message: "User not found" });
      }
    } else {
      return res
        .status(httpStatus.OK)
        .json({ status: false, message: "Username is missing." });
    }
  };

  const passwordChange = async (req, res, next) => {
    const postData = req.body;
    if (postData) {
      // var passwrd = bcryptService().updatePassword(password);
      const password = postData.password
      const user = await UserOtp.findOne({
        where: {
          email: postData.email,
          verified: 1
        }
      })
      if (user) {
        await User.update(
          { password: password, updatedAt: new Date() },
          {
            where: {
              email: postData.email
            }
          }
        )
          .then((data) => {
            return res.send({ status: true, data: data, message: "Successfully updated." });
          })
          .catch(err => { res.send({ status: false, message: 'failed to update', error: err }) })
      } else {
        res.send({ status: false, message: 'email is not verified' })
      }
    } else {
      return res
        .status(httpStatus.OK)
        .json({ status: false, message: "email and Password is missing." });
    }
  };

  const createuserprofile = async (req, res, next) => {
    try {

      const profileData = req.body;
      console.log('=========================>>>' + req.body)

      var flag = 'insert';
      if (profileData.userId != undefined) {
        const findUser = await Userprofile.findAll(
          {
            where: { userId: req.body.userId }
          });
        if (findUser.length > 0) {
          flag = 'update';
        }
      }

      if (flag == 'update') {
        //update
        Userprofile.update(
          {
            userId: profileData.userId,
            UserName: profileData.UserName,
            number: profileData.number,
            email: profileData.email,
            address: profileData.address,
            country: profileData.country,
            state: profileData.state,
            city: profileData.city,
            pin: profileData.pin,
            imagePath: profileData.imagePath
          },
          {
            where: {
              userId: profileData.userId
            }
          }
        )
          .then(() => {
            return res.status(httpStatus.OK).json({
              status: true, message: "Updated Successfully", data: profileData
            });
          })
          .catch(() => {
            return res.status(httpStatus.OK).json({
              status: false, message: "Updation failed"
            });
          })
      }
      else {
        console.log("undefined")
        const userdata = Userprofile.create({

          userId: profileData.userId,
          UserName: profileData.UserName,
          number: profileData.number,
          email: profileData.email,
          address: profileData.address,
          country: profileData.country,
          state: profileData.state,
          city: profileData.city,
          pin: profileData.pin,
          imagePath: profileData.imagePath


        }, {
            returning: true
          })
          .then(data => {
            console.log(data)
            res.json({ status: true, message: "Inserted Successfully" })
          })
      }

    }
    catch (err) {
      console.log(err);
      res.json({ status: false, message: "Inserted Unsuccessfully" })
    };
  };
  // if (profileData) {
  //   await Userprofile.create(
  //     {
  //       userId: profileData.userId,
  //       UserName: profileData.UserName,
  //       number: profileData.number,
  //       email: profileData.email,
  //       address: profileData.address,
  //       country: profileData.country,
  //       state: profileData.state,
  //       city: profileData.city,
  //       pin: profileData.pin
  //     },
  //     {
  //       returning: true
  //     }).then(data => {
  //       console.log(data)
  //       res.send({ status: true, message: "Inserted Successfully", data: profileData})
  //     }).catch(err => {
  //       res.send({ status: false, message: "failed to insert data"})
  //     })
  // }
  // else {
  //   res.send({ status: 'failed', message: 'Please enter profile data' })
  // }
  // };


  const getuserprofile = async (req, res, next) => {
    try {
      /* cms Data */
      const allprofile = await Userprofile.findAll({
      });
      if (!allprofile) {
        return res
          .status(httpStatus.OK)
          .json({ status: false, message: "Data's not found" });
      }
      return res
        .status(httpStatus.OK)
        .json({ status: true, data: allprofile, message: "Fetched successfully" });
    } catch (err) {
      const errorMsg = err.errors ? err.errors[0].message : err.message;
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: errorMsg });
    }
  };


  const remainderMail = async (req, res, next) => {
    const postData = req.body;
    console.log('@@@@@@@@@@@@@@@@@@@@@', postData);
    console.log('************************', postData.email)
    try {
      console.log('postdata', postData)
      var mailOptions = {
        from: "boop@sploot.tech", // sender address
        to: postData.email, // list of receivers
        subject: "Sploot Remainder", // Subject line
        text: 'hai', // plaintext body
        // html: `<b>Your OTP is ${otp}</b>` // html body
        html: `
        <center>
        <div style="text-align:center;width:600px">
        <div style="background-color:#ff5705;height:100px;">
        <br>
        <span style="color:white;font-size:50px;text-align:center;padding:5px;font-weight:bold;top:10px;">sploot</span>
        </div>
        <center>
        <p style="width: 0;text-align:center;
          height: 0;
        margin-top:0px;
          border-left: 25px solid transparent;
          border-right: 25px solid transparent;
          border-top: 20px solid #ff5705;"></p>
        <center>
        <p style="color:black;font-size:25px;text-align:center;margin-top:5%;font-weight:bold;">REMINDER ALERT!</p>
        <div>
        <p style="border:4px solid black;padding:25px;margin-top:3%;font-size:20px">${postData.medicine_name}</p>
        <p style="color:black;text-align:center;margin-top:5%;font-size:18px">happy splooting!</p>
        <p style="color:black;text-align:center;margin-top:5%;font-size:18px">Follow us on :</p>
        <p style="color:black;display:inline-flex;text-align:center;font-size:10px;padding-right:10px;">
                          <a style="font-size:14px;" href="https://www.instagram.comwesploot/?hl=en"> <span style="margin-right:10%;margin-top:2px;">
                          <img src="https://i.pinimg.com/originals/ff/0e/20/ff0e20de4718fe14cdd256c81c5db771.png" height="20px">@wesploot</span></a>
                           <a style="font-size:14px;" href="https://vm.tiktok.com/4UM5Xc/"><span style="margin-right:10%;margin-top:2px;">
                           <img src="https://i.dlpng.com/static/png/5344193-tiktok-png-and-tiktok-transparent-clipart-free-download-tik-tok-logo-transparent-260_260_preview.png" height="20px">@wesploot</span></a>
                           <a style="font-size:14px;" href="https://twitter.com/wesploot2"><span style="margin-right:10%;margin-top:2px;"><img src="https://i.dlpng.com/static/png/6822906_preview.png" height="20px">@wesploot</span></a>
                           <a style="font-size:14px;" href="http://www.facebook.comwesploot"><span style="margin-right:10%;margin-top:2px;"><img src="https://oyebesmartest.com/public/uploads/preview/rounded-facebook-logo-icon-png-hddbzdrabkgu.png" height="20px"><br>wesploot</span></a>
                           </p>
        <p style="border-bottom:5px solid black;"></p>
        </center>
                `,
        attachments: [{
          filename: 'Spoolt.jpg',
          content: ImagelogoSrc,
          encoding: 'base64'
        }]
      }
      // send mail with defined transport object
      await smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
        } else {
          return res
            .status(httpStatus.OK)
            .json({ status: true, message: "mail sent successfully", res: postData });

        }
      });
    } catch (err) {
      const errorMsg = err.errors ? err.errors[0].message : err.message;
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: errorMsg });
    }
  };

  const getprofilebyId = async (req, res, next) => {
    const { id } = req.body;
    if (id) {
      try {
        const singleuser = await Userprofile.findAll({
          where: {
            userId: id
          }
        }).catch(err => {
          const errorMsg = err.errors ? err.errors[0].message : err.message;
          return res.status(httpStatus.BAD_REQUEST).json({ status: false, message: errorMsg });
        });
        return res.status(httpStatus.OK).json({
          status: true, data: singleuser, message: "data fetched! "
        });
      } catch (err) {
        console.log(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: "Internal server error" });
      }
    }
  };


  return {
    login,
    createUser,
    forgetPassword,
    passwordChange,
    sendOtp,
    verifyOtp,
    createuserprofile,
    createAndLoginUser,
    getuserprofile,
    getprofilebyId,
    forgetPasswordSendOtp,
    remainderMail
  };

};

module.exports = AuthController();