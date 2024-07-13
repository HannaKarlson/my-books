# My Books

## Description

A simple app for searching books from the Open Library.

## Getting started

### Step 1: Clone application
```bash
git clone https://github.com/HannaKarlson/my-books.git
```

### Step 2: Install dependencies

```bash
cd MyBooks
npm install
```

### Step 3: Install Pods

This step is needed to run the application on ios devices

```bash
cd ios && pod install
```

### Step 4: Run project

Back in the root of the project

#### For Android

```bash
npx react-native run-android
```

#### For IOS

```bash
npx react-native run-ios
```

### Usage

Type the title and/or the author of a book in the respective input fields and press the search button 🔍 . A search will initially display 10 books. To load more books simply scroll the list.

Tap a book to see more information about it. Tapping the heart icon ❤️ in the details screen the book is added/removed from the favorites list.

To display the favorites list tap the floating action button ❤️ on the main screen.


