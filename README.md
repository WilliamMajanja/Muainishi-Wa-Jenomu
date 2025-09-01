# Muainishi wa Jenomu - AI-Powered Genome Analysis Platform

![Muainishi wa Jenomu Screenshot](https://storage.googleapis.com/aistudio-public/gallery/a3014798-e4b9-4709-a764-f65c69707293/app-screenshot.png)

**Muainishi wa Jenomu** (Swahili for *Genome Classifier*) is a sophisticated, AI-driven web application designed for comprehensive human genome analysis. Leveraging the power of Google's Gemini API, this tool provides world-class bioinformatics insights through an intuitive and visually rich interface.

Users can upload their genome sequence files, select from a rich library of historical samples, and perform a wide range of analyses. The results are presented in two convenient formats: a clean, interactive graphical visualization and the raw, structured JSON data.

---

## ✨ Key Features

- **Intuitive File Handling**: Easy file uploads with a drag-and-drop interface.
- **Rich Historical Library**: Explore and compare dozens of significant historical and mutant genomes, from Henrietta Lacks to ancient Neanderthals.
- **Multi-Sample Comparison**: Select multiple samples from the library to perform side-by-side comparative analysis (e.g., comparing mutations).
- **Powerful Analysis Types**:
  - **🧬 Classification**: Uncover genetic ancestry and haplogroups.
  - **📊 Segmentation**: Identify and map key genomic segments like genes and regulatory regions.
  - **🦠 Viral Integration**: Scan for potential viral DNA integrated into the genome.
  - **⚡ Mutation Tracking**: Pinpoint and analyze significant genetic mutations.
  - **💊 Pharmacogenomics**: Predict drug responses and metabolic phenotypes based on genetic markers.
  - **🎯 Therapeutic Insights**: Identify genes that are known targets for existing or experimental therapies.
  - **🔗 Integrative Analysis (Cross-Feature)**: Get a holistic view by connecting findings across domains, linking mutations to pharmacogenomics and therapeutic options.
- **Dual-View Results**: Toggle between beautiful, interactive **Graphical Visualizations** and the detailed **Raw JSON Data**.
- **Modern & Responsive UI**: A sleek, dark-themed interface built with React and Tailwind CSS that works seamlessly across all devices.
- **AI-Powered**: All analyses are performed by Google's advanced Gemini model, ensuring high-quality, structured results.

---

## 🚀 Getting Started

This is a fully client-side application and requires no backend or complex build setup to run.

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge).
- A Google Gemini API Key.

### Setup & Running

1.  **Clone the repository or download the source files.**

2.  **Set up your API Key:**
    This application requires a Google Gemini API key to function. The key is accessed via the `process.env.API_KEY` variable in the code.

    To make your key available to the application, you'll need to serve the files in an environment where this variable can be set. A simple way to do this for local development is to use a tool like `vite`.

    - Create a `.env` file in the root of the project.
    - Add your API key to the `.env` file:
      ```
      VITE_API_KEY=YOUR_GEMINI_API_KEY_HERE
      ```
    - The code internally expects `process.env.API_KEY`, so you may need to adjust the service file (`services/geminiService.ts`) to read `import.meta.env.VITE_API_KEY` if you use Vite, or configure your server to inject the environment variable correctly.

3.  **Open `index.html` in your browser.**
    If you've set up a local server (like `vite` or `http-server`), navigate to the provided local URL (e.g., `http://localhost:5173`).

---

## 🛠️ Technology Stack

- **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Model**: [Google Gemini API](https://ai.google.dev/)
- **Icons**: Custom SVG components

---

## 🔬 How It Works

1.  **Select Data**: The user uploads a genome sequence file or selects one or more samples from the historical library.
2.  **Select Analysis**: The user chooses an analysis type. The available options change depending on whether one or multiple samples are selected.
3.  **Call Gemini API**: A prompt is constructed containing the analysis type, the genome data, and a detailed JSON schema for the desired output format. This is sent to the Gemini API.
4.  **Receive Structured Data**: The Gemini API processes the request and returns a JSON object that conforms to the requested schema.
5.  **Render Results**: The application parses the JSON response and uses it to render both the interactive visualizations and the raw data view.

---

## 📄 License

This project is licensed under the MIT License.