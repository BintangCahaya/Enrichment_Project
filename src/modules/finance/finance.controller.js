import {
    createRentService,
    listRentsService,
    addPaymentService,
    tenantLedgerService
  } from "./finance.service.js";
  
  export async function createRent(req, res) {
    await createRentService(req.user.id, req.body);
    res.status(201).json({ message: "Rent created" });
  }
  
  export async function listRents(req, res) {
    const rents = await listRentsService(req.user.id);
    res.json(rents);
  }
  
  export async function addPayment(req, res) {
    await addPaymentService(req.user.id, req.body);
    res.status(201).json({ message: "Payment recorded" });
  }
  
  export async function tenantLedger(req, res) {
    const ledger = await tenantLedgerService(
      req.user.id,
      req.params.tenantId
    );
    res.json(ledger);
  }
  