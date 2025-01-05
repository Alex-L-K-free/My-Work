import os
# Create your views here.
from django.shortcuts import render, redirect, get_object_or_404
from .forms import ProjectForm
from .forms import FileUploadForm
from django.conf import settings
from django.http import Http404
from django.core.files.storage import FileSystemStorage
from .models import Project

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
def create_project(request):
    if request.method == 'POST':
        form = ProjectForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = ProjectForm()
    return render(request, 'create_project.html', {'form': form})

# Удаление файла
def delete_file(request, project_id, filename):
    project = get_object_or_404(Project, id=project_id)
    project_dir = os.path.join(settings.MEDIA_ROOT, f'project_{project_id}')

    # Проверка на существование файла
    file_path = os.path.join(project_dir, filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        message = "Файл успешно удален!"
    else:
        message = "Ошибка: файл не найден!"

    # Перенаправление на страницу проекта с сообщением
    return redirect('project_detail', project_id=project_id)