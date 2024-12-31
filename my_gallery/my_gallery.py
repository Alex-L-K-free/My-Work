import easywebdav

def connect_to_webdav(server_url, username, password):
    try:
        # Подключение к серверу WebDAV
        webdav = easywebdav.connect(
            host=server_url,
            username=username,
            password=password,
            protocol="https" if server_url.startswith("https") else "http"
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
    server_url = input("Введите URL WebDAV сервера (например, https://webdav.server.com): ")
    username = input("Введите имя пользователя: ")
    password = input("Введите пароль: ")

    # Подключение к серверу
    webdav = connect_to_webdav(server_url, username, password)
    if webdav:
        # Список содержимого корневой директории
        list_directory(webdav, "/")
