from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

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
        {'name': 'Математика 6 класс', 'description': 'Описание', 'link': 'https://example.com/project1'},
        {'name': 'Химия 7 класс', 'description': 'Описание ', 'link': 'https://example.com/project2'},
        {'name': 'Биология 7 класс', 'description': 'Описание ', 'link': 'https://example.com/project3'},
    ]

    context = {
        'personal_info': personal_info,
        'projects': projects
    }

    return render(request, 'index.html', context)
