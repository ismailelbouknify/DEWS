from django.http import JsonResponse
from ..models import Student, Class, Level  # Adjust imports based on your model structure

def dashboard_view(request):
    # Total students in the database
    total_students = Student.objects.count()
    
    # Total unique establishments (cd_etab)
    unique_establishments = Student.objects.values('cd_etab').distinct().count()
    
    # Total unique classes (id_classe)
    unique_classes = Class.objects.values('id_classe').distinct().count()
    
    # Total unique levels (id_level)
    unique_levels = Level.objects.values('id_level').distinct().count()

    # Return the data as JSON
    data = {
        'total_students': total_students,
        'unique_establishments': unique_establishments,
        'unique_classes': unique_classes,
        'unique_levels': unique_levels
    }
    
    return JsonResponse(data)
