import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisType, GenomeSample } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash';

const getResponseSchema = (analysisType: AnalysisType): object => {
  switch (analysisType) {
    case AnalysisType.CLASSIFICATION:
      return {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING, description: 'A brief, one-paragraph summary of the classification findings.' },
          ancestry: {
            type: Type.ARRAY,
            description: 'A breakdown of ancestral components.',
            items: {
              type: Type.OBJECT,
              properties: {
                region: { type: Type.STRING, description: 'Geographic or ethnic region.' },
                percentage: { type: Type.NUMBER, description: 'Percentage of ancestry from this region.' },
              },
            },
          },
          haplogroups: {
            type: Type.ARRAY,
            description: 'Identified maternal and paternal haplogroups.',
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING, description: 'Either "Maternal" or "Paternal".' },
                group: { type: Type.STRING, description: 'The haplogroup identifier (e.g., H1, R1b).' },
              },
            },
          },
        },
      };
    case AnalysisType.SEGMENTATION:
       return {
         type: Type.OBJECT,
         properties: {
            summary: { type: Type.STRING, description: "A brief summary of the segmentation." },
            totalLength: { type: Type.NUMBER, description: "The total length of the analyzed sequence segment for visualization scaling, if determinable." },
            segments: {
              type: Type.ARRAY,
              description: 'Key segments identified in the genome.',
              items: {
                type: Type.OBJECT,
                properties: {
                  segmentId: { type: Type.STRING },
                  chromosome: { type: Type.STRING },
                  startPosition: { type: Type.NUMBER },
                  endPosition: { type: Type.NUMBER },
                  type: { type: Type.STRING, description: 'e.g., Gene, Regulatory, Non-coding' },
                  description: { type: Type.STRING },
                },
              },
            },
         },
       };
    case AnalysisType.INTEGRATION:
      return {
        type: Type.OBJECT,
        properties: {
            summary: { type: Type.STRING, description: "A summary of findings regarding viral integration. State clearly if none were found." },
            integrationPoints: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        chromosome: { type: Type.STRING },
                        position: { type: Type.NUMBER },
                        viralSource: { type: Type.STRING, description: "e.g., HPV-16" },
                        confidence: { type: Type.STRING, description: "High, Medium, or Low" },
                    }
                }
            }
        }
      };
    case AnalysisType.MUTATION:
        return {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING, description: "A summary of the mutation analysis." },
                mutations: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.STRING, description: "rsID or other identifier" },
                            gene: { type: Type.STRING },
                            type: { type: Type.STRING, description: "SNP, indel, etc." },
                            clinicalSignificance: { type: Type.STRING, description: "Pathogenic, Benign, VUS, etc." },
                        }
                    }
                }
            }
        };
    case AnalysisType.PHARMACOGENOMICS:
        return {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING, description: "A summary of the pharmacogenomic analysis." },
                variants: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            gene: { type: Type.STRING },
                            variant: { type: Type.STRING, description: "*2, *17, etc." },
                            phenotype: { type: Type.STRING, description: "e.g., Poor Metabolizer" },
                            drugImplications: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        drug: { type: Type.STRING },
                                        implication: { type: Type.STRING },
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
    case AnalysisType.THERAPEUTIC_INSIGHTS:
        return {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING, description: "A summary of potential therapeutic targets found in the genome data." },
                targets: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            gene: { type: Type.STRING, description: "The gene that is a therapeutic target." },
                            associatedConditions: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING },
                                description: "Medical conditions associated with this gene target."
                            },
                            therapeuticApproach: {
                                type: Type.STRING,
                                description: "Description of the therapeutic approach (e.g., Monoclonal antibody target, candidate for gene therapy, target for small molecule inhibitors)."
                            }
                        }
                    }
                }
            }
        };
     case AnalysisType.INTEGRATIVE_ANALYSIS:
        return {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING, description: "A holistic summary connecting the various findings." },
                findings: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            gene: { type: Type.STRING },
                            narrative: { type: Type.STRING, description: "A text description connecting the findings for this gene." },
                            mutation: {
                                type: Type.OBJECT, properties: {
                                    id: { type: Type.STRING },
                                    type: { type: Type.STRING },
                                    clinicalSignificance: { type: Type.STRING },
                                }
                            },
                            pharmacogenomicVariant: {
                                type: Type.OBJECT, properties: {
                                    variant: { type: Type.STRING },
                                    phenotype: { type: Type.STRING },
                                }
                            },
                            therapeuticTarget: {
                                type: Type.OBJECT, properties: {
                                    associatedConditions: { type: Type.ARRAY, items: { type: Type.STRING } },
                                    therapeuticApproach: { type: Type.STRING },
                                }
                            },
                        }
                    }
                }
            }
        };
    case AnalysisType.COMPARATIVE_MUTATION:
        return {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING, description: "A summary of the key differences in mutations between the samples." },
                comparisonResults: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            sampleName: { type: Type.STRING },
                            mutations: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT, properties: {
                                        id: { type: Type.STRING },
                                        gene: { type: Type.STRING },
                                        type: { type: Type.STRING },
                                        clinicalSignificance: { type: Type.STRING },
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
    default:
      return {};
  }
};

const getPrompt = (analysisType: AnalysisType, samples: GenomeSample[]): string => {
  if (analysisType === AnalysisType.COMPARATIVE_MUTATION) {
    const samplesContent = samples.map(s => `--- SAMPLE: ${s.name} ---\n${s.content.substring(0, 15000)}`).join('\n\n');
    return `
      Please perform a "${analysisType}" on the following human genome sequence data samples.
      Analyze each sample individually for significant mutations, then provide a summary comparing the key differences.
      Provide a detailed, professional-grade report based on the requested JSON schema.
      For each sample, list its identified mutations.

      --- DATA SAMPLES ---
      ${samplesContent}
      --- END DATA SAMPLES ---
    `;
  }

  // Handle all single-sample analyses
  const sampleContent = samples[0].content;
  const sampleSize = 30000;
  const fileContentSample = sampleContent.substring(0, sampleSize);

  return `
    Please perform a "${analysisType}" analysis on the following human genome sequence data sample from "${samples[0].name}".
    Provide a detailed, professional-grade report based on the requested JSON schema.
    The summary field should be a human-readable text summary of the findings.
    If the data seems incomplete or malformed, make reasonable assumptions and note them in your summary.

    --- DATA SAMPLE ---
    ${fileContentSample}
    --- END DATA SAMPLE ---
  `;
};

export const runGenomeAnalysis = async (
  samples: GenomeSample[],
  analysisType: AnalysisType
): Promise<{ raw: string; structured: any }> => {
  try {
    if (samples.length === 0) {
        throw new Error("No samples provided for analysis.");
    }
    
    const systemInstruction = "You are a world-class bioinformatics expert specializing in human genetics. Analyze the provided data and return the results in the specified JSON format.";
    const prompt = getPrompt(analysisType, samples);
    const responseSchema = getResponseSchema(analysisType);

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema,
      }
    });

    const rawText = response.text;
    let structuredData = null;
    try {
        structuredData = JSON.parse(rawText);
    } catch (e) {
        console.error("Failed to parse JSON response:", e);
        // Fallback: The raw text might still be useful
    }
    
    // Convert structured data back to a formatted string for the "Raw" view
    const formattedRaw = structuredData ? JSON.stringify(structuredData, null, 2) : rawText;

    return { raw: formattedRaw, structured: structuredData };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        const message = `An error occurred during analysis: ${error.message}`;
        return { raw: message, structured: null };
    }
    const message = "An unknown error occurred during analysis.";
    return { raw: message, structured: null };
  }
};