import axios from "axios";
import { BaseUri } from "../../../constants/uri";

class CostQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  enqueue(costData, navigate) {
    this.queue.push({ costData, navigate });
    this.processQueue();
  }

  async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const { costData, navigate } = this.queue.shift();
      try {
        await addCostWithRetry(costData, navigate);
      } catch (error) {
        console.error("Failed to add cost after retries", error);
      }
    }

    this.isProcessing = false;
  }
}

const addCostWithRetry = async (
  costData,
  navigate,
  retries = 3,
  delay = 1000
) => {
  try {
    const response = await axios.post(
      `${BaseUri}/api/v1/cost/add`,
      costData
    );

    if (response.status === 200) {
      setTimeout(() => {
        navigate("/ExpenseList");
      }, 500);
    } else {
      throw new Error(`Failed to add cost, status: ${response.status}`);
    }
  } catch (error) {
    if (retries === 0) {
      throw error;
    }
    console.log(`Retrying... Attempts left: ${retries}`);
    await new Promise((resolve) => setTimeout(resolve, delay));
    return addCostWithRetry(costData, navigate, retries - 1, delay * 2);
  }
};

const costQueue = new CostQueue();

export const AddCost = (costData, navigate) => {
  costQueue.enqueue(costData, navigate);
};
