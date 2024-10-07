# aiassistant/utils.py

import pandas as pd
import numpy as np
import joblib
from jinja2 import Template

def mapper(data):
    sex_mapping = {
        1: "Male",
        2: "Female"
    }
    handicap_mapping = {
        0: "no handicap",
        1: "physical handicap",
        2: "mental handicap",
        3: "deaf",
        4: "blind",
        5: "autism",
        6: "trouble learning"
    }
    yes_no = {
        0: "No",
        1: "Yes"
    }
    target_mapping = {
        1: "Fail",
        2: "Dropout",
        0: "Non Dropout"
    }
    target_1 = {
        1: "failed",
        2: "dropped out",
        0: "passed"
    }
    area = {
        1: "rural",
        0: "urban",
    }
    
    data["sex"] = data["sex"].replace(sex_mapping)
    data["handicap"] = data["handicap"].replace(handicap_mapping)
    data["aid"] = data["aid"].replace(yes_no)
    data["interned"] = data["interned"].replace(yes_no)
    data["area"] = data["area"].replace(area)
    data["target_i1"] = data["target_i1"].replace(target_1)
    data["preschool"] = data["preschool"].replace(yes_no)
    data["target"] = data["target"].replace(target_mapping)
    
    return data

def prep_data(data):
    data['age'] = (data['id_annee'] + 2007) - data['datenaiseleve'] 
    data = data.drop(['datenaiseleve'], axis=1)
    data["area"] = data.AdresseL_i1.apply(lambda x: 1 if "DOUAR" in x else 0)
    data["aid"] = [1 if s["istayssir_i1"] == 1 or s["MCaRtable_i1"] == 1 else 0 for k, s in data.iterrows()]
    good_cols = [
        "id_eleve", 'id_annee', 'target_i1', "failure_i1", 'MoyenneGen_i1',
        'NbrJourAbsenceAutorise_i1', 'NbrUniteAbsenceAutorise_i1',
        'NbrJourAbsenceNonAutorise_i1', 'NbrUniteAbsenceNonAutorise_i1',
        'Internat_i1', "aid", 'target', 'id_genre', 'age', 'id_handicap',
        "Classment_class_i1", "area", "Level", "Préscolarisé"
    ]
    data = data[good_cols]
    
    rename_cols = [
        'student', 'year', "target_i1", "n_fails", "final_grade", "dayauth",
        "classauth", "daysnonauth", "classnonauth", "interned", "aid", "target",
        'sex', 'age', 'handicap', "ranking", "area", "level", "preschool"
    ]
    data.columns = rename_cols
   
    data_mapped = mapper(data)
    
    return data

def load_model():
    return joblib.load("Models/level_7/M_1_1/Baseline/model.pkl")

def prompt_generate(example_drops, example_non_drops, prediction, q):
    jinja_template = """Based on ML models, a prediction was made for a student to {% if prediction == 1 %}drop out {% else %}not drop out {% endif %}of school. {% if prediction == 1 %}Provide an extensive report on the possible reasons for this dropout student based on historical data of both dropout and non-dropout students. {% else %}Provide an extensive report on why this student will not consider dropping out based on historical data of both dropout and non-dropout students.{% endif %}

These are examples of students who dropped out:
{%- for k, s in example_drops.iterrows() %}
Student {{ k+1 }}:
    Sex: {{ s["sex"] }}
    Age: {{ s["age"] }}
    Handicap: {{ s["handicap"] }}
    Final grade: {{ '%0.2f' | format(s["final_grade"] | float) }}/20
    Class ranking: {{ s["ranking"] }}
    Number of current level fails: {{ s["n_fails"] }}
    Has financial aid: {{ s["aid"] }}
    Last year's status: {{ s["target_i1"] }}
    Absent days: {{ (s["daysnonauth"] + s["dayauth"]) | int }}
    Absent classes: {{ (s["classnonauth"] + s["classauth"]) | int }}
    Lives in a boarding school: {{ s["interned"] }}
    Living area: {{ s["area"] }}
{%- endfor %}

These are examples of students who did not drop out:
{%- for k, nd in example_non_drops.iterrows() %}
Student {{ k+1 }}:
    Sex: {{ nd["sex"] }}
    Age: {{ nd["age"] }}
    Handicap: {{ nd["handicap"] }}
    Final grade: {{ '%0.2f' | format(nd["final_grade"] | float) }}/20
    Class ranking: {{ nd["ranking"] }}
    Number of current level fails: {{ nd["n_fails"] }}
    Has financial aid: {{ nd["aid"] }}
    Last year's status: {{ nd["target_i1"] }}
    Absent days: {{ (nd["daysnonauth"] + nd["dayauth"]) | int }}
    Absent classes: {{ (nd["classnonauth"] + nd["classauth"]) | int }}
    Lives in a boarding school: {{ nd["interned"] }}
    Living area: {{ nd["area"] }}
{%- endfor %}

{% if prediction == 1 %}The following data is for the predicted dropout student. Explain the possible reasons for this student to drop out: {% else %}The following data is for the predicted non dropout student. Explain why this student will not consider dropping out:{% endif %}
Target student:
    Sex: {{ q["sex"] }}
    Age: {{ q["age"] }}
    Handicap: {{ q["handicap"] }}
    Final grade: {{ '%0.2f' | format(q["final_grade"] | float) }}/20
    Class ranking: {{ q["ranking"] }}
    Current level fails: {{ q["n_fails"] }}
    Has financial aid: {{ q["aid"] }}
    Last year's status: {{ q["target_i1"] }}
    Absent days: {{ (q["daysnonauth"] + q["dayauth"]) | int }}
    Absent classes: {{ (q["classnonauth"] + q["classauth"]) | int }}
    Lives in a boarding school: {{ q["interned"] }}
    Living area: {{ q["area"] }}
"""

    template = Template(jinja_template)
    
    context = {
        "example_drops": example_drops,
        "example_non_drops": example_non_drops,
        "prediction": prediction,
        "q": q
    }

    output = template.render(context)
    return output
