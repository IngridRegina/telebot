# Telebot UI

![image](https://github.com/IngridRegina/telebot/assets/26140674/c3cfe333-6aef-4d32-8abe-c7f766527fd5)

## Overview

The Telebot UI is a user-friendly interface for managing a Telegram bot's message forwarding and tag group functionalities. This application simplifies the process of configuring tag groups, message forwarding rules, and user permissions, empowering users to customize their bot's behavior effortlessly.

## Features

- User Authentication: Securely log in to the application to manage bot settings.
- Message Forwarding: Easily set up rules for forwarding messages from one chat to another.
- Tag Forwarding: Set up rules for forwarding messages containing a certain tag and control access permissions.
- Tag Management: Define and manage tags, assign users to groups.
- Intuitive UI: A clean and intuitive user interface for a smooth user experience.
- Responsive Design: Works seamlessly on desktop and mobile devices.

## Getting Started

### Prerequisities

Before you begin, ensure you have met the following requirements:

- Node.js installed on your development machine.
- Backend server up and running.

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Installation

Follow these steps to install and run the application:

1. Clone the repository to your local machine:

```sh
git clone https://github.com/IngridRegina/telebot.git
```

2. Navigate to the project directory:

```sh
cd telebot
```

3. Install the project dependencies:

```sh
npm install
```

4. Start the development server with hot reload:

```sh
npm run dev
```

5. Open your browser and visit `http://localhost:5173` to access the application.

## Usage

### User Authentication

1. Launch the application.
2. Enter your credentials and click on the "Log in" button to authenticate.

### Message Forwarding

1. Navigate to the "Message Forwarder" section.
2. Define message forwarding rules by specifying source and destination chats.
3. Save your forwarding settings to enable automatic message forwarding.

### Tag Management

1. Access the "Tag Grouper" section to manage tag groups.
2. Create, edit, or delete tag groups and associated user lists.
3. Save your tag group settings to enable automatic notifications to associated users when a tag is mentioned in chat.

### Tag Forwarding

1. Access the "Tag Forwarder" section to manage tag forward rules.
2. Create, edit or delete tag forward rules and user permissions.
3. Save tag forward settings to enable automatic message forwarding for messages by permitted users using specified tags.
