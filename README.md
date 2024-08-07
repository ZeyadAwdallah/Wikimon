# `Wikimon` React Native App Documentation

## Overview

`wikimon` is a React Native application that provides a Pokémon-themed interface. Users can search for Pokémon and view detailed information about them. The app utilizes the Pokémon API to fetch data and displays it in a user-friendly format.

## Features

- **Pokémon Search**: Allows users to search for Pokémon and view a list of them.
- **Pokémon Details**: Provides detailed information about a selected Pokémon, including its stats and images.
- **Favorites**: Users can mark Pokémon as favorites. This status is saved locally using AsyncStorage.

## Components

### 1. API Code

- **`getPokemon` Function**:
  - Fetches a list of Pokémon from the Pokémon API.
  - Returns a list of Pokémon objects with basic information including ID and image URL.

- **`getPokemonDetailes` Function**:
  - Fetches detailed information about a specific Pokémon by ID from the Pokémon API.
  - Returns detailed Pokémon data including stats and images.

### 2. Main Layout

- **Purpose**: Defines the overall layout and navigation structure of the app using `expo-router`.
- **Features**:
  - Configures header styles and titles for the different screens.
  - Sets up navigation between the main Pokémon list and individual Pokémon details screens.

### 3. Main Screen

- **Purpose**: Displays a searchable list of Pokémon.
- **Features**:
  - Fetches and displays Pokémon data in a scrollable list.
  - Each Pokémon entry is clickable and navigates to a detailed view of the selected Pokémon.

### 4. Pokémon Details Screen

- **Purpose**: Shows detailed information about a selected Pokémon.
- **Features**:
  - Displays Pokémon's image, ID, name, and stats.
  - Allows users to mark Pokémon as favorites.
  - The favorite status is managed using AsyncStorage to persist between app sessions.

## Usage

1. **Main Screen**: Navigate to the main screen to view a list of Pokémon. Click on a Pokémon to view more details.
2. **Pokémon Details**: On the details screen, you can see comprehensive information about the selected Pokémon, including its image and stats. You can also mark the Pokémon as a favorite.

## Installation

To get started with `wikimon`, follow the standard React Native setup procedures and ensure all necessary dependencies are installed.
