const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.generatePaymentPDF = (payment, res) => {
    const doc = new PDFDocument();
    const fileName = `Payment_${payment._id}.pdf`;

    doc.pipe(fs.createWriteStream(fileName));
    doc.pipe(res);

    doc.fontSize(25).text('Payment Invoice', { align: 'center' });

    doc.fontSize(14).text(`Invoice: ${payment.invoice}`, { align: 'left' });
    doc.text(`Total: ${payment.total}`);
    doc.text(`Paid: ${payment.paid}`);
    doc.text(`Balance: ${payment.balance}`);
    doc.text(`Paying: ${payment.paying}`);
    doc.text(`Method: ${payment.method}`);
    doc.text(`Transaction ID: ${payment.transactionId}`);
    doc.text(`Notes: ${payment.notes}`);

    doc.end();

    return fileName;
};

exports.generateExpensePDF = (expense, res) => {
    const doc = new PDFDocument();
    const fileName = `Expense_${expense._id}.pdf`;

    doc.pipe(fs.createWriteStream(fileName));
    doc.pipe(res);

    doc.fontSize(25).text('Expense Report', { align: 'center' });

    doc.fontSize(14).text(`Category: ${expense.category.name}`, { align: 'left' });
    doc.text(`Amount: ${expense.amount}`);
    doc.text(`Description: ${expense.description}`);
    doc.text(`Date: ${expense.date.toISOString().split('T')[0]}`);
    doc.text(`Created By: ${expense.createdBy.name}`);

    doc.end();

    return fileName;
};
