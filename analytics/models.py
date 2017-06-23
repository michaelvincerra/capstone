from django.db import models
from django.utils.text import slugify
from .countries import country_codes, FLAGS


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
    # flag = models.CharField(max_length=5, null=True, blank=True)    # TODO: Verify this works; or use a models. structure?
    country_code = models.CharField(max_length=3, null=True, blank=True)

    @property
    def truncate(self):
        return self.description[:30]

    def __str__(self):
        return self.descriptor    #country

    def save(self, *args, **kwargs):
        self.country = slugify(self.country)
        self.descriptor = f'{self.country}+{self.type}+{self.year}'

        self.country_code = country_codes[self.country.title()]
        self.flag = FLAGS[self.country_code]
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
#     super().save(*args, **kwargs)