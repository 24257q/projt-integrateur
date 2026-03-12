import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function main() {
  const text = fs.readFileSync('ar-faqs.txt', 'utf8')
  const lines = text.split('\n');
  let currentQuestion = '';
  let currentAnswer = '';
  let count = 0;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    // Support Arabic and Western digits for numbering
    if (/^[\d١-٩٠-٩]+\./.test(trimmed)) {
      if (currentQuestion && currentAnswer) {
        await prisma.fAQ.create({
          data: {
            question: currentQuestion,
            answer: currentAnswer.trim(),
            category: 'Général',
            language: 'ar'
          }
        });
        count++;
      }
      
      currentQuestion = trimmed.replace(/^[\d١-٩٠-٩]+\.\s*/, '').trim();
      currentAnswer = '';
    } else {
      currentAnswer += (currentAnswer ? ' ' : '') + trimmed;
    }
  }
  
  if (currentQuestion && currentAnswer) {
    await prisma.fAQ.create({
      data: {
        question: currentQuestion,
        answer: currentAnswer.trim(),
        category: 'Général',
        language: 'ar'
      }
    });
    count++;
  }

  console.log(`Added \${count} FAQs.`);
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
