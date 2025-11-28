const express = require("express");
const { asyncHandler } = require("../utils/asyncHandler");
const { userAuth } = require("../middleware/authMiddleware");
const { ApiError } = require("../utils/ApiError");
const BookingData = require("../models/tableBookModel");
const { ApiResponse } = require("../utils/ApiResponse");
const { isAdminMiddleware } = require("../middleware/isAdminMiddleware");
const tableBookRouter = express.Router();

/*Table Booking API */
tableBookRouter.post(
	"/",
	userAuth,
	asyncHandler(async (req, res, next) => {
		const loggedUser = req.user;
		const { fullName, phone, email, personCount, date, timeSlot } = req.body;

		if (!fullName || !phone || !email || !personCount || !date || !timeSlot) {
			return next(new ApiError(400, "All Fields Required!"));
		}

		if (isNaN(Date.parse(date))) {
			return next(new ApiError(400, "Invalid date format"));
		}

		const alreadyBooking = await BookingData.findOne({
			createdBy: loggedUser._id,
			date,
			timeSlot,
		});

		if (alreadyBooking) {
			return next(
				new ApiError(400, "You already booked this date & time slot")
			);
		}

		const slotBookingCount = await BookingData.countDocuments({
			date,
			timeSlot,
		});

		const MAX_BOOKING_PER_SLOT = 5;

		if (slotBookingCount >= MAX_BOOKING_PER_SLOT) {
			return next(new ApiError(400, "This slot is full"));
		}

		const bookingUserDetails = await BookingData.create({
			createdBy: loggedUser._id,
			fullName,
			phone,
			email,
			personCount,
			date,
			timeSlot,
		});

		res.status(200).json(
			new ApiResponse(200, bookingUserDetails, "Table booked successfully")
		);
	})
);

/* Booking Data API For User */

tableBookRouter.get(
	"/myBooking",
	userAuth,
	asyncHandler(async (req, res, next) => {
		const loggedUser = req.user;
		const { _id } = loggedUser;

		const userBookingDetails = await BookingData.find({ createdBy: _id });

		if (userBookingDetails.length === 0) {
			return next(new ApiError(404, "No bookings found"));
		}

		res.status(200).json(
			new ApiResponse(200, userBookingDetails, "Data Fatched")
		);
	})
);

/*All Booking for Admin */

tableBookRouter.get(
	"/all",
	userAuth,
	isAdminMiddleware,
	asyncHandler(async (req, res, next) => {
		const allUserBookings = await BookingData.find().sort({
			date: -1,
			timeSlot: 1,
		});

		res.status(200).json(
			new ApiResponse(200, allUserBookings, "Data Fatched")
		);
	})
);

/* Booking Confirm => Admin */

tableBookRouter.patch(
	"/confirm/:id",
	userAuth,
	isAdminMiddleware,
	asyncHandler(async (req, res, next) => {
		const bookingId = req.params.id;

		const userDetails = await BookingData.findByIdAndUpdate(
			bookingId,
			{ status: "confirmed", confirmedAt: new Date() },
			{ new: true }
		);
		if (!userDetails) {
			return next(new ApiError(404, "Booking not found"));
		}

		res.status(200).json(
			new ApiResponse(200, userDetails, "Booking confirmed successfully")
		);
	})
);

/* Booking Reject => Admin */

tableBookRouter.patch(
	"/cancelled/:id",
	userAuth,
	isAdminMiddleware,
	asyncHandler(async (req, res, next) => {
		const bookingId = req.params.id;

		const userDetails = await BookingData.findByIdAndUpdate(
			bookingId,
			{ status: "cancelled", confirmedAt: new Date() },
			{ new: true }
		);
		if (!userDetails) {
			return next(new ApiError(404, "Booking not found"));
		}

		res.status(200).json(
			new ApiResponse(200, userDetails, "Booking cancelled successfully")
		);
	})
);

module.exports = { tableBookRouter };
