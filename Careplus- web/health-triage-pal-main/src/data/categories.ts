import { Heart, Shield, Stethoscope, Wind, Smile, Apple, Droplets, Snowflake, Activity } from "lucide-react";

export const categories = [
  { id: "diabetic-care", name: "Diabetic Care", icon: Droplets, color: "healthcare-blue", description: "Blood sugar management and diabetic wellness" },
  { id: "sexual-health", name: "Sexual Health Care", icon: Heart, color: "healthcare-red", description: "Sexual wellness and reproductive health" },
  { id: "cardiac-care", name: "Cardiac Care", icon: Activity, color: "healthcare-red", description: "Heart health and cardiovascular wellness" },
  { id: "respiratory-care", name: "Respiratory Care", icon: Wind, color: "healthcare-teal", description: "Breathing and lung health management" },
  { id: "oral-care", name: "Oral Care", icon: Smile, color: "healthcare-orange", description: "Dental and oral hygiene solutions" },
  { id: "stomach-care", name: "Stomach Care", icon: Apple, color: "healthcare-green", description: "Digestive health and gut wellness" },
  { id: "liver-care", name: "Liver Care", icon: Shield, color: "healthcare-purple", description: "Liver health and detox support" },
  { id: "cold-immunity", name: "Cold & Immunity", icon: Snowflake, color: "healthcare-blue", description: "Immune boosting and cold relief" },
  { id: "general-wellness", name: "General Wellness", icon: Stethoscope, color: "healthcare-teal", description: "Overall health and preventive care" },
];
