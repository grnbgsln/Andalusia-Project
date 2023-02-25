const booking = require("../model/booking")

const createBooking = async (req, res, next) => {
    try {
        const findYear = await booking.findOne({ year: req.body.year })
        if (findYear === null) {
            const saveBooking = await new booking({
                year: req.body.year,
                stamp: {
                    month: req.body.stamp.month,
                    date: req.body.stamp.date
                }
            }).save()
            return res.status(200).json({
                message: "succes",
                data: saveBooking
            })
        } else {
            let newMonth = req.body.stamp.month
            let newDate = req.body.stamp.date
            let newArray = []
            let existMonth = await findYear.stamp.find((month) => month.month == newMonth)
            if (existMonth) {
                for (let i = 0; i < existMonth.date.length; i++) {
                    let existDate = await newDate.find((date) => existMonth.date[i] === date)
                    if (existDate == undefined) {
                        newArray.push(existMonth.date[i])
                    }
                }

                if (newArray.length !== existMonth.date.length) {
                    return res.status(200).json({
                        message: "duplicate date"
                    })
                }
                newArray = newArray.concat(newDate).sort()
                try {
                    const saveBooking = await booking.findOneAndUpdate({ "_id": findYear._id, "stamp._id": existMonth._id },
                        {
                            $set: {
                                "stamp.$.date": newArray,
                            }
                        }, { new: true }
                    )
                    console.log(saveBooking)
                    return res.status(200).json({
                        message: "succes",
                        data: saveBooking
                    })
                } catch (err) {
                    next(err)
                }
            } else if (existMonth == undefined) {
                try {
                    let newStamp = {
                        month: newMonth,
                        date: newDate,
                    }
                    const saveBooking = await booking.findOneAndUpdate(
                        { "_id": findYear._id },
                        {
                            $push: {
                                stamp: newStamp
                            }
                        }, { new: true }
                    )
                    console.log(saveBooking)
                    return res.status(200).json({
                        message: "succes",
                        data: saveBooking
                    })
                } catch (err) {
                    next(err)
                }
            }
        }

    } catch (err) {
        next(err)
    }
}

const getDateBooking = async (req, res, next) => {
    const getYear = req.query.year
    const getMonth = req.query.month

    try {
        const findDate = await booking.findOne({ year: getYear },
            {
                stamp:
                {
                    $elemMatch: { month: getMonth }
                }
            })
        if (findDate.stamp.length !== 0) {
            return res.status(200).json({
                message: "succes",
                data: findDate.stamp[0].date
            })
        } else {
            return res.status(200).json({
                message: "succes",
                data: []
            })
        }
    } catch (err) {
        next(err)
    }
}
module.exports = { createBooking, getDateBooking }