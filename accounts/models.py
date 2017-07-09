from django.db import models
from django.contrib.auth.models import AbstractUser
from analytics.models import Collection


class User(AbstractUser):
    """
    All users. Hungry data sandwich eaters who crunch and munch.
    """
    custom_view = models.ManyToManyField(Collection, related_name='title')
    nickname = models.CharField(max_length=250)
    # date_of_birth = models.DateField()
    REQUIRED_FIELDS = ['nickname', 'email']





# https://docs.djangoproject.com/en/1.11/topics/auth/customizing/#django.contrib.auth.models.CustomUser.REQUIRED_FIELDS