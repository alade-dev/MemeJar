# Memejar

Memejar is a decentralized SocialFi application that leverages the Sui blockchain to revolutionize meme culture by providing a decentralized platform for users to post, save, and compete with memes. Users can earn rewards in Sui tokens through weekly contests, fostering a vibrant and engaging community.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Key Features and Technologies](#Key-features-and-technologies)
6. [Contributing](#contributing)
7. [License](#license)

## Introduction

Memejar aims to enhance the meme ecosystem by incorporating blockchain technology, enabling fair rewards and recognition for creators. The platform offers a variety of features, including meme posting, saving, and participating in contests. The top five most liked memes weekly are rewarded with Sui tokens, promoting high-quality content and active participation.

## Features

- **Post Memes:** Users can upload their memes to share with the community.
- **Save Memes:** Save favorite memes for easy access later.
- **Meme Contests:** Weekly contests where the top five most liked memes are rewarded with Sui tokens.
- **Reward System:** Winners receive Sui tokens as rewards.
- **Explore Section:** Discover trending meme contests and popular memes.

## Installation

### Prerequisites
- Move
- JavaScript (ReactJs)
- Typescript (ReactJs)
- Node.js
- npm (Node Package Manager)

### Steps for frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/alade-dev/memejar.git
   ```
2. Navigate to the project directory:
   ```bash
   cd memejar/frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and go to `http://localhost:5173` to view the application.

### Authentication

The login process uses Google OAuth to authenticate users. Upon successful login, a Sui address is generated and linked to the user account.

### Posting Memes

Users can post memes by uploading images and providing a title and description. The uploaded memes are displayed on the homepage and can be interacted with by other users.

### Contests and Rewards

Participate in weekly meme contests. The top five most liked memes will be rewarded with Sui tokens. Winners are announced at the end of each contest period.

## Key Features and Technologies

### zkLogin Integration
- **Secure Social Logins**: Memejar uses zkLogin to ensure users can securely log in using zero-knowledge proofs. This enhances privacy and security, making onboarding seamless and protecting user data from unauthorized access.
- **Enhanced User Experience**: By utilizing zkLogin, Memejar eliminates the need for users to remember multiple passwords or undergo cumbersome registration processes, thus making it possible for masses of web2 users to transition smoothly and securely to web3.

### SUI Wallet Integration
- **Seamless Transactions**: SUI Wallet integration allows users to handle transactions directly within the platform. Creators can receive payments instantly, and users can make microtransactions, purchase NFTs, or tip their favorite creators without leaving the platform.
- **Sponsored Transactions**: To further simplify user interactions, Memejar supports sponsored transactions, reducing friction for new users who might not yet hold cryptocurrency.

### Smart Contracts
- **Infrastructure Backbone**: Smart contracts underpin the entire Memejar infrastructure, ensuring automated, transparent, and secure execution of agreements. This includes handling subscriptions, payments, content distribution, and royalty splits.
- **Programmable Transaction Blocks**: Leveraging SUI’s unique programmable transaction blocks, Memejar implements complex financial operations and workflows, making it ideal for DeFi integration and advanced financial management.

### dWallet Integration
- **Secure Asset Management**: Memejar utilizes dWallet for secure and private asset management. Users can log in using zkLogin dWallet, allowing them to securely own and send various assets, including Bitcoin, across different blockchains.
- **Interoperability Solutions**: dWallet integration facilitates seamless multi-chain interactions, showcasing its interoperability and enhancing the user experience.

## Challenges and Overcoming Them
- **Learning Curve with SUI and Move Programming Language**: As the SUI network and Move programming language were new to the team, we faced a steep learning curve. Through thorough research, studying documentation, watching tutorial videos, and collaborating closely, we overcame these challenges and successfully implemented the project.
- **Integration Hurdles**: Integrating zkLogin and dWallet required meticulous planning and execution. We resolved various bugs and ensured seamless integration through iterative testing and leveraging community support.

## Contributing
We welcome contributions from the community! Here are some ways you can help:
1. **Report Bugs**: If you find any bugs, please open an issue.
2. **Suggest Features**: Have an idea for a new feature? Let us know by opening an issue.
3. **Submit Pull Requests**: If you want to contribute code, fork the repository and submit a pull request with your changes.

To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m 'Add new feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request describing your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for using Memejar! We hope you enjoy creating, sharing, and competing with memes on our platform. For any questions or support, please contact us at ibisomimayowa@gmail.com.
