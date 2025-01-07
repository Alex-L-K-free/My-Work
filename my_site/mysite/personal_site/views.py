# personal_site/views.py
from urllib.parse import unquote
from django.http import FileResponse
import mimetypes
import os
# Create your views here.
from django.shortcuts import render, redirect, get_object_or_404
from django.conf import settings
from django.http import Http404
from django.core.files.storage import FileSystemStorage
from .models import Project
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden
from .forms import ProjectForm, FileUploadForm

# def home(request):
#     personal_info = {
#             'name': 'Анастасия Александровна',
#             'profession': 'учитель',
#             'about': 'Краткая информация о вас.',
#             'contacts': {
#                 'email': 'kiykonastya@gmail.com',
#                 'phone': '+375 (29) 8598879',
#                 'viber': '+375 29 8598879',
#                 'github': 'https://github.com/example'
#             }
#     }
#
#     projects = [
#         {'id': 1, 'name': 'Математика 6 класс', 'description': 'Описание', 'link': 'https://example.com/project1'},
#         {'id': 2, 'name': 'Химия 7 класс', 'description': 'Описание ', 'link': 'https://example.com/project2'},
#         {'id': 3, 'name': 'Биология 7 класс', 'description': 'Описание ', 'link': 'https://example.com/project3'},
#     ]
#     context = {
#         'personal_info': personal_info,
#         'projects': projects
#     }
#     return render(request, 'index.html', context)
# Страница главного экрана с логином
def home(request):
    # Проверяем, авторизован ли пользователь
    if request.user.is_authenticated:
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
            'projects': projects,
        }
        return render(request, 'index.html', context)
    else:
        return redirect('login')


# Страница логина
from django.contrib.auth.forms import AuthenticationForm


def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})


# Ожидаем, что только владелец может создавать проекты
@login_required
def create_project(request):
    if not request.user.is_staff:  # Проверяем, является ли пользователь владельцем (по роли)
        return HttpResponseForbidden("У вас нет прав доступа.")

    if request.method == 'POST':
        form = ProjectForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = ProjectForm()
    return render(request, 'create_project.html', {'form': form})


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

    message = ""  # Сообщение о результате загрузки

    # Определяем папку для файлов проекта
    project_dir = os.path.join(settings.BASE_DIR, 'uploads', f'project_{project_id}')
    if not os.path.exists(project_dir):
        os.makedirs(project_dir)

    # Список всех файлов в папке проекта
    uploaded_files = os.listdir(project_dir)

    if request.method == 'POST':
        form = FileUploadForm(request.POST, request.FILES)
        if form.is_valid():
            uploaded_file = request.FILES['file']
            file_path = os.path.join(project_dir, uploaded_file.name)
            with open(file_path, 'wb+') as destination:
                for chunk in uploaded_file.chunks():
                    destination.write(chunk)

            message = "Файл успешно загружен!"
            # Перенаправление на ту же страницу, чтобы обновить данные
            return redirect('project_detail', project_id=project_id)
        else:
            message = "Ошибка при загрузке файла."
    else:
        form = FileUploadForm()

    # Генерация URL для файлов
    file_urls = [
        {'name': file, 'url': os.path.join(settings.MEDIA_URL, f'project_{project_id}', file)}
        for file in uploaded_files
    ]

    return render(request, 'project_detail.html', {
        'project': project,
        'form': form,
        'message': message,
        'file_urls': file_urls  # Список загруженных файлов
    })

#представления для обработки формы:
# personal_site/views.py
# def create_project(request):
#     if request.method == 'POST':
#         form = ProjectForm(request.POST, request.FILES)
#         if form.is_valid():
#             form.save()
#             return redirect('home')
#     else:
#         form = ProjectForm()
#     return render(request, 'create_project.html', {'form': form})
@login_required
def create_project(request):
    if not request.user.is_staff:  # Если пользователь не владелец
        return HttpResponseForbidden("У вас нет прав доступа.")
    # Дальше логика создания проекта


# Удаление файла
def delete_file(request, project_id, filename):
    # Декодируем имя файла
    filename = unquote(filename)

    # Получаем проект
    # project_dir = os.path.join(settings.MEDIA_ROOT, f'project_{project_id}')
    project_dir = os.path.join(settings.BASE_DIR, 'uploads', f'project_{project_id}')
    file_path = os.path.join(project_dir, filename)

    # Логирование для отладки
    print(f"Попытка удалить файл: {filename}")
    print(f"Путь к файлу: {file_path}")

    # Проверка существования файла
    if os.path.exists(file_path):
        os.remove(file_path)
        print(f"Файл '{filename}' удален!")
    else:
        print(f"Файл '{filename}' не найден!")

    # Перенаправление на страницу проекта
    return redirect('project_detail', project_id=project_id)

def download_file(request, project_id, filename):
    # Декодируем имя файла
    filename = unquote(filename)

    # Определяем путь к файлу
    project_dir = os.path.join(settings.BASE_DIR, 'uploads', f'project_{project_id}')
    file_path = os.path.join(project_dir, filename)

    # Логирование для отладки
    print(f"Попытка загрузить файл: {filename}")
    print(f"Путь к файлу: {file_path}")

    # Проверяем существование файла
    if not os.path.exists(file_path):
        raise Http404("Файл не найден!")

    # Определяем MIME-тип файла
    mime_type, _ = mimetypes.guess_type(file_path)

    # Возвращаем файл для скачивания
    response = FileResponse(open(file_path, 'rb'), content_type=mime_type)
    response['Content-Disposition'] = f'attachment; filename="{filename}"'
    return response