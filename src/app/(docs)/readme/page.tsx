import Link from "next/link";

const ReadMe = () => {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-semibold">Read Me</h1>

            {/* Description */}
            <p className="mt-4 text-sm text-muted-foreground">
                This tool is designed to simplify the process of creating dynamic and feature-rich tables in Next.js using the ShadCN design library. It allows developers to quickly scaffold essential table functionalities such as search, pagination, sorting, create, edit, and delete. While the generated code is general, it provides a robust starting point with detailed comments to guide modifications, making it highly customizable for your specific needs. By integrating seamlessly with the <Link href='https://www.shadcn-form.com/playground' target="_blank" className="underline underline-offset-2">ShadCN Form Builder</Link>, our tool also enables effortless form creation, saving time and enhancing productivity. The result is a functional table that can be tailored to your project's requirements within minutes.
            </p>

            {/* Credits */}
            <p className="text-lg mt-4">This tool is built on the shoulders of giants. We would like to acknowledge and give full credit to:</p>            
            <ul className="list-disc list-inside mt-2 text-sm">
                <li className="text-muted-foreground">
                    <Link href='https://www.shadcn-form.com/playground' target="_blank" className="font-bold underline underline-offset-2">ShadCN Form Builder</Link>: An open-source tool that makes form creation intuitive and efficient.
                </li>
                <li className="text-muted-foreground">
                    <Link href="https://ui.shadcn.com" target="_blank" className="font-bold underline underline-offset-2">ShadCN Design System</Link>: A beautifully crafted, open-source design library.
                </li>
            </ul>

            {/* Contribution */}
            <h2 className="text-xl font-semibold mt-4">Contribute to This Project</h2>
            <p className="mt-2 text-sm text-muted-foreground">
                We believe in collaboration and continuous improvement. If you'd like to contribute:
            </p>
            <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                <li>Report bugs or suggest new features on our GitHub repository.</li>
                <li>Fork the project, make improvements, and submit a pull request.</li>
            </ul>
            <p className="mt-2 text-sm text-muted-foreground">
                Your ideas and feedback are invaluable in making this tool better for everyone.
            </p>

            {/* Contact */}
            <h2 className="text-xl font-semibold mt-6">Contact Me</h2>
            <p className="mt-2 text-sm text-muted-foreground">
                Have questions, feedback, or collaboration? Reach out to me!
            </p>
            <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                <li>Email: <Link href="mailto:bhattaprabin62@gmail.com" className="underline underline-offset-2">bhattaprabin62@gmail.com</Link></li>
            </ul>
            <p className="mt-2 text-sm text-muted-foreground">
                or, DM me via Twitter or Instagram.
            </p>

            {/* Additional Notes */}
            <p className="mt-2 text-sm text-muted-foreground">
                This project is open source and free for everyone to use. If you find it helpful, consider giving us a star ⭐ on GitHub or sharing it with your peers. Your support motivates to keep building and improving tools for the community.
            </p>
        </div>
    );
};

export default ReadMe;

