import axios from "axios";
import { BaseUri } from "../../constants/uri";

class IncomeQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  enqueue(incomeData, navigate) {
    this.queue.push({ incomeData, navigate });
    this.processQueue();
  }

  async processQueue() {
    if (this.isProcessing) return; 
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const { incomeData, navigate } = this.queue.shift(); 
      try {
        await AddIncomeWithRetry(incomeData, navigate); 
      } catch (error) {
        console.error("Failed to add income after retries", error);
      }
    }

    this.isProcessing = false;
  }
}
const AddIncomeWithRetry = async (
  incomeData,
  navigate,
  retries = 3,
  delay = 1000
) => {
  try {
    const response = await axios.post(
      `${BaseUri}/api/v1/income/add`,
      incomeData
    );
    if (response.status === 200) {
      setTimeout(() => {
        navigate("/incomeList");
      }, 500); 
    } else {
      throw new Error(`Failed to add income, status: ${response.status}`);
    }
  } catch (error) {
    if (retries === 0) {
      throw error;
    }
    console.log(`Retrying... Attempts left: ${retries}`);
    await new Promise((resolve) => setTimeout(resolve, delay));
    return AddIncomeWithRetry(incomeData, navigate, retries - 1, delay * 2); 
  }
};

const incomeQueue = new IncomeQueue();

export const AddIncome = (incomeData, navigate) => {
  incomeQueue.enqueue(incomeData, navigate); 
};
