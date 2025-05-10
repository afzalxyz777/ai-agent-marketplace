🧠 Day 1 Learning Log
Project Kickoff & GitHub Setup

GitHub Repository: Created a new repository to store all project files in the cloud.

README.md: Added a project description (used to explain and document the project).

.gitignore: Prevents certain files/folders (like node_modules, .env) from being pushed to GitHub.

Public vs Private Repo: Public can be seen by anyone; private is restricted—can be changed later.

SSH Key: Secure way to connect local machine to GitHub (used ssh-keygen, pbcopy, and pasted into GitHub).

SSH vs HTTPS: SSH is more secure and avoids password input for every Git operation.

Terminal Basics

mkdir: mkdir contracts frontend backend – Creates folders.

cd: cd folder_name – Change directory.

code .: Opens the current folder in VS Code.



🧠 Day 2 Learning Log
Solidity Environment Setup

Foundry: A blazing-fast smart contract development tool.

forge init: Initializes a new Foundry project (creates src/, test/, foundry.toml, etc.).

forge build: Compiles smart contracts to check for errors and output bytecode.

Folder Structure

Root Folder: The main project folder (where .git, README.md, etc., live).

contracts/: Contains all Solidity smart contracts.

frontend/: Will store your website (React/Next.js frontend).

backend/: Will handle AI-related APIs, training logic, database, etc.

Commands & Usage

cd ai-agent-marketplace: Navigate into the project root.

touch README.md: Creates a blank file.

mv: Moves or renames files/folders.

ls: Lists files in current directory.

