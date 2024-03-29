const booking = require("../model/booking");
const fakeBooking = require("../model/fakeBooking");
const mailTransporter = require("../util/sendingEmail");
const midtrans = require("../util/midtrans");
const { default: axios } = require("axios");
const { payment } = require("../midtrans/paymentMethod");


const createFakeBooking = async (req, res, next) => {
  try {
    const saveBooking = await new fakeBooking(req.body).save();
    let mailDetails = {
      from: "bagastester46@gmail.com",
      to: req.body.email,
      subject: "Email Konfirmasi ",
      html: `<!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <title>My Email Template</title>
              <style type="text/css">
                /* Main styles */
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                }
                table {
                  border-collapse: collapse;
                  width: 100%;
                  max-width: 600px;
                  margin: auto;
                  background-color: #fff;
                }
                th, td {
                  text-align: left;
                  padding: 10px;
                  border-bottom: 1px solid #ccc;
                }
                th {
                  background-color: #f2f2f2;
                }
                h1, h2, h3 {
                  font-weight: normal;
                  margin: 0;
                  padding: 20px 10px;
                  text-align: center;
                }
                p {
                  margin: 0;
                  padding: 10px;
                }
                a {
                  color: #428bca;
                }
                /* Responsive styles */
                @media screen and (max-width: 600px) {
                  table {
                    width: 100%;
                  }
                  h1, h2, h3 {
                    font-size: 20px;
                  }
                }
              </style>
            </head>
            <body>
              <table>
                <tr>
                  <th colspan="2"><h1>Welcome to My Website</h1></th>
                </tr>
                <tr>
                  <td colspan="2"><p>Terimakasih sudah melakukan proses pembookingan gedung Masjid Andalusia. Tahapan selanjutnya adalah menunggu konfirmasi oleh pihak admin, jika admin sudah melakukan konfirmasi maka saudara akan dikirimkan email balasan untuk melakukan proses pembayaran. Berikut ini data saudara : </a>.</p></td>
                </tr>
                <tr>
                  <td colspan="2">
                    <table>
                      <tr>
                        <td><p>Nama</p></td>
                        <td><p>${req.body.name}</p></td>
                      </tr>
                      <tr>
                        <td><p>Email</p></td>
                        <td><p>${req.body.email}</p></td>
                      </tr>
                      <tr>
                        <td><p>No.Telphone</p></td>
                        <td><p>${req.body.phone}</p></td>
                      </tr>
                      <tr>
                        <td><p>Alamat</p></td>
                        <td><p>${req.body.address}</p></td>
                      </tr>
                      <tr>
                        <td><p>Keterangan</p></td>
                        <td><p>${req.body.information}</p></td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colspan="2"><p>Jika data diri diatas salah tolong untuk segera melaporkan ke pihak admin untuk melakukan perbaikan data diri. Terimakasih</p></td>
                </tr>
              </table>
            </body>
            </html>`,
    };
    await mailTransporter.sendMail(mailDetails, function (err, data, next) {
      if (err) {
        next(err);
      } else {
        res.status(200).json({
          message: "succes",
          data: saveBooking,
        });
      }
    });
  } catch (err) {
    next(err);
  }
};
const updatedetailBooking = async (req, res, next) => {
  try {
    const update = await fakeBooking.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          items: [
            {
              year: req.body.items.year,
              month: req.body.items.month,
              date: req.body.items.date,
            },
          ],
          information: req.body.information,
        },
      },
      { new: true }
    );
    console.log(update._id.toString());
    res.status(200).json({
      message: "Success Update",
      data: update,
    });
  } catch (err) {
    next(err);
  }
};
const confirmationFakeBooking = async (req, res, next) => {
  try {
    const { payment_type, bank_name } = req.body
    const findFakeTransaction = await fakeBooking.findOne({ _id: req.params.id });

    let newbodyReqMidtrans = payment(payment_type, bank_name, findFakeTransaction)
    try {
      const test = await midtrans.charge(newbodyReqMidtrans);
      if (test) {
        try {
          const update = await fakeBooking.findOneAndUpdate(
            { _id: req.params.id },
            {
              $set: {
                status: test.transaction_status,
                payment: test,
              },
            },
            { new: true }
          );
          return res.status(200).json({
            message: "Success Update",
            data: update,
          });
        } catch (err) {
          next(err);
        }
      }
    } catch (err) {
      next(new Error("Something Wrong with Midtrans"));
    }
  } catch (err) {
    next(new Error("cant find booking id"));
  }
};
const cancelFakeBooking = async (req, res, next) => {
  try {
    const update = await fakeBooking.findByIdAndDelete({ _id: req.params.id }, { new: true });
    res.status(200).json({
      message: "Success Update",
    });
  } catch (err) {
    next(err);
  }
};
const createBooking = async (req, res, next) => {
  try {
    const findYear = await booking.findOne({ year: req.body.year });
    if (findYear === null) {
      const saveBooking = await new booking({
        year: req.body.year,
        stamp: {
          month: req.body.stamp.month,
          date: req.body.stamp.date,
        },
      }).save();
      return res.status(200).json({
        message: "succes",
        data: saveBooking,
      });
    } else {
      let newMonth = req.body.stamp.month;
      let newDate = req.body.stamp.date;
      let newArray = [];
      let existMonth = findYear.stamp.find((month) => month.month == newMonth);
      if (existMonth) {
        for (let i = 0; i < existMonth.date.length; i++) {
          let existDate = newDate.find((date) => existMonth.date[i] === date);
          if (existDate == undefined) {
            newArray.push(existMonth.date[i]);
          }
        }

        if (newArray.length !== existMonth.date.length) {
          return res.status(200).json({
            message: "duplicate date",
          });
        }
        newArray = newArray.concat(newDate).sort();
        try {
          const saveBooking = await booking.findOneAndUpdate(
            { _id: findYear._id, "stamp._id": existMonth._id },
            {
              $set: {
                "stamp.$.date": newArray,
              },
            },
            { new: true }
          );
          console.log(saveBooking);
          return res.status(200).json({
            message: "succes",
            data: saveBooking,
          });
        } catch (err) {
          next(err);
        }
      } else if (existMonth == undefined) {
        try {
          let newStamp = {
            month: newMonth,
            date: newDate,
          };
          const saveBooking = await booking.findOneAndUpdate(
            { _id: findYear._id },
            {
              $push: {
                stamp: newStamp,
              },
            },
            { new: true }
          );
          console.log(saveBooking);
          return res.status(200).json({
            message: "succes",
            data: saveBooking,
          });
        } catch (err) {
          next(err);
        }
      }
    }
  } catch (err) {
    next(err);
  }
};
const getDateBooking = async (req, res, next) => {
  const getYear = req.query.year;
  const getMonth = req.query.month;

  try {
    const findDate = await booking.findOne(
      { year: getYear },
      {
        stamp: {
          $elemMatch: { month: getMonth },
        },
      }
    );
    if (findDate.stamp.length !== 0) {
      return res.status(200).json({
        message: "succes",
        data: findDate.stamp[0].date,
      });
    } else {
      return res.status(200).json({
        message: "succes",
        data: [],
      });
    }
  } catch (err) {
    next(err);
  }
};

const updeteStatus = async (req, res, next) => {
  let limit = req.query.limit ? req.query.limit : 5;
  let page = req.query.page ? req.query.page - 1 : 0;
  try {
    const transcation_id = req.params.id
    const findTransaction= await fakeBooking.findAll().limit(limit).skip(page * limit)
    if(!findTransaction){
      res.status(200).json({
        message : "id transcation is not available"
      })
    }else{
      transaction.status(transcation_id).then((result) => {
        console.log(result)
      }).catch((err) => {
        
      });
    }
   
  } catch (err) {

  }
}
const testing = async (req, res, next) => {
  try {
    let pass
    const response = await axios.get('https://api.sandbox.midtrans.com/v2/641732fe5980af1c2e25d7de/status', {
      headers: {
        auth: {
          username: process.env.SERVER_KEY_MIDTRANS,
          password: pass
        }
      }
    })
    res.status(200).json(response)
  } catch (err) {
    next(err);
  }
};
module.exports = { createBooking, getDateBooking, createFakeBooking, updatedetailBooking, confirmationFakeBooking, cancelFakeBooking, testing };
