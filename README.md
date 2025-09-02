# 🧬 Muainishi wa Jenomu: Your Personal AI Genomics Lab
### Stop Guessing. Start Seeing. Decode the Blueprint of Life with Google Gemini.

![Muainishi wa Jenomu Screenshot](https://storage.googleapis.com/aistudio-public/gallery/a3014798-e4b9-4709-a764-f65c69707293/app-screenshot.png)

> Forget dry, impenetrable data. **Muainishi wa Jenomu** (Swahili for *Genome Classifier*) is your personal, AI-powered command center for genetic exploration. We've harnessed the unprecedented power of Google's Gemini model to transform raw, complex genomic sequences into stunning, interactive insights. This isn't just a tool; it's a revolution in your browser. Upload a sequence, compare historical genomes, and watch the secrets of DNA come to life.

---

## 🔥 Why It's a Game-Changer

- **🚀 Instant Genius, Zero Setup**: Drag, drop, done. Go from raw data to deep insights in seconds. Explore our curated library of legendary DNA—from Neanderthals and ancient mummies to the immortal HeLa cell line.

- **🆚 Epic Genome Showdowns**: Pit genomes against each other. Select multiple samples and unleash a comparative analysis to instantly spot the critical mutations that tell a unique story.

- **🎨 Dual-View Domination**: Command your data like never before. Immerse yourself in rich, interactive graphical visualizations, then seamlessly flip to the raw, structured JSON for a deep-dive. You're in control.

- **🔒 Fort Knox Security, In Your Browser**: Blazing-fast, fluid, and utterly private. All analysis happens locally. No servers, no data storage, just pure, unadulterated client-side power. **Your data never leaves your machine.**

---

## 🔬 Unleash Your Analytical Superpowers

Choose your sample, select your lens, and let Gemini expose the story hidden in the code.

- **🌍 **Classification**: Uncover ancient ancestral roots and trace the epic journey of human migration through haplogroups.
- **🗺️ **Segmentation**: Map the very architecture of a chromosome. Pinpoint genes, regulatory regions, and the vast, mysterious non-coding territories.
- **👾 **Viral Integration**: Become a digital virus hunter. Scan the genome for the hidden footprints of ancient viral invaders.
- **💥 **Mutation Tracking**: Isolate and analyze critical genetic mutations. Understand their power, from benign quirks to pathogenic signatures.
- **💊 **Pharmacogenomics**: See the future of medicine. Predict how genes influence responses to drugs, paving the way for personalized treatments.
- **🎯 **Therapeutic Insights**: Identify genetic targets for the next generation of groundbreaking therapies. Find the lock, so science can build the key.
- **🔗 **Integrative Analysis**: Become the master strategist. Connect the dots between mutations, drug responses, and therapies in one holistic, all-seeing view.
- **⚔️ **Comparative Mutation**: Settle the score. Uncover unique and shared mutations across multiple samples in a head-to-head genetic duel.

---

## 🚀 Launch in 3... 2... 1...

This is a fully client-side application. No backend. No builds. No waiting.

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge).
- A Google Gemini API Key.

### Setup & Running

1.  **Get the code:** Clone the repository or download the source files.

2.  **Provide your API Key:** The application needs a Google Gemini API key to function. You must configure your environment so the code can access the key via `process.env.API_KEY`. For local development with a tool like Vite:
    - Create a `.env.local` file in the project root.
    - Add your API key to it: `VITE_API_KEY=YOUR_GEMINI_API_KEY_HERE`
    - The service file (`services/geminiService.ts`) is pre-configured to handle this.

3.  **Launch:** Open `index.html` in your browser or run your local development server (e.g., `npm run dev` with Vite) and navigate to the provided URL.

---

## 🛠️ Forged with Cutting-Edge Technology

- **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Brain**: [Google Gemini API](https://ai.google.dev/)
- **Icons**: Custom-built SVG components for a razor-sharp, consistent look.

---

## 🪄 The Magic Under the Hood

It's not magic, but it feels like it.

1.  **You Provide the Code**: Upload a file or select from our library of historical genomes.
2.  **Gemini Does the Heavy Lifting**: We engineer a hyper-specific prompt, sending your data and a strict JSON schema to the Gemini API.
3.  **Instant, Beautiful Insights**: Gemini returns perfectly structured data, which we instantly render into the beautiful, interactive visualizations you see on screen.

---

## 📄 License

This project is licensed under the MIT License.
