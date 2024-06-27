const Expense = require('../models/Expense');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  }
});

const upload = multer({ storage });

exports.uploadReceipt = upload.single('expenseReceipt');

exports.createExpense = async (req, res) => {
  try {
    const { expenseName, expenseCategory, expenseAmount, expenseDetails, paymentMethod, referenceNumber, expenseDate, notes } = req.body;
    const expenseReceipt = req.file ? req.file.path : '';

    const newExpense = new Expense({
      expenseName,
      expenseCategory,
      expenseAmount,
      expenseDetails,
      paymentMethod,
      referenceNumber,
      expenseDate,
      expenseReceipt,
      notes
    });

    await newExpense.save();
    res.status(201).json({ message: 'Expense created successfully', expense: newExpense });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { expenseName, expenseCategory, expenseAmount, expenseDetails, paymentMethod, referenceNumber, expenseDate, notes } = req.body;
    const expenseReceipt = req.file ? req.file.path : '';

    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    expense.expenseName = expenseName;
    expense.expenseCategory = expenseCategory;
    expense.expenseAmount = expenseAmount;
    expense.expenseDetails = expenseDetails;
    expense.paymentMethod = paymentMethod;
    expense.referenceNumber = referenceNumber;
    expense.expenseDate = expenseDate;
    expense.expenseReceipt = expenseReceipt;
    expense.notes = notes;

    await expense.save();
    res.json({ message: 'Expense updated successfully', expense });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    await expense.remove();
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
