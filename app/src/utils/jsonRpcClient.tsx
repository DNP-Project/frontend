import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://stage.dnp-project.ru/rpc",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function jsonRpcRequest(method: string, params: any) {
  try {
    const response = await axiosInstance.post("", {
      jsonrpc: "2.0",
      method,
      params,
      id: Date.now(),
    });
    return response.data.result;
  } catch (error: any) {
    console.error("JSON-RPC Error:", error.response?.data || error.message);
    throw error;
  }
}