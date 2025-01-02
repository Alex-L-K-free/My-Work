import os
import json
import easywebdav
from urllib.parse import urlparse
# ++
from urllib.parse import unquote
from tkinter import Tk, Label, Entry, Button, Listbox, END, messagebox
import locale

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
        messagebox.showerror("Ошибка подключения", f"Ошибка подключения: {e}")
        return None

# def list_directory(webdav, directory="/"):
#     try:
#         items = webdav.ls(directory)
#         return [f"[DIR] {item.name}" if item.contenttype == "httpd/unix-directory" else f"[FILE] {item.name}" for item in items]
#     except Exception as e:
#         messagebox.showerror("Ошибка", f"Ошибка при получении содержимого директории: {e}")
#         return []
def list_directory(webdav, directory="/"):
    try:
        items = webdav.ls(directory)
        return [
            f"[DIR] {unquote(item.name)}" if item.contenttype == "httpd/unix-directory"
            else f"[FILE] {unquote(item.name)}"
            for item in items
        ]
    except Exception as e:
        messagebox.showerror("Ошибка", f"Ошибка при получении содержимого директории: {e}")
        return []

def on_connect():
    server_url = server_url_entry.get()
    username = username_entry.get()
    password = password_entry.get()

    if not server_url or not username or not password:
        messagebox.showwarning("Внимание", "Заполните все поля!")
        return

    save_credentials(server_url, username, password)

    global webdav
    webdav = connect_to_webdav(server_url, username, password)
    if webdav:
        # Указываем директорию по умолчанию
        default_directory = "/webdav/"  # Измените путь на вашу директорию
        update_file_list(default_directory)

def update_file_list(directory):
    if webdav:
        file_list = list_directory(webdav, directory)
        listbox.delete(0, END)
        for file in file_list:
            listbox.insert(END, file)

# Инициализация GUI
root = Tk()
root.title("WebDAV Галерея")

Label(root, text="URL сервера:").grid(row=0, column=0, padx=5, pady=5)
server_url_entry = Entry(root, width=40)
server_url_entry.grid(row=0, column=1, padx=5, pady=5)

Label(root, text="Имя пользователя:").grid(row=1, column=0, padx=5, pady=5)
username_entry = Entry(root, width=40)
username_entry.grid(row=1, column=1, padx=5, pady=5)

Label(root, text="Пароль:").grid(row=2, column=0, padx=5, pady=5)
password_entry = Entry(root, show="*", width=40)
password_entry.grid(row=2, column=1, padx=5, pady=5)

connect_button = Button(root, text="Подключиться", command=on_connect)
connect_button.grid(row=3, column=0, columnspan=2, pady=10)

listbox = Listbox(root, width=60, height=20)
listbox.grid(row=4, column=0, columnspan=2, padx=5, pady=5)

# Загрузка сохраненных данных
credentials = load_credentials()
if credentials:
    server_url_entry.insert(0, credentials["server_url"])
    username_entry.insert(0, credentials["username"])
    password_entry.insert(0, credentials["password"])

webdav = None

root.mainloop()
