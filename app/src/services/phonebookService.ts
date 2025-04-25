import { jsonRpcRequest } from "@/utils/jsonRpcClient";

export async function addEntry(name: string, phone: string) {
  return await jsonRpcRequest("add_entry", { name, phone });
}

export async function editEntry(id: string, name: string, phone: string) {
  return await jsonRpcRequest("edit_entry", { id, name, phone });
}

export async function deleteEntry(id: string) {
  return await jsonRpcRequest("delete_entry", { id });
}

export async function fetchEntries() {
  return await jsonRpcRequest("get_entries", {});
}