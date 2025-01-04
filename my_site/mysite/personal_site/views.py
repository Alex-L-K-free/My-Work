from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

def home(request):
    personal_info = {
        'name': 'Анастасия Александровна',
        'profession': 'учитель',
        'about': 'Краткая информация о вас.',
        'contacts': {
            'email': 'example@mail.com',
            'phone': '+375 (29) 8598879',
            'viber': '+375 29 8598879',
            'github': 'https://github.com/example'
        }
    }

    projects = [
        {'name': 'Проект 1', 'description': 'Описание проекта 1', 'link': 'https://example.com/project1'},
        {'name': 'Проект 2', 'description': 'Описание проекта 2', 'link': 'https://example.com/project2'},
    ]

    context = {
        'personal_info': personal_info,
        'projects': projects
    }

    return render(request, 'index.html', context)
