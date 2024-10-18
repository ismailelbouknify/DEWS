"""
 This code Contains scripts for data cleaning for all tables of the database.

"""

import pandas as pd
from tqdm import tqdm
import pandas as pd


class Academics:
    def __init__(self, dataframe):
        self.dataframe = dataframe

    def missing_values_academics(self):
        # Drop rows with missing values in 'id_situation'
        self.dataframe = self.dataframe.dropna(subset=['id_situation'])
        # Replace missing values with 0
        self.dataframe = self.dataframe.fillna({'NbrJourAbsenceAutorise': 0, 
                                                'NbrUniteAbsenceAutorise': 0,
                                                'NbrJourAbsenceNonAutorise': 0,
                                                'NbrUniteAbsenceNonAutorise': 0})
        # Replace missing id_classe with 'CLASSMISSING'
        self.dataframe = self.dataframe.fillna({'id_classe': 'CLASSMISSING'})
        # Drop 'id_typeBourse' column
        self.dataframe = self.dataframe.drop('id_typeBourse', axis=1)
        return self.dataframe

    def unify_semester(self):
        # Replace missing id_session with 1
        self.dataframe["id_session"].fillna(1, inplace=True)
        # Data of 2019/2020
        df_year = self.dataframe[self.dataframe['id_annee'] == 12]
        # Delete data of 2019/2020 from the dataset
        self.dataframe = self.dataframe[self.dataframe['id_annee'] != 12]
        s1 = df_year[df_year['id_session'] == 1]
        s2 = df_year[df_year['id_session'] == 2]
        s3 = df_year[df_year['id_session'] == 3]
        # Logic to unify semesters
        # (Your logic here)
        return pd.concat([self.dataframe, df_year], axis=0)

    def preparer_academics(self):
        self.dataframe = self.dataframe[self.dataframe['id_annee'] < 14]
        self.dataframe = self.dataframe[(self.dataframe['id_situation'] != 8) & 
                                         (self.dataframe['nefstat'] != "trad")]
        self.dataframe = self.dataframe.drop_duplicates()
        self.dataframe = self.dataframe.drop_duplicates(['id_eleve', 'id_annee', 'nefstat', 'id_session'])
        self.dataframe = self.dataframe[self.dataframe['id_situation'] != 11]
        self.dataframe = self.unify_semester()
        self.dataframe = self.missing_values_academics()
        return self.dataframe


if __name__ == "__main__":
    df=pd.read_csv("/Dataset/Academics.csv")

    # Create an instance of Academics
    academics_instance = Academics(df)

    # Prepare the DataFrame for academics
    prepared_dataframe = academics_instance.preparer_academics()
    print(prepared_dataframe.shape)
    filepath = '/Dews/Data cleaning/Dataset/Data_prepared/Academics.csv'
    prepared_dataframe.to_csv(filepath, index=False)
    
    


class ClassPreparer:
    def __init__(self, dataframe):
        self.dataframe = dataframe

    def preparer_classes(self):
        self.dataframe = self.dataframe.drop_duplicates()
        self.dataframe["Multiclass"] = 0
        classe_unique = self.dataframe['id_classe'].unique()
        for i in tqdm(classe_unique):
            self.dataframe.loc[(self.dataframe["id_classe"] == i), "Multiclass"] = self.dataframe[self.dataframe['id_classe'] == i].shape[0]
        return self.dataframe

# Example usage:
if __name__ == "__main__":
    df = pd.read_csv("/Dataset/classes.csv", sep=";")
    
    # Create an instance of ClassPreparer
    preparer_instance = ClassPreparer(df)

    # Call the method to prepare classes
    prepared_df = preparer_instance.preparer_classes()

    # Print the shape of the prepared DataFrame
    print(prepared_df.shape)
    filepath = '/Dews/Data cleaning/Dataset/Data_prepared/classes.csv'
    prepared_df.to_csv(filepath, index=False)


