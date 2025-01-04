import os
from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.shortcuts import render, redirect, get_object_or_404
from .models import Project
from .forms import ProjectForm
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from .forms import FileUploadForm
from django.conf import settings
from django.http import Http404


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
# def project_detail(request, project_id):
#     projects = [
#         {'id': 1, 'name': 'Математика 6 класс', 'description': 'Описание', 'link': 'https://example.com/project1'},
#         {'id': 2, 'name': 'Химия 7 класс', 'description': 'Описание', 'link': 'https://example.com/project2'},
#         {'id': 3, 'name': 'Биология 7 класс', 'description': 'Описание', 'link': 'https://example.com/project3'},
#     ]
#     project = next((p for p in projects if p['id'] == project_id), None)  # Находим проект по ID
#     if not project:
#         raise Http404("Проект не найден")
#     return render(request, 'project_detail.html', {'project': project})
# def project_detail(request, project_id):
#     projects = [
#         {'id': 1, 'name': 'Математика 6 класс', 'description': 'Описание', 'link': 'https://example.com/project1'},
#         {'id': 2, 'name': 'Химия 7 класс', 'description': 'Описание', 'link': 'https://example.com/project2'},
#         {'id': 3, 'name': 'Биология 7 класс', 'description': 'Описание', 'link': 'https://example.com/project3'},
#     ]
#     project = next((p for p in projects if p['id'] == project_id), None)
#     if not project:
#         raise Http404("Проект не найден")
#
#     # Обработка формы
#     if request.method == 'POST':
#         form = FileUploadForm(request.POST, request.FILES)
#         if form.is_valid():
#             uploaded_file = request.FILES['file']
#             upload_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'uploads')
#
#             # Создаём папку, если её нет
#             if not os.path.exists(upload_dir):
#                 os.makedirs(upload_dir)
#
#             # Здесь можно сохранить файл, например:
#             # with open(f'uploads/{uploaded_file.name}', 'wb+') as destination:
#             with open(os.path.join(upload_dir, uploaded_file.name), 'wb+') as destination:
#                 for chunk in uploaded_file.chunks():
#                     destination.write(chunk)
#             message = "Файл успешно загружен!"
#         else:
#             message = "Ошибка при загрузке файла."
#     else:
#         form = FileUploadForm()
#         message = ""
#
#     return render(request, 'project_detail.html', {'project': project, 'form': form, 'message': message})
def project_detail(request, project_id):
    projects = [
        {'id': 1, 'name': 'Математика 6 класс', 'description': 'Описание', 'link': 'https://example.com/project1'},
        {'id': 2, 'name': 'Химия 7 класс', 'description': 'Описание', 'link': 'https://example.com/project2'},
        {'id': 3, 'name': 'Биология 7 класс', 'description': 'Описание', 'link': 'https://example.com/project3'},
    ]
    project = next((p for p in projects if p['id'] == project_id), None)
    if not project:
        raise Http404("Проект не найден")

    uploaded_file = None  # Инициализируем переменную для файла
    if request.method == 'POST':
        form = FileUploadForm(request.POST, request.FILES)
        if form.is_valid():
            uploaded_file = request.FILES['file']

            # Абсолютный путь к папке uploads
            upload_dir = os.path.join(settings.BASE_DIR, 'uploads')

            # Создаём папку, если её нет
            if not os.path.exists(upload_dir):
                os.makedirs(upload_dir)

            # Сохраняем файл
            file_path = os.path.join(upload_dir, uploaded_file.name)
            with open(file_path, 'wb+') as destination:
                for chunk in uploaded_file.chunks():
                    destination.write(chunk)

            message = "Файл успешно загружен!"
            uploaded_file.url = os.path.join(settings.MEDIA_URL, uploaded_file.name)  # Добавляем URL для файла
        else:
            message = "Ошибка при загрузке файла."
    else:
        form = FileUploadForm()
        message = ""

    return render(request, 'project_detail.html', {
        'project': project,
        'form': form,
        'message': message,
        'uploaded_file': uploaded_file  # Передаем загруженный файл в шаблон
    })


#представления для обработки формы:
# personal_site/views.py
def create_project(request):
    if request.method == 'POST':
        form = ProjectForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = ProjectForm()
    return render(request, 'create_project.html', {'form': form})