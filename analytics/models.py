from django.db import models
from django.utils.text import slugify
# Create your models here.




class EconomicSnapshot(models.Model):

    INDICATORS = (
        ('IP', 'Intellectual Property Sales'),
        ('PAT', 'Patent Applications'),
        ('GNI', 'Gross National Income'),
        ('GDP', 'Gross Domestic Product'),
        ('FDI', 'Foreign Direct Investment'),
    )



    descriptor = models.CharField(max_length=50, editable=False, blank=True)
    year = models.PositiveSmallIntegerField()
    country = models.CharField(max_length=50)
    type = models.CharField(max_length=100, choices=INDICATORS)
    # value = models.IntegerField(null=False, blank=True)
    value = models.FloatField(null=False, blank=True)
    description = models.CharField(max_length=500)
    source_url = models.URLField(null=True, blank=True)

    @property
    def truncate(self):
        return self.description[:30]

    def __str__(self):
        return self.descriptor    #country

    def save(self, *args, **kwargs):
        self.country = slugify(self.country)
        self.descriptor = f'{self.country}+{self.type}+{self.year}'

        super().save(*args, **kwargs)



#
# class analytics(models.Model):
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