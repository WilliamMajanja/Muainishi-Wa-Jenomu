import { GoogleGenAI } from "@google/genai";
import { AnalysisType } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash';

const getSystemInstruction = (analysisType: AnalysisType): string => {
  switch (analysisType) {
    case AnalysisType.CLASSIFICATION:
      return "You are a world-class bioinformatics expert specializing in human genetics. Your task is to classify a human genome sample. Provide a detailed report on potential ancestry, haplogroups (maternal and paternal if possible), and any notable high-level genetic markers. Format the output in clean, readable markdown with clear headings.";
    case AnalysisType.SEGMENTATION:
      return "You are a genomic data scientist. Your task is to perform segmentation on a human genome sample. Identify and describe key segments like potential genes, regulatory regions, and non-coding DNA. Present the results in a summary followed by a detailed markdown table with columns: Segment ID, Chromosome (if identifiable), Start Position, End Position, Type (Gene/Regulatory/etc.), and a brief Description.";
    case AnalysisType.INTEGRATION:
      return "You are a specialist in viral genomics and retrovirology. Your task is to analyze a human genome sample for signs of viral integration (e.g., from retroviruses like HIV or HPV). Identify potential integration sites and the likely viral source. If no definitive signs are found, state that clearly but hypothesize about any ambiguous sequences. Format the report with a summary and a markdown table of potential integration points.";
    case AnalysisType.MUTATION:
      return "You are a clinical geneticist. Your task is to analyze a human genome sequence file (VCF-like data) to identify and track significant mutations. For each mutation, list its ID (e.g., rsID if available), type (SNP, indel, etc.), clinical significance (e.g., Pathogenic, Likely Benign, VUS), and the associated gene. Format the output as a detailed markdown table.";
    case AnalysisType.PHARMACOGENOMICS:
      return "You are an expert in pharmacogenetics. Analyze the provided genomic data to identify key variants related to drug metabolism and response. Focus on well-known pharmacogenomic genes like CYP2D6, CYP2C19, VKORC1, and TPMT. For each identified variant, provide the gene, the specific variant (e.g., *2, *17), the predicted phenotype (e.g., Poor Metabolizer, Rapid Metabolizer), and a list of commonly affected drugs with prescribing implications. Format as a markdown report with a summary table.";
    default:
      return "You are a helpful assistant.";
  }
};

const getPrompt = (analysisType: AnalysisType, fileContentSample: string): string => {
  return `
    Please perform a "${analysisType}" analysis on the following human genome sequence data sample. 
    Provide a detailed, professional-grade report based on your system instruction. 
    If the data seems incomplete or malformed, make reasonable assumptions and note them in your report.

    --- DATA SAMPLE ---
    ${fileContentSample}
    --- END DATA SAMPLE ---
  `;
}

export const runGenomeAnalysis = async (
  fileContent: string,
  analysisType: AnalysisType
): Promise<string> => {
  try {
    // Use a sizable sample, but not the entire file to avoid context length issues.
    // For VCF-like data (mutation/pharmaco), a larger sample might be better.
    const sampleSize = (analysisType === AnalysisType.MUTATION || analysisType === AnalysisType.PHARMACOGENOMICS) ? 30000 : 15000;
    const fileContentSample = fileContent.substring(0, sampleSize);
    
    const systemInstruction = getSystemInstruction(analysisType);
    const prompt = getPrompt(analysisType, fileContentSample);

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.3,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `An error occurred during analysis: ${error.message}`;
    }
    return "An unknown error occurred during analysis.";
  }
};