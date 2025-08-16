import Feedback from '../models/Feedback.js';

export const submitFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();

    res.status(201).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Feedback submission error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
