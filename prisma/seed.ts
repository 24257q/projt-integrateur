
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
  const faqs = [
    // --- FRENCH ---
    {
      question: "Qu'est-ce que SupNum ?",
      answer: "L’Institut Supérieur du Numérique (SupNum) est un établissement public relevant du Ministère de l’Enseignement Supérieur, créé par le décret n°2021-208. Sa mission est de former des cadres moyens et supérieurs dans les métiers du numérique.",
      category: "Présentation",
      language: "fr"
    },
    {
      question: "Quelle est la vision et quels sont les objectifs de SupNum ?",
      answer: "SupNum développe des formations professionnalisantes inspirées du Bachelor Engineering, orientées vers les besoins du marché du travail et basées sur les compétences pratiques.",
      category: "Vision",
      language: "fr"
    },
    {
      question: "Quelle est l'ingénierie pédagogique de SupNum ?",
      answer: "Pédagogie active : 26% cours magistraux, 74% TD/TP/ateliers/projets. Total de 1920h de formation dont 1620h de projets et 28 semaines de stages.",
      category: "Pédagogie",
      language: "fr"
    },
    {
      question: "Quelles sont les conditions d'admission à SupNum ?",
      answer: "Le candidat doit appartenir à la série C ou D du baccalauréat et avoir une moyenne supérieure ou égale au seuil fixé par le Ministère. La sélection se fait via la plateforme nationale.",
      category: "Admission",
      language: "fr"
    },
    {
      question: "Quels sont les frais de scolarité à SupNum ?",
      answer: "SupNum est gratuit. Aucun frais de formation ou d’inscription n’est demandé.",
      category: "Frais",
      language: "fr"
    },
    {
      question: "Quels sont les documents requis pour l'inscription ?",
      answer: "Relevé de notes du bac, deux photos d’identité, copie de la CNI, copie légalisée du bac et formulaire d’inscription.",
      category: "Documents",
      language: "fr"
    },
    {
      question: "Est-ce qu'il y a des bourses à SupNum ?",
      answer: "Des bourses sont attribuées aux meilleurs étudiants à travers le Ministère de l’Enseignement Supérieur.",
      category: "Bourses",
      language: "fr"
    },
    {
      question: "Est-ce que SupNum propose un logement universitaire ?",
      answer: "Un logement est disponible via l’Université Centrale (accès par tirage au sort), mais il n’est pas directement géré par SupNum.",
      category: "Logement",
      language: "fr"
    },
    {
      question: "Quelle est la période d'inscription ?",
      answer: "Les inscriptions commencent généralement au mois d'octobre.",
      category: "Inscription",
      language: "fr"
    },
    {
      question: "Comment sont gérées les absences à SupNum ?",
      answer: "L’absence affecte directement la moyenne, surtout en TP, car les TP interviennent dans la NCC (note de contrôle continu).",
      category: "Règlement",
      language: "fr"
    },
    {
      question: "Quelles sont les filières disponibles à SupNum ?",
      answer: "DSI (Développement des Systèmes d’Information), RSS (Réseaux, Systèmes et Sécurité), et DWM (Développement Web et Multimédia).",
      category: "Filières",
      language: "fr"
    },
    {
      question: "Quels sont les partenariats internationaux de l'institut ?",
      answer: "SupNum dispose de partenariats en France, Tunisie et avec d'autres structures internationales pour faciliter les stages et l'insertion professionnelle.",
      category: "Partenariats",
      language: "fr"
    },
    {
      question: "Quel est le programme académique ?",
      answer: "Plus de 120 modules sur 6 semestres couvrant : programmation (C++, Python, Java), réseaux, sécurité, IA, Big Data, Cloud, infographie et multimédia.",
      category: "Programme",
      language: "fr"
    },
    {
      question: "Combien de temps durent les stages ?",
      answer: "Total de 28 semaines : Stage du S4 (2 mois) et Stage du S6 (4 mois). Ils sont obligatoires pour l'obtention du diplôme.",
      category: "Stages",
      language: "fr"
    },
    {
      question: "Quel est le système d'évaluation ?",
      answer: "Note matière = NCC × 0,4 + NSN × 0,6. Moyenne matière ≥ 6, moyenne module ≥ 10. Moyenne générale ≥ 10 pour valider l’année.",
      category: "Evaluation",
      language: "fr"
    },
    {
      question: "Quelles sont les activités de la vie étudiante ?",
      answer: "Coding Challenge, Hackathons, SupNum Startup Selection (3S), clubs de programmation/multimédia et équipe de football.",
      category: "Vie étudiante",
      language: "fr"
    },
    {
      question: "Est-ce qu'il y a des formations courtes ?",
      answer: "Oui : Fibre optique, Développement web, Multimédia et design, Cybersécurité.",
      category: "Formations courtes",
      language: "fr"
    },
    {
      question: "Comment contacter SupNum ?",
      answer: "Adresse: Tevragh-Zeina, Nouakchott. Tél: +222 45 24 45 44. Email: contact@supnum.mr. Site: supnum.mr",
      category: "Contact",
      language: "fr"
    },
    {
      question: "Quelles certifications peut-on obtenir à SupNum ?",
      answer: "Les étudiants peuvent préparer des certifications reconnues internationalement comme Cisco CCNA, Huawei HCIA, et diverses certifications Microsoft et Linux (LPI).",
      category: "Certification",
      language: "fr"
    },
    {
      question: "Est-ce qu'il y a des programmes de Master à SupNum ?",
      answer: "Oui, SupNum propose des Masters spécialisés en Cybersécurité, Big Data & IA, et Management des Systèmes d'Information.",
      category: "Formation",
      language: "fr"
    },
    {
      question: "Quelles sont les infrastructures technologiques du campus ?",
      answer: "Le campus dispose de laboratoires de pointe, d'une salle de serveurs dédiée pour les TP de réseaux, d'un espace de coworking et d'une connexion internet haut débit.",
      category: "Infrastructure",
      language: "fr"
    },
    {
      question: "Quels sont les horaires d'ouverture de l'institut ?",
      answer: "L'administration est ouverte du lundi au jeudi de 8h00 à 17h00, et le vendredi de 8h00 à 12h00. Les cours peuvent s'étendre jusqu'à 18h00.",
      category: "Infos Pratiques",
      language: "fr"
    },
    {
      question: "SupNum propose-t-il des formations à distance ?",
      answer: "Certains modules sont hybrides (mixte présentiel et distanciel), mais la majorité de la formation technique nécessite une présence physique pour les travaux pratiques.",
      category: "Modalité",
      language: "fr"
    },
    {
      question: "Y a-t-il un réseau d'anciens élèves (Alumni) ?",
      answer: "Oui, l'association des anciens élèves de SupNum aide les nouveaux diplômés à s'insérer dans le marché du travail via du mentorat et des offres d'emploi exclusives.",
      category: "Carrière",
      language: "fr"
    },
    {
      question: "Quels sont les clubs étudiants les plus actifs ?",
      answer: "Le club de Robotique, le club de Cybersécurité (CTF), et le club de Design Multimédia sont très dynamiques et organisent régulièrement des événements.",
      category: "Vie étudiante",
      language: "fr"
    },

    // --- ARABIC ---
    {
      question: "ما هو المعهد العالي للرقمنة (SupNum)؟",
      answer: "المعهد العالي للرقمنة (SupNum) هو مؤسسة عمومية تتبع لوزارة التعليم العالي والبحث العلمي، تم إنشاؤه بمرسوم رقم 2021-208. يهدف إلى تكوين مهندسين وتقنيين متخصصين في الرقمنة.",
      category: "التعريف",
      language: "ar"
    },
    {
      question: "ما هي الشهادات الدولية التي يمكن الحصول عليها؟",
      answer: "يمكن للطلاب التحضير لشهادات معترف بها دوليًا مثل Cisco CCNA و Huawei HCIA وشهادات Microsoft و Linux المختلفة.",
      category: "الشهادات",
      language: "ar"
    },
    {
      question: "هل يوفر المعهد برامج ماستر؟",
      answer: "نعم، يقدم المعهد برامج ماستر متخصصة في الأمن السيبراني (Cybersécurité) والبيانات الضخمة والذكاء الاصطناعي (Big Data & IA).",
      category: "التكوين",
      language: "ar"
    },
    {
      question: "ما هي البنية التحتية التكنولوجية للمعهد؟",
      answer: "يضم المعهد مختبرات متطورة، غرفة خوادم مخصصة للتطبيقات العملية، مساحات عمل مشتركة، واتصال إنترنت عالي السرعة.",
      category: "البنية التحتية",
      language: "ar"
    },
    {
      question: "ما هي أوقات الدوام الرسمي؟",
      answer: "تفتح الإدارة من الاثنين إلى الخميس من الساعة 8:00 صباحًا حتى 5:00 مساءً، والجمعة من 8:00 صباحًا حتى 12:00 ظهرًا.",
      category: "معلومات",
      language: "ar"
    },
    {
      question: "هل يوجد تكوين عن بعد؟",
      answer: "بعض المواد تُدرس بنظام هجين، لكن التكوين التقني يتطلب حضوراً شخصياً للأعمال التطبيقية (TP).",
      category: "التعليم",
      language: "ar"
    },
    {
      question: "هل توجد جمعية للخريجين؟",
      answer: "نعم، تساعد جمعية خريجي SupNum الخريجين الجدد في الاندماج في سوق العمل من خلال التوجيه وفرص العمل الحصرية.",
      category: "المسار المهني",
      language: "ar"
    },
    {
      question: "ما هي الأندية الطلابية الأكثر نشاطاً؟",
      answer: "نادي الروبوتات، نادي الأمن السيبراني، ونادي التصميم الجرافيكي هي من أكثر الأندية نشاطاً في المعهد.",
      category: "الحياة الطلابية",
      language: "ar"
    },
    {
      question: "ما هي رؤية وأهداف المعهد؟",
      answer: "يهدف المعهد إلى تطوير تكوينات مهنية وعملية مستوحاة من نظام Bachelor Engineering، مع التركيز على دمج الطالب في سوق العمل عبر مشاريع وتدريب ميداني.",
      category: "الرؤية",
      language: "ar"
    },
    {
      question: "ما هي الهندسة البيداغوجية في المعهد؟",
      answer: "يعتمد التعليم النشط : 26% دروس نظرية و 74% أعمال موجهة (TD/TP) ومشاريع. مجموع 1920 ساعة تكوين تشمل 1620 ساعة مشاريع و 28 أسبوع تدريب مهني.",
      category: "البيدغوجيا",
      language: "ar"
    },
    {
      question: "ما هي شروط القبول الرسمية؟",
      answer: "يجب أن يكون الطالب من شعبة C أو D، وبمعدل بكالوريا أعلى أو يساوي المعدل مطلوب من الوزارة. القبول يتم عبر منصة الوزارة.",
      category: "القبول",
      language: "ar"
    },
    {
      question: "ما هي الرسوم الدراسية في المعهد؟",
      answer: "التكوين في المعهد مجاني تماماً لأنه تابع للدولة، ولا توجد أي رسوم تسجيل.",
      category: "الرسوم",
      language: "ar"
    },
    {
      question: "ما هي الوثائق المطلوبة للتسجيل؟",
      answer: "كشف درجات الباكالوريا، صورتان شمسيتان، نسخة من بطاقة التعريف، نسخة مصدقة من شهادة الباك، واستمارة التسجيل.",
      category: "الوثائق",
      language: "ar"
    },
    {
      question: "هل توجد منح دراسية؟",
      answer: "نعم، توجد منح للمتفوقين الأوائل تُمنح من خلال وزارة التعليم العالي.",
      category: "المنح",
      language: "ar"
    },
    {
      question: "هل يوفر المعهد سكناً جامعياً؟",
      answer: "السكن الجامعي توفره الجامعة الكبرى عبر نظام القرعة سنوياً، وهو غير تابع مباشرة لإدارة المعهد.",
      category: "السكن",
      language: "ar"
    },
    {
      question: "متى تبدأ مواعيد التسجيل؟",
      answer: "يبدأ التسجيل عادة في شهر أكتوبر من كل سنة دراسية.",
      category: "التسجيل",
      language: "ar"
    },
    {
      question: "ما هو نظام الغياب في المعهد؟",
      answer: "الغياب يؤثر مباشرة على معدل الطالب، خاصة في أعمال التطبيقية (TP) لأنها تدخل في حساب NCC.",
      category: "النظام",
      language: "ar"
    },
    {
      question: "ما هي التخصصات المتوفرة؟",
      answer: "DSI (تطوير نظم المعلومات)، RSS (الشبكات والأنظمة والأمن)، و DWM (تطوير الويب والميديا).",
      category: "التخصصات",
      language: "ar"
    },
    {
      question: "ما هي الشراكات الدولية للمعهد؟",
      answer: "للمعهد شراكات مع مؤسسات في فرنسا وتونس وغيرها لتسهيل التدريب والتوظيف وتطوير المشاريع.",
      category: "الشراكات",
      language: "ar"
    },
    {
      question: "ما هي المقررات الدراسية؟",
      answer: "تشمل أكثر من 120 مادة (برمجة Python/Java/C++، ذكاء اصطناعي، أمن، شبكات، ميديا) موزعة على 6 سداسيات.",
      category: "المواد",
      language: "ar"
    },
    {
      question: "ما هي مدة التدريب المهني؟",
      answer: "مجموع 28 أسبوعاً: تدريب شهرين في السداسي الرابع و 4 أشهر في السداسي السادس. التدريب إلزامي للتخرج.",
      category: "التدريب",
      language: "ar"
    },
    {
      question: "كيف يتم تقييم الطلاب؟",
      answer: "معدل المادة = NCC × 0.4 + NSN × 0.6. يتطلب النجاح معدلاً عاماً لا يقل عن 10/20.",
      category: "التقييم",
      language: "ar"
    },
    {
      question: "ما هي الأنشطة الطلابية المتاحة؟",
      answer: "مسابقات البرمجة (Coding Challenge)، هاكاثونات دولية، برنامج 3S للشركات الناشئة، نوادي برمجة وتصميم، وفريق كرة قدم.",
      category: "الأنشطة",
      language: "ar"
    },
    {
      question: "هل توجد تكوينات قصيرة؟",
      answer: "نعم: الألياف البصرية، تطوير الويب، التصميم والميديا، والأمن المعلوماتي.",
      category: "تكوينات قصيرة",
      language: "ar"
    },
    {
      question: "كيف يمكنني التواصل مع المعهد؟",
      answer: "العنوان: تفرغ زينه – نواكشوط. الهاتف: +222 45 24 45 44. البريد: contact@supnum.mr. الموقع: supnum.mr",
      category: "التواصل",
      language: "ar"
    }
  ]

  console.log('Clearing old data...')
  await prisma.fAQ.deleteMany({})

  console.log(`Seeding ${faqs.length} FAQs...`)
  for (const faq of faqs) {
    await prisma.fAQ.create({
      data: faq,
    })
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
