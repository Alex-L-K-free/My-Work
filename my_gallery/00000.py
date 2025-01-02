import json
import os
import tempfile
import locale
from urllib.parse import urlparse, unquote
import easywebdav
from kivy.app import App
from kivy.uix.button import Button
from kivy.uix.textinput import TextInput
from kivy.uix.label import Label
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.recycleview import RecycleView
from kivy.uix.recycleview.views import RecycleDataViewBehavior
from kivy.uix.popup import Popup
from kivy.uix.image import Image
from PIL import Image as PILImage

# Установка кодировки для корректного отображения кириллицы
locale.setlocale(locale.LC_ALL, '')

# Файл для сохранения данных авторизации
CREDENTIALS_FILE = "credentials.json"


def save_credentials(server_url, username, password):
    credentials = {
        "server_url": server_url,
        "username": username,
        "password": password
    }
    with open(CREDENTIALS_FILE, "w", encoding="utf-8") as f:
        json.dump(credentials, f, ensure_ascii=False)


def load_credentials():
    if os.path.exists(CREDENTIALS_FILE):
        with open(CREDENTIALS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return None


def connect_to_webdav(server_url, username, password):
    try:
        server_url = server_url.rstrip('/') + '/'  # Убедимся, что URL оканчивается на /
        parsed_url = urlparse(server_url)
        host = parsed_url.hostname
        protocol = parsed_url.scheme

        print(f"Подключение к {server_url} с пользователем {username}")

        webdav = easywebdav.connect(
            host=host,
            username=username,
            password=password,
            protocol=protocol
        )
        return webdav
    except Exception as e:
        print(f"Ошибка подключения: {e}")
        return None


def list_directory(webdav, directory="/"):
    try:
        items = webdav.ls(directory)
        return [
            f"[DIR] {unquote(item.name)}" if item.contenttype == "httpd/unix-directory"
            else f"[FILE] {unquote(item.name)}"
            for item in items
        ]
    except Exception as e:
        print(f"Ошибка при получении содержимого директории: {e}")
        return []


class FileItem(RecycleDataViewBehavior, Button):
    """Элемент списка, который будет показывать файл или директорию"""
    def refresh_view_attrs(self, rv, index, data):
        self.text = data['text']
        return super().refresh_view_attrs(rv, index, data)


class WebDAVApp(App):
    def build(self):
        self.webdav = None

        # Основной контейнер
        layout = BoxLayout(orientation="vertical", padding=10)

        # Ввод для URL сервера, имени пользователя и пароля
        self.server_url_input = TextInput(hint_text="URL сервера", multiline=False, size_hint=(1, None), height=30)
        self.username_input = TextInput(hint_text="Имя пользователя", multiline=False, size_hint=(1, None), height=30)
        self.password_input = TextInput(hint_text="Пароль", multiline=False, password=True, size_hint=(1, None), height=30)

        # Кнопка для подключения
        connect_button = Button(text="Подключиться", size_hint=(1, None), height=50)
        connect_button.bind(on_press=self.on_connect)

        # RecycleView для отображения файлов
        self.file_list = RecycleView()
        self.file_list.viewclass = 'FileItem'
        self.file_list.data = []  # Пустой список данных по умолчанию
        self.file_list.adapter = None

        # Расположение виджетов
        layout.add_widget(self.server_url_input)
        layout.add_widget(self.username_input)
        layout.add_widget(self.password_input)
        layout.add_widget(connect_button)
        layout.add_widget(self.file_list)

        # Загрузка сохраненных данных
        credentials = load_credentials()
        if credentials:
            self.server_url_input.text = credentials["server_url"]
            self.username_input.text = credentials["username"]
            self.password_input.text = credentials["password"]

        return layout

    def on_connect(self, instance):
        server_url = self.server_url_input.text
        username = self.username_input.text
        password = self.password_input.text

        if not server_url or not username or not password:
            print("Заполните все поля!")
            return

        save_credentials(server_url, username, password)

        self.webdav = connect_to_webdav(server_url, username, password)
        if self.webdav:
            # Указываем директорию по умолчанию
            default_directory = "/webdav/"  # Измените путь на вашу директорию
            self.update_file_list(default_directory)

    def update_file_list(self, directory):
        if self.webdav:
            file_list = list_directory(self.webdav, directory)
            self.file_list.data = [{'text': item} for item in file_list]  # Используйте self.file_list.data
            data = [{'text': item} for item in file_list]

            self.file_list.adapter = data

    def is_image_file(self, file_name):
        image_extensions = ['.jpg', '.jpeg', '.png', '.bmp', '.gif']
        return any(file_name.lower().endswith(ext) for ext in image_extensions)

    def view_image(self, file_path):
        try:
            temp_file = tempfile.NamedTemporaryFile(delete=False)  # Временный файл
            print(f"Загрузка файла: {file_path}")
            self.webdav.download(file_path, temp_file.name)  # Исправленный вызов download
            print(f"Файл загружен во временный файл: {temp_file.name}")

            # Открываем изображение через PIL
            image = PILImage.open(temp_file.name)
            image = image.resize((800, 600))  # Изменение размера изображения

            # Создаем окно для отображения изображения
            img_popup = Popup(title=f"Просмотр изображения: {file_path}", content=Image(source=temp_file.name))
            img_popup.open()

        except Exception as e:
            print(f"Ошибка при просмотре изображения: {e}")


if __name__ == "__main__":
    WebDAVApp().run()
