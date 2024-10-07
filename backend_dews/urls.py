"""
URL configuration for backend_dews project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# backend_dews/urls.py
from django.urls import path

from .views.schools.Sc_Internat import Sc_Internat

from .views.schools.Sc_MoyGenLevel import Sc_MoyGenLevel

from .views.schools.Sc_TargetIstayssirData import Sc_TargetIstayssirData

from .views.schools.Sc_SuccessRateAllStudents import Sc_SuccessRateAllStudents

from .views.schools.Sc_StudentsDistrubByLevel import Sc_StudentsDistrubByLevel

from .views.schools.Sc_SuccessRateIdAnnee import Sc_SuccessRateIdAnnee

from .views.schools.Sc_GenderIdAnnee import Sc_GenderIdAnnee

from .views.aiassistant import chat

from .views.SchoolData import SchoolData

from .views.GenderIdAnnee import GenderIdAnnee

from .views.TargetIstayssirData import TargetIstayssirData

from .views.SuccessRateIdAnnee import SuccessRateIdAnnee

from .views.CountAllStudents import CountAllStudents

from .views.AbsenceEtab import AbsenceEtab

from .views.MoyGenEtab import MoyGenEtab

from .views.schools.Sc_TauxReussiteByLevel import Sc_TauxReussiteByLevel
from .views.TauxReussiteByEtab import TauxReussiteByEtab
from .views.SuccessRateAllStudents import SuccessRateAllStudents

from .views.StudentsDistrubByLevel import StudentDistributionByLevel

from .views.schools.Sc_AbsenceClass import  Sc_AbsenceClass

from .views.MoyGenclass import MoyGenClassView
from .views.level_7.student_list_view import student_list_view1
from .views.level_7.students_list import student_list1
from .views.level_7.prediction_M_1_2 import (
    predictions_M_1_2Baseline,
    single_student_prediction_M_1_2Baseline,
    predictions_M_1_2Undrsampling,
    single_student_prediction_M_1_2Undrsampling,
)
from .views.level_7.prediction_M_1_1 import (
    predictions_M_1_1Baseline,
    single_student_prediction_M_1_1Baseline,
    predictions_M_1_1Undrsampling,
    single_student_prediction_M_1_1Undrsampling,
)
#level 
from .views.level_8.student_list_view import student_list_view2
from .views.level_8.students_list import student_list2
from .views.level_8.prediction_M_1_2 import (
    predictions_M_1_2Baseline2,
    single_student_prediction_M_1_2Baseline2,
    predictions_M_1_2Undrsampling2,
    single_student_prediction_M_1_2Undrsampling2,
)
from .views.level_8.prediction_M_1_1 import (
    predictions_M_1_1Baseline2,
    single_student_prediction_M_1_1Baseline2,
    predictions_M_1_1Undrsampling2,
    single_student_prediction_M_1_1Undrsampling2,
)
#level 9
from .views.level_9.student_list_view import student_list_view3
from .views.level_9.students_list import student_list3
from .views.level_9.prediction_M_1_2 import (
    predictions_M_1_2Baseline3,
    single_student_prediction_M_1_2Baseline3,
    predictions_M_1_2Undrsampling3,
    single_student_prediction_M_1_2Undrsampling3,
)
from .views.level_9.prediction_M_1_1 import (
    predictions_M_1_1Baseline3,
    single_student_prediction_M_1_1Baseline3,
    predictions_M_1_1Undrsampling3,
    single_student_prediction_M_1_1Undrsampling3,
)

urlpatterns = [
    # level 7 
    path('students1/', student_list_view1, name='student_list'),
    path('studentslist1/', student_list1, name='student_list'),
    path('MoyGenClassView/', MoyGenClassView.as_view(), name='MoyGenClassView'),
    path('MoyGenEtab/', MoyGenEtab.as_view(), name='MoyGenEtab'),
    path('AbsenceEtab/', AbsenceEtab.as_view(), name='AbsenceEtab'),
    path('SchoolData/', SchoolData.as_view(), name='SchoolData'),
    path('SuccessRateIdAnnee/', SuccessRateIdAnnee.as_view(), name='SuccessRateIdAnnee'),
    path('CountAllStudents/', CountAllStudents.as_view(), name='CountAllStudents'),
    path('GenderIdAnnee/', GenderIdAnnee.as_view(), name='GenderIdAnnee'),
    path('TargetIstayssirData/', TargetIstayssirData.as_view(), name='TargetIstayssirData'),
    path('SuccessRateAllStudents/', SuccessRateAllStudents.as_view(), name='SuccessRateAllStudents'),
    path('StudentDistributionByLevel/', StudentDistributionByLevel.as_view(), name='StudentDistributionByLevel'),
    # path('TauxReussiteByClass/', TauxReussiteByClass.as_view(), name='TauxReussiteByClass'),
    path('TauxReussiteByEtab/', TauxReussiteByEtab.as_view(), name='TauxReussiteByEtab'),
    path('api/chat/', chat, name='chat'),

    #school
    path('Sc_SuccessRateAllStudents/', Sc_SuccessRateAllStudents.as_view(), name='Sc_SuccessRateAllStudents'),
    path('Sc_StudentsDistrubByLevel/', Sc_StudentsDistrubByLevel.as_view(), name='Sc_StudentsDistrubByLevel'),
    path('Sc_AbsenceClass/', Sc_AbsenceClass.as_view(), name='Sc_AbsenceClass'),
    path('Sc_GenderIdAnnee/', Sc_GenderIdAnnee.as_view(), name='Sc_GenderIdAnnee'),
    path('Sc_SuccessRateIdAnnee/', Sc_SuccessRateIdAnnee.as_view(), name='Sc_SuccessRateIdAnnee'),
    path('Sc_TargetIstayssirData/', Sc_TargetIstayssirData.as_view(), name='Sc_TargetIstayssirData'),
    path('Sc_MoyGenLevel/', Sc_MoyGenLevel.as_view(), name='Sc_MoyGenLevel'),
    path('Sc_TauxReussiteByLevel/', Sc_TauxReussiteByLevel.as_view(), name='Sc_TauxReussiteByLevel'),
    path('Sc_Internat/', Sc_Internat.as_view(), name='Sc_Internat'),





    # predictions after 1 year
    path('predictions/M_1_1Baseline1/', predictions_M_1_1Baseline, name='predictions_M_1_2Baseline'),
    path('predictions/M_1_1Baseline1/<str:student_id>/', single_student_prediction_M_1_1Baseline, name='single_student_prediction_M_1_2Baseline'),
    path('predictions/M_1_1Undrsampling1/', predictions_M_1_1Undrsampling, name='predictions_M_1_2Undrsampling'),
    path('predictions/M_1_1Undrsampling1/<str:student_id>/', single_student_prediction_M_1_1Undrsampling, name='single_student_prediction_M_1_2Undrsampling'),
    # predictions after 2 years
    path('predictions/M_1_2Baseline1/', predictions_M_1_2Baseline, name='predictions_M_1_2Baseline'),
    path('predictions/M_1_2Baseline1/<str:student_id>/', single_student_prediction_M_1_2Baseline, name='single_student_prediction_M_1_2Baseline'),
    path('predictions/M_1_2Undrsampling1/', predictions_M_1_2Undrsampling, name='predictions_M_1_2Undrsampling'),
    path('predictions/M_1_2Undrsampling1/<str:student_id>/', single_student_prediction_M_1_2Undrsampling, name='single_student_prediction_M_1_2Undrsampling'),

     # level 8
    path('students2/', student_list_view2, name='student_list'),
    path('studentslist2/', student_list2, name='student_list'),
    # predictions after 1 year
    path('predictions/M_1_1Baseline2/', predictions_M_1_1Baseline2, name='predictions_M_1_2Baseline'),
    path('predictions/M_1_1Baseline2/<str:student_id>/', single_student_prediction_M_1_1Baseline2, name='single_student_prediction_M_1_2Baseline'),
    path('predictions/M_1_1Undrsampling2/', predictions_M_1_1Undrsampling2, name='predictions_M_1_2Undrsampling'),
    path('predictions/M_1_1Undrsampling2/<str:student_id>/', single_student_prediction_M_1_1Undrsampling2, name='single_student_prediction_M_1_2Undrsampling'),
    # predictions after 2 years
    path('predictions/M_1_2Baseline2/', predictions_M_1_2Baseline2, name='predictions_M_1_2Baseline'),
    path('predictions/M_1_2Baseline2/<str:student_id>/', single_student_prediction_M_1_2Baseline2, name='single_student_prediction_M_1_2Baseline'),
    path('predictions/M_1_2Undrsampling2/', predictions_M_1_2Undrsampling2, name='predictions_M_1_2Undrsampling'),
    path('predictions/M_1_2Undrsampling2/<str:student_id>/', single_student_prediction_M_1_2Undrsampling2, name='single_student_prediction_M_1_2Undrsampling'),

     # level 9
    path('students3/', student_list_view3, name='student_list'),
    path('studentslist3/', student_list3, name='student_list'),
    # predictions after 1 year
    path('predictions/M_1_1Baseline3/', predictions_M_1_1Baseline3, name='predictions_M_1_2Baseline'),
    path('predictions/M_1_1Baseline3/<str:student_id>/', single_student_prediction_M_1_1Baseline3, name='single_student_prediction_M_1_2Baseline'),
    path('predictions/M_1_1Undrsampling3/', predictions_M_1_1Undrsampling3, name='predictions_M_1_2Undrsampling'),
    path('predictions/M_1_1Undrsampling3/<str:student_id>/', single_student_prediction_M_1_1Undrsampling3, name='single_student_prediction_M_1_2Undrsampling'),
    # predictions after 2 years
    path('predictions/M_1_2Baseline3/', predictions_M_1_2Baseline3, name='predictions_M_1_2Baseline'),
    path('predictions/M_1_2Baseline3/<str:student_id>/', single_student_prediction_M_1_2Baseline3, name='single_student_prediction_M_1_2Baseline'),
    path('predictions/M_1_2Undrsampling3/', predictions_M_1_2Undrsampling3, name='predictions_M_1_2Undrsampling'),
    path('predictions/M_1_2Undrsampling3/<str:student_id>/', single_student_prediction_M_1_2Undrsampling3, name='single_student_prediction_M_1_2Undrsampling'),




]

