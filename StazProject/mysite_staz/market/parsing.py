import requests
from bs4 import BeautifulSoup

def get_kufar_books():
    url = "https://www.kufar.by/l/r~minsk/knigi-i-zhurnaly?ot=1&query=%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8+&utm_filterOrigin=Search_suggester_3&utm_queryOrigin=Manually_typed&utm_suggestionType=Category_only"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Проверка на ошибки HTTP
    except requests.RequestException as e:
        print(f"Ошибка при запросе: {e}")
        return []

    soup = BeautifulSoup(response.text, 'html.parser')

    # Попробуем найти объявления
    books = []
    for item in soup.find_all('div', class_='kf-h6bb'):  # Найдите реальный класс для объявлений
        try:
            title = item.find('a').text.strip()  # Название книги
            price = item.find('span', class_='kf-pj30').text.strip()  # Цена (поиск нужного класса)
            books.append({'title': title, 'price': price})
        except AttributeError:
            continue

    return books


if __name__ == "__main__":
    books = get_kufar_books()
    if books:
        with open("kufar_books.txt", "w", encoding="utf-8") as file:
            for book in books:
                file.write(f"Название: {book['title']}, Цена: {book['price']}\n")
        print("Результаты сохранены в файл kufar_books.txt")
    else:
        print("Книги не найдены или произошла ошибка.")


    # for item in soup.find_all('div', class_='product-card'):
    #     try:
    #         title = item.find('a', class_='product-title').text.strip()
    #         price = item.find('div', class_='product-price').text.strip()
    #         books.append({'title': title, 'price': price})
    #     except AttributeError:
    #         print(f"Пропущен элемент из-за отсутствующих данных: {item}")
    #         continue
#
#     return books
#
#
# if __name__ == "__main__":
#     books = get_new_books()
#     if books:
#         with open("books.txt", "w", encoding="utf-8") as file:
#             for book in books:
#                 file.write(f"Название: {book['title']}, Цена: {book['price']}\n")
#         print("Результаты сохранены в файл books.txt")
#     else:
#         print("Книги не найдены или произошла ошибка.")
