const invoiceService = require('../services/invoiceService');
const { successResponse } = require('../utils/response');

const createInvoice = async (req, res, next) => {
  try {
    const result = await invoiceService.createInvoice(req.body);
    return successResponse(res, result, 'Tạo hóa đơn thành công', 201);
  } catch (e) { next(e); }
};

const getAllInvoices = async (req, res, next) => {
  try {
    const result = await invoiceService.getAllInvoices(req.query);
    return successResponse(res, result);
  } catch (e) { next(e); }
};

const getInvoiceById = async (req, res, next) => {
  try {
    const result = await invoiceService.getInvoiceById(req.params.id);
    return successResponse(res, result);
  } catch (e) { next(e); }
};

const getByContract = async (req, res, next) => {
  try {
    const result = await invoiceService.getInvoicesByContract(req.params.maHopDong);
    return successResponse(res, result);
  } catch (e) { next(e); }
};

module.exports = { createInvoice, getAllInvoices, getInvoiceById, getByContract };
