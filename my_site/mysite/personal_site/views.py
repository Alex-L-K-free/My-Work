import os
# Create your views here.
from django.shortcuts import render, redirect, get_object_or_404
from .forms import ProjectForm
from .forms import FileUploadForm
from django.conf import settings
from django.http import Http404

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
#     uploaded_file = None  # Инициализируем переменную для файла
#     if request.method == 'POST':
#         form = FileUploadForm(request.POST, request.FILES)
#         if form.is_valid():
#             uploaded_file = request.FILES['file']
#
#             # Абсолютный путь к папке uploads
#             upload_dir = os.path.join(settings.BASE_DIR, 'uploads')
#
#             # Создаём папку, если её нет
#             if not os.path.exists(upload_dir):
#                 os.makedirs(upload_dir)
#
#             # Сохраняем файл
#             file_path = os.path.join(upload_dir, uploaded_file.name)
#             with open(file_path, 'wb+') as destination:
#                 for chunk in uploaded_file.chunks():
#                     destination.write(chunk)
#
#             message = "Файл успешно загружен!"
#             uploaded_file.url = os.path.join(settings.MEDIA_URL, uploaded_file.name)  # Добавляем URL для файла
#         else:
#             message = "Ошибка при загрузке файла."
#     else:
#         form = FileUploadForm()
#         message = ""
#
#     return render(request, 'project_detail.html', {
#         'project': project,
#         'form': form,
#         'message': message,
#         'uploaded_file': uploaded_file  # Передаем загруженный файл в шаблон
#     })
def project_detail(request, project_id):
    # Пример списка проектов
    projects = [
        {'id': 1, 'name': 'Математика 6 класс', 'description': 'Описание', 'link': 'https://example.com/project1'},
        {'id': 2, 'name': 'Химия 7 класс', 'description': 'Описание', 'link': 'https://example.com/project2'},
        {'id': 3, 'name': 'Биология 7 класс', 'description': 'Описание', 'link': 'https://example.com/project3'},
    ]

    # Поиск проекта
    project = next((p for p in projects if p['id'] == project_id), None)
    if not project:
        raise Http404("Проект не найден")

    uploaded_file = None  # Инициализация переменной для загружаемого файла
    message = ""  # Сообщение о результате загрузки

    if request.method == 'POST':
        form = FileUploadForm(request.POST, request.FILES)
        if form.is_valid():
            uploaded_file = request.FILES['file']

            # Создаём папку для конкретного проекта
            project_dir = os.path.join(settings.BASE_DIR, 'uploads', f'project_{project_id}')
            if not os.path.exists(project_dir):
                os.makedirs(project_dir)

            # Полный путь к файлу
            file_path = os.path.join(project_dir, uploaded_file.name)
            with open(file_path, 'wb+') as destination:
                for chunk in uploaded_file.chunks():
                    destination.write(chunk)

            message = "Файл успешно загружен!"
            uploaded_file.url = os.path.join(settings.MEDIA_URL, f'project_{project_id}', uploaded_file.name)
        else:
            message = "Ошибка при загрузке файла."
    else:
        form = FileUploadForm()

    return render(request, 'project_detail.html', {
        'project': project,
        'form': form,
        'message': message,
        'uploaded_file': uploaded_file,  # Передача информации о загруженном файле в шаблон
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