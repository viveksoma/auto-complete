export const fetchSuggestions = async (query: string): Promise<string[]> => {
    const data = ["Apple", "Banana", "Mango", "Grapes", "Orange", "Pineapple"];
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data.filter((item) => item.toLowerCase().includes(query.toLowerCase())));
      }, 500); // Simulating network delay
    });
};
  