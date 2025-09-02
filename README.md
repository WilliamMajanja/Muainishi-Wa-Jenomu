# Muainishi wa Jenomu
### Your Personal AI Genomics Lab. Decode the Blueprint of Life with Google Gemini.

![Muainishi wa Jenomu Screenshot](https://storage.googleapis.com/aistudio-public/gallery/a3014798-e4b9-4709-a764-f65c69707293/app-screenshot.png)

Step into the future of genetic analysis. **Muainishi wa Jenomu** (Swahili for *Genome Classifier*) transforms raw genomic data into breathtaking insights. This isn't just a tool; it's your personal, AI-powered bioinformatics lab, putting the revolutionary capabilities of Google's Gemini model at your fingertips. Upload a sequence, journey through a library of historical genomes, and watch as complex data is distilled into beautiful, interactive visualizations.

---

## ✨ Features That Set Us Apart

- **🚀 Effortless Data Exploration**: Drag, drop, and analyze. Upload your own genome files or journey through our curated library of fascinating historical DNA—from Neanderthals and ancient mummies to legendary cell lines.

- **🔄 Dynamic Comparative Analysis**: Pit genomes against each other. Select multiple samples and instantly uncover the subtle and significant mutations that differentiate them.

- **🎨 Stunning Dual-View Interface**: Experience your data like never before. Immerse yourself in rich, interactive graphical visualizations, or switch to the raw, structured JSON for deep-dive analysis. The power is yours.

- **⚡ Blazing-Fast & Secure**: All analysis happens in your browser. Powered by React and Tailwind CSS, the interface is fluid, responsive, and secure. No servers, no data storage, just pure client-side power.

---

## 🔬 Dive Deep with Powerful, AI-Driven Analyses

Select your sample, choose your lens, and let Gemini reveal the story hidden in the code.

- **🧬 Classification**: Trace genetic roots and uncover ancient ancestral lineages and haplogroups.
- **📊 Segmentation**: Visualize the architecture of a chromosome, identifying key genes, regulatory regions, and non-coding DNA.
- **🦠 Viral Integration**: Hunt for the hidden signatures of viruses embedded within the genome.
- **⚡ Mutation Tracking**: Pinpoint and evaluate critical genetic mutations and their clinical significance.
- **💊 Pharmacogenomics**: Predict how specific genes can influence metabolic responses to medications.
- **🎯 Therapeutic Insights**: Identify genetic markers that are known targets for groundbreaking therapies.
- **🔗 Integrative Analysis**: Connect the dots between mutations, drug responses, and therapeutic pathways in a single, holistic view.
- **🆚 Comparative Mutation**: Uncover unique and shared mutations across multiple samples in a side-by-side showdown.

---

## 🚀 Get Started in Seconds

This is a fully client-side application and requires no backend or complex build setup.

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

## 🛠️ Built with Cutting-Edge Technology

- **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Model**: [Google Gemini API](https://ai.google.dev/)
- **Icons**: Custom-built SVG components for a sharp, consistent look.

---

## 🔬 How It Works: The Magic Explained

1.  **Select Data**: The user uploads a genome file or selects one or more samples from the rich historical library.
2.  **Choose Analysis**: The user picks an analysis type tailored for single or multiple samples.
3.  **Construct Prompt**: A highly specific prompt is engineered, combining the genome data, the analysis type, and a detailed JSON schema that instructs the AI on the exact output format.
4.  **Query Gemini**: The request is sent to the Gemini API for analysis.
5.  **Receive Structured Data**: Gemini processes the complex biological data and returns a perfectly structured JSON object.
6.  **Render Insights**: The app parses the JSON and dynamically renders both the stunning interactive visualizations and the clean, raw data view.

---

## 📄 License

This project is licensed under the MIT License.
