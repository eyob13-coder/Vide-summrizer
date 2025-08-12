import { pipeline } from '@xenova/transformers';
import { Chroma } from 'chroma-js';

export default class PreferenceEngine {
  constructor() {
    this.vectorDB = new Chroma.Client();
    this.embedder = null;
  }

  async init() {
    this.embedder = await pipeline(
      'feature-extraction', 
      'Xenova/all-MiniLM-L6-v2' // 80MB embedding model
    );
  }

  async updatePreferences(userId, feedback) {
    // 1. Convert feedback to vector
    const vector = await this.embedder(feedback.text || feedback.action);
    
    // 2. Store in vector DB
    await this.vectorDB.upsert(userId, {
      embeddings: vector.tolist(),
      metadata: {
        action: feedback.action,
        timestamp: Date.now()
      }
    });

    // 3. Update learned weights
    return this._recalculateWeights(userId);
  }

  async getRecommendations(userId, videoAnalysis) {
    // 1. Get user's preference vector
    const userData = await this.vectorDB.get(userId);
    if (!userData) return videoAnalysis.highlights; // No preferences yet

    // 2. Compare with video highlights
    const highlightsWithScores = await Promise.all(
      videoAnalysis.highlights.map(async highlight => {
        const highlightVec = await this.embedder(highlight.text);
        const similarity = this._cosineSimilarity(
          userData.embeddings, 
          highlightVec.tolist()
        );
        return { ...highlight, score: similarity };
      })
    );

    // 3. Sort by personalization score
    return highlightsWithScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // Top 5 highlights
  }

  // Private methods
  async _recalculateWeights(userId) {
    const history = await this.vectorDB.query({
      userId,
      limit: 100 // Last 100 actions
    });

    const weights = {
      liked: 0,
      skipped: 0,
      shared: 0
    };

    history.forEach(item => {
      weights[item.metadata.action] += 1;
    });

    return weights;
  }

  _cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val ** 2, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val ** 2, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }
}

// Initialize on startup
const engine = new PreferenceEngine();

(async () => {
  await engine.init();
})();

export { engine };