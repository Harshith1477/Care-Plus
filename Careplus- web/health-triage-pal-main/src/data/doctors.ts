export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  hospital: string;
  goodAt: string;
  image: string;
  category: string;
}

const doctorNames = [
  "Dr. Aisha Patel", "Dr. Rajesh Kumar", "Dr. Sarah Chen", "Dr. Michael Torres",
  "Dr. Priya Sharma", "Dr. James Wilson", "Dr. Fatima Hassan", "Dr. David Park",
  "Dr. Nita Reddy", "Dr. Robert Adams", "Dr. Kavita Singh", "Dr. John Mitchell",
  "Dr. Meera Iyer", "Dr. Carlos Ruiz", "Dr. Deepa Nair", "Dr. William Brown",
  "Dr. Sunita Verma", "Dr. Thomas Lee", "Dr. Ananya Das", "Dr. Steven Clark",
];

const hospitals = [
  "Apollo Hospitals", "Max Healthcare", "Fortis Hospital", "Medanta",
  "AIIMS Delhi", "Kokilaben Hospital", "Narayana Health", "Manipal Hospital",
  "Columbia Asia", "Lilavati Hospital",
];

const avatarSeeds = [
  "doctor1", "doctor2", "doctor3", "doctor4", "doctor5",
  "doctor6", "doctor7", "doctor8", "doctor9", "doctor10",
];

const categoryDoctors: Record<string, { specs: string[]; goodAts: string[] }> = {
  "diabetic-care": {
    specs: ["Endocrinologist", "Diabetologist", "Internal Medicine", "Metabolic Specialist"],
    goodAts: ["Type 2 diabetes management", "Insulin therapy optimization", "Diabetic foot care", "Gestational diabetes", "Blood sugar monitoring", "Lifestyle modification counseling", "Diabetic neuropathy treatment", "HbA1c management", "Pediatric diabetes", "Diabetes prevention programs"],
  },
  "sexual-health": {
    specs: ["Urologist", "Gynecologist", "Andrologist", "Sexual Health Specialist"],
    goodAts: ["STI screening and treatment", "Reproductive health counseling", "Fertility assessment", "Hormonal therapy", "Sexual dysfunction treatment", "Contraception guidance", "Menstrual health", "PCOS management", "Prenatal care planning", "Gender health services"],
  },
  "cardiac-care": {
    specs: ["Cardiologist", "Cardiac Surgeon", "Interventional Cardiologist", "Electrophysiologist"],
    goodAts: ["Coronary artery disease", "Heart failure management", "Arrhythmia treatment", "Angioplasty procedures", "Cardiac rehabilitation", "Hypertension management", "Valve disease treatment", "Preventive cardiology", "Echocardiography", "Pacemaker implantation"],
  },
  "respiratory-care": {
    specs: ["Pulmonologist", "Thoracic Surgeon", "Allergist", "Critical Care Specialist"],
    goodAts: ["Asthma management", "COPD treatment", "Sleep apnea diagnosis", "Lung infection treatment", "Allergy testing", "Bronchoscopy", "Pulmonary rehabilitation", "Tuberculosis treatment", "Interstitial lung disease", "Smoking cessation programs"],
  },
  "oral-care": {
    specs: ["Dentist", "Orthodontist", "Periodontist", "Oral Surgeon"],
    goodAts: ["Root canal treatment", "Teeth whitening", "Braces and aligners", "Gum disease treatment", "Dental implants", "Wisdom tooth extraction", "Cosmetic dentistry", "Pediatric dental care", "TMJ disorder treatment", "Oral cancer screening"],
  },
  "stomach-care": {
    specs: ["Gastroenterologist", "Hepatologist", "GI Surgeon", "Proctologist"],
    goodAts: ["Acid reflux treatment", "IBS management", "Colonoscopy", "Ulcer treatment", "Celiac disease", "Crohn's disease management", "Endoscopy procedures", "Food intolerance testing", "Gallstone treatment", "Digestive health optimization"],
  },
  "liver-care": {
    specs: ["Hepatologist", "Gastroenterologist", "Liver Transplant Surgeon", "Internal Medicine"],
    goodAts: ["Hepatitis treatment", "Fatty liver disease", "Cirrhosis management", "Liver transplant evaluation", "Liver detox programs", "Alcohol-related liver disease", "Liver cancer screening", "Autoimmune liver disease", "Bile duct disorders", "Liver function optimization"],
  },
  "cold-immunity": {
    specs: ["Immunologist", "ENT Specialist", "Internal Medicine", "Allergist"],
    goodAts: ["Chronic cold treatment", "Immunity boosting", "Sinus infection treatment", "Allergy management", "Flu prevention", "Throat infection care", "Ear infection treatment", "Vitamin deficiency", "Autoimmune disorders", "Vaccination guidance"],
  },
  "general-wellness": {
    specs: ["General Physician", "Family Medicine", "Preventive Medicine", "Wellness Consultant"],
    goodAts: ["Annual health checkups", "Lifestyle counseling", "Weight management", "Stress management", "Nutrition guidance", "Chronic disease prevention", "Mental wellness support", "Sleep improvement", "Fitness assessment", "Holistic health planning"],
  },
};

export function getDoctorsByCategory(categoryId: string): Doctor[] {
  const config = categoryDoctors[categoryId];
  if (!config) return [];
  
  return Array.from({ length: 10 }, (_, i) => ({
    id: `${categoryId}-doc-${i}`,
    name: doctorNames[i % doctorNames.length],
    specialization: config.specs[i % config.specs.length],
    experience: 5 + Math.floor(i * 2.3) % 20,
    rating: 3.5 + (i % 4) * 0.4,
    hospital: hospitals[i % hospitals.length],
    goodAt: config.goodAts[i],
    image: `https://api.dicebear.com/9.x/personas/svg?seed=${avatarSeeds[i % avatarSeeds.length]}-${categoryId}`,
    category: categoryId,
  }));
}
