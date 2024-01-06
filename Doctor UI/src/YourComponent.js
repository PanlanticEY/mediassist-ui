import React, { useEffect, useState } from 'react';

const YourComponent = ({ data }) => {
    const [matchedDiseases, setMatchedDiseases] = useState([]);

    useEffect(() => {
        // Check if data is available
        if (data) {
            const keywords =[
                'Flu', 'Common Cold', 'Gastroenteritis', 'Migraine', 'Pneumonia', 'Bronchitis', 'Asthma',
                'Diabetes', 'Hypertension', 'Arthritis', 'Osteoporosis', 'Alzheimer\'s Disease',
                'Parkinson\'s Disease', 'Cancer', 'HIV/AIDS', 'Stroke', 'Heart Attack', 'Kidney Stones',
                'Lung Cancer', 'Breast Cancer', 'Prostate Cancer', 'Leukemia', 'Hepatitis', 'Malaria',
                 'Cholera', 'Tuberculosis', 'Ebola', 'Zika Virus', 'COVID-19', 'Chickenpox',
                'Measles', 'Rubella', 'Mumps', 'Whooping Cough', 'Hepatitis B', 'Hepatitis C', 'Influenza',
                'Rheumatoid Arthritis', 'Epilepsy', 'Multiple Sclerosis', 'Psoriasis', 'Celiac Disease',
                'Ulcerative Colitis', 'Crohn\'s Disease', 'Lupus', 'Fibromyalgia', 'Chronic Fatigue Syndrome',
                'Sleep Apnea', 'Anemia', 'Gout', 'Osteoarthritis', 'Acne', 'Eczema', 'Psoriatic Arthritis',
                'Endometriosis', 'Polycystic Ovary Syndrome (PCOS)', 'Atrial Fibrillation', 'Cirrhosis',
                'Gallstones', 'Pancreatitis', 'Appendicitis', 'Gastritis', 'Diverticulitis', 'Cataracts',
                'Glaucoma', 'Macular Degeneration', 'Osteoporosis', 'Hemorrhoids', 'Varicose Veins',
                'Achilles Tendonitis', 'Tennis Elbow', 'Plantar Fasciitis', 'Migraine', 'Cluster Headaches',
                'Concussion', 'OCD (Obsessive-Compulsive Disorder)', 'PTSD (Post-Traumatic Stress Disorder)',
                'Bipolar Disorder', 'Schizophrenia', 'Anorexia Nervosa', 'Bulimia Nervosa', 'Insomnia',
                'Narcolepsy', 'Restless Legs Syndrome', 'Scoliosis', 'Herniated Disc', 'Sciatica', 'Tinnitus',
                'Menopause', 'Andropause', 'Hypothyroidism', 'Hyperthyroidism', 'Type 1 Diabetes',
                'Type 2 Diabetes', 'Gestational Diabetes', 'Alcoholism', 'Drug Addiction', 'Nicotine Addiction',
                'Gambling Addiction', 'Sexual Addiction', 'Depression', 'Anxiety', 'Panic Disorder', 'Phobias',
                'Postpartum Depression', 'Seasonal Affective Disorder (SAD)', 'Autism Spectrum Disorder (ASD)',
                'ADHD (Attention-Deficit/Hyperactivity Disorder)', 'Dyslexia', 'Dyspraxia', 'Down Syndrome',
                'Cerebral Palsy', 'Fetal Alcohol Syndrome (FAS)', 'Tourette Syndrome', 'Eating Disorders',
                'Sleep Disorders', 'Personality Disorders', 'Developmental Disorders','Dengue Fever', 'Typhoid Fever', 'Sinusitis',
                'Tension headache', 'Obesity', 'Osteomyelitis', 'Peptic Ulcer', 'Gastroesophageal Reflux Disease (GERD)', 'Hemochromatosis',
                 'Huntington\'s Disease', 'Hyperlipidemia', 'Hypoglycemia', 'Irritable Bowel Syndrome (IBS)', 'Jaundice', 'Lactose Intolerance',
                  'Melanoma', 'Myocardial Infarction', 'Narcolepsy', 'Nephrolithiasis', 'Otitis Media', 'Pancreatic Cancer', 
                  'Pelvic Inflammatory Disease (PID)', 'Polycythemia Vera', 'Prostatitis', 'Pulmonary Embolism', 'Retinoblastoma',
                   'Sarcoidosis', 'Sepsis', 'Septic Arthritis', 'Shingles (Herpes Zoster)', 'Sickle Cell Disease', 'Spinal Stenosis', 
                   'Temporomandibular Joint Disorder (TMJ)', 'Testicular Cancer', 'Thalassemia', 'Thoracic Outlet Syndrome', 'Tonsillitis', 
                   'Toxoplasmosis', 'Trichomoniasis', 'Ulcerative Colitis', 'Urethritis', 'Urolithiasis', 'Uterine Fibroids', 'Vaginitis', 
                   'Vasculitis', 'Vitiligo', 'Vulvodynia', 'Wilson\'s Disease', 'Yellow Fever', 'Zollinger-Ellison Syndrome', 'Acromegaly',
                    'Adenomyosis', 'Asbestosis', 'Behcet\'s Disease', 'Bursitis', 'Chlamydia', 'Coeliac Disease', 'Cystic Fibrosis', 'Dermatitis',
                     'Dermatofibroma', 'Diverticulosis', 'Endocarditis', 'Fibromyalgia', 'Gastroparesis', 'Graves\' Disease', 
                     'Guillain-Barre Syndrome', 'Hantavirus Pulmonary Syndrome', 'Hirschsprung\'s Disease', 'Huntington\'s Disease',
                      'Hydrocephalus', 'Interstitial Cystitis', 'Kawasaki Disease', 'Lichen Planus', 'Lipoma', 'Lymphedema', 'Marfan Syndrome', 
                      'Meningitis', 'Myasthenia Gravis', 'Osteomalacia', 'Paget\'s Disease of Bone', 'Porphyria', 'Prader-Willi Syndrome',
                       'Reactive Arthritis', 'Reye\'s Syndrome', 'Rickets', 'Sjogren\'s Syndrome', 'Strep Throat', 'Turner Syndrome',
                        'Wegener\'s Granulomatosis', 'Wilms Tumor', 'Xeroderma Pigmentosum'
            ];
;
            const matched = keywords.filter(keyword =>
                data.toLowerCase().includes(keyword.toLowerCase())
            );
            setMatchedDiseases(matched);
        }
    }, [data]);

    return (
        <div>
            {/* Display the dynamically passed paragraph */}
            <ul style={{ listStyleType: 'none' }}>
                {matchedDiseases.slice(0, 5).map((disease, index) => {
                    const colorIntensity = index * 30; // Adjust the color intensity based on the index
                    const color = `rgb(255, ${100 + colorIntensity}, ${0+ colorIntensity})`; // Create an RGB color string

                    return (
                        <li
                            key={index}
                            style={{
                                fontWeight:'bold',
                                fontSize: `${45 - index * 8}px`,
                                color,
                                animation: 'breathing 3s infinite', // Apply the breathing animation
                            }}
                        >
                            {disease}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default YourComponent;
