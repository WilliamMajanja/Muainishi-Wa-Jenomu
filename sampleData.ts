import { GenomeSample } from './types';

export const sampleData: GenomeSample[] = [
  {
    name: "Henrietta Lacks (HeLa Genome)",
    description: "A VCF excerpt from the highly aneuploid HeLa cell line, notable for its immortality and widespread use in research. Contains HPV-18 integration.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
8   128747709  rs1050591  T      G,A     .    .      GENEINFO=MYC;NOTE=HeLa_cell_line_variant
18  63123351  .          C      T       .    .      GENEINFO=BCL2;NOTE=Common_HeLa_variant
#NOTE: HeLa genome is known to have integrated Human Papillomavirus 18 (HPV-18).`
  },
  {
    name: "Sickle Cell Anemia (HBB Gene)",
    description: "VCF data showing the specific single-nucleotide polymorphism (SNP) in the HBB gene responsible for causing sickle cell anemia.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
11   5227002   rs334     A      T       .    .      CLNSIG=Pathogenic;GENEINFO=HBB;NOTE=Cause_of_Sickle_Cell_Anemia`
  },
  {
    name: "Ötzi the Iceman (Ancient Genome)",
    description: "An ancient human genome from a 5,300-year-old mummy. This excerpt shows markers for lactose intolerance and high risk for cardiovascular disease.",
    content: `#CHROM POS     ID          REF    ALT     QUAL FILTER INFO
2   136608646  rs4988235   G      A       .    .      GENEINFO=LCT;NOTE=Lactose_intolerance_(ancestral_G_allele)
9   22125503   rs1333049   G      C       .    .      NOTE=Increased_risk_for_coronary_artery_disease`
  },
  {
    name: "Neanderthal Genome (Altai)",
    description: "An excerpt from the Altai Neanderthal genome, showcasing archaic human DNA and genes that may have been passed to modern humans, such as variants related to immunity.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
12   113426145 rs35453836  C      T       .    .      NOTE=Archaic_variant_in_OAS1_gene_from_Neanderthal_introgression`
  },
  {
    name: "Denisovan Genome (EPAS1 Gene)",
    description: "A variant in the EPAS1 gene, found in an archaic Denisovan hominin. This 'super-athlete' gene, which helps with high-altitude adaptation, was later passed to modern Tibetans.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
2   46615881   rs11549465  C      G       .    .      GENEINFO=EPAS1;NOTE=Denisovan-introgressed_variant_associated_with_high-altitude_adaptation`
  },
  {
    name: "Cheddar Man (Ancient Briton)",
    description: "Genome data from a ~10,000-year-old Mesolithic skeleton found in Britain, showing genetic markers for dark skin (SLC45A2) and blue eyes (HERC2).",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
15  28365618  rs16891982  G      C       .    .      GENEINFO=SLC45A2;NOTE=Ancestral_C_allele_associated_with_darker_skin_pigmentation
5   33951221  rs12913832  A      G       .    .      GENEINFO=HERC2;NOTE=Derived_G_allele_associated_with_blue_eyes`
  },
  {
    name: "CRISPR Embryo (CCR5 Δ32)",
    description: "A hypothetical VCF representation of the controversial CCR5 gene edit intended to confer HIV resistance in the 'Lulu and Nana' embryos, sparking global ethical debate.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
3   46370242  .         AG...[32bp]...CT  A      .    .      GENEINFO=CCR5;NOTE=Hypothetical_representation_of_CRISPR-Cas9_induced_32bp_deletion_(delta32)`
  },
  {
    name: "Mitochondrial Eve (L0 lineage)",
    description: "A conceptual FASTA excerpt representing the consensus sequence of mitochondrial DNA from the L0 haplogroup, tracing back to the 'Mitochondrial Eve'.",
    content: `>MT_L0_consensus
GATCACAAGTTATATCCTTCCGACTTAAAATTAACCACTACCCTAGCAAACTCCCTCACTCACT
AATTGCAACTAATGACTAGCTGACTGTCAACCAACAACATACTAATGAACATGACTCAAAACC`
  },
    {
    name: "Y-Chromosomal Adam (A00 lineage)",
    description: "A conceptual sample representing the Y-chromosome A00 haplogroup, tracing back to the most recent common patrilineal ancestor of all living human males.",
    content: `>Y_A00_consensus
# Represents the basal Y-chromosome haplogroup A00, the deepest known branch of the human Y-chromosomal phylogenetic tree.`
  },
  {
    name: "Mota Cave Genome (Ancient African)",
    description: "Data from a 4,500-year-old skeleton from Ethiopia. This was the first complete ancient African genome, providing a pre-agricultural baseline for African genetics.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
12  112241766  rs7977623   A      G       .    .      GENEINFO=SLC24A5;NOTE=Ancestral_G_allele_associated_with_darker_skin_pigmentation`
  },
  {
    name: "Hadza Hunter-Gatherer Genome",
    description: "A genome from the Hadza people of Tanzania, one of the world's last remaining hunter-gatherer populations. Their unique genetics, shaped by a foraging lifestyle, offer a rare window into ancient human adaptations.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
19  49168478  rs601338    G      A       .    .      GENEINFO=FUT2;NOTE=Ancestral_G_allele_(secretor_status)_common_in_hunter-gatherer_populations`
  },
  {
    name: "Ethiopian Highlander (Amhara)",
    description: "This sample from the Amhara people highlights the unique genetic adaptations to high-altitude living in the Ethiopian Highlands. These adaptations, like variants in the EGLN1 gene, evolved independently from those in Tibetan or Andean populations.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
1   223631980  rs11549467  G      C       .    .      GENEINFO=EGLN1;NOTE=Variant_associated_with_high-altitude_adaptation_in_Ethiopian_populations`
  },
  {
    name: "Sandawe Click-Speaker Genome",
    description: "Representing the Sandawe people of Tanzania, who speak a click language similar to the Khoisan. Their genome showcases one of the oldest genetic lineages, with deep ancestral connections to the Khoisan peoples of Southern Africa.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
# NOTE: Mitochondrial DNA often belongs to haplogroup L4, one of the most ancient and deeply-rooted maternal lineages in Africa.`
  },
  {
    name: "Khoisan Hunter-Gatherer (San)",
    description: "Genome from a San individual, representing one of the oldest human lineages. The Khoisan are known for unique genetic adaptations to their environment and their distinct click languages.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
# NOTE: Mitochondrial DNA often belongs to haplogroup L0d, one of the most ancient maternal lineages, reflecting a deep ancestral history.`
  },
  {
    name: "Bantu Genome (Luhya, Kenya)",
    description: "A sample from the Luhya people in Kenya, part of the vast Bantu-speaking populations. Represents the genetic legacy of the Bantu expansion, a major migration event that shaped sub-Saharan Africa.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
X   154288009  rs1050828   A      G       .    .      GENEINFO=G6PD;NOTE=G6PD-deficient_variant_common_in_Bantu_populations_conferring_malaria_resistance`
  },
  {
    name: "Ancient Egyptian Mummy",
    description: "Genomic data from a ~2,500-year-old mummy from the Abusir el-Meleq site in Egypt. Studies on these mummies revealed closer genetic ties to ancient Near Eastern populations than modern Egyptians.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
# NOTE: Y-chromosome haplogroup J1, common in the ancient Near East, found in this individual, highlighting connections between the Nile Valley and the Levant.`
  },
  {
    name: "APOE4 Variant (Alzheimer's Risk)",
    description: "The APOE ε4 allele is the strongest and most common genetic risk factor for late-onset Alzheimer's disease. This VCF shows the key SNP defining the ε4 variant.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
19  45411941  rs429358    T      C       .    .      GENEINFO=APOE;NOTE=Key_SNP_for_APOE4_allele_linked_to_increased_Alzheimer's_risk`
  },
  {
    name: "Yoruba Individual (1000 Genomes)",
    description: "A sample representing the Yoruba people of Ibadan, Nigeria (YRI), one of the most well-studied populations in human genetics, key to understanding human diversity.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
1   201994982  rs1800414   A      G       .    .      GENEINFO=DARC;NOTE=FY*O_allele_common_in_YRI_population_confers_malaria_resistance`
  },
  {
    name: "MC1R Gene ('Red Hair' Gene)",
    description: "Highlights common variants in the MC1R gene, which reduce its function and are strongly associated with red hair, fair skin, and an increased risk of skin cancer.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
16  89985956  rs1805007   C      T       .    .      GENEINFO=MC1R;NOTE=R151C_variant_common_in_redheads
16  89986408  rs1805008   C      T       .    .      GENEINFO=MC1R;NOTE=R160W_variant_common_in_redheads`
  },
  {
    name: "HFE Gene (Hemochromatosis)",
    description: "Shows the C282Y mutation in the HFE gene, the most common cause of hereditary hemochromatosis, a disorder that causes the body to absorb too much iron.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
6   26093141  rs1800562   G      A       .    .      CLNSIG=Pathogenic;GENEINFO=HFE;NOTE=C282Y_mutation`
  },
  {
    name: "Ashkenazi Founder Mutation (BRCA1)",
    description: "The 185delAG mutation in the BRCA1 gene, a specific founder mutation more common in Ashkenazi Jewish populations, significantly increasing hereditary breast and ovarian cancer risk.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
17   43125357  rs80357713  AG     A       .    .      CLNSIG=Pathogenic;GENEINFO=BRCA1;NOTE=185delAG_founder_mutation`
  },
  {
    name: "Cystic Fibrosis (CFTR Gene)",
    description: "Shows the F508del mutation in the CFTR gene, the most common cause of cystic fibrosis and a primary target for modern modulator therapies.",
    content: `#CHROM POS     ID          REF    ALT     QUAL FILTER INFO
7   117559590  rs113993960 CTT    C       .    .      CLNSIG=Pathogenic;GENEINFO=CFTR;NOTE=F508del_mutation`
  },
  {
    name: "Huntington's Disease (HTT Gene)",
    description: "Represents a pathogenic expansion of CAG repeats in the Huntingtin (HTT) gene. Over 40 repeats, as shown here, is fully penetrant for Huntington's disease.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
4   3076606   .         CAG    <CAG-expansion> .    .      GENEINFO=HTT;NOTE=Pathogenic_expansion;CAG_REPEAT_COUNT=45`
  },
  {
    name: "Prion Disease (PRNP Gene)",
    description: "A pathogenic mutation (E200K) in the PRNP gene, which is associated with familial Creutzfeldt-Jakob disease, a fatal neurodegenerative disorder caused by prions.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
20   4699605   rs28933389  G      A       .    .      CLNSIG=Pathogenic;GENEINFO=PRNP;NOTE=E200K_mutation_for_familial_CJD`
  },
  {
    name: "P53 (Tumor Suppressor Gene)",
    description: "Shows a common point mutation in the TP53 gene, a critical tumor suppressor. Mutations in this gene are found in over 50% of human cancers.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
17   7674220   rs28934571  C      T       .    .      CLNSIG=Pathogenic;GENEINFO=TP53;NOTE=R248Q_missense_mutation`
  },
  {
    name: "FOXP2 Gene ('Language Gene')",
    description: "Highlights two key amino acid changes in the FOXP2 gene that are specific to humans and thought to be crucial for the development of speech and language.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
7   114841652  rs2364583   C      T       .    .      GENEINFO=FOXP2;NOTE=Human-specific_variant_implicated_in_language
7   114842709  rs2253375   A      G       .    .      GENEINFO=FOXP2;NOTE=Human-specific_variant_implicated_in_language`
  },
    {
    name: "Lactose Persistence (European)",
    description: "Shows the common European variant (rs4988235) in the LCT gene that allows lactase production to persist into adulthood. This contrasts with ancient genomes like Ötzi the Iceman.",
    content: `#CHROM POS     ID          REF    ALT     QUAL FILTER INFO
2   136608646  rs4988235   G      A       .    .      GENEINFO=LCT;NOTE=Presence_of_A_allele_confers_lactose_persistence`
  },
  {
    name: "ALU Sequence (Jumping Gene)",
    description: "A representative FASTA sequence of an Alu element, a type of 'jumping gene' or retrotransposon that makes up over 10% of the human genome.",
    content: `>AluY_consensus
GGCCGGGCGCGGTGGCTCACGCCTGTAATCCCAGCACTTTGGGAGGCCGAGGCGGGCGGATCAC
GAGGTCAGGAGATCGAGACCATCCTGGCTAACACGGTGAAACCCCGTCTCTACTAAAAATACAA
AAAATTAGCCGGGCGTGGTGGCGGGCGCCTGTAGTCCCAGCTACTCGGGAGGCTGAGGCAGGAG
AATCGCTTGAACCCGGGAGGCGGAGGTTGCAGTGAGCCGAGATTGCGCCACTGCACTCCAGCCT
GGGCGACAGAGCGAGACTCCGTCTCAAAAA`
  },
  {
    name: "Congo 105 Genome (Hunter-Gatherer)",
    description: "An ancient genome from a ~8,000-year-old Central African hunter-gatherer. This sample provides a deep look into the genetic diversity of pre-agricultural African populations.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
1   154774326  rs73885319  G      A       .    .      GENEINFO=APOL1;NOTE=Ancestral_G1_allele_common_in_ancient_African_populations`
  },
  {
    name: "Anzick-1 Child (Clovis Era)",
    description: "The ~12,600-year-old genome of an infant from the Clovis culture in Montana. This genome is directly ancestral to many modern Native American populations, settling debates on early American migration.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
# NOTE: Mitochondrial DNA belongs to haplogroup D4h3a, a founding lineage of Native Americans.
# NOTE: Y-chromosome belongs to haplogroup Q-L54, common in Native Americans.`
  },
  {
    name: "Mal'ta Boy (Ancient Siberian)",
    description: "A 24,000-year-old Upper Paleolithic genome from a boy found in south-central Siberia. This individual belongs to a group known as Ancient North Siberians, who contributed significant ancestry to both Western Eurasians and Native Americans.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
# NOTE: Y-chromosome belongs to the basal haplogroup R*, ancestral to many modern West Eurasian lineages.
# NOTE: Mitochondrial DNA belongs to haplogroup U, also common in ancient and modern Eurasia.`
  },
  {
    name: "La Braña 1 (Mesolithic Spaniard)",
    description: "A 7,000-year-old Mesolithic hunter-gatherer from Spain. This individual's genome revealed that early Europeans had a combination of dark skin and blue eyes, changing our understanding of European ancestry.",
    content: `#CHROM POS     ID          REF    ALT     QUAL FILTER INFO
15  28365618  rs16891982  G      C       .    .      GENEINFO=SLC45A2;NOTE=Ancestral_C_allele_associated_with_darker_skin_pigmentation
5   33951221  rs12913832  A      G       .    .      GENEINFO=HERC2;NOTE=Derived_G_allele_associated_with_blue_eyes`
  },
  {
    name: "Kennewick Man (The Ancient One)",
    description: "The 9,000-year-old genome from a Paleoamerican man found in Washington, USA. After lengthy controversy, genomic analysis confirmed his direct ancestral relationship to modern Native American tribes.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
# NOTE: Mitochondrial DNA belongs to haplogroup X2a, a lineage found almost exclusively in Native Americans of the Americas.`
  },
  {
    name: "Ust'-Ishim man (Ancient Siberian)",
    description: "A 45,000-year-old anatomically modern human femur from Siberia. At the time of discovery, it was the oldest modern human genome ever sequenced, providing a direct look at the genetics of early human migrations out of Africa.",
    content: `#CHROM POS     ID        REF    ALT     QUAL FILTER INFO
# NOTE: Carries a Y-chromosome haplogroup K(xLT), a very old basal lineage.
# NOTE: Genome analysis indicates a Neanderthal admixture event occurred 230-430 generations prior.`
  },
];