const ExpenseCategory = require('../models/Category');

// Create a new expense category
exports.createExpenseCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newExpenseCategory = new ExpenseCategory({
      name,
      description
    });

    await newExpenseCategory.save();
    res.status(201).json(newExpenseCategory);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Read all expense categories
exports.getAllExpenseCategories = async (req, res) => {
  try {
    const expenseCategories = await ExpenseCategory.find();
    res.status(200).json(expenseCategories);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Read an expense category by ID
exports.getExpenseCategoryById = async (req, res) => {
  try {
    const expenseCategory = await ExpenseCategory.findById(req.params.id);
    if (!expenseCategory) {
      return res.status(404).json({ error: 'Expense category not found' });
    }
    res.status(200).json(expenseCategory);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an expense category
exports.updateExpenseCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const updatedExpenseCategory = await ExpenseCategory.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );

    if (!updatedExpenseCategory) {
      return res.status(404).json({ error: 'Expense category not found' });
    }
    res.status(200).json(updatedExpenseCategory);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete an expense category
exports.deleteExpenseCategory = async (req, res) => {
  try {
    const deletedExpenseCategory = await ExpenseCategory.findByIdAndDelete(req.params.id);
    if (!deletedExpenseCategory) {
      return res.status(404).json({ error: 'Expense category not found' });
    }
    res.status(200).json({ message: 'Expense category deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
