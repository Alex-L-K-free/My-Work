import easywebdav
from urllib.parse import urlparse
#+дополнение=========
def connect_to_webdav(server_url, username, password):
    try:
        # Разбираем URL, чтобы извлечь хост и протокол
        parsed_url = urlparse(server_url)
        host = parsed_url.hostname
        protocol = parsed_url.scheme

        # Подключение к серверу WebDAV
        webdav = easywebdav.connect(
            host=host,
            username=username,
            password=password,
            protocol=protocol
        )
        print(f"Успешно подключено к серверу {server_url}")
        return webdav
    except Exception as e:
        print(f"Ошибка подключения: {e}")
        return None

def list_directory(webdav, directory="/"):
    try:
        # Получение списка файлов и папок в указанной директории
        items = webdav.ls(directory)
        print(f"Содержимое директории '{directory}':")
        for item in items:
            print(f"{'[DIR]' if item.contenttype == 'httpd/unix-directory' else '[FILE]'} {item.name}")
    except Exception as e:
        print(f"Ошибка при получении содержимого директории: {e}")

if __name__ == "__main__":
    # Данные для подключения
    server_url = input("Введите URL WebDAV сервера (например, https://webdav.server.com): ").strip()
    username = input("Введите имя пользователя: ").strip()
    password = input("Введите пароль: ").strip()

    # Подключение к серверу
    webdav = connect_to_webdav(server_url, username, password)
    if webdav:
        # Ввод директории для проверки
        directory = input("Введите путь к директории (например, /webdav/): ").strip()
        list_directory(webdav, directory)
#run