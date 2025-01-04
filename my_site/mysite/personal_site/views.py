from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.shortcuts import render, get_object_or_404
from .models import Project

# def home(request):
#     personal_info = {
#         'name': 'Анастасия Александровна',
#         'profession': 'учитель',
#         'about': 'Краткая информация о вас.',
#         'contacts': {
#             'email': 'kiykonastya@gmail.com',
#             'phone': '+375 (29) 8598879',
#             'viber': '+375 29 8598879',
#             'github': 'https://github.com/example'
#         }
#     }
#
#     projects = [
#         {'name': 'Математика 6 класс', 'description': 'Описание', 'link': 'https://example.com/project1'},
#         {'name': 'Химия 7 класс', 'description': 'Описание ', 'link': 'https://example.com/project2'},
#         {'name': 'Биология 7 класс', 'description': 'Описание ', 'link': 'https://example.com/project3'},
#     ]
#
#     context = {
#         'personal_info': personal_info,
#         'projects': projects
#     }
def home(request):
    personal_info = {
            'name': 'Анастасия Александровна',
            'profession': 'учитель',
            'about': 'Краткая информация о вас.',
            'contacts': {
                'email': 'kiykonastya@gmail.com',
                'phone': '+375 (29) 8598879',
                'viber': '+375 29 8598879',
                'github': 'https://github.com/example'
            }
    }

    projects = [
        {'id': 1, 'name': 'Математика 6 класс', 'description': 'Описание', 'link': 'https://example.com/project1'},
        {'id': 2, 'name': 'Химия 7 класс', 'description': 'Описание ', 'link': 'https://example.com/project2'},
        {'id': 3, 'name': 'Биология 7 класс', 'description': 'Описание ', 'link': 'https://example.com/project3'},
    ]
    context = {
        'personal_info': personal_info,
        'projects': projects
    }
    return render(request, 'index.html', context)
    # return render(request, 'index.html', {'projects': projects})

# def project_detail(request, project_id):
#     # Предполагаем, что у вас есть модель Project в базе данных
#     project = get_object_or_404(Project, id=project_id)
#     context = {'project': project}
#     return render(request, 'project_detail.html', context)
#     # return render(request, 'index.html', context)
def project_detail(request, project_id):
    projects = [
        {'id': 1, 'name': 'Математика 6 класс', 'description': 'Описание', 'link': 'https://example.com/project1'},
        {'id': 2, 'name': 'Химия 7 класс', 'description': 'Описание', 'link': 'https://example.com/project2'},
        {'id': 3, 'name': 'Биология 7 класс', 'description': 'Описание', 'link': 'https://example.com/project3'},
    ]
    project = next((p for p in projects if p['id'] == project_id), None)  # Находим проект по ID
    if not project:
        raise Http404("Проект не найден")
    return render(request, 'project_detail.html', {'project': project})
