import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000/rpc", // Backend JSON-RPC endpoint
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