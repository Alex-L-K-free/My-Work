from django.db import models

# Create your models here.
#4. Модель для проекта (опционально)
#Если данные проектов у вас хранятся в базе данных, то вам нужно будет создать модель Project, которая будет хранить название, описание и ссылку.
# personal_site/models.py
from django.db import models

class Project(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    link = models.URLField()

    def __str__(self):
        return self.name

# Если вы создадите такую модель, не забудьте сделать миграции и создать таблицу в базе данных:
# python manage.py makemigrations
# python manage.py migrate
# Теперь у вас будут данные в базе данных, которые можно будет динамически отображать на страницах.