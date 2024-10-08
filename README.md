# DEWS
AI-based identification and support of at-risk students: A case study of the Moroccan education system

## Overview

The DEWS (Dropout Early Warning System) application is developed by analyzing academic and demographic data to predict student dropouts after one or two years. It also provides advanced interactive dashboards for comprehensive data visualization, including school-specific insights. This repository contains the backend infrastructure, including machine learning models, ensuring efficient functionality and high performance.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Data processing](#Data-processing)
3. [Frontend Setup](#backend-setup)
4. [Backend Setup](#backend-setup)
5. [Machine Learning Predictions](#machine-learning-predictions)
6. [Model Selection and Performance](#model-selection-and-performance)


## Getting Started

To get started with the DEWS application, follow the instructions below to set up the backend and run the application.


### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ismailelbouknify/DEWS.git
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


## Data processing 
This section provides step-by-step instructions for running the data processing scripts. These scripts are responsible for cleaning, aggregating, and joining the data. Before proceeding, ensure that your environment is properly set up, with all required dependencies installed.
### Running the script 

1. **Run the Data Cleaning Script:**
The Cleaning.py script is used to clean raw data. This script handles tasks such as removing duplicates, filling missing values, normalizing data formats, and any other data preparation tasks required for the analysis.
   ```bash
   python Dataset/Cleaning.py migrate
   ```

3. **Run the Data Aggregation Script:**
After cleaning the data, the next step is to run the Script_Aggregation_middle.py script. This script performs data aggregation, such as grouping the data by certain criteria and computing statistics (e.g., sums, averages) for each group.
   ```bash
   python Dataset/Script_Aggregation_middle.py migrate
   ```

5. **Run the Data Joining Script:**
Once the data has been aggregated, you can run the Script_Join_data_middle.py script to merge different datasets into one final dataset. This script ensures that the aggregated data is joined with other datasets, such as lookup tables or additional data sources.
   ```bash
   python Dataset/Script_Join_data_middle.py migrate
   ```

## Frontend


## Backend



### Backend Setup



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

