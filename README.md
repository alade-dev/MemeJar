# Memejar

Memejar is a decentralized SocialFi application that leverages the Sui blockchain to revolutionize meme culture by providing a decentralized platform for users to post, save, and compete with memes. Users can earn rewards in Sui tokens through weekly contests, fostering a vibrant and engaging community.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Project Structure](#project-structure)
7. [Contributing](#contributing)
8. [License](#license)

## Introduction

Memejar aims to enhance the meme ecosystem by incorporating blockchain technology, enabling fair rewards and recognition for creators. The platform offers a variety of features, including meme posting, saving, and participating in contests. The top five most liked memes weekly are rewarded with Sui tokens, promoting high-quality content and active participation.

## Features

- **Post Memes:** Users can upload their memes to share with the community.
- **Save Memes:** Save favorite memes for easy access later.
- **Meme Contests:** Weekly contests where the top five most liked memes are rewarded with Sui tokens.
- **Reward System:** Winners receive Sui tokens as rewards.
- **Explore Section:** Discover trending meme contests and popular memes.

## Technology Stack

- **Frontend:** React.js
- **Backend:** Sui devnet blockchain
- **Authentication:** Google OAuth
- **Smart Contracts:** Sui smart contracts for contest management and rewards

## Installation

### Prerequisites
- Move
- JavaScript
- Typescript
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

## Project Structure

```
memejar/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── MemeCard.js
│   │   └── ...
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Profile.js
│   │   └── ...
│   ├── services/
│   │   ├── api.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
└── README.md
```

## Contributing

We welcome contributions from the community. To contribute, please follow these steps:

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

Thank you for using Memejar! We hope you enjoy creating, sharing, and competing with memes on our platform. For any questions or support, please contact us at support@memejar.com.