class Grades:
    @staticmethod
    def unify_semester(dff):
        dff["id_session"].fillna(1, inplace=True) # replace missing id_session with 1
        df_year = dff[dff['id_annee'] == 12]  # data of 2019/2020
        dff = dff[dff['id_annee'] != 12] # delete data from 2019/2020
        s1 = df_year[df_year['id_session'] == 1]
        s2 = df_year[df_year['id_session'] == 2]
        s3 = df_year[df_year['id_session'] == 3]
        dd = get_element_not_exist(s2, s3, 'id_eleve')
        s2 = s2[s2['id_eleve'].isin(dd)]  # S2 student not in S3
        s2 = pd.concat([s2, s3], axis=0)   # S2 and S3
        s2.loc[s2['id_session'] == 3, 'id_session'] = 2 # S2 and S3 become S2
        df_year = pd.concat([s1, s2], axis=0)     
        return pd.concat([dff, df_year], axis=0)

    @staticmethod
    def missing_values_grades(dff):
        dff = dff.dropna(subset=['id_eleve', 'id_annee', 'id_session']) # Drop rows with missing values
        dff = dff.fillna({'absence_exam': 0}) # Replace missing values with 0
        return dff

    @staticmethod
    def preparer_grades(dff):
        dff = dff.drop_duplicates() # Drop duplicates
        dff = Grades.unify_semester(dff)
        dff = Grades.missing_values_grades(dff)
        return dff

# Example usage:
if __name__ == "__main__":
    # Sample DataFrame (you can replace this with your DataFrame)
    df = pd.read_csv("/Dataset/grades.csv", sep=";")
    
    # Call the method to prepare grades
    prepared_df = Grades.preparer_grades(df)

    # Print the shape of the prepared DataFrame
    print(prepared_df.shape)
    filepath = '/Dews/Data cleaning/Dataset/Data_prepared/Grades.csv'
    prepared_df.to_csv(filepath, index=False)
    
    
class School:
    @staticmethod
    def clean_text(df, column):
        df[column] = df[column].str.lower()
        df[column] = df[column].str.strip()
        return df 

    @staticmethod
    def clean_school(df):
        df = df.rename(columns={'CD_ETAB': 'cd_etab'})
        df = School.clean_text(df, "VilleL")
        df1 = df[['CD_REG', 'cd_prov', 'cd_etab', 'DO_ETAB','typeEtab', 'Internat', 'Exist_Internet', 'AdresseL', 'INDHcom', 'INDHquart', 'ProgrammeTissir']]
        df1.fillna(-1, inplace=True)
        df1["DO_ETAB"] = pd.to_datetime(df1["DO_ETAB"]).dt.year
        return df1

# Example usage:
if __name__ == "__main__":
    df=pd.read_csv("/Dataset/schools.csv")
    school_instance = School()

    # Clean the school DataFrame
    cleaned_df = school_instance.clean_school(df)

    # Print the cleaned DataFrame
    print(cleaned_df.shape)
    filepath = '/Dews/Data cleaning/Dataset/Data_prepared/Schools.csv'
    cleaned_df.to_csv(filepath, index=False)
    
class Student:
    @staticmethod
    def preparer_student(dff):
        # Drop duplicates
        dff = dff.drop_duplicates() 
        
        # Clean 'datenaiseleve' column
        dff = dff.fillna({'datenaiseleve': -1})
        dff["datenaiseleve"] = pd.to_datetime(dff["datenaiseleve"]).dt.year
        
        # Clean 'nationalite' column
        dff.loc[dff['nationalite'] == 'MAR', 'nationalite'] = 'Maroc'
        dff.loc[dff['nationalite'] == 'Maroc', 'nationalite'] = 1
        dff = dff.fillna({'nationalite': 1})
        dff.loc[dff['nationalite'] != 1, 'nationalite'] = 0
        
        # Drop 'Lieu_naissance_fr' column
        dff = dff.drop(["Lieu_naissance_fr"], axis=1)
        
        # Clean 'Préscolarisé' column
        dff.loc[dff['Préscolarisé'] == 'Moderne', 'Préscolarisé'] = 1
        dff.loc[dff['Préscolarisé'] == 'Coranique', 'Préscolarisé'] = 2
        dff = dff.fillna({'Préscolarisé': 0})
        
        # Clean 'id_handicap' column
        dff = dff.fillna({'id_handicap': 0})
        
        # Clean 'Adress' column
        dff = dff.fillna({'Adress': "unknown"})
        
        # Clean 'profession_pere' column
        dff = dff.fillna({'profession_pere': "unknown"})
        
        # Clean 'profession_mere' column
        dff = dff.fillna({'profession_mere': "unknown"})
        
        return dff

# Example usage:
if __name__ == "__main__":
    df = pd.read_csv("/Dataset/Demographics.csv")

    # Call the method to prepare student data
    prepared_df = Student.preparer_student(df)

    # Print the prepared DataFrame
    print(prepared_df.shape)
    filepath = '/Dews/Data cleaning/Dataset/Data_prepared/Demographics.csv'
    prepared_df.to_csv(filepath, index=False)