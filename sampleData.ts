import { GenomeSample } from './types';

export const sampleData: GenomeSample[] = [
  {
    name: "Sample: Healthy Human Genome (Chr 1 Excerpt)",
    description: "A standard excerpt from Chromosome 1, used as a healthy baseline.",
    content: `>sample_chr1_healthy
AGCTTGCATGCAGTCGACGTACGATGCAGTCGACATGCTAGCATGCATGCATGCATGCATGCAT
GCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCAT
...
GATTACAGATTACAGATTACAGATTACAGATTACAGATTACAGATTACAGATTACAGATTACAG
`
  },
  {
    name: "Sample: BRCA1 Mutation Carrier (VCF Excerpt)",
    description: "A VCF-formatted excerpt showing a known pathogenic mutation in the BRCA1 gene.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
17   43093038  rs80357906  G      A       .    .      CLNSIG=Pathogenic;GENEINFO=BRCA1
17   43093040  .           T      C       .    .      CLNSIG=Uncertain;GENEINFO=BRCA1
`
  },
  {
    name: "Sample: Viral Integration Example",
    description: "A sequence showing a hypothetical integration of HPV DNA into a human chromosome.",
    content: `>human_chr13_excerpt_with_hpv
...GATTACAGATTACAGATTACA...[human_sequence]
...ACGTACGTACGTACGTACGT...[viral_sequence_start_hpv16_e6]
...TCAGTCAGTCAGTCAGTCAG...[viral_sequence_end_hpv16_e7]
...GATTACAGATTACAGATTACA...[human_sequence_resumes]`
  }
];
