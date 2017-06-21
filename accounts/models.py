from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    """
    All users. Hungry data sandwich eaters.
    """
    nickname = models.CharField(max_length=250)
    # date_of_birth = models.DateField()
    REQUIRED_FIELDS = ['nickname', 'email']





# https://docs.djangoproject.com/en/1.11/topics/auth/customizing/#django.contrib.auth.models.CustomUser.REQUIRED_FIELDS