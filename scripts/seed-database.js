
import { MongoClient } from "mongodb"


const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"

async function seedDatabase() {
  console.log("Starting database seeding...")

  let client

  try {
    client = new MongoClient(uri)
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db("constitution_quest")


    await Promise.all([
      db
        .collection("modules")
        .drop()
        .catch(() => console.log("No modules collection to drop")),
      db
        .collection("quizzes")
        .drop()
        .catch(() => console.log("No quizzes collection to drop")),
      db
        .collection("user_progress")
        .drop()
        .catch(() => console.log("No user_progress collection to drop")),
      db
        .collection("discussions")
        .drop()
        .catch(() => console.log("No discussions collection to drop")),
      db
        .collection("badges")
        .drop()
        .catch(() => console.log("No badges collection to drop")),
    ])

    // Create modules collection
    const modules = [
      {
        id: 1,
        title: "Introduction to the Indian Constitution",
        description: "Learn about the history and making of the Indian Constitution",
        chapters: [
          {
            id: 1,
            title: "Historical Background",
            description: "The events leading to the creation of the Indian Constitution",
            content: `
              <h2>Historical Context of the Indian Constitution</h2>
              <p>The Indian Constitution has a rich historical background that spans several decades of India's struggle for independence and self-governance.</p>
              
              <h3>British Colonial Rule</h3>
              <p>The need for a constitution emerged during British colonial rule, which began formally in 1858 when the British Crown took over administration from the East India Company. Various acts and reforms were introduced during this period:</p>
              <ul>
                <li>Government of India Act, 1858</li>
                <li>Indian Councils Acts of 1861, 1892, and 1909</li>
                <li>Government of India Act, 1919</li>
                <li>Government of India Act, 1935</li>
              </ul>
              
              <h3>Freedom Movement and Constitutional Development</h3>
              <p>The Indian National Congress, founded in 1885, played a crucial role in the freedom movement and constitutional development. Key milestones include:</p>
              <ul>
                <li>1916: Lucknow Pact between Congress and Muslim League</li>
                <li>1928: Nehru Report proposing constitutional reforms</li>
                <li>1931: Karachi Resolution outlining fundamental rights and economic policy</li>
                <li>1942: Quit India Movement intensifying the demand for independence</li>
              </ul>
              
              <h3>Cabinet Mission Plan</h3>
              <p>In 1946, the Cabinet Mission Plan proposed a framework for the transfer of power and the formation of a Constituent Assembly. This plan laid the groundwork for India's constitutional development post-independence.</p>
            `,
            hasQuiz: true,
          },
          {
            id: 2,
            title: "Constituent Assembly",
            description: "Formation and functioning of the Constituent Assembly",
            content: `
              <h2>The Constituent Assembly of India</h2>
              <p>The Constituent Assembly was formed to draft the Constitution of independent India. It was a remarkable body that represented the diversity and aspirations of the Indian people.</p>
              
              <h3>Formation and Composition</h3>
              <p>The Constituent Assembly was formed based on the Cabinet Mission Plan of 1946. Key facts about its composition:</p>
              <ul>
                <li>Initially had 389 members, reduced to 299 after partition</li>
                <li>Members were elected indirectly by provincial assemblies</li>
                <li>Representation was based on population: approximately one member per million people</li>
                <li>Included representatives from princely states and provinces</li>
              </ul>
              
              <h3>Key Figures</h3>
              <p>Several prominent leaders played crucial roles in the Constituent Assembly:</p>
              <ul>
                <li>Dr. Rajendra Prasad: President of the Constituent Assembly</li>
                <li>Dr. B.R. Ambedkar: Chairman of the Drafting Committee</li>
                <li>Jawaharlal Nehru: Moved the Objectives Resolution</li>
                <li>Sardar Vallabhbhai Patel: Headed the Advisory Committee on Fundamental Rights and Minorities</li>
              </ul>
              
              <h3>Working of the Assembly</h3>
              <p>The Constituent Assembly worked through various committees:</p>
              <ul>
                <li>Drafting Committee: Prepared the draft constitution</li>
                <li>Union Powers Committee: Dealt with distribution of powers</li>
                <li>Union Constitution Committee: Focused on the structure of the central government</li>
                <li>Provincial Constitution Committee: Focused on the structure of state governments</li>
                <li>Advisory Committee on Fundamental Rights and Minorities: Addressed rights and protections</li>
              </ul>
              
              <h3>Timeline</h3>
              <p>The Constituent Assembly's work spanned nearly three years:</p>
              <ul>
                <li>First meeting: December 9, 1946</li>
                <li>Objectives Resolution moved by Nehru: December 13, 1946</li>
                <li>Drafting Committee appointed: August 29, 1947</li>
                <li>Draft Constitution published: February 1948</li>
                <li>Constitution adopted: November 26, 1949</li>
                <li>Constitution came into effect: January 26, 1950</li>
              </ul>
            `,
            hasQuiz: true,
          },
          // More chapters...
        ],
        status: "published",
      },
      {
        id: 2,
        title: "Fundamental Rights",
        description: "Explore the fundamental rights guaranteed by the Constitution",
        chapters: [
          {
            id: 1,
            title: "Right to Equality",
            description: "Articles 14-18 of the Indian Constitution",
            content: `
              <h2>Right to Equality (Articles 14-18)</h2>
              <p>The Right to Equality is a fundamental right guaranteed by the Indian Constitution. It ensures that all citizens are equal before the law and receive equal protection of the laws.</p>
              
              <h3>Article 14: Equality before law</h3>
              <p>The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.</p>
              
              <h3>Key Points:</h3>
              <ul>
                <li>Article 14 guarantees equality before law and equal protection of laws to all persons within the territory of India.</li>
                <li>It applies to all individuals - citizens and foreigners.</li>
                <li>It is a fundamental right that forms the foundation of democracy.</li>
              </ul>
              
              <h3>Reasonable Classification:</h3>
              <p>The principle of equality does not mean that all laws must be general in character or that the same laws should apply to all persons. The varying needs of different classes of persons often require separate treatment. The legislature can classify persons for legitimate purposes, provided:</p>
              <ol>
                <li>The classification is based on an intelligible differentia which distinguishes persons grouped together from others left out of the group.</li>
                <li>The differentia must have a rational relation to the object sought to be achieved by the law.</li>
              </ol>
              
              <h3>Important Supreme Court Judgments:</h3>
              <p><strong>E.P. Royappa v. State of Tamil Nadu (1974):</strong> The Supreme Court held that equality is a dynamic concept with many aspects and dimensions. It cannot be imprisoned within traditional and doctrinaire limits.</p>
              
              <p><strong>Maneka Gandhi v. Union of India (1978):</strong> The Court held that Article 14 strikes at arbitrariness in State action and ensures fairness and equality of treatment.</p>
              
              <h3>Article 15: Prohibition of discrimination</h3>
              <p>The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them.</p>
              
              <h3>Key Provisions:</h3>
              <ul>
                <li>No citizen shall be subjected to any disability, liability, restriction or condition on grounds of religion, race, caste, sex, place of birth.</li>
                <li>No citizen shall be denied access to shops, public restaurants, hotels, places of public entertainment, or the use of wells, tanks, bathing ghats, roads and places of public resort maintained wholly or partly out of State funds or dedicated to the use of the general public.</li>
                <li>The State is empowered to make special provisions for women and children.</li>
                <li>The State can make special provisions for the advancement of socially and educationally backward classes, Scheduled Castes, and Scheduled Tribes.</li>
              </ul>
              
              <h3>Article 16: Equality of opportunity in public employment</h3>
              <p>There shall be equality of opportunity for all citizens in matters relating to employment or appointment to any office under the State.</p>
              
              <h3>Key Provisions:</h3>
              <ul>
                <li>No citizen shall be discriminated against in respect of any employment or office under the State on grounds of religion, race, caste, sex, descent, place of birth, residence.</li>
                <li>The State can make provisions for reservation of appointments or posts in favor of backward classes.</li>
                <li>The State can make provisions for reservation in promotion for Scheduled Castes and Scheduled Tribes.</li>
              </ul>
              
              <h3>Article 17: Abolition of Untouchability</h3>
              <p>"Untouchability" is abolished and its practice in any form is forbidden. The enforcement of any disability arising out of "Untouchability" shall be an offence punishable in accordance with law.</p>
              
              <h3>Article 18: Abolition of titles</h3>
              <p>No title, not being a military or academic distinction, shall be conferred by the State. No citizen of India shall accept any title from any foreign State.</p>
            `,
            hasQuiz: true,
          },
          {
            id: 2,
            title: "Right to Freedom",
            description: "Articles 19-22 of the Indian Constitution",
            content: `
              <h2>Right to Freedom (Articles 19-22)</h2>
              <p>The Right to Freedom encompasses a set of six freedoms that are essential for the personal liberty and dignity of individuals. These rights are subject to reasonable restrictions imposed by the State.</p>
              
              <h3>Article 19: Six Fundamental Freedoms</h3>
              <p>Article 19 guarantees to all citizens the following six freedoms:</p>
              <ol>
                <li>Freedom of speech and expression</li>
                <li>Freedom to assemble peacefully without arms</li>
                <li>Freedom to form associations or unions</li>
                <li>Freedom to move freely throughout the territory of India</li>
                <li>Freedom to reside and settle in any part of the territory of India</li>
                <li>Freedom to practice any profession, or to carry on any occupation, trade or business</li>
              </ol>
              
              <h3>Reasonable Restrictions:</h3>
              <p>These freedoms are subject to reasonable restrictions imposed by the State on the following grounds:</p>
              <ul>
                <li>Sovereignty and integrity of India</li>
                <li>Security of the State</li>
                <li>Friendly relations with foreign States</li>
                <li>Public order</li>
                <li>Decency or morality</li>
                <li>Contempt of court</li>
                <li>Defamation</li>
                <li>Incitement to an offense</li>
              </ul>
              
              <h3>Important Supreme Court Judgments:</h3>
              <p><strong>Romesh Thappar v. State of Madras (1950):</strong> The Supreme Court held that freedom of speech and expression includes freedom of the press.</p>
              
              <p><strong>Indian Express Newspapers v. Union of India (1985):</strong> The Court held that freedom of the press is essential for the proper functioning of the democratic process.</p>
              
              <h3>Article 20: Protection in respect of conviction for offenses</h3>
              <p>Article 20 provides three safeguards to persons accused of crimes:</p>
              <ol>
                <li>No ex-post-facto law: No person shall be convicted of any offense except for violation of a law in force at the time of the commission of the act.</li>
                <li>No double jeopardy: No person shall be prosecuted and punished for the same offense more than once.</li>
                <li>No self-incrimination: No person accused of any offense shall be compelled to be a witness against himself.</li>
              </ol>
              
              <h3>Article 21: Protection of life and personal liberty</h3>
              <p>No person shall be deprived of his life or personal liberty except according to procedure established by law.</p>
              
              <p>This article has been interpreted expansively by the Supreme Court to include various rights:</p>
              <ul>
                <li>Right to live with human dignity</li>
                <li>Right to livelihood</li>
                <li>Right to privacy</li>
                <li>Right to education</li>
                <li>Right to health</li>
                <li>Right to clean environment</li>
              </ul>
              
              <h3>Article 21A: Right to Education</h3>
              <p>The State shall provide free and compulsory education to all children of the age of six to fourteen years.</p>
              
              <h3>Article 22: Protection against arrest and detention</h3>
              <p>Article 22 provides safeguards against arbitrary arrest and detention:</p>
              <ul>
                <li>Right to be informed of the grounds of arrest</li>
                <li>Right to consult and be defended by a legal practitioner</li>
                <li>Right to be produced before a magistrate within 24 hours of arrest</li>
                <li>Right not to be detained beyond 24 hours without the authority of a magistrate</li>
              </ul>
              
              <p>However, these protections do not apply to:</p>
              <ul>
                <li>Enemy aliens</li>
                <li>Persons arrested or detained under preventive detention laws</li>
              </ul>
            `,
            hasQuiz: true,
          },
          // More chapters...
        ],
        status: "published",
      },
      // More modules...
    ]

    await db.collection("modules").insertMany(modules)
    console.log("Modules collection seeded")

    // Create quizzes collection
    const quizzes = [
      {
        id: 1,
        moduleId: 1,
        chapterId: 1,
        title: "Historical Background Quiz",
        description: "Test your knowledge about the history of the Indian Constitution",
        questions: [
          {
            id: 1,
            question: "Which of the following Acts is considered a major precursor to the Indian Constitution?",
            options: [
              { id: "a", text: "Indian Independence Act, 1947" },
              { id: "b", text: "Government of India Act, 1935" },
              { id: "c", text: "Indian Councils Act, 1909" },
              { id: "d", text: "Regulating Act, 1773" },
            ],
            correctAnswer: "b",
            explanation:
              "The Government of India Act, 1935 provided the framework for the Indian Constitution. Many provisions were directly incorporated from this Act.",
          },
          {
            id: 2,
            question: "When was the Cabinet Mission Plan proposed?",
            options: [
              { id: "a", text: "1942" },
              { id: "b", text: "1944" },
              { id: "c", text: "1946" },
              { id: "d", text: "1947" },
            ],
            correctAnswer: "c",
            explanation:
              "The Cabinet Mission Plan was proposed in 1946 to discuss the transfer of power from the British government to Indian leadership and the formation of a Constituent Assembly.",
          },
          {
            id: 3,
            question: "Which of the following was NOT a source of inspiration for the Indian Constitution?",
            options: [
              { id: "a", text: "British Constitution" },
              { id: "b", text: "US Constitution" },
              { id: "c", text: "Soviet Constitution" },
              { id: "d", text: "Chinese Constitution" },
            ],
            correctAnswer: "d",
            explanation:
              "The Indian Constitution drew inspiration from various constitutions including British, US, Irish, Canadian, and Soviet, but not from the Chinese Constitution.",
          },
          {
            id: 4,
            question: "Which movement led by Mahatma Gandhi called for the British to leave India?",
            options: [
              { id: "a", text: "Non-Cooperation Movement" },
              { id: "b", text: "Civil Disobedience Movement" },
              { id: "c", text: "Quit India Movement" },
              { id: "d", text: "Swadeshi Movement" },
            ],
            correctAnswer: "c",
            explanation:
              "The Quit India Movement, launched in August 1942, was a civil disobedience movement calling for immediate independence from British rule.",
          },
          {
            id: 5,
            question:
              "Which committee's recommendations formed the basis for the Fundamental Rights in the Indian Constitution?",
            options: [
              { id: "a", text: "Union Powers Committee" },
              { id: "b", text: "Drafting Committee" },
              { id: "c", text: "Advisory Committee on Fundamental Rights and Minorities" },
              { id: "d", text: "Provincial Constitution Committee" },
            ],
            correctAnswer: "c",
            explanation:
              "The Advisory Committee on Fundamental Rights and Minorities, headed by Sardar Vallabhbhai Patel, made recommendations that formed the basis for Fundamental Rights in the Constitution.",
          },
        ],
      },
      {
        id: 2,
        moduleId: 1,
        chapterId: 2,
        title: "Constituent Assembly Quiz",
        description: "Test your knowledge about the Constituent Assembly",
        questions: [
          {
            id: 1,
            question: "Who was the President of the Constituent Assembly?",
            options: [
              { id: "a", text: "Dr. B.R. Ambedkar" },
              { id: "b", text: "Jawaharlal Nehru" },
              { id: "c", text: "Dr. Rajendra Prasad" },
              { id: "d", text: "Sardar Vallabhbhai Patel" },
            ],
            correctAnswer: "c",
            explanation:
              "Dr. Rajendra Prasad was elected as the permanent President of the Constituent Assembly on 11 December 1946.",
          },
          {
            id: 2,
            question: "When did the Constituent Assembly hold its first meeting?",
            options: [
              { id: "a", text: "August 15, 1947" },
              { id: "b", text: "December 9, 1946" },
              { id: "c", text: "January 26, 1950" },
              { id: "d", text: "November 26, 1949" },
            ],
            correctAnswer: "b",
            explanation:
              "The Constituent Assembly held its first meeting on December 9, 1946, with Dr. Sachchidananda Sinha as the temporary President.",
          },
          {
            id: 3,
            question: "Who was the Chairman of the Drafting Committee of the Constituent Assembly?",
            options: [
              { id: "a", text: "Dr. B.R. Ambedkar" },
              { id: "b", text: "Jawaharlal Nehru" },
              { id: "c", text: "Dr. Rajendra Prasad" },
              { id: "d", text: "Sardar Vallabhbhai Patel" },
            ],
            correctAnswer: "a",
            explanation:
              "Dr. B.R. Ambedkar was appointed as the Chairman of the Drafting Committee, which was responsible for preparing the draft of the Indian Constitution.",
          },
          {
            id: 4,
            question: "How many members did the Constituent Assembly have after partition?",
            options: [
              { id: "a", text: "389" },
              { id: "b", text: "299" },
              { id: "c", text: "311" },
              { id: "d", text: "275" },
            ],
            correctAnswer: "b",
            explanation:
              "After partition, the Constituent Assembly was reduced to 299 members as some members went to Pakistan.",
          },
          {
            id: 5,
            question: "When was the Constitution of India adopted by the Constituent Assembly?",
            options: [
              { id: "a", text: "August 15, 1947" },
              { id: "b", text: "January 26, 1950" },
              { id: "c", text: "November 26, 1949" },
              { id: "d", text: "December 9, 1946" },
            ],
            correctAnswer: "c",
            explanation:
              "The Constitution of India was adopted by the Constituent Assembly on November 26, 1949, which is now celebrated as Constitution Day.",
          },
        ],
      },
      {
        id: 3,
        moduleId: 2,
        chapterId: 1,
        title: "Right to Equality Quiz",
        description: "Test your knowledge about Articles 14-18",
        questions: [
          {
            id: 1,
            question: "Which article of the Indian Constitution guarantees equality before law?",
            options: [
              { id: "a", text: "Article 14" },
              { id: "b", text: "Article 15" },
              { id: "c", text: "Article 16" },
              { id: "d", text: "Article 17" },
            ],
            correctAnswer: "a",
            explanation:
              "Article 14 states that 'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.'",
          },
          {
            id: 2,
            question: "Article 15 of the Indian Constitution prohibits discrimination on grounds of:",
            options: [
              { id: "a", text: "Only religion and caste" },
              { id: "b", text: "Only sex and place of birth" },
              { id: "c", text: "Religion, race, caste, sex, and place of birth" },
              { id: "d", text: "Only race and religion" },
            ],
            correctAnswer: "c",
            explanation:
              "Article 15 prohibits discrimination on grounds of religion, race, caste, sex, and place of birth.",
          },
          {
            id: 3,
            question: "Which article abolishes untouchability?",
            options: [
              { id: "a", text: "Article 14" },
              { id: "b", text: "Article 15" },
              { id: "c", text: "Article 16" },
              { id: "d", text: "Article 17" },
            ],
            correctAnswer: "d",
            explanation: "Article 17 abolishes untouchability and forbids its practice in any form.",
          },
          {
            id: 4,
            question: "Article 16 of the Constitution deals with:",
            options: [
              { id: "a", text: "Equality before law" },
              { id: "b", text: "Prohibition of discrimination" },
              { id: "c", text: "Equality of opportunity in public employment" },
              { id: "d", text: "Abolition of titles" },
            ],
            correctAnswer: "c",
            explanation: "Article 16 guarantees equality of opportunity in matters of public employment.",
          },
          {
            id: 5,
            question: "Which of the following is NOT a ground of prohibition of discrimination under Article 15?",
            options: [
              { id: "a", text: "Religion" },
              { id: "b", text: "Race" },
              { id: "c", text: "Economic status" },
              { id: "d", text: "Sex" },
            ],
            correctAnswer: "c",
            explanation:
              "Economic status is not explicitly mentioned as a ground of prohibition of discrimination under Article 15. The grounds mentioned are religion, race, caste, sex, and place of birth.",
          },
        ],
      },
      // More quizzes...
    ]

    await db.collection("quizzes").insertMany(quizzes)
    console.log("Quizzes collection seeded")

    // Create badges collection
    const badges = [
      {
        id: "first_quiz",
        name: "First Quiz",
        description: "Completed your first quiz",
        icon: "Award",
        xpReward: 50,
      },
      {
        id: "knowledge_seeker",
        name: "Knowledge Seeker",
        description: "Read 5 chapters",
        icon: "BookOpen",
        xpReward: 100,
      },
      {
        id: "perfect_score",
        name: "Perfect Score",
        description: "Got 100% on a quiz",
        icon: "Trophy",
        xpReward: 150,
      },
      {
        id: "constitution_novice",
        name: "Constitution Novice",
        description: "Completed your first module",
        icon: "CheckCircle",
        xpReward: 200,
      },
      {
        id: "discussion_starter",
        name: "Discussion Starter",
        description: "Started your first discussion",
        icon: "MessageCircle",
        xpReward: 50,
      },
      {
        id: "helpful_commenter",
        name: "Helpful Commenter",
        description: "Received 10 likes on your comments",
        icon: "ThumbsUp",
        xpReward: 100,
      },
      {
        id: "constitution_expert",
        name: "Constitution Expert",
        description: "Completed all modules",
        icon: "Award",
        xpReward: 500,
      },
      // More badges...
    ]

    await db.collection("badges").insertMany(badges)
    console.log("Badges collection seeded")

    // Create discussions collection
    const discussions = [
      {
        id: "1",
        title: "Understanding Article 21: Right to Life and Personal Liberty",
        content:
          "I've been studying Article 21 of the Indian Constitution, which guarantees the right to life and personal liberty. The Supreme Court has expanded its scope over the years. What are some landmark judgments that have shaped our understanding of this fundamental right?",
        authorId: "user_1",
        authorName: "Arjun Sharma",
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 24,
        comments: 8,
        tags: ["Fundamental Rights", "Article 21", "Supreme Court"],
      },
      {
        id: "2",
        title: "Difference between Fundamental Rights and Directive Principles",
        content:
          "I'm confused about the difference between Fundamental Rights and Directive Principles of State Policy. Can someone explain the key differences and their enforceability? Are there any instances where they overlap or conflict with each other?",
        authorId: "user_2",
        authorName: "Priya Patel",
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 18,
        comments: 12,
        tags: ["Fundamental Rights", "Directive Principles", "Comparison"],
      },
      // More discussions...
    ]

    await db.collection("discussions").insertMany(discussions)
    console.log("Discussions collection seeded")

    console.log("Database seeding completed successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    if (client) {
      await client.close()
      console.log("MongoDB connection closed")
    }
  }
}

// Execute the seeding function
seedDatabase()
