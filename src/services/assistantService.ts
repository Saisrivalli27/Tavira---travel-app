export const assistantService = {
  async askQuestion(destinationName: string, question: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.includes('food') || lowerQ.includes('eat') || lowerQ.includes('restaurant')) {
      return `Dining in ${destinationName} is a remarkable experience. I recommend seeking out small, local establishments away from the main squares. The regional specialties here focus on seasonal ingredients and traditional preparation methods.`;
    }
    
    if (lowerQ.includes('transport') || lowerQ.includes('get around') || lowerQ.includes('walk')) {
      return `The best way to experience ${destinationName} is on foot, though comfortable shoes are essential given the historic streets. For longer distances, the local transit network is reliable and offers a scenic perspective of the city.`;
    }

    if (lowerQ.includes('weather') || lowerQ.includes('clothes') || lowerQ.includes('pack')) {
      return `The weather here can shift throughout the day. Layered clothing in natural, breathable fabrics is always a good approach for ${destinationName}. Always carry a light jacket for the cooler evenings.`;
    }

    return `That's a thoughtful question about ${destinationName}. The local culture here deeply values unhurried exploration. I suggest allowing yourself time to wander without a strict itinerary—some of the best discoveries are found in the quiet, unexpected moments.`;
  }
};
