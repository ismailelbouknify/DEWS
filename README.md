# DEWS
AI-based identification and support of at-risk students: A case study of the Moroccan education system

## Overview

The DEWS (Dropout Early Warning System) application is developed by analyzing academic and demographic data to predict student dropouts after one or two years. It also provides advanced interactive dashboards for comprehensive data visualization, including school-specific insights. This repository contains the backend infrastructure, including machine learning models, ensuring efficient functionality and high performance.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Frontend Setup](#backend-setup)
3. [Backend Setup](#backend-setup)
4. [Machine Learning Predictions](#machine-learning-predictions)
5. [Model Selection and Performance](#model-selection-and-performance)

# Data processing 

### Running the script 

1. **Apply database migrations:**
   ```bash
   python Cleaning.py migrate
   ```

2. **Apply database migrations:**
   ```bash
   python Cleaning.py migrate
   ```

3. **Apply database migrations:**
   ```bash
   python Cleaning.py migrate
   ```

# Frontend


# Backend


## Getting Started

To get started with the DEWS application, follow the instructions below to set up the backend and run the application.


### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ismailelbouknify/DEWS.git
   cd Backdews
   ```

2. **Create a virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate   # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Backend Setup



### Running the Django Project

1. **Apply database migrations:**
   ```bash
   python manage.py migrate
   ```

2. **Create a superuser (optional but recommended for accessing the admin interface):**
   ```bash
   python manage.py createsuperuser
   ```

3. **Start the development server:**
   ```bash
   python manage.py runserver
   ```

4. **Access the application:**
   - Open your web browser and navigate to `http://127.0.0.1:8000/` to access the application.
   - For the admin interface, go to `http://127.0.0.1:8000/admin/` and log in with the superuser credentials.



## Machine Learning Predictions

The DEWS application uses machine learning models for predictions. The process is divided into key steps: feature engineering, model loading, and prediction execution.

### Feature Engineering

The `Feature_engineering.py` script contains functions to transform raw data into features suitable for machine learning models. This includes:

- Data cleaning
- Creation of new variables
- Normalization of values

### Loading and Using Models

1. **Load the serialized ML model (`model.pkl`) and use it for predictions.**
2. **Run the `Feature_engineering.py` script to prepare the data.**

## Model Selection and Performance

The application features a variety of models, including Baseline and Undersampling models for each level, enabling users to select their preferred model.

