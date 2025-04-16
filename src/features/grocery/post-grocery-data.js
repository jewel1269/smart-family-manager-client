import axios from "axios";
import { BaseUri } from './../../constants/uri';

class GroceryQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  enqueue(groceryData, navigate) {
    this.queue.push({ groceryData, navigate });
    this.processQueue();
  }

  async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const { groceryData, navigate } = this.queue.shift();
      try {
        await addGroceryWithRetry(groceryData, navigate);
      } catch (error) {
        console.error("Failed to add grocery after retries", error);
      }
    }

    this.isProcessing = false;
  }
}

const addGroceryWithRetry = async (
  groceryData,
  navigate,
  retries = 3,
  delay = 1000
) => {
  try {
    const response = await axios.post(
      `${BaseUri}/api/v1/grocery/add`,
      groceryData
    );

    if (response.status === 200) {
      setTimeout(() => {
        navigate("/GroceryList");
      }, 500);
    } else {
      throw new Error(`Failed to add grocery, status: ${response.status}`);
    }
  } catch (error) {
    if (retries === 0) {
      throw error;
    }
    console.log(`Retrying... Attempts left: ${retries}`);
    await new Promise((resolve) => setTimeout(resolve, delay));
    return addGroceryWithRetry(groceryData, navigate, retries - 1, delay * 2);
  }
};

const groceryQueue = new GroceryQueue();

export const AddGrocery = (groceryData, navigate) => {
  groceryQueue.enqueue(groceryData, navigate);
};
