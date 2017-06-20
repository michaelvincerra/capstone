from django.db import models
from django.utils.text import slugify
# Create your models here.


class EconomicSnapshot(models.Model):

    INDICATORS = (
        ('IP', 'Intellectual Property Sales'),
        ('GNI', 'Gross National Income'),
        ('GDP', 'Gross Domestic Product'),
    )


    name = models.CharField(max_length=50)
    type = models.CharField(max_length=100, choices=INDICATORS)
    created = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.name


#
# class Patents(models.Model):
#
#     name = models.CharField(max_length=50)
#     type = models.CharField(max_length=100, choices=INDICATORS)
#     created = models.DateTimeField(auto_now_add=True)
#
#
#     def __str__(self):
#         return self.name
#
#
#
#
#
# class DataDetail(models.Model):
#
#     """
#     Auto sets the slug field from the name field on save.
#
#     """
#     name = models.CharField(max_length=256)
#     slug = models.SlugField(editable=False, blank=True, null=False)
#
#     def save(self, *args, **kwargs):
#         self.slug = slugify(self.name)
#
#         super().save(*args, **kwargs)