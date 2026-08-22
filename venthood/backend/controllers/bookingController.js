const Booking = require('../models/Booking');
const { sendMail } = require('../utils/mailer');
const { sendLeadToCRM } = require('../services/crmService');

exports.createBooking = async (req, res, next) => {
  try {
    const { name, email, phone, date, time, address } = req.body;
    if (!name || !email || !phone || !date || !time || !address) {
      return res.status(400).json({ success: false, message: 'Missing required booking fields.' });
    }

    const bookingData = { ...req.body };
    if (req.user) bookingData.customer = req.user._id;

    const booking = await Booking.create(bookingData);

    // Fire-and-forget notifications - never block the response
    sendMail({
      to: process.env.CONTACT_RECEIVER,
      subject: `New Booking Request - ${booking.name}`,
      html: `<p>New booking request received.</p>
        <p><b>Name:</b> ${booking.name}<br/>
        <b>Email:</b> ${booking.email}<br/>
        <b>Phone:</b> ${booking.phone}<br/>
        <b>Date/Time:</b> ${booking.date} ${booking.time}<br/>
        <b>Address:</b> ${booking.address}<br/>
        <b>Notes:</b> ${booking.notes || 'N/A'}</p>`,
    }).catch((e) => console.error(e));

    sendLeadToCRM({ type: 'booking', ...booking.toObject() }).catch((e) => console.error(e));

    res.status(201).json({ success: true, booking });
  } catch (err) {
    next(err);
  }
};

exports.getBookings = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const bookings = await Booking.find(filter).populate('service', 'name slug').sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (err) {
    next(err);
  }
};

exports.getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ customer: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (err) {
    next(err);
  }
};

exports.updateBooking = async (req, res, next) => {
  try {
    const previous = await Booking.findById(req.params.id);
    if (!previous) return res.status(404).json({ success: false, message: 'Booking not found.' });

    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (req.body.status && req.body.status !== previous.status) {
      sendMail({
        to: booking.email,
        subject: `Your Venthood.ca Booking is now "${booking.status}"`,
        html: `<p>Hi ${booking.name},</p>
          <p>Your booking for <b>${booking.date} ${booking.time}</b> has been updated to status: <b>${booking.status}</b>.</p>
          <p>If you have any questions, contact us at ${process.env.CONTACT_RECEIVER}.</p>
          <p>Thank you for choosing Venthood.ca</p>`,
      }).catch((e) => console.error(e));
    }

    res.json({ success: true, booking });
  } catch (err) {
    next(err);
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found.' });
    res.json({ success: true, message: 'Booking deleted.' });
  } catch (err) {
    next(err);
  }
};
