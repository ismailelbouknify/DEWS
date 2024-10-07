# DEWS
AI-based identification and support of at-risk students: A case study of the Moroccan education system



## Overview

The DEWS (Dropout Early Warning System) application is developed by analyzing academic and demographic data to predict student dropouts after one or two years. It also provides advanced interactive dashboards for comprehensive data visualization, including school-specific insights. This repository contains the backend infrastructure, including machine learning models, ensuring efficient functionality and high performance.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Backend Setup](#backend-setup)
3. [Machine Learning Predictions](#machine-learning-predictions)
4. [Model Selection and Performance](#model-selection-and-performance)


## Getting Started

To get started with the DEWS application, follow the instructions below to set up the backend and run the application.

### Prerequisites

- Python 3.8 or higher
- Postman

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

The application includes various models, including Baseline and Undersampling models. Below are the performance metrics:

### After 1 Year

| Metric      | Baseline (Class 0) | Baseline (Class 1) | Undersampling (Class 0) | Undersampling (Class 1) |
|-------------|---------------------|--------------------|--------------------------|-------------------------|
| Precision   | 0.83                | 0.66               | 0.89                     | 0.57                    |
| Recall      | 0.87                | 0.58               | 0.74                     | 0.79                    |
| F1-score    | 0.85                | 0.62               | 0.81                     | 0.66                    |
| Accuracy    | 0.78                |                    | 0.75                     |                         |
| Macro Avg   | 0.74                | 0.73               | 0.73                     | 0.76                    |
| Weighted Avg| 0.78                | 0.78               | 0.79                     | 0.75                    |

### After 2 Years

| Metric      | Baseline (Class 0) | Baseline (Class 1) | Undersampling (Class 0) | Undersampling (Class 1) |
|-------------|---------------------|--------------------|--------------------------|-------------------------|
| Precision   | 0.92                | 0.48               | 0.92                     | 0.48                    |
| Recall      | 0.58                | 0.89               | 0.59                     | 0.89                    |
| F1-score    | 0.71                | 0.62               | 0.72                     | 0.62                    |
| Accuracy    | 0.67                |                    | 0.68                     |                         |
| Macro Avg   | 0.70                | 0.74               | 0.70                     | 0.74                    |
| Weighted Avg| 0.79                | 0.67               | 0.79                     | 0.68                    |


