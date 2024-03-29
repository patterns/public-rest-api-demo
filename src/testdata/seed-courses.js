
const seedCourses = [
    {
        name: "Financial Accounting",
        description: "Students will learn the steps of the accounting cycle and how to prepare financial statements with industry established rules and regulations.",
        category: "accouting-and-finance",
        published: false,
        instructor: ObjectId("65f9211d154374783d517700"),
    },
    {
        name: "Algebra",
        description: "This course is a functional approach to algebra that incorporates the use of appropriate terminology....",
        category: "mathematics",
        published: false,
        instructor: ObjectId("65f9211d154374783d517700"),
    },
    {
        name: "Physics",
        description: "Physics is concerned with describing the interactions of energy, matter, space, and time...",
        category: "science",
        published: false,
        instructor: ObjectId("65f9211d154374783d517700")
    },
    {
        name: "Physical Education",
        description: "This would be a difficult course to participate in online",
        category: "health-and-wellness",
        published: false,
        instructor: ObjectId("65f9211d154374783d517700")
    }
]

const seedFinanceLessons = 
[
    {
        "title": "Introduction to Financial Accounting.",
        "content": "Accounting is the language of business...",
        "resource_url": "https://library.mtsu.edu/c.php?g=53812&p=3682856",
    },
    {
        "title": "The Accounting Process.",
        "content": "An account accumulates detailed information...",
        "resource_url": "https://library.mtsu.edu/c.php?g=53812&p=3682856",
    },
    {
        "title": "Adjusting Entries.",
        "content": "Financial transactions occur continuously during an accounting period...",
        "resource_url": "https://library.mtsu.edu/c.php?g=53812&p=3682856",
    },
    {
        "title": "Balance Sheet and Related Disclosures.",
        "content": "Finanicial transactions communicate information...",
        "resource_url": "https://library.mtsu.edu/c.php?g=53812&p=3682856",
    },
]

const seedMathLessons = 
[
    {
        "title": "Equations and Inequalities",
        "content": "The cartesian coordinate system is based on a two-dimensional plane...",
        "resource_url": "https://openstax.org/books/college-algebra-2e/pages/2-introduction-to-equations-and-inequalities",
    },
    {
        "title": "Functions",
        "content": "A relation is a set of ordered pairs...",
        "resource_url": "https://openstax.org/books/college-algebra-2e/pages/3-introduction-to-functions",
    },
    {
        "title": "Linear functions.",
        "content": "A linear function is defined as a function with a constant rate of change...",
        "resource_url": "https://openstax.org/books/college-algebra-2e/pages/4-introduction-to-linear-functions",
    },
    {
        "title": "Systems of equations and inequalities.",
        "content": "We will investigate matrices and their inverses, and various ways to use matrices...",
        "resource_url": "https://openstax.org/books/college-algebra-2e/pages/7-introduction-to-systems-of-equations-and-inequalities",
    },
]

const seedPhysicsLessons = 
[
    {
        "title": "The Nature of Science and Physics.",
        "content": "Physics allows you to understand the hazards of radiation...",
        "resource_url": "https://openstax.org/books/college-physics-2e/pages/1-introduction-to-science-and-the-realm-of-physics-physical-quantities-and-units",
    },
    {
        "title": "Kinematics.",
        "content": "Our formal study of physics begins with kinematics which...",
        "resource_url": "https://openstax.org/books/college-physics-2e/pages/2-introduction-to-one-dimensional-kinematics",
    },
    {
        "title": "Two-dimensional Kinematics.",
        "content": "For two-dimensional motion, the path of an object...",
        "resource_url": "https://openstax.org/books/college-physics-2e/pages/3-introduction-to-two-dimensional-kinematics",
    },
    {
        "title": "Dynamics and Newton's Laws of Motion",
        "content": "Newton's laws of motion are the foundation of dynamics...",
        "resource_url": "https://openstax.org/books/college-physics-2e/pages/4-introduction-to-dynamics-newtons-laws-of-motion",
    }
]

module.exports = { seedCourses, seedFinanceLessons, seedPhysicsLessons, seedMathLessons };