import {
    checkInTenant,
    listTenants,
    checkOutTenant,
    updateTenant
  } from "./tenants.service.js";
  
  export async function checkIn(req, res) {
    await checkInTenant(req.user.id, req.body);
    res.status(201).json({ message: "Tenant checked in" });
  }
  
  export async function list(req, res) {
    const tenants = await listTenants(req.user.id);
    res.json(tenants);
  }
  
  export async function update(req, res) {
    const tenant = await updateTenant(
      req.user.id,
      req.params.id,
      req.body
    );
    res.json(tenant);
  }
  
  export async function checkOut(req, res) {
    await checkOutTenant(
      req.user.id,
      req.params.id,
      req.body.check_out_date
    );
    res.json({ message: "Tenant checked out" });
  }
  