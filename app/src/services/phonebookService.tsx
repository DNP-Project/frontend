import { jsonRpcRequest } from "@/utils/jsonRpcClient";

export async function addEntry(name: string, phone: string, email: string) {
  return await jsonRpcRequest("AddContact", { name, phone, email});
}

export async function editEntry(id: string, name: string, phone: string, email: string) {
  return await jsonRpcRequest("UpdateContact", {id, name, phone, email});
}

export async function deleteEntry(id: string) {
  return await jsonRpcRequest("DeleteContact", { id });
}

export async function GetByName() {
  return await jsonRpcRequest("GetByName", {name});
}

export async function fetchEntries() {
  return await jsonRpcRequest("GetAllContacts", {});
}