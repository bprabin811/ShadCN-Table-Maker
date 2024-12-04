const ReadMe = () => {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-semibold">Read Me</h1>
            
            {/* Description */}
            <p className="mt-4">
                {"The ShadCN Table Maker is a web-based tool designed to simplify the process of creating, editing, and managing tables with full CRUD (Create, Read, Update, Delete) functionality. Built with ShadCN components and inspired by ShadCN's form builder, this tool allows users to customize columns, add data, search, and preview tables in real-time."}
            </p>
            
            {/* Features */}
            <h2 className="text-2xl font-semibold mt-6">Features</h2>
            <ul className="list-disc list-inside mt-2">
                <li>Create tables with customizable columns</li>
                <li>Search and filter table data</li>
                <li>Edit and update existing table rows</li>
                <li>Preview tables before finalizing</li>
                <li>Delete rows and manage data effortlessly</li>
            </ul>

            {/* Credit */}
            <h2 className="text-2xl font-semibold mt-6">Credits</h2>
            <p className="mt-2">
                This tool utilizes the <strong>ShadCN form builder</strong> for its modular form handling and UI components. 
                Special thanks to the ShadCN team for their excellent open-source UI library.
            </p>

            {/* Contribution and Contact */}
            <h2 className="text-2xl font-semibold mt-6">Contributions and Contact</h2>
            <p className="mt-2">
                {"Contributions to improve this project are welcome! If you encounter any issues or have suggestions, feel free to create a pull request or open an issue on the project's GitHub repository."}
            </p>
            <p className="mt-2">
                For further inquiries, DM me via twitter or instagram.
            </p>
        </div>
    );
};

export default ReadMe;
