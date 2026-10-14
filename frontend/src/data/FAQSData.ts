export interface FAQ {
    id: number;
    question: string;
    answer: string;
    category:
        | "Getting Started"
        | "Budgeting"
        | "Income & Expenses"
        | "Account & Privacy";
}

export const faqs: FAQ[] = [
    {
        id: 1,
        question: "What is Fundar?",
        answer: "Fundar is a personal finance app that helps you plan how to use your money, allocate income across different budgets, track expenses, and monitor your spending throughout the month.",
        category: "Getting Started",
    },
    {
        id: 2,
        question: "Who is Fundar designed for?",
        answer: "Fundar is designed for anyone who wants to manage their money more intentionally, whether you earn a regular salary, work freelance, run a side hustle, or receive money from multiple sources.",
        category: "Getting Started",
    },
    {
        id: 3,
        question: "How do I use Fundar?",
        answer: "Create an account, configure your preferred currency and budget categories, then record your income and allocate it across your planned expenses. You can then record expenses and monitor your progress from your dashboard.",
        category: "Getting Started",
    },
    {
        id: 4,
        question: "How does Fundar help me manage my salary?",
        answer: "You can record your salary, account for applicable taxes, and allocate your take-home income to categories such as rent, feeding, transportation, and clothing. This gives you a clearer plan for using your money throughout the month.",
        category: "Budgeting",
    },
    {
        id: 5,
        question: "Can I manage income from multiple sources?",
        answer: "Yes. Fundar supports recording income from different sources, including salary, freelance work, and gifts, so you can plan how money from each source contributes to your budgets.",
        category: "Income & Expenses",
    },
    {
        id: 6,
        question: "What happens if I allocate more money than I have?",
        answer: "Fundar can identify when your planned allocations exceed the money available and prompt you to review them before proceeding. This helps you avoid building a budget around money you do not have.",
        category: "Budgeting",
    },
    {
        id: 7,
        question: "Can I create my own budget categories?",
        answer: "Yes. You can organize your money around the categories that make sense for your lifestyle, such as rent, groceries, transportation, savings, or entertainment.",
        category: "Budgeting",
    },
    {
        id: 8,
        question: "How do I track my expenses?",
        answer: "Record your expenses against the relevant budget category to monitor how much you have spent and how much remains available in your plan.",
        category: "Income & Expenses",
    },
    {
        id: 9,
        question: "Can I see how much money I have left to spend?",
        answer: "Yes. By comparing your planned allocations with your recorded expenses, Fundar helps you see how much of each budget remains available and where your money is going.",
        category: "Budgeting",
    },
    {
        id: 10,
        question: "Does Fundar support different currencies?",
        answer: "Fundar supports a configurable base currency and currencies associated with income entries. Currency conversion can help you view your finances consistently when you work with more than one currency.",
        category: "Income & Expenses",
    },
    {
        id: 11,
        question: "Does Fundar connect to my bank account?",
        answer: "Fundar is designed around recording your income and expenses within the app. Check the current product features for the latest information about bank integrations.",
        category: "Account & Privacy",
    },
    {
        id: 12,
        question: "Is Fundar a bank or investment platform?",
        answer: "No. Fundar is a personal budgeting and money management tool. It helps you organize your finances, but it does not replace a bank, financial adviser, or investment platform.",
        category: "Getting Started",
    },
    {
        id: 13,
        question: "Is my financial information private?",
        answer: "Fundar accounts are intended to keep each user's financial records associated with their own account. Review Fundar's privacy policy to understand how information is collected, stored, and protected.",
        category: "Account & Privacy",
    },
    {
        id: 14,
        question: "Can I update my budget after allocating my income?",
        answer: "Your financial plans may change during the month. Fundar's income and allocation workflows allow you to review your allocations and make adjustments when needed.",
        category: "Budgeting",
    },
    {
        id: 15,
        question: "Can I use Fundar to avoid overspending?",
        answer: "Fundar helps you set spending limits through your budget allocations and compare your actual expenses with your plan. The clearer picture can help you recognize when you need to adjust your spending.",
        category: "Budgeting",
    },
];
